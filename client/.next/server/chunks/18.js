exports.id = 18;
exports.ids = [18];
exports.modules = {

/***/ 1649:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 62684))

/***/ }),

/***/ 14921:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23))

/***/ }),

/***/ 62684:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ App),
  polygonMumbai: () => (/* binding */ polygonMumbai)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs
var react_toastify_esm = __webpack_require__(34751);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__(45996);
// EXTERNAL MODULE: ./node_modules/@wagmi/core/dist/chunk-LAFZBYO7.js + 5 modules
var chunk_LAFZBYO7 = __webpack_require__(98583);
// EXTERNAL MODULE: ./node_modules/wagmi/dist/index.js + 25 modules
var dist = __webpack_require__(40965);
// EXTERNAL MODULE: ./node_modules/@wagmi/connectors/dist/chunk-QRUHVNWK.js + 1 modules
var chunk_QRUHVNWK = __webpack_require__(89685);
// EXTERNAL MODULE: ./node_modules/@wagmi/core/dist/providers/public.js
var providers_public = __webpack_require__(81033);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
;// CONCATENATED MODULE: ./components/core/account/address-wrapper.tsx
/* __next_internal_client_entry_do_not_use__ AddressWrapper auto */ 


const AddressWrapper = ({ children })=>{
    const { connect, connectors, pendingConnector } = (0,dist/* useConnect */.$4)();
    const { isDisconnected } = (0,dist/* useAccount */.mA)();
    (0,react_.useEffect)(()=>{
        if (!isDisconnected) return;
        // if wagmi.connected set to true, then wagmi will not show modal
        // to reconnect user wallet, but instead will use prev connection
        // I found this example in this public repo: https://github.com/sumicet/web3auth-modal-wagmi
        const wagmiConnected = localStorage.getItem("wagmi.connected");
        const isWagmiConnected = wagmiConnected ? JSON.parse(wagmiConnected) : false;
        if (!isWagmiConnected) return;
        connect({
            connector: connectors[0]
        });
    }, [
        connect,
        connectors,
        isDisconnected
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: children
    });
};

// EXTERNAL MODULE: ./node_modules/@wagmi/chains/dist/index.mjs
var chains_dist = __webpack_require__(39067);
// EXTERNAL MODULE: ./node_modules/@web3auth/base/dist/base.cjs.js
var base_cjs = __webpack_require__(10499);
// EXTERNAL MODULE: ./node_modules/@web3auth/ethereum-provider/dist/ethereumProvider.cjs.js
var ethereumProvider_cjs = __webpack_require__(88313);
// EXTERNAL MODULE: ./node_modules/@web3auth/no-modal/dist/noModal.cjs.js
var noModal_cjs = __webpack_require__(82977);
// EXTERNAL MODULE: ./node_modules/@web3auth/openlogin-adapter/dist/openloginAdapter.cjs.js
var openloginAdapter_cjs = __webpack_require__(72320);
// EXTERNAL MODULE: ./node_modules/@web3auth/web3auth-wagmi-connector/dist/web3authWagmiConnector.esm.js
var web3authWagmiConnector_esm = __webpack_require__(77684);
;// CONCATENATED MODULE: ./app/Web3AuthConnectorInstance.tsx
// Web3Auth Libraries





const Web3AuthConnectorInstance_name = "DataPonte";
const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";
function Web3AuthConnectorInstance(chains) {
    // Create Web3Auth Instance
    const chainConfig = {
        chainNamespace: base_cjs.CHAIN_NAMESPACES.EIP155,
        chainId: "0x1a4",
        rpcTarget: "https://optimism-goerli.public.blastapi.io	",
        displayName: "Optimistic Goerli",
        tickerName: "ETH Goerli",
        ticker: "ETH",
        blockExplorer: "https://goerli-optimism.etherscan.io/"
    };
    const web3AuthInstance = new noModal_cjs.Web3AuthNoModal({
        clientId: process.env.WEB3AUTH || "BIAXgpC0-jqizRK_mHoz1PjjIsDLuBhTfJjlHniMOa6IEyEQmyosZXK5_z9Xhg_FJiu6tilRgJxz1mEZfMJRY04",
        chainConfig,
        web3AuthNetwork: "testnet"
    });
    const privateKeyProvider = new ethereumProvider_cjs.EthereumPrivateKeyProvider({
        config: {
            chainConfig
        }
    });
    // Add openlogin adapter for customisations
    const openloginAdapterInstance = new openloginAdapter_cjs.OpenloginAdapter({
        privateKeyProvider,
        adapterSettings: {
            network: "testnet",
            uxMode: "popup",
            whiteLabel: {
                name: Web3AuthConnectorInstance_name,
                logoLight: iconUrl,
                logoDark: iconUrl,
                defaultLanguage: "en",
                dark: true
            }
        }
    });
    web3AuthInstance.configureAdapter(openloginAdapterInstance);
    return new web3authWagmiConnector_esm/* Web3AuthConnector */.a({
        chains: chains,
        options: {
            web3AuthInstance,
            loginParams: {
                loginProvider: "google"
            }
        }
    });
}

