import { Model } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constant';
import { Types } from 'mongoose';

export type TUser = {
  _id?: string;
  name: string;
  username?: string;
  role: keyof typeof USER_ROLE;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  bio?: string;
  isVerified: boolean;
  isPremiumUser: boolean;
  followers: Types.ObjectId[]; // Array of User IDs
  following: Types.ObjectId[]; // Array of User IDs
  posts: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
