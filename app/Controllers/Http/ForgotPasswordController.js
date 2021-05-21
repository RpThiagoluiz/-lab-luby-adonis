"use strict";
const crypto = require("crypto");
const moment = require("moment");
const User = use("App/Models/User");
const Mail = use("Mail");

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      //unico ponto da minha request.
      const email = request.input("email");
      //encontar o usuario - se nao return um error
      const user = await User.findByOrFail("email", email);
      //cript nativo do node - criar um string hexadecimal
      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();

      await user.save();

      await Mail.send(
        //a copia do arquivo -text sem o html, e as tag, para nao cair no span
        ["emails.forgot_password", "emails.forgot_password-text"],
        //link vm do front, pro form.
        {
          email,
          token: user.token,
          link: `${request.input("redirect_url")}?token=${user.token}`,
        },
        (message) => {
          message
            .to(user.email)
            .from("adminBrabo@admin.com", "Thiago | AdminMaster")
            .subject("Recuperacao de Senha");
        }
      );
    } catch (error) {
      return response.status(error.status).send({
        error: { message: "Algo nao deu certo, esse email é invalido!" },
      });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail("token", token);

      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(401).send({
          error: { message: "O token de recuperacao esta expirado!" },
        });
      }

      //Resetar o estado do token
      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (error) {
      return response.status(error.status).send({
        error: { message: "Algo nao deu certo ao resetar sua senha!" },
      });
    }
  }
}

module.exports = ForgotPasswordController;
