"use strict";
exports.id = 231;
exports.ids = [231];
exports.modules = {

/***/ 2989:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _address_ProfitContributions)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./components/ui/button.tsx
var ui_button = __webpack_require__(44368);
// EXTERNAL MODULE: ./constants/contracts/index.ts + 5 modules
var contracts = __webpack_require__(47463);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/utils/abi/decodeAbiParameters.js
var decodeAbiParameters = __webpack_require__(41707);
;// CONCATENATED MODULE: ./lib/wld.ts

const decode = (type, encodedString)=>{
    return (0,decodeAbiParameters/* decodeAbiParameters */.r)([
        {
            type
        }
    ], encodedString)[0];
};

// EXTERNAL MODULE: ./node_modules/@worldcoin/idkit/build/index.cjs
var build = __webpack_require__(42411);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/wagmi/dist/index.js + 25 modules
var dist = __webpack_require__(40965);
;// CONCATENATED MODULE: ./components/core/worldcoin/worldcoin.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 






function Worldcoin() {
    const { chain, chains } = (0,dist/* useNetwork */.LN)();
    const { address } = (0,dist/* useAccount */.mA)();
    const [claimed, setClaimed] = (0,react_.useState)(false);
    const [fees, setFees] = (0,react_.useState)(BigInt(0));
    const [proof, setProof] = (0,react_.useState)(null);
    const { data: isClaimed, isLoading } = (0,dist/* useContractRead */["do"])({
        address: contracts/* CONTRACTS */.q.worldcoin[420].contract,
        abi: contracts/* CONTRACTS */.q.worldcoin[420].abi,
        functionName: "balanceOf",
        args: [
            address
        ]
    });
    const { data: isClaimedBase, isLoading: isLoadingBase } = (0,dist/* useContractRead */["do"])({
        address: contracts/* CONTRACTS */.q.worldcoin[84531].contract,
        abi: contracts/* CONTRACTS */.q.worldcoin[84531].abi,
        functionName: "balanceOf",
        args: [
            address
        ]
    });
    const { data: readFeesBase, isLoading: readFeesBaseLoading } = (0,dist/* useContractRead */["do"])({
        address: contracts/* CONTRACTS */.q.worldcoin[420].contract,
        abi: contracts/* CONTRACTS */.q.worldcoin[420].abi,
        functionName: "estimateFees",
        args: [
            address
        ]
    });
    (0,react_.useEffect)(()=>{
        if (chain?.id == 420) {
            if (isClaimed == 0) {
                setClaimed(false);
            } else {
                setClaimed(true);
            }
            // @ts-ignore
            setFees(readFeesBase);
            console.log(readFeesBase);
        } else if (chain?.id == 84531) {
            if (isClaimedBase == 0) {
                setClaimed(false);
            } else {
                setClaimed(true);
            }
        } else {
            setClaimed(false);
        }
    }, [
        isClaimed,
        isClaimedBase,
        readFeesBase
    ]);
    const { config } = (0,dist/* usePrepareContractWrite */.PJ)({
        address: contracts/* CONTRACTS */.q.worldcoin[420].contract,
        abi: contracts/* CONTRACTS */.q.worldcoin[420].abi,
        enabled: proof != null && address != null,
        functionName: "MintHumanBadge",
        value: fees,
        args: [
            address,
            proof?.merkle_root ? decode("uint256", proof?.merkle_root ?? "") : BigInt(0),
            proof?.nullifier_hash ? decode("uint256", proof?.nullifier_hash ?? "") : BigInt(0),
            proof?.proof ? decode("uint256[8]", proof?.proof ?? "") : [
                BigInt(0),
                BigInt(0),
                BigInt(0),
                BigInt(0),
                BigInt(0),
                BigInt(0),
                BigInt(0),
                BigInt(0)
            ]
        ]
    });
    const { write } = (0,dist/* useContractWrite */.GG)(config);
    if (isLoading) return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: "Loading..."
    });
    return /*#__PURE__*/ jsx_runtime_.jsx("main", {
        children: address ? chain?.id == 84531 && !claimed ? /*#__PURE__*/ jsx_runtime_.jsx(ui_button/* Button */.z, {
            onClick: write,
            className: "hover:bg-purple-700",
            children: "Change to OptimismGoerli"
        }) : !claimed ? proof ? /*#__PURE__*/ jsx_runtime_.jsx(ui_button/* Button */.z, {
            onClick: write,
            className: "hover:bg-purple-700",
            children: "Claim Token"
        }) : /*#__PURE__*/ jsx_runtime_.jsx(build.IDKitWidget, {
            app_id: "app_staging_a47d8b8169a3e3e80953e86f1093d30d" // must be an app set to on-chain
            ,
            action: "human-verification",
            signal: address,
            onSuccess: setProof,
            enableTelemetry: true,
            children: ({ open })=>/*#__PURE__*/ jsx_runtime_.jsx(ui_button/* Button */.z, {
                    onClick: open,
                    children: "Verify"
                })
        }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "bg-green-500 p-4 rounded-md text-black text-sm",
            children: "Worldcoin verified!"
        }) : null
    });
}

