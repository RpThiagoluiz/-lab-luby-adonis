"use strict";

const Mail = use("Mail");
const Helpers = use("Helpers");
const TaskHook = (exports = module.exports = {});
// .method -> substituimos pelo nome do hook
TaskHook.sendNewTaskMail = async (taskIntance) => {
  //Vamos saber se ele tem um user-id e se foi criada recentimente.

  if (!taskIntance.user_id && !taskIntance.dirty.user_id) return;
  //Dirty vai verificar se ela foi modifica recentimente.
  //Verificar no insomia, criando uma task sem o user_id,
  //Ele so vai chamar o executou quando houver um user_id recente.
  // console.log(`executou!`);

  const { email, username } = await taskIntance.user().fetch; //Trazer auto o user daquela task
  const file = await taskIntance.file().fetch();

  const { title } = taskIntance;

  //hasAttachment:!!file -> se existir valo true se nao false

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
};
