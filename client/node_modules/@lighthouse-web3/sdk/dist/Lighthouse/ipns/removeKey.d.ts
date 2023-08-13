type ipnsObject = {
    Name: string;
    Id: string;
};
export type removeRecordResponse = {
    data: {
        Keys: ipnsObject[];
    };
};
declare const _default: (key: string, apiKey: string) => Promise<removeRecordResponse>;
export default _default;
