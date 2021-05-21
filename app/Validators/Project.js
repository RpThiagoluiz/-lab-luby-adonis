"use strict";

class Project {
  get validateAll() {
    return true;
    //Vai verificar todos os campos, e retornar a mensagem.
  }
  get rules() {
    return {
      title: "required",
      description: "required",
    };
  }
}

module.exports = Project;
