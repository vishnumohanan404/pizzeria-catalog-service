import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import categoryRouter from "./category/category-router";
import cookieParser from "cookie-parser";
import productRouter from "./product/product-router";
import cors from "cors";
import toppingRouter from "./topping/topping-router";

const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "hello from catalog service" });
});

app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/toppings", toppingRouter);

app.use(globalErrorHandler);

export default app;
