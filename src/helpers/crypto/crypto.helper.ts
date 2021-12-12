import crypto from "crypto";
import ICrypto from "./ICrypto.interface";

export type CryptoConfig = {
    encryptionMethod: string;
    secretKey: string;
    iv: string;
}

export class CryptoHelper implements ICrypto {
    iv!: string;
    secretKey!: string;
    encryptionMethod!: string;

    constructor(config: CryptoConfig) {
        this.encryptionMethod = config.encryptionMethod;
        this.secretKey = config.secretKey;
        this.iv = config.iv;
    }

    /**
     * @params {text} string - text to be encrypted
     * @description encrypts the text
     * */
    public encrypt(text: string) : string {
        const cipher = crypto.createCipheriv(this.encryptionMethod, this.secretKey, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }

    /**
     * @params {text} string - text to be decrypted
     * @description decrypts the text
     * */
    public decrypt(text: string) : string {
        const decipher = crypto.createDecipheriv(this.encryptionMethod, this.secretKey, this.iv);
        let decrypted = decipher.update(text, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    };

    /**
     * @params {text} string - text to be decrypted and parsed
     * @description decrypts the text. If the text is not a valid JSON, returns an empty object
     * */
    public decryptAndParse = <T>(text: string) : T => {
        return JSON.parse(this.decrypt(text));
    }

    /**
     * @params {text} string - text to be encrypted
     * @description encrypts the text. If the text is not a valid JSON, returns an empty object
     * */
    public toStringAndEncrypt<T>(text: T) : string {
        return this.encrypt(JSON.stringify(text));
    }
}
