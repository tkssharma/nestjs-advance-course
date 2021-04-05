import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../model/company';
import { CompanyDTO } from '../dto/company.dto';
@Injectable()
export class CompanyService {
  constructor(@InjectModel('company') private readonly companyModel: Model<Company>) { }
  async getAllCompany(): Promise<Company[]> {
      return await this.companyModel.find({}).exec();
  }
  async getCurrentCompany(companyId: string): Promise<Company[]> {
    return await this.companyModel.find({_id: companyId}).exec();
}
  async getCompany(companyId: string): Promise<Company> {
    return await this.companyModel.findById(companyId);
  }
  async updateCompany(companyId: string, company: Partial<CompanyDTO>): Promise<Company> {
    return await this.companyModel.findByIdAndUpdate(companyId, company, { new: true });
  }
  async deleteCompany(companyId: string): Promise<Company> {
    return await this.companyModel.findByIdAndUpdate(companyId, {active: false});
  }
  async createCompany(company: CompanyDTO): Promise<Company> {
    const existingCompany =  await this.companyModel.find({ siret: company.siret}).exec();
    if (existingCompany && existingCompany.length > 0) {
      return existingCompany[0];
    }
    const newCompany =  new this.companyModel(company);
    return await newCompany.save();
  }
}
