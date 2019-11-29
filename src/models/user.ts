import { connect }                                                  from 'mongoose';
import * as mongoosePaginate                                        from 'mongoose-paginate';
import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from 'ts-mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

connect(`${MONGODB_URL}/users`, { useNewUrlParser: true });

const UserSchema = createSchema({
  username: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true, select: false }),
});

UserSchema.plugin(mongoosePaginate);

// Exports
export type IUser = ExtractDoc<typeof UserSchema>;
export type UserProps = ExtractProps<typeof UserSchema>;
export const User = typedModel('User', UserSchema);
