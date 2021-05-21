"use strict";

class ResetPassword {
  get validateAll() {
    return true;
    //Vai verificar todos os campos, e retornar a mensagem.
  }
  get rules() {
    return {
      token: "required",
      //confirmar a senha
      password: "required|confirmed",
    };
  }
}

module.exports = ResetPassword;
