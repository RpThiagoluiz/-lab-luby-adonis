"use strict";
//Verificar se estamos em ambiente de desenvolvimento,

const Raven = require("raven");
const Config = use("Config");

const Env = use("Env");
const Youch = use("Youch");

const BaseExceptionHandler = use("BaseExceptionHandler");

class ExceptionHandler extends BaseExceptionHandler {
  //Todos os erros vai vim pra ele.

  async handle(error, { request, response }) {
    //return para o usuario final
    if (error.name === "ValidationException") {
      return response.status(error.status).send(error.messages);
    }
    //caso for ambiente de desenvolvimento vamos mostrar o erro de forma mais detalhada.

    if (Env.get("NODE_ENV" === "desen")) {
      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();
      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }

  async report(error, { request }) {
    //acessar o arquivo services dentro da pasta Config,(por isso o import!), esentry, dentro dela o dsn
    Raven.config(Config.get("services.sentry.dsn"));
    Raven.captureException(error);
  }
}

module.exports = ExceptionHandler;
