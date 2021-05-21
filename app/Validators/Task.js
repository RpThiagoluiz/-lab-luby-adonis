"use strict";
const Antl = use("Antl");
class Task {
  get validateAll() {
    return true;
    //Vai verificar todos os campos, e retornar a mensagem.
  }
  get rules() {
    return {
      title: "required",
      due_date: "date",
    };
  }
  get messages() {
    //nome do arquivo criado `.json`
    return Antl.list("validation");
  }
}

module.exports = Task;
