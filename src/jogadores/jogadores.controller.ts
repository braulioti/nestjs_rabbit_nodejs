import {Body, Controller, Delete, Get, Post, Query} from '@nestjs/common';
import {CriarJogadorDto} from './dtos/criar-jogador.dto';
import {JogadoresService} from './jogadores.service';
import {Jogador} from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(
        private readonly jogadoresService: JogadoresService
    ) {
    }

    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto
    ) {
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    }

    @Get()
    async consultarJogadores(
        @Query('email') email: string
    ): Promise<Jogador[] | Jogador> {
        if (email) {
            return this.jogadoresService.consultarJogadorPeloEmail(email);
        } else {
            return this.jogadoresService.consultarTodosJogadores();
        }
    }

    @Delete()
    async deletarJogadores(
        @Query('email') email: string
    ): Promise<void> {
        return this.jogadoresService.deletarJogador(email);
    }
}
