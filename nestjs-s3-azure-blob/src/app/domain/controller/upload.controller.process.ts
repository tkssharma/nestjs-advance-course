import { BadRequestException,
  Controller, Post, Req, UploadedFile,
  UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { imageFileFilter } from './file-helper';
const getStream = require('into-stream');

export const uploadFile = (fileName: string = 'file'): MethodDecorator => (
  target: any,
  propertyKey,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })(target, propertyKey, descriptor);
};

@Controller('/api/v1')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class UploadProcessController {
  @Post('/')
  public async createUser() {
    return 'Hello';
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @uploadFile('filename')
  @UseInterceptors(
    FileInterceptor('filename', {
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadFile(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
     if (!file || req.fileValidationError) {
       throw new BadRequestException('invalid file provided, [image files allowed]');
     }
     return file.originalname;
     // azure upload i need stream of file 
     // s3 upload you just need file buffer 
  }
}