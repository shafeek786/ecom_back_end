import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserDto } from 'src/DTO/user.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('vendors')
  @Roles('admin') // Restrict this endpoint to admins
  async getVendors(): Promise<{ success: boolean; vendors: UserDto[] }> {
    try {
      console.log('vender');
      return await this.adminService.getVendors();
    } catch (error) {
      throw new NotFoundException('Could not retrieve vendors');
    }
  }

  @Patch('vendors/:id/approve')
  async approveVendor(
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      return await this.adminService.updateVendorStatus(id, true);
    } catch (error) {
      throw new NotFoundException('Could not approve vendor');
    }
  }

  @Patch('vendors/:id/reject')
  async rejectVendor(
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      return await this.adminService.updateVendorStatus(id, false);
    } catch (error) {
      throw new NotFoundException('Could not reject vendor');
    }
  }
}
