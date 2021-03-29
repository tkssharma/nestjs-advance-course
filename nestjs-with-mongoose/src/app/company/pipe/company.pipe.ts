import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectId implements PipeTransform {
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if (!isValid) { throw new BadRequestException('Invalid ID!'); }
        return value;
    }
}
