import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { imageFileFilter } from './file-helper';
import { uploadFile } from './upload.controller.process';

@Controller('/api/v1')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class UploadController {
  @Post('/file-upload')
  @ApiConsumes('multipart/form-data')
  @uploadFile('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadFile(@UploadedFile() file: any) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('/multiple-file-upload')
  @ApiConsumes('multipart/form-data')
  @uploadFile('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadMultipleFiles(@UploadedFiles() files: any) {
    const response: any = [];
    files.map((file :any) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
}