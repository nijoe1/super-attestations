"use strict";
exports.id = 650;
exports.ids = [650];
exports.modules = {

/***/ 29650:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  offchainLookup: () => (/* binding */ offchainLookup),
  offchainLookupSignature: () => (/* binding */ offchainLookupSignature)
});

// UNUSED EXPORTS: ccipFetch, offchainLookupAbiItem

// EXTERNAL MODULE: ./node_modules/viem/dist/esm/actions/public/call.js + 2 modules
var call = __webpack_require__(90109);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/utils/stringify.js
var stringify = __webpack_require__(48857);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/errors/base.js
var base = __webpack_require__(7993);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/errors/utils.js + 1 modules
var utils = __webpack_require__(6574);
;// CONCATENATED MODULE: ./node_modules/viem/dist/esm/errors/ccip.js



class OffchainLookupError extends base/* BaseError */.G {
    constructor({ callbackSelector, cause, data, extraData, sender, urls, }) {
        super(cause.shortMessage ||
            'An error occurred while fetching for an offchain result.', {
            cause,
            metaMessages: [
                ...(cause.metaMessages || []),
                cause.metaMessages?.length ? '' : [],
                'Offchain Gateway Call:',
                urls && [
                    '  Gateway URL(s):',
                    ...urls.map((url) => `    ${(0,utils/* getUrl */.Gr)(url)}`),
                ],
                `  Sender: ${sender}`,
                `  Data: ${data}`,
                `  Callback selector: ${callbackSelector}`,
                `  Extra data: ${extraData}`,
            ].flat(),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'OffchainLookupError'
        });
    }
}
class OffchainLookupResponseMalformedError extends base/* BaseError */.G {
    constructor({ result, url }) {
        super('Offchain gateway response is malformed. Response data must be a hex value.', {
            metaMessages: [
                `Gateway URL: ${(0,utils/* getUrl */.Gr)(url)}`,
                `Response: ${(0,stringify/* stringify */.P)(result)}`,
            ],
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'OffchainLookupResponseMalformedError'
        });
    }
}
class OffchainLookupSenderMismatchError extends base/* BaseError */.G {
    constructor({ sender, to }) {
        super('Reverted sender address does not match target contract address (`to`).', {
            metaMessages: [
                `Contract address: ${to}`,
                `OffchainLookup sender address: ${sender}`,
            ],
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'OffchainLookupSenderMismatchError'
        });
    }
}
//# sourceMappingURL=ccip.js.map
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/errors/request.js
var request = __webpack_require__(92275);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/utils/abi/decodeErrorResult.js
var decodeErrorResult = __webpack_require__(741);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/utils/abi/encodeAbiParameters.js
var encodeAbiParameters = __webpack_require__(8701);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/errors/address.js
var address = __webpack_require__(65660);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/utils/address/isAddress.js
var isAddress = __webpack_require__(21719);
;// CONCATENATED MODULE: ./node_modules/viem/dist/esm/utils/address/isAddressEqual.js


function isAddressEqual(a, b) {
    if (!(0,isAddress/* isAddress */.U)(a))
        throw new address/* InvalidAddressError */.b({ address: a });
    if (!(0,isAddress/* isAddress */.U)(b))
        throw new address/* InvalidAddressError */.b({ address: b });
    return a.toLowerCase() === b.toLowerCase();
}
//# sourceMappingURL=isAddressEqual.js.map
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/utils/data/concat.js
var concat = __webpack_require__(77774);
// EXTERNAL MODULE: ./node_modules/viem/dist/esm/utils/data/isHex.js
var isHex = __webpack_require__(72001);
;// CONCATENATED MODULE: ./node_modules/viem/dist/esm/utils/ccip.js










const offchainLookupSignature = '0x556f1830';
const offchainLookupAbiItem = {
    name: 'OffchainLookup',
    type: 'error',
    inputs: [
        {
            name: 'sender',
            type: 'address',
        },
        {
            name: 'urls',
            type: 'string[]',
        },
        {
            name: 'callData',
            type: 'bytes',
        },
        {
            name: 'callbackFunction',
            type: 'bytes4',
        },
        {
            name: 'extraData',
            type: 'bytes',
        },
    ],
};
async function offchainLookup(client, { blockNumber, blockTag, data, to, }) {
    const { args } = (0,decodeErrorResult/* decodeErrorResult */.p)({
        data,
        abi: [offchainLookupAbiItem],
    });
    const [sender, urls, callData, callbackSelector, extraData] = args;
    try {
        if (!isAddressEqual(to, sender))
            throw new OffchainLookupSenderMismatchError({ sender, to });
        const result = await ccipFetch({ data: callData, sender, urls });
        const { data: data_ } = await (0,call/* call */.R)(client, {
            blockNumber,
            blockTag,
            data: (0,concat/* concat */.zo)([
                callbackSelector,
                (0,encodeAbiParameters/* encodeAbiParameters */.E)([{ type: 'bytes' }, { type: 'bytes' }], [result, extraData]),
            ]),
            to,
        });
        return data_;
    }
    catch (err) {
        throw new OffchainLookupError({
            callbackSelector,
            cause: err,
            data,
            extraData,
            sender,
            urls,
        });
    }
}
async function ccipFetch({ data, sender, urls, }) {
    let error = new Error('An unknown error occurred.');
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const method = url.includes('{sender}') || url.includes('{data}') ? 'GET' : 'POST';
        const body = method === 'POST' ? { data, sender } : undefined;
        try {
            const response = await fetch(url.replace('{sender}', sender).replace('{data}', data), {
                body: JSON.stringify(body),
                method,
            });
            let result;
            if (response.headers.get('Content-Type')?.startsWith('application/json')) {
                result = (await response.json()).data;
            }
            else {
                result = (await response.text());
            }
            if (!response.ok) {
                error = new request/* HttpRequestError */.Gg({
                    body,
                    details: (0,stringify/* stringify */.P)(result.error) || response.statusText,
                    headers: response.headers,
                    status: response.status,
                    url,
                });
                continue;
            }
            if (!(0,isHex/* isHex */.v)(result)) {
                error = new OffchainLookupResponseMalformedError({
                    result,
                    url,
                });
                continue;
            }
            return result;
        }
        catch (err) {
            error = new request/* HttpRequestError */.Gg({
                body,
                details: err.message,
                url,
            });
        }
    }
    throw error;
}
//# sourceMappingURL=ccip.js.map

/***/ })

};
;