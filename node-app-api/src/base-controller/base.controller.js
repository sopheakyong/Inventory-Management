//"use strict"
const ObjectID = require('mongodb').ObjectID

class BaseController {
  constructor(respository,queryExist,queryCriteria) {
    this.Repository=respository
    this.stringExist=queryExist
    this.arrCriterial=queryCriteria

    this.create=this.create.bind(this)
    this.update=this.update.bind(this)
    this.list = this.list.bind(this)
    this.getById = this.getById.bind(this)
    this.exist=this.exist.bind(this)
    this.removeById=this.removeById.bind(this)


  }
  /* note of using bind
  what gets passed to your router is just a reference to the .list method. The userController instance gets lost. This is not unique to routers - this is a generic property of how things are passed in Javascript. To understand further, what you are essentially doing is this:
  https://stackoverflow.com/questions/45643005/why-is-this-undefined-in-this-class-method
*/
 async create(req, res) {
    try {
          /* for checking existing except id  */
          const queryWithId= "{ $ne: ObjectID(null)}"
          const id= eval("(" + queryWithId + ")")  /* it relate to controller const queryExist="{name: data.name, _id: id}" */

          const data=req.body
          this.Repository.setQueryExist(eval("(" + this.stringExist + ")")) /* eval use for convert string to object   eval("(" + varstring + ")");*/
          const doc=await this.Repository.insert(data)
          res.status(200).send(doc)
        }
        catch (error) {
          res.status(400).send({ error: error.message })
    }

  }

 async update(req, res) {
      try {
          const data=req.body
          /* for checking existing except id  */
          const queryWithId= "{ $ne: ObjectID(req.body.id)}"
          const id= eval("(" + queryWithId + ")")
          this.Repository.setQueryExist(eval("(" + this.stringExist + ")")) /* eval use for convert string to object   eval("(" + varstring + ")");*/


          const result=await this.Repository.update(req.body.id, data)
          res.status(200).send(result);
        } catch (error) {
          res.status(400).send({ error: error.message })
        }
  }

  /*group?page=0&limit=null&sortBy=name&OrderBy=asc */
 async list(req, res) {
    var query="{"
    var criterial={}
    var sort={}

    try {
          let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10
          let page = 0;
          if (req.query) {
              if (req.query.page) {
                  req.query.page = parseInt(req.query.page)
                  page = Number.isInteger(req.query.page) ? req.query.page : 0
              }
          }
          for(var i=0;i<this.arrCriterial.length;i++)
            {
              if(req.query[this.arrCriterial[i]])
                if(this.arrCriterial[i]=="id")
                  query=query + `'_${this.arrCriterial[i]}'` + ": '" + req.query[this.arrCriterial[i]] + "', "
                else
                  query=query + `'${this.arrCriterial[i]}'` + ": /" + req.query[this.arrCriterial[i]] + "/, "
            }


          if(query.length>1){
              query=query.substr(0,query.length-2) + "}"
              criterial=eval("("+ query +")")
          }

          if(req.query.sortBy && req.query.OrderBy){
              sort[req.query.sortBy]   = req.query.OrderBy === 'desc' ? -1 : 1
          }
          const result=await this.Repository.list(limit, page,criterial,sort)
          res.status(200).send(result)
      } catch (error) {
        res.status(400).send({ error: error.message,status:2 })
      }

  }

 async getById(req, res) {
      const result=await this.Repository.getById(req.params.id)
      res.status(200).send(result)

  }
  /* find exist record base on QueryExist and request */
 async exist(req, res) {
      const result=await this.Repository.exist(req.body)
      res.status(200).send(result)
  }

 async removeById(req, res) {
      const result=await this.Repository.removeById(req.params.id)
      res.status(200).send({result})
          // .then((result)=>{
          //     res.status(204).send({result})
          // })
  }


}

module.exports = BaseController












/*
  const obj = JSON.parse(JSON.stringify(req.body));
  var obj1=req.body
  obj1.name="hello"
*/
//export default { setRepository, create, update, list, getById, removeById };
//JSON.stringify(req.body) convert json to string
// function jsonCopy(src) {
//   return JSON.parse(JSON.stringify(src)); convert string to json
// }const source = {a:1, b:2, c:3};
// const target = jsonCopy(source);
// console.log(target); // {a:1, b:2, c:3}// Check if clones it and not changing it
// source.a = 'a';
// console.log(source.a); // 'a'
// console.log(target.a); // 1
