import Express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = Express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(Express.json({ limit: "16kb" }));
app.use(Express.urlencoded({ limit: "16kb", extended: true }));
app.use(Express.static("public"));
app.use(Express.static("dist"));

app.use(cookieParser());

// import Routes

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import billRoutes from "./routes/bill.routes.js";

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/bills", billRoutes);

export { app };