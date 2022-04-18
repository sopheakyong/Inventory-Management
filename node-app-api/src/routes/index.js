var user_route=require('./../ap-account-managment/routes')
var loan_route=require('./../ap-loan-management/routes')
//  ,
routes =
[
    user_route,
    loan_route
];
exports.routesConfig=(app)=>{
  app.use(routes)
}


/* other systel

module.exports=
[
    user_route,
    loan_route
];

when call in app.js

 var app_route=require('./routes')
 app.use(app_route)
*/
