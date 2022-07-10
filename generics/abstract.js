 /**
    * Abstract
    * @class
*/

let Abstract = class Abstract {
  constructor(modelFile) {

    this.model = db.model(modelFile.name,modelFile.schema);

    this.httpStatus = {
      ok: 200,
      notFound: 404,
      badRequest: 400
    };
  }
};

module.exports = Abstract;
