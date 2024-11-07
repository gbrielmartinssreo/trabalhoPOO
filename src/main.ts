import "reflect-metadata";
import express from "express";
import playerRouter from "./route/PlayerRoutes";
import gameRouter from "./route/GameRoutes";
import genreRouter from "./route/GenreRoutes";
import storeRouter from "./route/StoreRoutes";
import gameStoreRouter from "./route/GameStoreRoutes";
import { database } from "./data-source";

const minhaAPI = express();
minhaAPI.use(express.json());
minhaAPI.use("/players", playerRouter);
minhaAPI.use("/games", gameRouter);
minhaAPI.use("/genres", genreRouter);
minhaAPI.use("/stores", storeRouter);
minhaAPI.use("/storeGames", gameStoreRouter);

const porta = 3000;

minhaAPI.listen(porta, async () => {
  database
    .initialize()
    .then(() => {
      console.log("Conexão com o banco de dados efetuada com sucesso.");
    })
    .catch((erro) => console.log(erro));

  console.log(`Servidor web rodando na porta ${porta}`);
});