// EXTERNAL MODULE: ./components/ui/card.tsx
var card = __webpack_require__(70737);
;// CONCATENATED MODULE: ./app/profile/[address]/ProfitContributions.tsx



const ProfitContributions = ({ profit, totalContributions, approvedContributions, profitGrowth, user })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4 m-8",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* Card */.Zb, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* CardHeader */.Ol, {
                        className: "flex flex-row items-center justify-between space-y-0 pb-2",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(card/* CardTitle */.ll, {
                                className: "text-sm font-medium",
                                children: "Worldcoin Human"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                className: "h-4 w-4 text-muted-foreground",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M22 12h-4l-3 9L9 3l-3 9H2"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* CardContent */.aY, {
                        children: [
                            user ? /*#__PURE__*/ jsx_runtime_.jsx(Worldcoin, {}) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "text-2xl text-red-400 font-bold",
                                children: "Check address"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-xs text-muted-foreground",
                                children:  false ? 0 : "Please advise this user to verify"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* Card */.Zb, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* CardHeader */.Ol, {
                        className: "flex flex-row items-center justify-between space-y-0 pb-2",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(card/* CardTitle */.ll, {
                                className: "text-sm font-medium",
                                children: "Total Revenue"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                className: "h-4 w-4 text-muted-foreground",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* CardContent */.aY, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "text-2xl font-bold",
                                children: "$45.89"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-xs text-muted-foreground",
                                children: "+20.1% from last month"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* Card */.Zb, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* CardHeader */.Ol, {
                        className: "flex flex-row items-center justify-between space-y-0 pb-2",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(card/* CardTitle */.ll, {
                                className: "text-sm font-medium",
                                children: "Subscriptions"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                className: "h-4 w-4 text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("circle", {
                                        cx: "9",
                                        cy: "7",
                                        r: "4"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        d: "M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* CardContent */.aY, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "text-2xl font-bold",
                                children: "+2350"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-xs text-muted-foreground",
                                children: "+180.1% from last month"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* Card */.Zb, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* CardHeader */.Ol, {
                        className: "flex flex-row items-center justify-between space-y-0 pb-2",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(card/* CardTitle */.ll, {
                                className: "text-sm font-medium",
                                children: "Contributions"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                className: "h-4 w-4 text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("rect", {
                                        width: "20",
                                        height: "14",
                                        x: "2",
                                        y: "5",
                                        rx: "2"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        d: "M2 10h20"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(card/* CardContent */.aY, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "text-2xl font-bold",
                                children: "+120"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-xs text-muted-foreground",
                                children: "+19% from last month"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const _address_ProfitContributions = (ProfitContributions);


/***/ }),

/***/ 73969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ TransactionList)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-avatar/dist/index.mjs
var dist = __webpack_require__(2129);
// EXTERNAL MODULE: ./lib/utils.ts
var utils = __webpack_require__(12857);
;// CONCATENATED MODULE: ./components/ui/avatar.tsx
/* __next_internal_client_entry_do_not_use__ Avatar,AvatarImage,AvatarFallback auto */ 



const Avatar = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Root */.fC, {
        ref: ref,
        className: (0,utils.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
        ...props
    }));
Avatar.displayName = dist/* Root */.fC.displayName;
const AvatarImage = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Image */.Ee, {
        ref: ref,
        className: (0,utils.cn)("aspect-square h-full w-full", className),
        ...props
    }));
AvatarImage.displayName = dist/* Image */.Ee.displayName;
const AvatarFallback = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Fallback */.NY, {
        ref: ref,
        className: (0,utils.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
        ...props
    }));
AvatarFallback.displayName = dist/* Fallback */.NY.displayName;


// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/x.mjs
var x = __webpack_require__(95833);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/check.mjs
var check = __webpack_require__(27195);
;// CONCATENATED MODULE: ./app/profile/[address]/TransactionList.tsx



const BASE_IMG = "https://ipfs.io/ipfs/bafkreiakkhglt2w4zcq42jostqesnyaruaqgpt2rv5mk3twq2zsoockbb4";
const OPTIMISM = "https://ipfs.io/ipfs/bafkreicl7z5dtm4l27p3nzwfzkkowyg2h4uukmd2hjchjnr4xwkvvrgy6i";
const TransactionsList = ({ transactions })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "space-y-8 my-5",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                className: "text-gray-300 text-xl font-semibold",
                children: "Latest Transactions"
            }),
            transactions.map((transaction, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex items-center",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Avatar, {
                            className: "h-9 w-9",
                            children: [
                                transaction.chainId == "420" ? /*#__PURE__*/ jsx_runtime_.jsx(AvatarImage, {
                                    src: "https://ipfs.io/ipfs/bafkreicl7z5dtm4l27p3nzwfzkkowyg2h4uukmd2hjchjnr4xwkvvrgy6i",
                                    alt: "Avatar"
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(AvatarImage, {
                                    src: "https://ipfs.io/ipfs/bafkreiakkhglt2w4zcq42jostqesnyaruaqgpt2rv5mk3twq2zsoockbb4",
                                    alt: "Avatar"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(AvatarFallback, {
                                    children: "OM"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "ml-4 space-y-1 max-w-[300px]",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-sm font-medium leading-none overflow-auto truncate",
                                    children: transaction.schemaId
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-sm text-muted-foreground overflow-auto truncate",
                                    children: transaction.txid
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "ml-auto font-medium",
                            children: transaction?.revoked ? /*#__PURE__*/ jsx_runtime_.jsx(x/* default */.Z, {
                                className: "text-red-600"
                            }) : /*#__PURE__*/ jsx_runtime_.jsx(check/* default */.Z, {
                                className: "text-green-400"
                            })
                        })
                    ]
                }, index))
        ]
    });
};
/* harmony default export */ const TransactionList = (TransactionsList);


/***/ }),

/***/ 66975:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52451);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ default auto */ 

