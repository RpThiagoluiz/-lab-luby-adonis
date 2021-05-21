"use strict";
const Antl = use("Antl");
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
  get messages() {
    //nome do arquivo criado `.json`
    return Antl.list("validation");
  }
}

module.exports = ResetPassword;
