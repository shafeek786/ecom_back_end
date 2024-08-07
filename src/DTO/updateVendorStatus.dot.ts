import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateVendorStatusDto {
  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @IsBoolean()
  @IsNotEmpty()
  isApproved: boolean;
}
