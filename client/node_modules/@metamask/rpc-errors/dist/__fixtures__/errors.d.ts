export declare const dummyData: {
    foo: string;
};
export declare const dummyMessage = "baz";
export declare const invalidError0 = 0;
export declare const invalidError1: (string | number)[];
export declare const invalidError2: {
    code: string;
};
export declare const invalidError3: {
    code: number;
};
export declare const invalidError4: {
    code: number;
    message: number;
    data: {
        foo: string;
    };
};
export declare const invalidError5: null;
export declare const invalidError6: undefined;
export declare const invalidError7: {
    code: string;
    message: string;
    data: {
        foo: string;
    };
};
export declare const validError0: {
    code: number;
    message: string;
};
export declare const validError1: {
    code: number;
    message: string;
    data: {
        foo: string;
    };
};
export declare const validError2: import("..").JsonRpcError<import("..").DataWithOptionalCause>;
export declare const validError3: import("..").JsonRpcError<import("..").DataWithOptionalCause>;
export declare const validError4: import("..").JsonRpcError<{
    foo: string;
}>;
export declare const SERVER_ERROR_CODE = -32098;
export declare const CUSTOM_ERROR_CODE = 1001;
export declare const CUSTOM_ERROR_MESSAGE = "foo";
