import {Injectable, NotFoundException} from '@nestjs/common';
import {CriarJogadorDto} from './dtos/criar-jogador.dto';
import {Jogador} from './interfaces/jogador.interface';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class JogadoresService {
    constructor(
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
    ) {
    }

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado) {
            await this.atualizar(criarJogadorDto);
        } else {
            await this.criar(criarJogadorDto);
        }
    }

    private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(criaJogadorDto);
        return await jogadorCriado.save();
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate(
            { email: criarJogadorDto.email },
            { $set: criarJogadorDto }
        ).exec();
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        return jogadorEncontrado;
    }

    async deletarJogador(email: string): Promise<any> {
        return await this.jogadorModel.remove({email}).exec();
    }
}
