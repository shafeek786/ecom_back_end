import { Controller } from '@nestjs/common';
import { VendorService } from './vendor.service';

@Controller('vendor')
export class VendorController {
  constructor(private vendorService: VendorService) {}
}
