import { uploadConfig } from '@config/upload';
import { container } from 'tsyringe';
import DiskStorageProvider from '.././StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '.././StorageProvider/implementations/S3StorageProvider';
import IStorageProvider from '.././StorageProvider/models/IStorageProvider';

const providers = {
	disk: DiskStorageProvider,
	s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	providers[uploadConfig.driver]
);
