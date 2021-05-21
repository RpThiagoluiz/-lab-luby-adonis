"use strict";

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
}

module.exports = ForgotPassword;
