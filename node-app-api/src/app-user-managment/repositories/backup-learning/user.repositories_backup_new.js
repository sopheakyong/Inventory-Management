"use strict";
const User=require('../models/users.model');
const BaseRespository=require('./../../repositories/base.repositories');
/* pass model to BaseRepository */
const Repository=new BaseRespository(User)
Repository.register= (data,cb)=>
{
      Repository.setQueryExist({email: data.email})
      Repository.insert(data, (data) =>{
        if(data.success){
            const user=data.data;
            const token = user.generateAuthToken();
          }
        else
            data = {error: true, error_message: 'Regiter fails' };
        cb(data);
      })
}

Repository.registerAsync= async (data)=>
{
      Repository.setQueryExist({email: data.email});
      const result=await Repository.insertAsync(data);
      if (result.success) {
          //const token =await result.data.generateAuthToken();
          data={auth: true, user: result, token: "token"};
      }
      else
        //data = {error: true, error_message: 'ItemIsExisted', result: result.data[0].email}
        data = {error: true, error_message: 'ItemIsExisted', result}

      return data;

}

Repository.login= async(data)=>{
      const { email, password } = data;
      const user = await User.findByCredentials(email, password);
      if (!user) {
          data = {
              error: true,
              error_message: 'Login failed! Check authentication credentials'
          };
      } else{
        /* password is correct */
        const token = await user.generateAuthToken();
        data={auth: true, user, token};
      }

      return data;
}

module.exports=Repository;
