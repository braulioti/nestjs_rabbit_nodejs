import {Module, Post} from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import {JogadorSchema} from './interfaces/jogador.schema';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Jogador', schema: JogadorSchema}
    ])
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService]
})
export class JogadoresModule {}
