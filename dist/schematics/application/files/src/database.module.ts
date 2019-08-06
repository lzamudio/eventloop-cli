import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';

let options = {
  useNewUrlParser: true,
  useCreateIndex: true
};

const url = `mongodb://localhost/<%= camelize(name) %>`;

const PROVIDE = {
  provide: 'TOKEN_DATABASE_CONFIG',
  useFactory: async (): Promise<typeof mongoose> => await mongoose.connect(url, options)
};

@Module({
  providers: [PROVIDE],
  exports: [PROVIDE],
})
export class DatabaseModule {}
