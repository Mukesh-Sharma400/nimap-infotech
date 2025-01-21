import cors from "cors";
import express from "express";
import { AppDataSource } from "./utils/database";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log(error));
