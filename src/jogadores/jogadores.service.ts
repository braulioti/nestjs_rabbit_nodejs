import {Injectable, Logger} from '@nestjs/common';
import {CriarJogadorDto} from './dtos/criar-jogador.dto';
import {Jogador} from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto;

        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
        if (jogadorEncontrado) {
            return await this.atualizar(jogadorEncontrado, criarJogadorDto);
        } else {
            await this.criar(criarJogadorDto);
        }
    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular, email } = criaJogadorDto;

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        }

        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
        this.jogadores.push(jogador);
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadores;
    }

    private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
        const { nome } = criarJogadorDto;
        jogadorEncontrado.nome = nome;
    }
}
