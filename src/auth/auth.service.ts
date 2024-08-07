import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/DTO/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    userType: 'admin' | 'vendor',
  ): Promise<any> {
    console.log(email, userType);
    const user = await this.userModel.findOne({ email, type: userType }).exec();
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid email address');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!user.isapproved) {
      throw new UnauthorizedException('Account not approved yet');
    }

    const { password: _, ...result } = user.toObject();
    return result;
  }

  async login(user: any, userType: 'admin' | 'vendor') {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: userType,
      sub: user._id,
      isApproved: user.isapproved,
    };

    return {
      success: true,
      access_token: this.jwtService.sign(payload),
      role: userType,
    };
  }

  async signup(data: UserDto): Promise<{ success: boolean; message: string }> {
    const { email, mobile, password } = data;
    const existingUser = await this.userModel
      .findOne({ $or: [{ email }, { mobile }] })
      .exec();

    if (existingUser) {
      throw new ConflictException('Email or mobile number already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ ...data, password: hashedPassword });
    await newUser.save();

    return {
      success: true,
      message: 'Registered successfully, please wait for approval',
    };
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
