import { Injectable } from '@nestjs/common';
import * as Storage from 'azure-storage';
import { Readable } from 'typeorm/platform/PlatformTools';


@Injectable()
export class FilesAzureService {
  private blobService!: Storage.BlobService;
  constructor(
  ) {}
  private async getBlobServiceInstance(){
    if (this.blobService) {
      return this.blobService;
    }
    return Storage.createBlobService(process.env.CONNECTION_STRING!);
  }
  public async createBlobFromStream
  (containerName: string, blobName: string, stream: Readable, buffer: Buffer): Promise<Storage.BlobService.BlobResult> {
    this.blobService = await this.getBlobServiceInstance();
    return new Promise((resolve, reject) => {
      return this.blobService
      .createBlockBlobFromStream(containerName, blobName, stream, Buffer.byteLength(buffer), (error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(error);
        }
      });
    });
  }

}