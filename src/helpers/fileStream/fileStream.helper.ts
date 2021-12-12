import fs from "fs";
import IFileStream from "./IFileStream.interface";

class FileStreamHelper implements IFileStream {
    fs;
    constructor() {
        this.fs = fs;
    }

    /**
     * @param {filePath} string path of the file to be read. For example: "C:/blabla/blabla.json"
     * @param {options} options encoding vs. fs options
     * @returns {Promise<string>} Returns the contents of the file in string format.
     * @description It is asynchronous. using with await or then
     * */
    public readFile(filePath: string, options?: { encoding: BufferEncoding }): Promise<string> {
        return new Promise((resolve, reject) => {
            this.fs.readFile(filePath, options?.encoding || 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * @param {filePath} string path of the file to be written. E.g: "C:/blabla/blabla.json"
     * @param {content} string the file content to be written. Convert to string with JSON.stringify
     * @description It is asynchronous. using with await or then
     * */
    public writeFile(filePath: string, content: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(filePath, content, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * @param {filePath} string The path of the file to be attached. E.g: "C:/blabla/blabla.json"
     * @param {content} string The file content to be appended. Convert to string with JSON.stringify
     * @description It is asynchronous. using with await or then
     * */
    public appendFile(path: string, content: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (!content) return;
            const oldData = await this.readFile(path);
            let parsedData = [];
            if (oldData) {
                parsedData = JSON.parse(oldData);
            }
            const parsedContent = JSON.parse(content);
            parsedData.push(parsedContent);
            await this.writeFile(path, JSON.stringify(parsedData));
        });
    }

    /**
     * @param {filePath} string The path of the file to be checked for existence. E.g: "C:/blabla/blabla.json"
     * @returns {boolean} Is there this file?
     * @description Returns true if the file exists, false if it doesn't.
     * */
    public fileIsExist(path: string): boolean {
        return this.fs.existsSync(path);
    }

    /**
     * @param {source} string path of the file to be copied. E.g: "C:/blabla/blabla.json"
     * @param {destination} string the new path of the file to be copied. E.g: "C:/build/blabla/blabla.json"
     * @description Copies the file. It is asynchronous. using with await or then
     * */
    public copyFile(source: string, destination: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.fs.copyFile(source, destination, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

const fileStream = new FileStreamHelper();
export { fileStream as default };
