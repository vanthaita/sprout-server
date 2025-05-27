import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';
import * as https from 'https';

@Injectable()
export class AwsS3Service {
  private readonly s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const region = this.configService.get<string>('AWS_S3_REGION');
    const accessKeyId = this.configService.get<string>('AWS_S3_ACCESS_KEY');
    const secretAccessKey = this.configService.get<string>('AWS_S3_SECRET_ACCESS_KEY');

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('AWS S3 configuration is incomplete');
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      requestHandler: new NodeHttpHandler({
        httpAgent: new https.Agent({
          keepAlive: true,
          maxSockets: 50,
          timeout: 60000,
        }),
      }),
    });
  }

  get bucketName(): string {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!bucketName) {
      throw new Error('AWS_S3_BUCKET_NAME is not configured');
    }
    return bucketName;
  }

  async uploadPdf(pdfBuffer: Buffer): Promise<string> {
    const key = `pdfs/${uuidv4()}.pdf`;
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: pdfBuffer,
        ContentType: 'application/pdf',
        ACL: 'public-read',
      },
    });

    await upload.done();
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  async uploadMultiplePdfs(files: { buffer: Buffer }[]): Promise<string[]> {
    const uploadPromises = files.map(async (file) => {
      const key = `pdfs/${uuidv4()}.pdf`;
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: 'application/pdf',
          ACL: 'public-read',
        },
      });

      await upload.done();
      return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    });

    return Promise.all(uploadPromises);
  }
}