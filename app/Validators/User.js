"use strict";

//Multiple
const Antl = use("Antl");
class User {
  get validateAll() {
    return true;
    //Vai verificar todos os campos, e retornar a mensagem.
  }
  get rules() {
    return {
      //Dados que o usuario vai colocar para nos inputs para enviar para o servidor.
      //dados, o tipo, e qual tabela ele deve ser unico.
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required|confirmed",
    };
  }
  get messages() {
    //nome do arquivo criado `.json`
    return Antl.list("validation");
  }
}

module.exports = User;