// EXTERNAL MODULE: ./components/core/account/login-button.tsx + 2 modules
var login_button = __webpack_require__(94550);
// EXTERNAL MODULE: ./node_modules/@headlessui/react/dist/components/disclosure/disclosure.js + 2 modules
var disclosure = __webpack_require__(9135);
// EXTERNAL MODULE: ./node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js
var XMarkIcon = __webpack_require__(57048);
// EXTERNAL MODULE: ./node_modules/@heroicons/react/24/outline/esm/Bars3Icon.js
var Bars3Icon = __webpack_require__(46140);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
;// CONCATENATED MODULE: ./app/nav-bar.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





function Navbar({ links }) {
    //check if the current one is active 
    const pathname = (0,navigation.usePathname)();
    return /*#__PURE__*/ jsx_runtime_.jsx(disclosure/* Disclosure */.p, {
        as: "nav",
        className: "bg-gray-700 shadow m-2 rounded-lg",
        children: ({ open })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex h-16 justify-between",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "flex flex-shrink-0 items-center"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "hidden sm:ml-6 sm:flex sm:space-x-8",
                                            children: links.map((link, index)=>/*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                    href: link.href,
                                                    className: `inline-flex items-center border-b-2 
                      ${pathname == link.href ? "border-green-300" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-400"}  
                      px-1 pt-1 text-md font-medium text-gray-300`,
                                                    children: link.name
                                                }, index))
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "hidden sm:ml-6 sm:flex sm:items-center",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            className: "bg-green-300 font-semibold text-sm rounded-md px-3 py-2 text-gray-800 hover:bg-green-200 inline-flex items-center",
                                            href: "/attestation/create",
                                            children: "Create Library"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "relative ml-3",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(login_button/* default */.Z, {})
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "-mr-2 flex items-center sm:hidden",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(disclosure/* Disclosure */.p.Button, {
                                        className: "inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "sr-only",
                                                children: "Open main menu"
                                            }),
                                            open ? /*#__PURE__*/ jsx_runtime_.jsx(XMarkIcon/* default */.Z, {
                                                className: "block h-6 w-6",
                                                "aria-hidden": "true"
                                            }) : /*#__PURE__*/ jsx_runtime_.jsx(Bars3Icon/* default */.Z, {
                                                className: "block h-6 w-6",
                                                "aria-hidden": "true"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(disclosure/* Disclosure */.p.Panel, {
                        className: "sm:hidden",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "space-y-1 pb-3 pt-2",
                            children: [
                                links.map((link, index)=>/*#__PURE__*/ jsx_runtime_.jsx(disclosure/* Disclosure */.p.Button, {
                                        as: "a",
                                        href: link.href,
                                        className: `block border-l-4  bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium 
                ${pathname.includes(link.href) ? "border-green-300 text-green-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}  
                `,
                                        children: link.name
                                    }, index)),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "mt-6 w-full flex justify-center",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(login_button/* default */.Z, {})
                                })
                            ]
                        })
                    })
                ]
            })
    });
}

;// CONCATENATED MODULE: ./app/app.tsx
/* __next_internal_client_entry_do_not_use__ polygonMumbai,default auto */ 









