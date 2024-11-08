import "reflect-metadata";
import express from 'express';
import gameRouter from "./route/GameRoutes";
import storeRouter from "./route/StoreRoutes";
import licenseRouter from "./route/LicenseRoutes";
import genreRouter from "./route/GenreRoutes";
import playerRouter from "./route/PlayerRoutes";
import { database } from "./data-source";

const minhaAPI = express();
minhaAPI.use(express.json());

// Configuração das rotas
minhaAPI.use('/games', gameRouter);
minhaAPI.use('/stores', storeRouter);
minhaAPI.use('/licenses', licenseRouter);
minhaAPI.use('/genres', genreRouter);
minhaAPI.use('/players', playerRouter);

const porta = 3000;

minhaAPI.listen(porta, async () => {
    try {
        await database.initialize();
        console.log("Conexão com o banco de dados efetuada com sucesso.");
    } catch (erro) {
        console.log("Erro ao conectar com o banco de dados:", erro);
    }

    console.log(`Servidor web rodando na porta ${porta}`);
});

