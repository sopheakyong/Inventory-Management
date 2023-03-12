"use strict"
const ObjectID = require('mongodb').ObjectID
var Repository
var stringExist=""
var arrCriterial=[]
 /* this method call first time on the object controller */
exports.setRepository=(Repos,queryExist,queryCriteria)=>{
     Repository=Repos
     stringExist=queryExist
     arrCriterial=queryCriteria
     /* for sample convert string to object */
     /*
       paramExist="{name: data.name}"
       data={name:"hello",email:"sopheak@yahoo.com"}
       paramExist="{name:data.name,email:data.email}"
       eval("(" + paramExist + ")");
     */
  }

exports.create = async (req, res) => {
  try {
        /* for checking existing except id  */
        const queryWithId= "{ $ne: ObjectID(null)}"
        const id= eval("(" + queryWithId + ")")
        const data=req.body
        Repository.setQueryExist(eval("(" + stringExist + ")")) /* eval use for convert string to object   eval("(" + varstring + ")");*/
        const doc=await Repository.insert(data)
        res.status(200).send(doc)
      }
      catch (error) {
        res.status(400).send({ error: error.message })
  }

}

exports.update = async(req, res) => {
    try {
        const data=req.body
        /* for checking existing except id  */
        const queryWithId= "{ $ne: ObjectID(req.body.id)}"
        const id= eval("(" + queryWithId + ")")
        Repository.setQueryExist(eval("(" + stringExist + ")")) /* eval use for convert string to object   eval("(" + varstring + ")");*/


        const result=await Repository.update(req.body.id, data)
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send({ error: error.message })
      }
}

/*group?page=0&limit=null&sortBy=name&OrderBy=asc */
exports.list = async (req, res) => {
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
        for(var i=0;i<arrCriterial.length;i++)
          {
            if(req.query[arrCriterial[i]])
              if(arrCriterial[i]=="id")
                query=query + `'_${arrCriterial[i]}'` + ": '" + req.query[arrCriterial[i]] + "', "
              else
                query=query + `'${arrCriterial[i]}'` + ": /" + req.query[arrCriterial[i]] + "/, "
          }


        if(query.length>1){
            query=query.substr(0,query.length-2) + "}"
            criterial=eval("("+ query +")")
        }

        if(req.query.sortBy && req.query.OrderBy){
            sort[req.query.sortBy]   = req.query.OrderBy === 'desc' ? -1 : 1
        }
        const result=await Repository.list(limit, page,criterial,sort)
        res.status(200).send(result)
    } catch (error) {
      res.status(400).send({ error: error.message })
    }

}

exports.getById = async (req, res) => {
    const result=await Repository.getById(req.params.id)
    res.status(200).send(result)

}

/* find exist record base on QueryExist and request */
exports.exist = async (req, res) => {
    const result=await Repository.exist(req.body)
    res.status(200).send(result)

}

exports.removeById = (req, res) => {
    Repository.removeById(req.params.id)
        .then((result)=>{
            res.status(204).send({result})
        })
}

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