// Configure chains & providers with the Public provider.
const polygonMumbai = {
    id: 80001,
    name: "Polygon Mumbai",
    network: "maticmum",
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
    },
    rpcUrls: {
        alchemy: {
            http: [
                "https://polygon-mumbai.g.alchemy.com/v2"
            ],
            webSocket: [
                "wss://polygon-mumbai.g.alchemy.com/v2"
            ]
        },
        infura: {
            http: [
                "https://polygon-mumbai.infura.io/v3"
            ],
            webSocket: [
                "wss://polygon-mumbai.infura.io/ws/v3"
            ]
        },
        default: {
            http: [
                "https://polygon-mumbai-bor.publicnode.com	"
            ]
        },
        public: {
            http: [
                "https://polygon-mumbai-bor.publicnode.com	"
            ]
        }
    },
    blockExplorers: {
        etherscan: {
            name: "PolygonScan",
            url: "https://mumbai.polygonscan.com"
        },
        default: {
            name: "PolygonScan",
            url: "https://mumbai.polygonscan.com"
        }
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 25770160
        }
    },
    testnet: true
};
const { chains, publicClient, webSocketPublicClient } = (0,chunk_LAFZBYO7/* configureChains */.QB)([
    chains_dist/* optimismGoerli */.l7,
    chains_dist/* baseGoerli */.J0
], [
    (0,providers_public/* publicProvider */.I)()
]);
const config = (0,dist/* createConfig */._g)({
    autoConnect: true,
    connectors: [
        new chunk_QRUHVNWK/* InjectedConnector */._({
            chains,
            options: {
                name: "Injected",
                shimDisconnect: true
            }
        }),
        Web3AuthConnectorInstance(chains)
    ],
    publicClient,
    webSocketPublicClient
});
let links = [
    {
        href: "/",
        name: "Home"
    },
    {
        href: "/attestation",
        name: "Libraries"
    }
];
function App({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("main", {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(dist/* WagmiConfig */.eM, {
            config: config,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Navbar, {
                    links: links
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(AddressWrapper, {
                    children: [
                        children,
                        /*#__PURE__*/ jsx_runtime_.jsx(react_toastify_esm/* ToastContainer */.Ix, {
                            position: "bottom-center"
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 94550:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ LoginButton)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./components/ui/button.tsx
var ui_button = __webpack_require__(44368);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/wagmi/dist/index.js + 25 modules
var dist = __webpack_require__(40965);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs
var react_toastify_esm = __webpack_require__(34751);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/utils/unit/formatEther.js
var formatEther = __webpack_require__(35090);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/clients/createPublicClient.js + 60 modules
var createPublicClient = __webpack_require__(5245);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/clients/transports/http.js
var http = __webpack_require__(94463);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/plus.mjs
var plus = __webpack_require__(8965);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/download.mjs
var download = __webpack_require__(96215);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/recycle.mjs
var recycle = __webpack_require__(81356);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/wallet-2.mjs
var wallet_2 = __webpack_require__(11684);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/copy.mjs
var copy = __webpack_require__(43335);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/settings.mjs
var settings = __webpack_require__(53835);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/log-out.mjs
var log_out = __webpack_require__(77854);
// EXTERNAL MODULE: ./components/core/account/modal-layout.tsx
var modal_layout = __webpack_require__(35149);
;// CONCATENATED MODULE: ./components/core/account/profile-balance.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

function ProfileBalance({ loading, balance, token, active }) {
    const { switchNetwork } = (0,dist/* useSwitchNetwork */.g0)();
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: `flex flex-row items-center gap-4 p-4 rounded-lg outline ${active && "outline-green-300"} ${!active && "hover:bg-green-300/50 cursor-pointer"}`,
        onClick: ()=>{
            if (!active) {
                switchNetwork?.(token.id);
            }
        },
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex flex-col",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    className: "text-sm tracking-wider text-green-300 font-bold uppercase",
                    children: token.name
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    className: `text-gray-300 font-bold `,
                    children: loading ? "loading" : balance
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./components/core/account/profile-details.tsx










function ProfileDetails({ showModal, open, setShowModal }) {
    const { disconnect } = (0,dist/* useDisconnect */.qL)();
    const [loading, setLoading] = (0,react_.useState)(true);
    //get all the chains configered from wagmi
    const { chain, chains } = (0,dist/* useNetwork */.LN)();
    const [balances, setBalances] = (0,react_.useState)([]);
    const { address: account, isConnected } = (0,dist/* useAccount */.mA)();
    (0,react_.useEffect)(()=>{
        async function getBalances() {
            console.log(chain);
            for(let i = 0; i < chains.length; i++){
                const client = (0,createPublicClient/* createPublicClient */.v)({
                    chain: chains[i],
                    transport: (0,http/* http */.d)(chains[i].rpcUrls.default.http[0])
                });
                let getBalance = await client.getBalance({
                    address: account
                });
                getBalance = (0,formatEther/* formatEther */.d)(getBalance);
                if (i == 0) {
                    setBalances([
                        {
                            chain: chains[i],
                            balance: getBalance,
                            active: chain?.id == chains[i].id
                        }
                    ]);
                } else {
                    setBalances((prev)=>[
                            ...prev,
                            {
                                chain: chains[i],
                                balance: getBalance,
                                active: chain?.id == chains[i].id
                            }
                        ]);
                }
            }
        }
        if (account && chains) {
            getBalances();
            setLoading(false);
        }
    }, [
        account,
        chains,
        chain
    ]);
    async function copyAddress() {
        navigator.clipboard.writeText(account);
        react_toastify_esm/* toast */.Am.success("Copied to clipboard");
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(modal_layout/* default */.Z, {
        title: "",
        showModal: showModal,
        children: isConnected ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex flex-col divide-solid",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    id: "username",
                    className: "text-lg",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                            children: "Portfolio"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "text-lg font-bold ml-4",
                            children: "$ 0.00"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "grid grid-cols-4 gap-2 my-4 text-gray-900",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "rounded-md bg-green-200 flex justify-center py-4 hover:shadow-sm hover:bg-green-400",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(plus/* default */.Z, {})
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(download/* default */.Z, {})
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(recycle/* default */.Z, {})
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(wallet_2/* default */.Z, {})
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    id: "balances",
                    className: "grid grid-cols-1 py-4 gap-4",
                    children: balances.map((balance, key)=>/*#__PURE__*/ jsx_runtime_.jsx(ProfileBalance, {
                            loading: loading,
                            token: balance.chain,
                            balance: balance.balance,
                            active: balance.active
                        }, key))
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "grid grid-cols-3 p-4 gap-2",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            className: "font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400",
                            onClick: ()=>copyAddress(),
                            children: /*#__PURE__*/ jsx_runtime_.jsx(copy/* default */.Z, {})
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/profile/settings",
                            className: " font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(settings/* default */.Z, {})
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            className: "text-red-500 flex justify-center  py-4 font-bold hover:bg-red-200   px-3 rounded-md",
                            onClick: ()=>{
                                disconnect();
                                setShowModal(false);
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx(log_out/* default */.Z, {})
                        })
                    ]
                })
            ]
        }) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
            children: "Not connected"
        })
    });
}

;// CONCATENATED MODULE: ./components/core/account/login-button.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




function LoginButton() {
    const { connect, connectors } = (0,dist/* useConnect */.$4)();
    const { address, status, isConnected, isConnecting, isReconnecting, isDisconnected } = (0,dist/* useAccount */.mA)();
    const { chain, chains } = (0,dist/* useNetwork */.LN)();
    const [showModal, setShowModal] = (0,react_.useState)(false);
    const { data: balance } = (0,dist/* useBalance */.KQ)({
        address: address
    });
    // Eager connection
    (0,react_.useEffect)(()=>{
        if (!isDisconnected) return;
        const wagmiConnected = localStorage.getItem("wagmi.connected");
        const isWagmiConnected = wagmiConnected ? JSON.parse(wagmiConnected) : false;
        if (!isWagmiConnected) return;
        connect({
            connector: connectors
        });
    }, [
        connect,
        connectors,
        isDisconnected
    ]);
    function truncateTextMiddle(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        const halfLength = Math.floor((maxLength - 3) / 2); // Subtracting 3 to accommodate for the ellipsis
        const start = text.slice(0, halfLength);
        const end = text.slice(-halfLength);
        const truncatedText = start + "..." + end;
        return truncatedText;
    }
    if (isConnecting) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "text-md text-white bg-gray-800 rounded-full py-1 px-8",
            children: "Loading"
        });
    }
    if (!isConnecting && address) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex rounded-md  items-center gap-2",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                    className: " bg-gray-800 py-1 px-4 outline rounded-md outline-gray-900 text-md overflow truncate tracking-wider hover:outline-indigo-500",
                    onClick: ()=>setShowModal(!showModal),
                    children: [
                        truncateTextMiddle(address, 13),
                        showModal && /*#__PURE__*/ jsx_runtime_.jsx(ProfileDetails, {
                            address: address,
                            showModal: showModal,
                            setShowModal: setShowModal
                        })
                    ]
                }),
                chain?.id != 420 && chain?.id != 84531 && chain?.id != 5 && /*#__PURE__*/ jsx_runtime_.jsx(ui_button/* Button */.z, {
                    className: "bg-red-600",
                    onClick: ()=>setShowModal(!showModal),
                    children: "Unsupported Chain"
                })
            ]
        });
    }
    if (!isReconnecting && !isConnected && !isConnecting && !address) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "flex gap-4 items-center",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex gap-4",
                children: !isReconnecting && !isConnected && connectors.map((connector)=>/*#__PURE__*/ jsx_runtime_.jsx("button", {
                        className: "bg-gray-800 text-md text-gray-3for00 rounded-md text-md py-1 px-4",
                        onClick: ()=>connect({
                                connector
                            }),
                        children: connector.name
                    }, connector.id))
            })
        });
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "text-md text-white bg-cf-500 rounded-full py-1 px-8",
        children: "Loading"
    });
}


