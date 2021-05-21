"use strict";
const Antl = use("Antl");
class Session {
  get validateAll() {
    return true;
    //Vai verificar todos os campos, e retornar a mensagem.
  }
  get rules() {
    return {
      email: "required|email",
      password: "required",
    };
  }
  get messages() {
    //nome do arquivo criado `.json`
    return Antl.list("validation");
  }
}

module.exports = Session;
