"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use("Route");

//Quando eu for acessar a rota users, no metodo post. Eu vou utilizar o UserController.store.
//UserController e um arquivo criado como comando do -> adonisjsadonis make:controller User
// fica dentro de app, controllers,http e o arquivo
//adonis route:list
//Ele vai demostrar no terminal as rotas criadas.
Route.post("users", "UserController.store").validator("User");
Route.post("sessions", "SessionController.store");
Route.post("passwords", "ForgotPasswordController.store");
//Inserir os dados novos, nova senha no caso.
Route.put("passwords", "ForgotPasswordController.update");

//Para acessar o arquivo, contudo a pasta temp nao pode ser acessa, vmos ajeitar.
Route.get("/files/:id", "FileController.show");

//Criar rota para ser acessada somente quando o usuario estiver logado
Route.group(() => {
  //Routs de postagem de files
  Route.post("/files", "FileController.store");
  //Rotas pra todos os controllers
  //Criar todas as rotas possiveis para o crud do projeto.
  Route.resource("projects", "ProjectController").apiOnly();
  //Tasks dos projetos
  Route.resource("projects.tasks", "TaskController").apiOnly();
  // adonis route:list para trazer as rotas
}).middleware(["auth"]);
