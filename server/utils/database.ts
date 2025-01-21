import { DataSource } from "typeorm";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Category, Product],
});
