"use strict";
const User=require('../models/users.model')
const BaseRespository=require('./../../repositories/base.repositories')
/* pass model to BaseRepository */


/* add more method to BaseRepository */
BaseRespository.findByEmail=async(email)=>{
  return await User.find({email: email});
}

BaseRespository.setModelUser=()=>{
    BaseRespository.setModel(User);
};

BaseRespository.register= (data,cb)=>
{
      BaseRespository.setQueryExist({email: data.email})
      BaseRespository.insert(data, (data) =>{
        if(data.success){
            const user=data.data;
            const token = user.generateAuthToken();
          }
        else
            data = {error: true, error_message: 'Regiter fails' };
        cb(data);
      })
}

BaseRespository.registerAsync= async (data)=>
{
      BaseRespository.setQueryExist({email: data.email});
      const result=await BaseRespository.insertAsync(data);
      if (result.success) {
          //const token =await user.generateAuthToken();
          data={auth: true, user: result, token: "token"};
      }
      else
        data = {error: true, error_message: 'Regiter fails abc', result: result}

      return data;

      // const result=await User.findOne({email:'sopheak41@gmail.com'})
      // return {"success": false, "info": "ItemIsExisted", "data": result };


}

BaseRespository.login= async(data)=>{
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

module.exports=BaseRespository;
