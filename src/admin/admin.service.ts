import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserDto } from '../DTO/user.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getVendors(): Promise<{ success: boolean; vendors: UserDto[] }> {
    try {
      const vendors = await this.userModel.find({ type: 'vendor' }).exec();
      return {
        success: true,
        vendors: vendors,
      };
    } catch (err) {
      throw new NotFoundException('Could not retrieve vendors');
    }
  }

  async updateVendorStatus(
    vendorId: string,
    isApproved: boolean,
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log(
        `Updating vendor status: ${isApproved}, Vendor ID: ${vendorId}`,
      );

      // Check if the vendor exists
      const vendor = await this.userModel.findById(vendorId).exec();
      if (!vendor) {
        throw new NotFoundException('Vendor not found');
      }

      // Update the vendor status
      vendor.isapproved = isApproved; // Corrected property name to match schema
      await vendor.save();

      console.log(
        `Vendor status updated: ${isApproved}, Vendor ID: ${vendorId}`,
      );

      return {
        success: true,
        message: isApproved
          ? 'Vendor approved successfully'
          : 'Vendor rejected successfully',
      };
    } catch (err) {
      console.error(`Error updating vendor status: ${err.message}`);
      throw new NotFoundException('Could not update vendor status');
    }
  }
}