/***/ }),

/***/ 35149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ModalLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82596);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(87737);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(57048);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40965);
/* __next_internal_client_entry_do_not_use__ default auto */ 




function ModalLayout({ title, children, showModal }) {
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const HYPERSPACE_ID = 3141;
    const POLYGON = 80001;
    const { chain } = (0,wagmi__WEBPACK_IMPORTED_MODULE_2__/* .useNetwork */ .LN)();
    const { switchNetwork } = (0,wagmi__WEBPACK_IMPORTED_MODULE_2__/* .useSwitchNetwork */ .g0)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (showModal) setOpen(showModal);
    }, [
        showModal
    ]);
    const changeOverlay = (e)=>{
        setOpen(e);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__/* .Transition */ .u.Root, {
        show: open,
        as: react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_4__/* .Dialog */ .V, {
            as: "div",
            className: "relative z-10",
            onClose: changeOverlay,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__/* .Transition */ .u.Child, {
                    as: react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                    enter: "ease-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "ease-in duration-200",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "fixed inset-0 z-10 overflow-y-auto",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__/* .Transition */ .u.Child, {
                            as: react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                            enter: "ease-out duration-300",
                            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                            enterTo: "opacity-100 translate-y-0 sm:scale-100",
                            leave: "ease-in duration-200",
                            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
                            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_4__/* .Dialog */ .V.Panel, {
                                className: "relative transform overflow-hidden rounded-lg bg-gray-600 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                        className: "text-xl font-bold mb-4",
                                        children: title
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "absolute right-0 top-0 hidden pr-4 pt-4 sm:block ",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            className: "rounded-md bg-gray-600 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                                            onClick: ()=>changeOverlay(false),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "sr-only",
                                                    children: "Close"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                                    className: "h-6 w-6",
                                                    "aria-hidden": "true"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "",
                                        children: children
                                    })
                                ]
                            })
                        })
                    })
                })
            ]
        })
    });
}


