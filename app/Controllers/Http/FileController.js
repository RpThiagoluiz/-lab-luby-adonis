"use strict";

const File = use("App/Models/File");
const Helpers = use("Helpers");

class FileController {
  async show({ params, response }) {
    const file = await File.findOrFail(params.id);
    //Alem do id pode trazer outro metodos, como o nome por exemplo

    return response.download(Helpers.tmpPath(`uploads/${file.file}`));
  }

  async store({ request, response }) {
    try {
      //se nao existir ja retorna
      if (!request.file("file")) return;
      //Tamnho que vc quiser, aqui sera de 2mb
      const upload = request.file("file", { size: "2mb" });
      //ficar salvom com nome unico
      const fileName = `${Date.now()}.${upload.subtype}`;

      //Pasta temporaria
      await upload.move(Helpers.tmpPath("uploads"), { name: fileName });
      //Cara checagem se houver erro no meio do caminho ele lanca um error. Repara isso.
      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      });

      return file;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Error no upload de arquivo!" } });
    }
  }
}

module.exports = FileController;
