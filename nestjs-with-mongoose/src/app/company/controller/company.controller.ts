import {
  Controller, Get, Post, Delete, Put, Body, Res, HttpStatus,
  Param, HttpCode, ValidationPipe, UsePipes, UseGuards, Req
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { RolesGuard } from '../../core/guard/role.guard';
import { PARAMETERS_FAILED_VALIDATION } from '../../../app.constants';
import { ValidateObjectId } from '../pipe/company.pipe';
import { CompanyService } from '../services/company.service';
import { Roles } from '../../core/decorator/role.decorator';
import { CompanyDTO } from '../dto/company.dto';

export enum Role {
  ADMIN= 'ADMIN'
}
@Controller('/api/v1/company')
@UseGuards(RolesGuard)
@UsePipes(new ValidationPipe({
  whitelist: true,
  transform: true,
}))
export class CompanyController {
  constructor(private companyService: CompanyService) { }

  @Get('/list')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Company has been successfully fetched' })
  @ApiBadRequestResponse({ description: PARAMETERS_FAILED_VALIDATION })
  @ApiInternalServerErrorResponse({ description: 'unable to fetch company details' })
  async getCompanies(@Res() res, @Req() req) {
    const company = await this.companyService.getAllCompany();
    return res.status(HttpStatus.OK).json({
      message: 'Company has been successfully fetched',
      data: company
    });
  }

  @Roles(Role.ADMIN)
  @Get('/:companyId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'company fetched successfully' })
  @ApiBadRequestResponse({ description: PARAMETERS_FAILED_VALIDATION })
  async getCompany(@Res() res, @Param('companyId', new ValidateObjectId()) companyId) {
    const company = await this.companyService.getCompany(companyId);
    return res.status(HttpStatus.OK).json({
      message: 'Company has been fetched successfully',
      data: company
    });
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'created company successfully' })
  @ApiBadRequestResponse({ description: PARAMETERS_FAILED_VALIDATION })
  async createCompany(@Res() res, @Body() companydto: CompanyDTO) {
    const company = await this.companyService.createCompany(companydto);
    return res.status(HttpStatus.OK).json({
      message: 'Company has been created successfully',
      data: company
    });
  }

  @Roles(Role.ADMIN)
  @Put('/:companyId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'company updated successfully' })
  @ApiBadRequestResponse({ description: PARAMETERS_FAILED_VALIDATION })
  async updateCompany(@Res() res, @Body() companydto: Partial<CompanyDTO>,
                      @Param('companyId', new ValidateObjectId()) companyId) {
    const company = await this.companyService.updateCompany(companyId, companydto);
    return res.status(HttpStatus.OK).json({
      message: 'Company has been updated successfully',
      data: company
    });
  }

  @Roles(Role.ADMIN)
  @Delete('/:companyId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'company updated successfully' })
  @ApiBadRequestResponse({ description: PARAMETERS_FAILED_VALIDATION })
  async archiveCompany(@Res() res,
                       @Param('companyId', new ValidateObjectId()) companyId) {
    const company = await this.companyService.deleteCompany(companyId);
    return res.status(HttpStatus.OK).json({
      message: 'Company has been purged successfully',
      data: company
    });
  }
}