/***/ }),

/***/ 44368:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ Button)
/* harmony export */ });
/* unused harmony export buttonVariants */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(71085);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91971);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12857);





const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__/* .cva */ .j)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .Slot */ .g7 : "button";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Comp, {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    });
});
Button.displayName = "Button";



/***/ }),

/***/ 12857:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn),
/* harmony export */   s: () => (/* binding */ secondsToDaysAndHours)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10566);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59610);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .m)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .W)(inputs));
}
function secondsToDaysAndHours(seconds) {
    // Constants
    const SECONDS_IN_AN_HOUR = 3600;
    const SECONDS_IN_A_DAY = 24 * SECONDS_IN_AN_HOUR;
    const SECONDS_IN_A_MINUTE = 60;
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(seconds / SECONDS_IN_A_DAY);
    const remainingSecondsAfterDays = seconds % SECONDS_IN_A_DAY;
    const hours = Math.floor(remainingSecondsAfterDays / SECONDS_IN_AN_HOUR);
    const remainingSecondsAfterHours = remainingSecondsAfterDays % SECONDS_IN_AN_HOUR;
    const minutes = Math.floor(remainingSecondsAfterHours / SECONDS_IN_A_MINUTE);
    const remainingSecondsFinal = remainingSecondsAfterHours % SECONDS_IN_A_MINUTE;
    // Construct the formatted result
    const formattedResult = [];
    if (days > 0) {
        formattedResult.push(`${days} days`);
    }
    if (hours > 0) {
        formattedResult.push(`${hours} hours`);
    }
    if (minutes > 0) {
        formattedResult.push(`${minutes} minutes`);
    }
    if (remainingSecondsFinal > 0) {
        formattedResult.push(`${remainingSecondsFinal} seconds`);
    }
    // Join the components and return the result
    return formattedResult.join(", ");
}


/***/ }),

/***/ 34291:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"app/layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(59160);
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(61363);
;// CONCATENATED MODULE: ./app/app.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/koenschuite/github/super-attestations/client/app/app.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["polygonMumbai"];


/* harmony default export */ const app = (__default__);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(67272);
;// CONCATENATED MODULE: ./app/layout.tsx




const metadata = {
    title: "SuperAttestations",
    description: "Share your data with the world"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            className: `${(layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).className} bg-[#2d2c2f] text-gray-100`,
            children: /*#__PURE__*/ jsx_runtime_.jsx(app, {
                children: children
            })
        })
    });
}


/***/ }),

/***/ 57481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80085);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 67272:
/***/ (() => {



/***/ })

};
;