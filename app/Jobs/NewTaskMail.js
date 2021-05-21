"use strict";

const Mail = use("Mail");
const Helpers = use("Helpers");

class NewTaskMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  //Quantos jobs serao procesador simultaneamente.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  //chama do map do react, pra identificar
  static get key() {
    return "NewTaskMail-job";
  }

  // This is where the work is done.
  //logica pra enviar o email
  //async handle (data) -> desestruturar e trazer as informacoes que precisamos
  async handle({ email, username, title, file }) {
    console.log(`Job:${NewTaskMail.key}`);
    await Mail.send(
      //PEgar o arquivo de texto do email, no caso arquivo html.
      ["emails.new_task"],
      {
        //Variaveis passadas para dentro do email
        username,
        title,
        hasAttachment: !!file,
      },
      (message) => {
        message
          .to(email)
          .from("admin@adminThi.com", "Thiago | Admin")
          .subject("Nova tarefa para vc");

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name,
          });
        }
      }
    );
  }
}

module.exports = NewTaskMail;
