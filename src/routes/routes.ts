import auth from "./auth.routes.ts";

const routes = (app: any) => {
  app.use("/auth", auth);
};

export default routes;
// export type Routes = typeof routes;
