import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { config } from "./src/config";
import { Mongoose } from "./src/mongoose";
import { routes_v1 } from "./src/routes";
import { ErrorMiddleware } from "./src/middlewares";

const app = express();

Mongoose.connect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", routes_v1);

app.listen(config.port, () => console.log(`server started on port ${config.port} (${config.env})`));

app.use(ErrorMiddleware.converter);
app.use(ErrorMiddleware.notFound);
app.use(ErrorMiddleware.handler);

module.exports = app;
