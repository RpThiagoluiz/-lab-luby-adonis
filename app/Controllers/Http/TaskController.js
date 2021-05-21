"use strict";

const Task = use("App/models/Task");
class TaskController {
  async index({ params }) {
    const tasks = await Task.query()
      .where("project_id", params.projects_id)
      .with("user")
      .fetch();
    return tasks;
  }

  //pro form ele disse
  async create({ request, response, view }) {}

  async store({ params, request, response }) {
    const data = request.only([
      "user_id",
      "title",
      "description",
      "due_date",
      "file_id",
    ]);

    //na rota ela ja tras o project id dela.
    const task = await Task.create({ ...data, project_id: params.projects_id });
    return task;
  }

  async show({ params, request, response, view }) {
    const task = await Task.findOrFail(params.id);
    return task;
  }

  async update({ params, request, response }) {
    const task = await Task.findOrFail(params.id);

    const data = request.only([
      "user_id",
      "title",
      "description",
      "due_date",
      "file_id",
    ]);

    task.merge(data);
    await task.save();

    return task;
  }

  async destroy({ params, request, response }) {
    const task = await Task.findOrFail(params.id);

    await task.delete();
  }
}

module.exports = TaskController;
