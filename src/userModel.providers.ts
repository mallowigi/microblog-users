import * as mongoosePaginate                                        from 'mongoose-paginate';
import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from 'ts-mongoose';
import { ConfigService }                                            from '@nestjs/config';
import * as mongoose                                                from 'mongoose';

const UserSchema = createSchema({
  username: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true, select: false }),
});

UserSchema.plugin(mongoosePaginate);

// Exports
export type UserDocument = ExtractDoc<typeof UserSchema>;
export type UserProps = ExtractProps<typeof UserSchema>;
export const UserModel = typedModel('User', UserSchema);

export const userModelProviders = [{
  provide:    'USERS_CONNECTION',
  useFactory: (configService: ConfigService) => {
    return mongoose.connect(`${configService.get('MONGODB_URL')}/users`, { useNewUrlParser: true });
  },
  inject:     [ConfigService],
},
];
