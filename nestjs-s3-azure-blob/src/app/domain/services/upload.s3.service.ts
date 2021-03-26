import { Injectable } from '@nestjs/common';
import { uploadFile } from '../controller/upload.controller.process';
import { FilesS3Service } from './file.s3.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly filesService: FilesS3Service,
  ) {}

   async addAvatar(imageBuffer: Buffer, fileName: string){
     return await this.filesService.uploadFile(imageBuffer, fileName);
   }
}