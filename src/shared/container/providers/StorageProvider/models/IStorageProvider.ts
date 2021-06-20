export default interface IStorageProvider {
	saveFile(file: string, filePath?: string): Promise<string>;
	deleteFile(file: string, filePath?: string): Promise<void>;
}
