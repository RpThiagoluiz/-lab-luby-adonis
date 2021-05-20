"use strict";

//arquivo do adonis utilizamos use
const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    //Quero pegar do usuario quando ele enviar o formulario.
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);
    return user;
  }
}

module.exports = UserController;
