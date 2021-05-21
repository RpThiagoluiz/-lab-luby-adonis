"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Task extends Model {
  //static boot -> msm coisa que o super
  static boot() {
    super.boot();

    //Os hooks no site do legacy do adonis tem todos explicando direitinho.
    this.addHook("afterCreate", "TaskHook.sendNewTaskMail");
    this.addHook("beforeUpdate", "TaskHook.sendNewTaskMail");
  }

  //Aq pra cima foi o hook
  project() {
    return this.belongsTo("App/Models/Project");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  file() {
    return this.belongsTo("App/Models/File");
  }
}

module.exports = Task;
