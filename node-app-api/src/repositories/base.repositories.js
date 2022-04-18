const ObjectID = require('mongodb').ObjectID
class Repository {
constructor(model) {
       this.model = model
       this.queryExist=""
       this.queryCriteria={}
    }
 setQueryExist(query){
       this.queryExist=query
    }

 setQueryCriteria(query){
       this.queryCriteria=query
    }



  async list(perPage, page, query={}, sort={}){
        try
        {
          const result=await this.model.paginate(query, { offset: perPage * page, limit: perPage, sort: sort})
          result.success=true
          return result

        }
        catch (err) {
           return {"error": true, "info": "GenericError", "data": err }
        }

    }

  /* code system use with Async/await without passing callback function */
  async create(data){
          const myObject= new this.model(data)
          try {
             const result=await myObject.save()
             data = {"success": true,"info": "SuccessfulAdded", "data": myObject}

          } catch (err) {
             data = {"error": true, "info": "GenericError", "data": err }
          }
          return data
     }

  async insert(data){

    try {
         var result=await this.exist()
         if(!result.exist){
            return this.create(data)
         }
         else
             return {"success": false, "info": "ItemIsExisted", "data": data }
       }
       catch(err) {
            return {"error": true, "info": "GenericError", "data": err }
       }

    }

  async update(id, data){
       try {
            var result=await this.exist()
            if(!result.exist){
                result=await this.model.findOneAndUpdate({ _id: ObjectID(id) }, { $set: data }, { new: true })
                return {"success": true, "info": "SuccessfulUpdated", "data": result }
            }
            else
                return {"success": false, "info": "ItemIsExisted", "data": data }
          }
          catch(err) {
               return {"error": true, "info": "GenericError", "data": err }
          }
    }

  async getById(id){
      try{
          const result=await this.model.findById({ _id: ObjectID(id)})
          return {"success": true, "info": "Successful", "data": result }
        }
        catch(err){
           return {"error": true, "info": "GenericError", "data": err }
        }
    }

  async exist(data){
        try{
            const query= data != null ?  data : this.queryExist
            const result=await this.model.findOne(query)

            if(result)
                return {"success" :true, "info": "Successful", "data": result , "exist": true}
            else
                return {"success" :true, "info": "Successful", "data": null, "exist": false }
          }
          catch(err){
             return {"error": true, "info": "GenericErrorabc", "data": err }
          }


      }

  async remove(id){
            const query = { _id: ObjectID(id) }
            try{
               await this.model.findByIdAndRemove(query)
               return {"success": true, "info": "SuccessfulRemoved", "data": result }
            }catch(err){
               return {"success": false, "info": "GenericError", "data": err }
            }


     }

}

module.exports = Repository


// list(perPage, page, query={}, sort={}){
//    const query = this.queryCriteria;
//     return new Promise((resolve, reject) => {
//                 this.model.paginate(query, { offset: perPage * page, limit: perPage, sort: sort}, function (err, result) {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve(result)
//                 }})
//     })
//
// }

/* call
// Repository.list(limit, page)
//     .then((result) => {
//         res.status(200).send(result)
//     })


// data={name:"hello",email:"sopheak@yahoo.com"}
//  paramExist="{name:data.name,email:data.email}"
//  eval("(" + paramExist + ")");

// async checkExist(data){
//
//           try{
//               const result=await this.model.findOne(data)
//               if(result)
//                   return {"success" :true, "info": "Successful", "data": result , "exist": true}
//               else
//                   return {"success" :true, "info": "Successful", "data": null, "exist": false }
//             }
//             catch(err){
//                return {"error": true, "info": "GenericErrorabc", "data": err }
//             }
//
//
//         }

/* sample */
/*
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'itemsList',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};

const options = {
  page: 1,
  limit: 10,
  customLabels: myCustomLabels,
};

Model.paginate({}, options, function (err, result) {
  // result.itemsList [here docs become itemsList]
  // result.paginator.itemCount = 100 [here totalDocs becomes itemCount]
  // result.paginator.perPage = 10 [here limit becomes perPage]
  // result.paginator.currentPage = 1 [here page becomes currentPage]
  // result.paginator.pageCount = 10 [here totalPages becomes pageCount]
  // result.paginator.next = 2 [here nextPage becomes next]
  // result.paginator.prev = null [here prevPage becomes prev]
  // result.paginator.slNo = 1 [here pagingCounter becomes slNo]
  // result.paginator.hasNextPage = true
  // result.paginator.hasPrevPage = false
});
*/

/*
router.get('/posts',authenticate, async (req,res) => {
    //const _ispublished = req.query.published;
    const match = {}
    const sort  = {}

    if(req.query.published){
        match.published = req.query.published === 'true'
    }

    if(req.query.sortBy && req.query.OrderBy){
        sort[req.query.sortBy]   = req.query.OrderBy === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path:'posts',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.posts)
    } catch (error) {
        res.status(500).send()
    }
})
*/
