import { initServer } from "./app/index.js";

export async function init() {
  const app = await initServer();

  app.listen(8000, () => {
    console.log("server started at post 8000");
  });
}

init();
