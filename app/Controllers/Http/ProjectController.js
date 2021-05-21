"use strict";

const Project = use("App/models/Project");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    //const project = await Project.all()
    //Quero os dados do usuario relaciodos ao projeto criado
    //utilizamos esse dcodigo para trazer os dados dele
    //fetch pra concluir a request
    const projects = await Project.query().with("user").fetch();

    return projects;
  }

  /**
   * Render a form to be used for creating a new project.
   * GET projects/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  //Id do user vou utilizar o auth
  async store({ request, response, auth }) {
    const data = request.only(["title", "description"]);
    const project = await Project.create({ ...data, user_id: auth.user.id });

    return project;
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // Metodos Show para trazer somente um projeto em expecifico.
  async show({ params, request, response, view }) {
    const project = await Project.findOrFail(params.id);

    //Pegar as infos relacionadas ao projeto
    await project.load("user"); //trazer as info do user
    await project.load("tasks"); //trazer as tasks

    return project;
  }

  /**
   * Render a form to update an existing project.
   * GET projects/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const project = await Project.findOrFail(params.id);
    const data = request.only(["title", "description"]);

    //Pegar as dados que vem da data, colocar dentro do projet
    project.merge(data);
    await project.save();

    return project;
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const project = await Project.findOrFail(params.id);
    await project.delete();
  }
}

module.exports = ProjectController;
