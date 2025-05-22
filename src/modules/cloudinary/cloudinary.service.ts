/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryResponse } from './cloudinary-response';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    if (!file?.buffer) {
      this.logger.error('Invalid file provided for upload');
      throw new Error('Invalid file provided');
    }

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            this.logger.error('Error uploading file to Cloudinary', error);
            reject(new Error(`Cloudinary upload error: ${error.message}`));
            return;
          }
          if (!result) {
            this.logger.error('Empty result from Cloudinary upload');
            reject(new Error('Empty result from Cloudinary'));
            return;
          }
          this.logger.log(`File uploaded successfully: ${result.public_id}`);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFile(publicId: string): Promise<void> {
    if (!publicId) {
      this.logger.error('No publicId provided for deletion');
      throw new Error('Invalid publicId provided');
    }

    return new Promise<void>((resolve, reject) => {
      void cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          this.logger.error(`Error deleting file ${publicId} from Cloudinary`, error);
          reject(new Error(`Cloudinary delete error: ${error.message}`));
          return;
        }
        if (result?.result !== 'ok') {
          this.logger.error(`Failed to delete file ${publicId} from Cloudinary. Result: ${result?.result}`);
          reject(new Error(`Failed to delete file: ${result?.result}`));
          return;
        }
        this.logger.log(`File deleted successfully: ${publicId}`);
        resolve();
      });
    });
  }
}