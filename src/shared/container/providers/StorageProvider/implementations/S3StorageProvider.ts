import { uploadConfig } from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
	private client: S3;

	constructor() {
		this.client = new aws.S3({
			region: 'us-east-1',
		});
	}

	public async saveFile(file: string, filePath?: string): Promise<string> {
		const originalPath = path.resolve(uploadConfig.tmpFolder, file);

		const ContentType = mime.getType(originalPath);

		if (!ContentType) {
			throw new Error('File not found.');
		}

		const fileContent = await fs.promises.readFile(originalPath);

		await this.client
			.putObject({
				Bucket: uploadConfig.config.aws.bucket,
				Key: filePath ? `${filePath}/${file}` : file,
				ACL: 'public-read',
				Body: fileContent,
				ContentType,
				ContentDisposition: `inline; filename=${file}`,
			})
			.promise();

		await fs.promises.unlink(originalPath);

		return file;
	}

	public async deleteFile(file: string, filePath?: string): Promise<void> {
		await this.client
			.deleteObject({
				Bucket: uploadConfig.config.aws.bucket,
				Key: filePath ? `${filePath}/${file}` : file,
			})
			.promise();
	}
}

export default S3StorageProvider;
