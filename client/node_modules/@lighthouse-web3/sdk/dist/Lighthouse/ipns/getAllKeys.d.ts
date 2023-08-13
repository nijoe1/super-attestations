type ipnsObject = {
    ipnsName: string;
    ipnsId: string;
    publicKey: string;
    cid: string;
    lastUpdate: number;
};
export type keyDataResponse = {
    data: ipnsObject[];
};
declare const _default: (apiKey: string) => Promise<keyDataResponse>;
export default _default;
