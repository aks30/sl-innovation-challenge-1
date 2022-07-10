 // Dependencies
 const postsHelper = require(MODULES_BASE_PATH + "/posts/helper");

 
  /**
     * AppVersion
     * @class
 */
 module.exports = class Posts extends Abstract {

   constructor() {
     super(schemas["posts"]);
   }
 
   static get name() {
     return "posts";
   }

    /**
      * Create a post.
      * @method
      * @name create
      * @param  {Request} req request body.
      * @returns {JSON} Post ID.
    */

    async create(req) {
      return new Promise(async (resolve, reject) => {
        try {

            let createAPost = await postsHelper.create(
              req.body
            );

            return resolve({
              message : constants.apiResponses.POST_CREATED,
              result : createAPost
            });
          
          } catch (error) {
            reject({
                status: 
                error.status || 
                httpStatusCode["internal_server_error"].status,

                message: 
                error.message || 
                httpStatusCode["internal_server_error"].message
            })
          }
        })
      }

    /**
      * Lists of app version data.
      * @method
      * @name list
      * @param  {Request} req request data.
      * @returns {JSON} App version data lists.
    */

    async list(req) {
      return new Promise(async (resolve, reject) => {
        try {

          let posts = await postsHelper.list(
            req.query
          );

          return resolve(posts);
          
          } catch (error) {
          reject({
              status: 
              error.status || 
              httpStatusCode["internal_server_error"].status,

              message: 
              error.message || 
              httpStatusCode["internal_server_error"].message
          })
        }
      })
    }
 
 };
 