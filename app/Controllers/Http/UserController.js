"use strict";

//arquivo do adonis utilizamos use
const Database = use("Database");
const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    //Quero pegar do usuario quando ele enviar o formulario.
    const data = request.only(["username", "email", "password"]);

    //Salvar o addresses do user
    const addresses = request.input("addresses");
    //Olhar se nao ha error, antes de salvar no banco de dados de
    const trx = await Database.beginTransaction();

    const user = await User.create(data, trx);
    await user.addresses().createMany(addresses, trx);

    await trx.commit();
    return user;
  }
}

module.exports = UserController;
