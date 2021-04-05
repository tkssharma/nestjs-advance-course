import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop()
  name: string;

  @Prop()
  createdBy: number;

  @Prop()
  owner: string;

  @Prop()
  history: string;

  @Prop()
  ceo: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);