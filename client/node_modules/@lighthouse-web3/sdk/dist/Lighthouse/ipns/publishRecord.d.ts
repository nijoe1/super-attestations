export type publishRecordResponse = {
    data: {
        Name: string;
        Value: string;
    };
};
declare const _default: (cid: string, key: string, apiKey: string) => Promise<publishRecordResponse>;
export default _default;
