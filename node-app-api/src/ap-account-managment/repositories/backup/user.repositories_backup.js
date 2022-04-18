"use strict";
const User=require('../models/users.model')
const BaseRespository=require('./../../repositories/base.repositories')
/* pass model to BaseRepository */
BaseRespository.setModel(User)
BaseRespository.findByEmail=(email)=>{
  return User.find({email: email})
}

BaseRespository.register_sample= (data,cb)=>
{
       /* find email for checking existing record */
       User.findOne({email: data.email},(err,user)=>{
            /* if query error */
           if (err)
             return cb( {"success": false, "info": "GenericError", "data": err })
          /* if query success */
           else {
                 /* not exit email record */
                 if (user == null) {
                    BaseRespository.create(data, (data) =>
                          {
                              /* transform json data to user object */
                              const user=data.data;
                              const token = user.generateAuthToken();
                              cb(data);
                          });
                 }
               else
                 cb({"success": false, "info": "ItemIsExisted", "data": user });
           }

       })

}

BaseRespository.register= (data,cb)=>
{
      BaseRespository.setExist({email: data.email})
      BaseRespository.createCheckExist(data, (data) =>{
        const user=data.data;
        if(data.success){
            const token = user.generateAuthToken();
          }
        cb(data);
      })
}

BaseRespository.registerAsync= async (data)=>
{
      BaseRespository.setExist({email: data.email});
      result=await BaseRespository.createCheckExistAsync(data);
       if(result.success){
          const user=result.data;
          const token =await user.generateAuthToken();
      }
      return result;

}

BaseRespository.login12= async(data,cb)=>{
      const { email, password } = data
      const user = await User.findByCredentials(email, password)
      if (!user) {
          data = {
              error: true,
              error_message: 'Login failed! Check authentication credentials'
          };
      } else{
        /* password is correct */
        const token = await user.generateAuthToken()
        data={'data': {user}}
      }

      return cb(data)
}

module.exports=BaseRespository;
