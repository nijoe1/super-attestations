// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

import "./interfaces/ISchemaRegistry.sol";
import "./interfaces/ISchemaResolver.sol";
import "./interfaces/IEAS.sol";

/**
 * @title SuperAttestationsSchemaFactory
 * @dev A contract to create and manage OptimisticResolver contracts associated with schemas.
 */
contract superAttestationsSchemaFactory is ERC1155 {
    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.UintSet;

    // State variables
    ISchemaRegistry private schemaRegistry;
    EnumerableSet.AddressSet private generatedContracts;
    EnumerableSet.UintSet private tokens;

    uint256 ONE_MONTH = 30 days;

    address implementationAddress;
    address public splitterFactory;
    address private splitterAddress;

    address feeRecipient;

    // Mapping to store schema information
    mapping(address => SchemaInfo) public resolverSchemaInfo;

    mapping(uint256 => bool) private isMintable;

    mapping(address => mapping(uint256 => uint256)) public userSubscriptions;

    // Struct to hold schema-related information
    struct SchemaInfo {
        bytes32 schemaUID;
        bool isMintable;
        uint256 mintPrice;
    }

    // Struct to hold input parameters for creating a schema
    struct SchemaParameters {
        string name;
        string description;
        string[] tags;
        uint256 attestResolutionDays;
        string schema;
        uint256 mintPrice;
        uint256 attestReward;
        bool isMintable;
    }

    // Events
    event SchemaRegistered(
        string name,
        string description,
        string[] tags,
        bytes32 schemaUID,
        address resolver,
        uint256 attestResolutionDays,
        string schema,
        uint256 mintPrice,
        uint256 attestReward,
        bool isMintable
    );

    event schemaSubscription(
        address user,
        bytes32 schemaUID,
        uint256 subscriptionEndAt
    );

    /**
     * @dev Constructor to initialize the contract with required parameters.
     * @param _schemaRegistry The address of the SchemaRegistry contract.
     */
    constructor(
        ISchemaRegistry _schemaRegistry,
        address _implementationAddress,
        address _thirdwebFactoryAddress,
        address _splitterAddress
    ) ERC1155("") {
        schemaRegistry = _schemaRegistry;
        implementationAddress = _implementationAddress;
        splitterAddress = _splitterAddress;
        splitterFactory = _thirdwebFactoryAddress;
        feeRecipient = msg.sender;
    }

    /**
     * @dev Creates a new super schema with specified parameters.
     * @param tokenGateAddresses Addresses of token gates (attesters and revokers).
     * @param enumsIDs Enumerated IDs for token gates.
     * @param tokenIDs Token IDs for token gates.
     * @param _schemaInput Input parameters for creating the schema.
     * @return resolver Address of the created resolver contract.
     * @return schemaUID UID of the registered schema.
     */
    function createSuperSchema(
        address[] memory tokenGateAddresses,
        uint8[] memory enumsIDs,
        uint256[] memory tokenIDs,
        SchemaParameters memory _schemaInput
    ) public payable returns (address resolver, bytes32 schemaUID) {
        // Check for required conditions
        require(tokenGateAddresses[0] != address(1), "schema without attestations");
        if (_schemaInput.isMintable && _schemaInput.attestReward != 0) {
            revert("reward only to nonMintable");
        }

        // Create new resolver contract
        resolver = Clones.clone(implementationAddress);

        (bool success, ) = resolver.call{value: msg.value}(
            abi.encodeWithSignature(
                "initialize(address[],uint8[],uint256[],address,address,address,uint256,uint64,bool)",
                tokenGateAddresses,
                enumsIDs,
                tokenIDs,
                splitterFactory,
                splitterAddress,
                feeRecipient,
                _schemaInput.attestReward,
                _schemaInput.attestResolutionDays,
                _schemaInput.isMintable
            )
        );

        require(success, "error deploying");
        // Add to the list of generated contracts
        generatedContracts.add(resolver);

        // Determine if the schema is revocable
        bool revocable = tokenGateAddresses[1] != address(1);

        // Register the schema and get its UID
        schemaUID = schemaRegistry.register(
            _schemaInput.schema,
            ISchemaResolver(resolver),
            revocable
        );

        // Store schema information
        resolverSchemaInfo[resolver] = SchemaInfo(
            schemaUID,
            _schemaInput.isMintable,
            _schemaInput.mintPrice
        );

        uint256 tokenID = uint256(schemaUID);

        tokens.add(tokenID);

        isMintable[tokenID] = _schemaInput.isMintable;

        // Emit the SchemaRegistered event
        emit SchemaRegistered(
            _schemaInput.name,
            _schemaInput.description,
            _schemaInput.tags,
            schemaUID,
            resolver,
            _schemaInput.attestResolutionDays,
            _schemaInput.schema,
            _schemaInput.mintPrice,
            _schemaInput.attestReward,
            _schemaInput.isMintable
        );
    }

    /**
     * @dev Mint tokens for encrypted attestations.
     * @param schemaUID The UID of the schema for which tokens are being minted.
     */
    function mint(bytes32 schemaUID, uint256 months) external payable onlyTokens(schemaUID) {
        address resolver = address(schemaRegistry.getSchema(schemaUID).resolver);
        require(months > 0);
        require(
            resolverSchemaInfo[resolver].mintPrice == msg.value * months,
            "Incorrect value"
        );
        (bool sent, ) = payable(resolver).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        uint256 tokenID = uint256(resolverSchemaInfo[resolver].schemaUID);
        _mint(msg.sender, tokenID, 1, "");
        userSubscriptions[msg.sender][tokenID] = userSubscriptions[msg.sender][tokenID] > block.timestamp ? userSubscriptions[msg.sender][tokenID] + ONE_MONTH * months : block.timestamp + ONE_MONTH * months;
        
        emit schemaSubscription(msg.sender, schemaUID, userSubscriptions[msg.sender][tokenID]);
    }

    /**
     * @dev Check if a sender has access to a specific schema.
     * @param schemaUID The UID of the schema to check access for.
     * @param sender The address of the sender to check access for.
     * @return giveAccess Whether the sender has access to the schema.
     */
    function hasAccess(bytes32 schemaUID, address sender)
        external
        view
        returns (bool)
    {
        address resolver = address(schemaRegistry.getSchema(schemaUID).resolver);
        uint256 tokenID = uint256(schemaUID);
        bool giveAccess;
        if (isMintable[tokenID]) {
            giveAccess = balanceOf(sender, tokenID) > 0 ? userSubscriptions[sender][tokenID] > block.timestamp : false;
        }
        return giveAccess || ISchemaRegistry(address(resolver)).hasAccess(sender);
    }

    /**
     * @dev Check if a sender has attestation access to a specific schema.
     * @param schemaUID The UID of the schema to check attestation access for.
     * @param sender The address of the sender to check attestation access for.
     * @return Whether the sender has attestation access to the schema.
     */
    function hasAttestAccess(bytes32 schemaUID, address sender)
        external
        view
        returns (bool)
    {
        address resolver = address(schemaRegistry.getSchema(schemaUID).resolver);
        return ISchemaRegistry(address(resolver)).hasAttestAccess(sender);
    }

    /**
     * @dev Check if a sender has revocation access to a specific schema.
     * @param schemaUID The UID of the schema to check revocation access for.
     * @param sender The address of the sender to check revocation access for.
     * @return Whether the sender has revocation access to the schema.
     */
    function hasRevokeAccess(bytes32 schemaUID, address sender)
        external
        view
        returns (bool)
    {
        address resolver = address(schemaRegistry.getSchema(schemaUID).resolver);
        return ISchemaRegistry(address(resolver)).hasAccess(sender);
    }

    // Modifier to allow only generated contracts to call certain functions
    modifier onlyGeneratedContracts() {
        require(generatedContracts.contains(msg.sender), "Invalid contract");
        _;
    }

    // Modifier to allow only encrypted tokens to call mint function
    modifier onlyTokens(bytes32 schemaUID) {
        require(onlyAllowedTokens(schemaUID), "Non-existent token");
        _;
    }

    function onlyAllowedTokens(bytes32 schemaUID)public view returns(bool){
        return tokens.contains(uint256(schemaUID));
    }

}