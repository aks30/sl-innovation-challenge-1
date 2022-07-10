module.exports = function (app) {

  var router = async function (req, res, next) {

    if (!req.params.version) {
      next();
    } else if (!controllers[req.params.version]) {
      next();
    } else if (!controllers[req.params.version][req.params.controller]) {
      next();
    }
    else if (!(controllers[req.params.version][req.params.controller][req.params.method] 
      || controllers[req.params.version][req.params.controller][req.params.file][req.params.method])) {
      next();
    }
    else if (req.params.method.startsWith("_")) {
      next();
    } else {

      try { 

        let result;

        if (req.params.file) {
          result = 
          await controllers[req.params.version][req.params.controller][req.params.file][req.params.method](req);
        } else {
          result = 
          await controllers[req.params.version][req.params.controller][req.params.method](req);
        }

          res.status(result.status ? result.status : httpStatusCode["ok"].status).json({
            message: result.message,
            status: result.status ? result.status : httpStatusCode["ok"].status,
            result: result.data,
            result: result.result,
            additionalDetails: result.additionalDetails,
            pagination: result.pagination,
            totalCount: result.totalCount,
            total: result.total,
            count: result.count,
            failed: result.failed
          });

      }
      catch (error) {
        res.status(error.status ? error.status : httpStatusCode.bad_request.status).json({
          status: error.status ? error.status : httpStatusCode.bad_request.status,
          message: error.message
        });

        if ( error.status !== httpStatusCode.bad_request.status ) {
          
          let customFields = {
            appDetails: '',
            userDetails: "NON_LOGGED_IN_USER"
          };
  
          if (req.userDetails) {
            customFields = {
              appDetails: req.headers["user-agent"],
              userDetails: req.userDetails.firstName + " - " + req.userDetails.lastName + " - " + req.userDetails.email
            };
          }

        }
        
      };
    }
  };

  app.all("/api/:version/:controller/:method", router);

  app.all("/api/:version/:controller/:file/:method", router);

  app.all("/api/:version/:controller/:method/:_id", router);
  app.all("/api/:version/:controller/:file/:method/:_id", router);


  app.use((req, res, next) => {
    res.status(httpStatusCode["not_found"].status).send(httpStatusCode["not_found"].message);
  });
};
