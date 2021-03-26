import { Injectable } from '@nestjs/common';
import { uploadFile } from '../controller/upload.controller.process';
import { FilesAzureService } from './file.azure.service';
import {uuid} from 'uuidv4';
const getStream = require('into-stream');

@Injectable()
export class UploadAzureService {
  constructor(
    private readonly filesService: FilesAzureService,
  ) {}

   async addAvatar(imageBuffer: Buffer, file: any){
     const extention = file.originalname && file.originalname.split('.').pop();
     const blobName = this.getExtention(extention, uuid()); 
     const containerName = process.env.CONTAINER_NAME!;
     const stream = getStream(imageBuffer);
     return await this.filesService.createBlobFromStream(containerName, blobName, stream, imageBuffer);
   }
   public getExtention(extention: string, uuid: string) {
    const allowedFiles = ['jpg', 'png', 'gif', 'jepg', 'bmp', 'webp'];
    return `${uuid}.${allowedFiles.includes(extention) ? extention : 'jpeg'}`;
  }
}