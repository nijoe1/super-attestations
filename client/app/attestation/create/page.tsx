"use client";
import CustomAddress from "@/components/core/attestation/customAddress";
import SchemaList from "@/components/core/attestation/schema/schema-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseEther } from 'viem';

import { Textarea } from "@/components/ui/textarea";
import { CONTRACTS } from "@/constants/contracts";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
//@ts-ignore
import TagsInput from 'react-tagsinput';
import { toast } from "react-toastify";
import { Address, useContractWrite, usePublicClient } from "wagmi";
export type RevokerItem = {
  token: string;
  type: string;
  tokenId: string;
};
export type SchemaInput = {
  name: string;
  type: string;
  isArray: string;
};
export default function CreateAttestion() {
  const [formData, setFormData] = useState({
    name: "HealthCare Data",
    description: "lorem ipsum health care data is important to track since it provides a global benefit of many things",
    categories: [], // comma separated list of categories
    attestRevokePeriod: "100",
    resolutionDays: 10,
    mintPrice: 0,
    schemaInput: {
      name: "",
      type: "string",
      isArray: "false",
    } as SchemaInput,
    schema: "string name, string file, string description",
    attesterToken: "0x0000000000000000000000000000000000000000",
    attesterTokenID: 0,
    attesterStatus: 0,
    attestReward: 0,
    isMintable: false,
    revokerToken: "0x0000000000000000000000000000000000000000",
    revokerTokenID: 0,
    revokerStatus: 0,
  });

  
  const [customRevokers, setCustomRevokers] = useState<string[]>([]);
  const [customAttesters, setCustomAttesters] = useState<string[]>([]);
  const [customTokenGatedHash, setCustomTokenGatedHash] = useState<string>("")
  const [showAModal, setShowAModal] = useState(false);
  const [showRModal, setShowRModal] = useState(false);
  const [ENUMtype, setENUMType] = useState<number[]>([0,0]);
  const [tokens, setTokens] = useState<number[]>([0,0]);
  const [isCustom, setIsCustom] = useState(false)

  const publicClient = usePublicClient();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACTS.attestionFactory[420].contract,
    abi: CONTRACTS.attestionFactory[420].abi,
    functionName: "createSuperSchema",
  });
  
  const { data:customData, isLoading:loadingTokenCreate, isSuccess:customSuccess, writeAsync:customCreate} = useContractWrite({
    address: CONTRACTS.tokenCreator[420].contract,
    abi: CONTRACTS.tokenCreator[420].abi,
    functionName: "createAccessControlContract",
  });
  
  

  const handleTagChange = (tags:any) => {
    setFormData({ ...formData, categories: tags });
};
  const addSchemaInput = () => {
    /* if (formData.schemaInput.name == "" || formData.schemaInput.type == "") {
      toast.error("Please fill out the name and type");
      return;
    }

    let newSchema = "";
    if (formData.schema.length < 1) {
      if (formData.schemaInput.isArray == "true") {
        newSchema += `${formData.schemaInput.type}[] ${formData.schemaInput.name}`;
        return;
      }

      newSchema += `${formData.schemaInput.type} ${formData.schemaInput.name}`;
    } else {
      if (formData.schemaInput.isArray == "true") {
        newSchema += `,${formData.schemaInput.type}[] ${formData.schemaInput.name}`;
        return;
      }
      newSchema += `,${formData.schemaInput.type} ${formData.schemaInput.name}`;
    }

    console.log(newSchema);
    setFormData({
      ...formData,
      schema: newSchema,
      schemaInput: {
        name: "",
        type: "string",
        isArray: "false",
      },
    }); */
    
    toast.info("This feature is currently available but should be working soon!");
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSchemaChange = (e: any) => {
    setFormData({
      ...formData,
      schemaInput: {
        ...formData.schemaInput,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleTypeChange = (e: any, type: string) => {
    if (type == "isArray") {
      setFormData({
        ...formData,
        schemaInput: {
          ...formData.schemaInput,
          isArray: e,
        },
      });
      return;
    }
    setFormData({
      ...formData,
      schemaInput: {
        ...formData.schemaInput,
        type: e,
      },
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);

   // [attestionDays, schema, mintPrice, attestReward, mitnable]
    
     if(formData.attesterStatus == 5 || formData.revokerStatus == 5){
       //we want to create here the customAddress
      
      const attesters = formData.attesterStatus == 5 ? customAttesters : []
      const revokers = formData.revokerStatus == 5 ? customRevokers : []

      customCreate({
         args: [attesters, revokers]
      })

      return;
     }
    
    //convert to days.. 
    const days = formData.resolutionDays * 3600;
    let params = [
      formData.name,
      formData.description,
      formData.categories,
      days,
      formData.schema,
      parseEther(formData.mintPrice.toString()),
      parseEther(formData.attestReward.toString()),
      formData.isMintable,
    ];
    
    const tokenGateAddresses = [formData.attesterToken, formData.revokerToken];
    
    let tokenGateEnumA = formData.attesterStatus;
    let tokenGateEnumR = formData.revokerStatus;
    if(formData.attesterStatus == 5 || formData.attesterStatus == 6 || formData.attesterStatus == 8){ tokenGateEnumA = 1}
    if(formData.revokerStatus == 5 || formData.revokerStatus == 8 || formData.attesterStatus == 6){ tokenGateEnumR = 1}
    const attesters = formData.attesterStatus == 5 ? customAttesters : []
    const revokers = formData.revokerStatus == 5 ? customRevokers : []
    if((customAttesters.length != 0 || customRevokers.length != 0) && (formData.attesterStatus == 5 || formData.revokerStatus == 5)){
      customCreate({
        args: [attesters, revokers]
      })
    }
    if(formData.attesterStatus == 6) tokenGateEnumA = 0
    if(formData.revokerStatus == 6) tokenGateEnumR = 0


    
    const tokenGateEnum = [tokenGateEnumA, tokenGateEnumR];
    const tokenGateTokenID = [formData.attesterTokenID,formData.revokerTokenID];
  
    if(customData){
      console.log(customData)
      //tokenGateAddresses.push(customData)
      //tokenGateEnum.push(5)
      //tokenGateTokenID.push(0)
    }
    write({
      args: [tokenGateAddresses, tokenGateEnum, tokenGateTokenID, params],
    });

    if (data) {
      console.log(data);
      toast.success("Success");
    }
  };

  const changeMintable = (e: any) => {
    if (e == "true") {
      setFormData({
        ...formData,
        isMintable: true,
        attestReward: 0,
      });
      return;
    } else {
      setFormData({
        ...formData,
        isMintable: false,
        mintPrice: 0,
      });
      return;
    }
  };

  const changeSelect = (e: any, type: string) => {
    if (type == "attesterStatus") {
      if(e === "6"){
        setFormData({
          ...formData,
          attesterStatus: e,
          attesterTokenID: 0,
          attesterToken: CONTRACTS.worldcoin[420].contract,
        });
        return;
      }
      if(e === "5"){
        setFormData({
          ...formData,
          attesterStatus: e,
          attesterTokenID: 0,
          attesterToken: CONTRACTS.worldcoin[420].contract,
        });
        return;
      }
      setFormData({
        ...formData,
        attesterStatus: e,
        attesterTokenID: 0,
        attesterToken: "0x0000000000000000000000000000000000000000",
      });
      return;
    }
    if (type == "revokerStatus") {
      if(e === "6"){
        setFormData({
          ...formData,
          revokerStatus: e,
          revokerTokenID: 0,
          revokerToken: CONTRACTS.worldcoin[420].contract,
        });
        return
      }
      if(e === "8"){
        setFormData({
          ...formData,
          revokerStatus: e,
          revokerTokenID: 0,
          revokerToken: "0x0000000000000000000000000000000000000001",
        });
        return
      }
      if(e === "5"){
        setFormData({
          ...formData,
          revokerStatus: e,
          revokerTokenID: 0,
          revokerToken: "0x0000000000000000000000000000000000000000",
        });
        return
      }
      setFormData({
        ...formData,
        revokerStatus: e,
        revokerTokenID: 0,
        revokerToken: "0x0000000000000000000000000000000000000000",
      });
      return;
    }
  };

  const validateAddress = async (type: string) => {
    let address = formData.attesterToken as Address;
    const wagmiAbi = [
      {
        constant: true,
        inputs: [{ name: "interfaceId", type: "bytes4" }],
        name: "supportsInterface",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "pure",
        type: "function",
      },
    ];

    const erc721 = await publicClient.readContract({
      address: address,
      abi: wagmiAbi,
      functionName: "supportsInterface",
      args: ["0x80ac58cd"],
    });
    const erc1155 = await publicClient.readContract({
      address: address,
      abi: wagmiAbi,
      functionName: "supportsInterface",
      args: ["0xd9b67a26"],
    });

    if (erc721 || erc1155) {
      toast.success("ERC721 token found");
      if (type == "attester") {
        
        setFormData({
          ...formData,
          attesterStatus: erc721 ? 0 : 1,
        });
      }
      if (type == "revoker") {
        
        setFormData({
          ...formData,
          revokerStatus: erc721 ? 0 : 1,
        });
      }
    }
  };
  
  const addRevokeAddress = (address: string) => {

    setCustomRevokers(prevAddresses => [...prevAddresses, address]);

  }
  
  const addAttestAddress = (address: string) => {
    setCustomAttesters(prevAddresses => [...prevAddresses, address]);
    
  }
  
  if(isSuccess){
  
    return (
      <main>
        <div className=" p-8 m-12 rounded-md flex flex-col justify-center items-center">
            <h1>Succesfully Created a new library</h1>
            <Link href="/attestation" className="text-green-500">
              Go to libraries
              </Link>
          </div>
        </main>
    )
  }
  
  return (
    <main>
      {showRModal && <CustomAddress addresses={customRevokers} addAddress={addRevokeAddress} showModal={showRModal} setShowModal={setShowRModal} />}
      {showAModal && <CustomAddress addresses={customAttesters} addAddress={addAttestAddress} showModal={showAModal} setShowModal={setShowAModal} />}
      <div className=" p-8 m-12 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl mb-4 text-green-300">
          Create  Library
        </h1>
        <div className="flex flex-col gap-8 bg-gray-600 rounded-md p-12 w-full max-w-2xl">
          <div className="items-center gap-1.5">
            <Label htmlFor="picture">Name</Label>
            <Input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required={true}
            />
          </div>
          <div className="items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required={true}
            />
          </div>
          <div className="items-center gap-1.5">
            <Label htmlFor="picture">Categories</Label>
            <TagsInput value={formData.categories} onChange={handleTagChange} />
          </div>
          <div className="grid grid-cols-6 items-end gap-2 hidden">
            <div  className="col-span-2">
            <Label htmlFor="resolutionDays">Create Input</Label>
            <Input
              name="name"
              type="text"
              value={formData.schemaInput.name}
              onChange={handleSchemaChange}
              placeholder="Enter name"
              required={true}
             
            />
            </div>
           
            <Select
              
              name="type"
              defaultValue={formData.schemaInput.type}
              onValueChange={(e) => handleTypeChange(e, "type")}
            >
              <SelectTrigger className="w-full col-span-2 bg-gray-300">
                <SelectValue placeholder="Select inputtype" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select your input type</SelectLabel>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="uint256">Number</SelectItem>
                  <SelectItem value="bytes">File</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Select
                name="isArray"
                defaultValue={formData.schemaInput.isArray.toString()}
                onValueChange={(e) => handleTypeChange(e, "isArray")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select inputtype" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"false"}>Single</SelectItem>
                    <SelectItem value={"true"}>Array</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-green-300" onClick={addSchemaInput}>
              <PlusIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid grid-cols-4 hidden">
            <SchemaList list={formData.schema} />
          </div>
          
          <div className="grid md:grid-cols-2 w-full items-center gap-1.5">
            <div className="items-center gap-1.5">
              <Label htmlFor="resultionDays">Resolution Days</Label>
              <Input
                name="resolutionDays"
                type="number"
                value={formData.resolutionDays}
                onChange={handleChange}
                placeholder="Enter resolution days in seconds"
                required={true}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 w-full  items-center gap-1.5">
            <div className="col-span-1">
              <Label htmlFor="picture">Paid subscription</Label>
              <Select
                defaultValue={formData.isMintable.toString()}
                onValueChange={(e) => changeMintable(e)}
              >
                <SelectTrigger
                  className="w-full"
                  name="isMintable"
                  value={formData.isMintable.toString()}
                  onChange={handleChange}
                >
                  <SelectValue placeholder="Mintable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Monthly Payment</SelectItem>
                    <SelectItem value="false">Free</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {formData.isMintable ? (
              <div>
                <Label htmlFor="mintPrice">Subscription price</Label>
                <Input
                  name="mintPrice"
                  type="number"
                  value={formData.mintPrice}
                  onChange={handleChange}
                  placeholder="Enter mint price"
                  required={true}
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="attestReward">Attest Reward</Label>
                <Input
                  name="attestReward"
                  type="number"
                  value={formData.attestReward}
                  onChange={handleChange}
                  placeholder="Enter attestation reward"
                  required={true}
                />
              </div>
            )}
          </div>
              
              {/* ATTESTATION ACCESS */}
          <div className="grid sm:grid-cols-7 w-full  items-end gap-2">
            <div className="col-span-2">
              <Label htmlFor="picture">Access Providers</Label>
              <Select
                defaultValue={formData.attesterStatus.toString()}
                onValueChange={(e) => changeSelect(e, "attesterStatus")}
              >
                <SelectTrigger
                  className="w-full"
                  name="isMintable"
                  value={formData.attesterStatus.toString()}
                >
                  <SelectValue placeholder="attesterStatus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="text-sm">
                    <SelectItem value="0">Anyone</SelectItem>
                    <SelectItem value="4">Token</SelectItem>
                    <SelectItem value="6">Verified Humans</SelectItem>
                    <SelectItem value="7" disabled>Sismo Proof</SelectItem>
                    <SelectItem value="5">Custom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-4">
              <Label htmlFor="attestorToken">Attesters Address</Label>
              <div className="flex w-full items-center space-x-2">
              {
                formData.attesterStatus == 5 && (
                  <Input 
                    type="text"
                    value={`${customAttesters.length} addresses`}
                    disabled={true}
                  />
                )
              }
              {
                formData.attesterStatus != 5 && (
                  <Input
                  name="attesterToken"
                  type="text"
                  value={formData.attesterToken}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Add attestation token address (ERC721 or ERC1155)"
                  required={true}
                  disabled={formData.attesterStatus < 1}
                />
                )
              }
               
              </div>
            </div>
            <div className="col-span-1">
              {formData.attesterStatus == 4 && (
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    validateAddress("attester");
                  }}
                >
                  <PlusIcon />
                </Button>
              )}

              {formData.attesterStatus == 2 && (
                <Input
                  name="attesterTokenID"
                  type="number"
                  value={formData.attesterTokenID}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Required"
                  required={true}
                  disabled={formData.attesterStatus < 1}
                />
              )}
              {formData.attesterStatus == 1 && (
                <Input
                  name="attesterTokenID"
                  type="number"
                  value={formData.attesterTokenID}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Optional"
                  disabled={formData.attesterStatus < 1}
                />
              )}
               {formData.attesterStatus == 5 && (
                  <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAModal(!showAModal)
                  }}
                >
                  <PlusIcon />
                </Button>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-7 w-full items-end gap-2">
            <div className="col-span-2">
              <Label htmlFor="picture">Verifiers Access</Label>
              <Select
                defaultValue={formData.revokerStatus.toString()}
                onValueChange={(e) => changeSelect(e, "revokerStatus")}
              >
                <SelectTrigger
                  className="w-full"
                  name="isMintable"
                  value={formData.attesterStatus.toString()}
                >
                  <SelectValue placeholder="attesterStatus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="text-sm">
                    <SelectItem value="0">Anyone</SelectItem>
                    <SelectItem value="4">Token</SelectItem>
                    <SelectItem value="6">Verified Humans</SelectItem>
                    <SelectItem value="8">No one</SelectItem>
                    <SelectItem value="5">Custom</SelectItem>
                    <SelectItem value="7" disabled>Sismo Proof</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-4">
              <Label htmlFor="attestorToken">Data Verifiers Address</Label>
              <div className="flex w-full items-center space-x-2">
              {
                formData.revokerStatus == 5 && (
                  <Input 
                    type="text"
                    value={`${customRevokers.length} addresses`}
                    disabled={true}
                  />
                )
              }
              {
                (formData.revokerStatus != 5 )&& (
                  <Input
                  name="revokerToken"
                  type="text"
                  value={formData.revokerToken}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Add attestation token address (ERC721 or ERC1155)"
                  required={true}
                  disabled={formData.revokerStatus < 1}
                />
                )
              }
              
               
              </div>
            </div>
            <div className="col-span-1">
              {formData.revokerStatus == 4 && (
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    validateAddress("revoker");
                  }}
                >
                  <PlusIcon />
                </Button>
              )}

              {formData.revokerStatus == 2 && (
                <Input
                  name="revokerTokenID"
                  type="number"
                  value={formData.revokerTokenID}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Required"
                  required={true}
                  disabled={formData.revokerStatus < 1}
                />
              )}
              {formData.revokerStatus == 1 && (
                <Input
                  name="revokerTokenID"
                  type="number"
                  value={formData.revokerTokenID}
                  onChange={handleChange}
                  className="text-sm"
                  placeholder="Optional"
                  disabled={formData.revokerStatus < 1}
                />
              )}
               {formData.revokerStatus == 5 && (
                  <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowRModal(!showRModal)
                  }}
                >
                  <PlusIcon />
                </Button>
              )}
              
            </div>
          </div>

          <div className="w-full">
            {isLoading ? (
              <Button
                className="w-full bg-green-300 text-gray-900 hover:text-green-300"
                onClick={handleSubmit}
                disabled
              >
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </Button>
            ) : (
              <Button
                className="w-full bg-green-300 text-gray-900 hover:text-green-300"
                onClick={handleSubmit}
              >
                <PlusIcon className="mr-2 h-4 w-4" />{" "}
                <span> Create Library</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
