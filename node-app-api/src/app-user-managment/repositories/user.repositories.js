"use strict";
const User=require('../models/users.model');
const BaseRespository=require('./../../repositories/base.repositories');
/* pass model to BaseRepository */
const Repository=new BaseRespository(User)

Repository.register= async (data)=>
{
      Repository.setQueryExist({email: data['email']}); // data.email
      const result=await Repository.insert(data);
      if (result.success) {
          const token =await result.data.generateAuthToken();
      }
      return result;

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
        data={success: true, user, token};
      }

      return data;
}

module.exports=Repository;
