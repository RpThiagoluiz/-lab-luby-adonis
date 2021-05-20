"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use("Route");

//Quando eu for acessar a rota users, no metodo post. Eu vou utilizar o UserController.store.
//UserController e um arquivo criado como comando do -> adonisjsadonis make:controller User
// fica dentro de app, controllers,http e o arquivo
Route.post("users", "UserController.store");
