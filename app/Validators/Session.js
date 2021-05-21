"use strict";

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
}

module.exports = Session;
