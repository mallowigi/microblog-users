import { connect, Schema, Document, model } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const MONGODB_URL = process.env.MONGODB_URL;

connect(`${MONGODB_URL}/users`, { useNewUrlParser: true });

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(mongoosePaginate);

export interface IUser extends Document {
  username: string;
  password: string;
}

export const User = model<IUser>('User', UserSchema);
