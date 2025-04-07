import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  authenticate(username: string, password: string): Promise<IUser>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.authenticate = async function (
  username: string,
  password: string
): Promise<IUser> {
  const user = await this.findOne({ username: username });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  if (bcrypt.compareSync(password, user.password)) {
    return user;
  }
  throw new Error("Something went wrong");
};

const User: IUserModel = mongoose.model<IUser, IUserModel>("User", userSchema);
export default User;
