const ObjectID = require('mongodb').ObjectID;
class Repository {
    constructor(model) {
     this.model = model;
     this.queryExist="";
    }

    setQueryExist(query){
       this.queryExist=query;
    }

    list(perPage, page){
        return new Promise((resolve, reject) => {
                    this.model.paginate({}, { offset: perPage * page, limit: perPage}, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }});
        });
    }
    /* add to data to database without checking exist */
    create(data,callback){
      const myObject= new this.model(data)
      myObject.save((err, inserted) => {
          let data = {};
          if (err) {
              data = {"success": false, "info": "GenericError", "data": err }
          } else

          data = {
              "success": true,
              "info": "SuccessfulAdded",
              "data": myObject
          };

          callback(data);
      });
    }

    insert(data,cb){
      if(this.queryExist!=""){
        this.model.findOne(this.queryExist,(err,result)=>{
             /* if query error */
            if (err)
               cb( {"success": false, "info": "GenericError", "data": err })
           /* if query success */
            else {
                  /* not exit email record */
                  if (result == null) {
                       this.create(data,(data)=>{
                         cb(data);
                       })

                  }
                else
                  cb({"success": false, "info": "ItemIsExisted", "data": result });
            }//end if query cusscess

        }) //end find

      }// end queryExist

      /* not to check exist */
      else
        this.create(data,(data)=>cb(data))
    }

  /* code system use with Async/await without passing callback function */
    async createAsync(data){
          const myObject= new this.model(data);
          try {
             const result=await myObject.save();
             data = {"success": true,"info": "SuccessfulAdded", "data": myObject};

          } catch (err) {
             data = {"success": false, "info": "GenericError", "data": err };
          }
          return data;
     }

    async insertAsync(data){
        if(this.queryExist!=""){
         try{
            /* check exist record by email */
             const result=await this.model.findOne(this.queryExist);
             if(!result)
                return this.createAsync(data);
             else
                 return {"success": false, "info": "ItemIsExisted", "data": result };
         }catch(err){
             return {"success": false, "info": "GenericError", "data": err };
         }// end try
        } //end queryExist
        else
          return await this.createAsync(data);
    }

    update(id, data,callback){
      this.model.findOneAndUpdate({ _id: ObjectID(id) }, { $set: data }, { new: true }, function (err, updated) {
          if (err) {
              callback({success:false, "info": "GenericError", "data": err });
          }
          else {
              callback({success:true, "info": "SuccessfulUpdated", "data": updated });
          }
      });
    }

    async updateAsync(id, data){
         try {
             result=await this.model.findOneAndUpdate({ _id: ObjectID(id) }, { $set: data }, { new: true });
             return {success:true, "info": "SuccessfulUpdated", "data": result };
          }
          catch(err) {
               return {"success": false, "info": "GenericError", "data": err };
          }
    }

    remove(id, callback){
           let query = { _id: ObjectID(id) };
           this.model.findByIdAndRemove(query, function (err, deleted) {
               if (err) {
                   callback({"success": true, "info": "GenericError", "detail": err });
               }
               else {
                   callback({"success": false, "info": "SuccessfulDeleted" });
               }
           });
    }

    async removeAsync(id){
            const query = { _id: ObjectID(id) };
            try{
               await this.model.findByIdAndRemove(query);
               return {"success": true, "info": "GenericError", "detail": {} };
            }catch(err){
               return {"success": false, "info": "GenericError", "data": err };
            }


     }

}

module.exports = Repository;
