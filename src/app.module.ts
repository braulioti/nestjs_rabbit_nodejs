import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import {MongooseModule} from '@nestjs/mongoose';
import * as dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../.env` });

@Module({
  imports: [
      JogadoresModule,
      MongooseModule.forRoot(
          `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bggaz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
          {
              useNewUrlParser: true,
              useCreateIndex: true,
              useUnifiedTopology: true,
              useFindAndModify: false
          })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
