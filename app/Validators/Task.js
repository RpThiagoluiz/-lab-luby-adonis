"use strict";

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
}

module.exports = Task;
