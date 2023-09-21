import App from "./app";

(async function () {
  const app = new App();

  try {
    app.listen();

    process.on("unhandledRejection", (err, promise) => {
      console.log(`Error: ${err}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
