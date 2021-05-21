"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Project extends Model {
  //Sao os mesmos nomes das tabelas do banco de dados.

  user() {
    //User pretecence ao usuario
    return this.belongsTo("App/Models/User");
  }
  tasks() {
    //um projeto tem  varias tarefas
    return this.hasMany("App/Models/Task");
  }
}

module.exports = Project;
