"use strict";

const Project = use("App/models/Project");

class ProjectController {
  async index({ request, response, view }) {
    //const project = await Project.all()
    //Quero os dados do usuario relaciodos ao projeto criado
    //utilizamos esse dcodigo para trazer os dados dele
    //fetch pra concluir a request
    //const projects = await Project.query().with("user").fetch();

    //Somente a page pelo parms da request.
    const { page } = request.get();
    //Se vc quiser paginar a quantidade de item por pagina, tem tudo na doc.

    //Qureremos mudar para paginacao
    // subistitui o fetch, por paginate, e passamos o numero da pagina dentro
    //ou a const page, que vem da minha request.
    const projects = await Project.query().with("user").paginate(page);

    return projects;
  }

  //Id do user vou utilizar o auth
  async store({ request, response, auth }) {
    const data = request.only(["title", "description"]);
    const project = await Project.create({ ...data, user_id: auth.user.id });

    return project;
  }

  // Metodos Show para trazer somente um projeto em expecifico.
  async show({ params, request, response, view }) {
    const project = await Project.findOrFail(params.id);

    //Pegar as infos relacionadas ao projeto
    await project.load("user"); //trazer as info do user
    await project.load("tasks"); //trazer as tasks

    return project;
  }

  async update({ params, request, response }) {
    const project = await Project.findOrFail(params.id);
    const data = request.only(["title", "description"]);

    //Pegar as dados que vem da data, colocar dentro do projet
    project.merge(data);
    await project.save();

    return project;
  }

  async destroy({ params, request, response }) {
    const project = await Project.findOrFail(params.id);
    await project.delete();
  }
}

module.exports = ProjectController;
