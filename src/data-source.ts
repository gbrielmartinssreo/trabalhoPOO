import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "gbmm",
    password: "hunterxhunter",
    database: "steam",
    synchronize: true,
    logging: true,
    entities: ["./entity/**.ts],
    subscribers: [],
    migrations: [],
})
