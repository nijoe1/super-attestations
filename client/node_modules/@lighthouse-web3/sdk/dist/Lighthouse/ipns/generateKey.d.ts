export type generateKeyResponse = {
    data: {
        ipnsName: string;
        ipnsId: string;
    };
};
declare const _default: (apiKey: string) => Promise<generateKeyResponse>;
export default _default;
