"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOM_ERROR_MESSAGE = exports.CUSTOM_ERROR_CODE = exports.SERVER_ERROR_CODE = exports.validError4 = exports.validError3 = exports.validError2 = exports.validError1 = exports.validError0 = exports.invalidError7 = exports.invalidError6 = exports.invalidError5 = exports.invalidError4 = exports.invalidError3 = exports.invalidError2 = exports.invalidError1 = exports.invalidError0 = exports.dummyMessage = exports.dummyData = void 0;
const __1 = require("..");
exports.dummyData = { foo: 'bar' };
exports.dummyMessage = 'baz';
exports.invalidError0 = 0;
exports.invalidError1 = ['foo', 'bar', 3];
exports.invalidError2 = { code: 'foo' };
exports.invalidError3 = { code: 4001 };
exports.invalidError4 = {
    code: 4001,
    message: 3,
    data: Object.assign({}, exports.dummyData),
};
exports.invalidError5 = null;
exports.invalidError6 = undefined;
exports.invalidError7 = {
    code: 'foo',
    message: exports.dummyMessage,
    data: Object.assign({}, exports.dummyData),
};
exports.validError0 = { code: 4001, message: exports.dummyMessage };
exports.validError1 = {
    code: 4001,
    message: exports.dummyMessage,
    data: Object.assign({}, exports.dummyData),
};
exports.validError2 = __1.rpcErrors.parse();
delete exports.validError2.stack;
exports.validError3 = __1.rpcErrors.parse(exports.dummyMessage);
delete exports.validError3.stack;
exports.validError4 = __1.rpcErrors.parse({
    message: exports.dummyMessage,
    data: Object.assign({}, exports.dummyData),
});
delete exports.validError4.stack;
exports.SERVER_ERROR_CODE = -32098;
exports.CUSTOM_ERROR_CODE = 1001;
exports.CUSTOM_ERROR_MESSAGE = 'foo';
//# sourceMappingURL=errors.js.map