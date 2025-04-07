import express, { Request, Response } from "express";
import routes from "./routes/routes.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

app.get("/", (_: Request, res: Response) => {
  res.send("API is running");
});

export default app;
