"use strict";

const Kue = use("Kue");
const Job = use("App/Jobs/NewTaskMail");

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
  //OQ foi configurado no Jobs, foi extraido daqui a logica.
  //E o segundo obj, priotirade. e outros dados.
  //Attempts, tentar reeviar no maximo de 3 vezes
  Kue.dispatch(Job.key, { email, username, title, file }, { attempts: 3 });
};
