import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Schemas/user.schema';

@Injectable()
export class VendorService {
  constructor(@InjectModel(User.name) private vendorModel: Model<User>) {}
}
