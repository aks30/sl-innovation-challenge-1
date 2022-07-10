module.exports = class PostsHelper {

      /**
      * List of posts.
      * @method
      * @name list
      * @param {Object} filterQueryObject - filter query data.
      * @param {Object} [projection = {}] - projected data.
      * @returns {Promise} returns a promise.
     */

    static list( filterQueryObject = {} , fields = "all" ) {
        return new Promise(async (resolve, reject) => {
            try {

                let projection = {};

                if (fields != "all") {
                    fields.forEach(element => {
                        projection[element] = 1;
                    });
                }

                let posts = 
                await db.models.posts.find(
                    filterQueryObject, 
                    projection
                ).lean();

                return resolve(
                    {
                        message : constants.apiResponses.POST_FETCHED_SUCCESSFULLY,
                        result : posts
                    }
                );

            } catch (error) {
                return reject(error);
            }
        })


    }

    /**
    * Create a post
    * @method
    * @name create
    * @returns {Object} create version data.
    */
   
    static create( data ) {
        return new Promise( async (resolve,reject)=>{
            try {
           
                let post = await db.models.posts.create(data);

                if( post._id ) {
                    data._id = post._id;
                    data.message = constants.apiResponses.POST_CREATED;
                } else {
                    data.message = constants.apiResponses.POST_NOT_CREATED;
                }

                return resolve(data);
            } catch(e) {
                return reject(e);
            }
        })
    }

}


