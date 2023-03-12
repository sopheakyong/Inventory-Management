var user_route=require('./../app-user-managment/routes')
//var asset_route=require('./../app-asset-management/routes')

//  ,
routes =
[
    user_route,
    //asset_route
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
