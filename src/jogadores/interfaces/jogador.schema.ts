import * as mongose from 'mongoose';

export const JogadorSchema = new mongose.Schema({
    telefoneCelular: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    nome: { type: String },
    ranking: { type: String },
    posicaoRanking: { type: Number },
    urlFotoJogador: { type: String }
}, {
    timestamps: true,
    collection: 'jogadores'
});
