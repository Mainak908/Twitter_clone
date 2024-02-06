import { initServer } from "./app";

export async function init() {
  const app = await initServer();
  app.listen(8000, () => {
    console.log("server started");
  });
}

init();
