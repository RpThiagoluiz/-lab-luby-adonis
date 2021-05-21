"use strict";

const Antl = use("Antl");
class ForgotPassword {
  get validateAll() {
    return true;
    //Vai verificar todos os campos, e retornar a mensagem.
  }
  get rules() {
    return {
      email: "required|email",
      redirect_url: "required|url",
    };
  }
  get messages() {
    //nome do arquivo criado `.json`
    return Antl.list("validation");
  }
}

module.exports = ForgotPassword;
