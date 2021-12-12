export default interface IFileStream {
    fs: any;

    /**
 * @param {filePath} string path of the file to be read. For example: "C:/blabla/blabla.json"
 * @param {options} options encoding vs. fs options
 * @returns {Promise<string>} Returns the contents of the file in string format.
 * @description It is asynchronous. using await or then
 * */
    readFile(path: string, options?: { encoding: BufferEncoding }): Promise<string>;

    /**
 * @param {filePath} string path of the file to be written. E.g: "C:/blabla/blabla.json"
 * @param {content} string the file content to be written. Convert to string with JSON.stringify
 * @description It is asynchronous. using with await or then
 * */
    writeFile(path: string, content: string): Promise<void>;

    /**
 * @param {filePath} string The path of the file to be attached. E.g: "C:/blabla/blabla.json"
 * @param {content} string The file content to be appended. Convert to string with JSON.stringify
 * @description It is asynchronous. using with await or then
 * */
    appendFile(path: string, content: string): Promise<void>;

    /**
 * @param {filePath} string The path of the file to be checked for existence. E.g: "C:/blabla/blabla.json"
 * @returns {boolean} Is there this file?
 * @description Returns true if the file exists, false if it doesn't.
 * */
    fileIsExist(path: string): boolean;

    /**
 * @param {source} string path of the file to be copied. E.g: "C:/blabla/blabla.json"
 * @param {destination} string the new path of the file to be copied. E.g: "C:/build/blabla/blabla.json"
 * @description Copies the file. It is asynchronous. using with await or then
 * */
    copyFile(source: string, destination: string): Promise<void>;
}
