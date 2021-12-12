export default interface ICrypto {
    encryptionMethod: string;
    secretKey: string;
    iv: string;

    encrypt(text: string) : string;
    decrypt(text: string) : string;
    decryptAndParse<T>(text: string) : T;
    toStringAndEncrypt<T>(text: T) : string;
}
