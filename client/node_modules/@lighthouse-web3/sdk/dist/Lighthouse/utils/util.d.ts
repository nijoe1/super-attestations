declare const isCID: (cid: string) => boolean;
declare const isPrivateKey: (key: string) => boolean;
declare const addressValidator: (value: string) => string;
declare function checkDuplicateFileNames(files: any[]): void;
export { isCID, isPrivateKey, addressValidator, checkDuplicateFileNames };