const UserDetails = ({ username, address, totalTokens })=>{
    const prefixes = [
        "Shadow",
        "Mystic",
        "Epic",
        "Dragon",
        "Knight",
        "Cyber",
        "Phantom"
    ];
    const suffixes = [
        "Slayer",
        "Hunter",
        "Gamer",
        "Warrior",
        "Mage",
        "Rogue",
        "Titan"
    ];
    function getRandomGamerName() {
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        return `${randomPrefix}${randomSuffix}`;
    }
    // Use the function
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-8 items-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "items-center mx-auto flex flex-col justify-center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "rounded-md relative h-[150px] w-[150px]",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                            src: "https://ipfs.io/ipfs/bafybeiafbapjoweekp2bkk7opijf7ysveq6zy4hkptomarcynofx3poieu",
                            alt: "Profile",
                            layout: "fill",
                            objectFit: "cover"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "col-span-2 m-4 w-full text-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                className: "text-xl font-bold",
                                children: getRandomGamerName()
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                className: "text-xs text-gray-300 tracking-tighter",
                                children: address
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {})
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full grid grid-cols-3 gap-1 text-center py-2 divide-x divide-gray-400",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StatItem, {
                        title: "Vaults",
                        value: "N/A"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StatItem, {
                        title: "Submitted",
                        value: totalTokens.toString()
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StatItem, {
                        title: "Acceptance",
                        value: "N/A"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserDetails);
// i want to create a user Profile
const StatItem = ({ title, value })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-1",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "text-white text-2xl",
                children: value
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "text-gray-400 text-xs font-semibold tracking-wide uppercase",
                children: title
            })
        ]
    });
};


/***/ })

};
;