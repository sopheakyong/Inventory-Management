const ObjectID = require('mongodb').ObjectID;
var myModel
var queryExist=""
module.exports={
   setModel: (model)=>{
     myModel=model;
   },
   setQueryExist:(query)=>
   {
     queryExist=query
   },

   list: (perPage, page) => {
         // return new Promise((resolve, reject) => {
         //     myModel.find()
         //         .limit(perPage)
         //         .skip(perPage * page)
         //         .exec(function (err, users) {
         //             if (err) {
         //                 reject(err);
         //             } else {
         //                 resolve(users);
         //             }
         //         })
         // });
         return new Promise((resolve, reject) => {
                     myModel.paginate({}, { offset: perPage * page, limit: perPage}, function (err, result) {
                     if (err) {
                         reject(err);
                     } else {
                         resolve(result);
                     }});
         });
   },

   /* add to data to database without checking exist */
   create: (data,callback)=>{
     const myObject= new myModel(data)
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


   },

  insert: (data,cb)=>{
     if(queryExist!=""){
       myModel.findOne(queryExist,(err,result)=>{
            /* if query error */
           if (err)
              cb( {"success": false, "info": "GenericError", "data": err })
          /* if query success */
           else {
                 /* not exit email record */
                 if (result == null) {
                      module.exports.create(data,(data)=>{
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
       module.exports.create(data,(data)=>cb(data))
   },

 /* code system use with Async/await without passing callback function */
 createAsync: async(data)=>{
       const myObject= new myModel(data);
       try {
          result=await myObject.save();
          data = {"success": true,"info": "SuccessfulAdded", "data": myObject};
       } catch (err) {
          data = {"success": false, "info": "GenericError", "data": err };
       }
       return data;
  },
  insertAsync: async (data)=>{
       if(queryExist!=""){
        try{
            const result=await myModel.find(queryExist);

            if(!result)
                return await module.exports.createAsync(data);
            else
                return {"success": false, "info": "ItemIsExisted", "data": result };
        }catch(err){
            return {"success": false, "info": "GenericError", "data": err };
        }// end try
       } //end queryExist
       else
         return await module.exports.createAsync(data);



   },


  update: (id, data,callback) => {
     myModel.findOneAndUpdate({ _id: ObjectID(id) }, { $set: data }, { new: true }, function (err, updated) {
         if (err) {
             callback({success:false, "info": "GenericError", "data": err });
         }
         else {
             callback({success:true, "info": "SuccessfulUpdated", "data": updated });
         }
     });
   },

   updateAsync: async(id, data) => {
        try {
            result=await myModel.findOneAndUpdate({ _id: ObjectID(id) }, { $set: data }, { new: true });
            return {success:true, "info": "SuccessfulUpdated", "data": result };
         }
         catch(err) {
              return {"success": false, "info": "GenericError", "data": err };
         }
   },

  remove: (id, callback) => {
          let query = { _id: ObjectID(id) };
          myModel.findByIdAndRemove(query, function (err, deleted) {
              if (err) {
                  callback({"success": true, "info": "GenericError", "detail": err });
              }
              else {
                  callback({"success": false, "info": "SuccessfulDeleted" });
              }
          });
   },

   removeAsync: async(id) => {
           const query = { _id: ObjectID(id) };
           try{
              await myModel.findByIdAndRemove(query);
              return {"success": true, "info": "GenericError", "detail": {} };
           }catch(err){
              return {"success": false, "info": "GenericError", "data": err };
           }


    },


   remove_: (id)=>{
     return new Promise((resolve, reject) => {
         myModel.deleteMany({_id: id}, (err) => {
             if (err) {
                 reject(err);
             } else {
                 resolve(err);
             }
         });
     });
   }


} /*end  export */
