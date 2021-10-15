const User=require("../model")
module.exports = {
  /**
  * 


  */
  getContestants: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500
    const data=await User.find({});
    const result=[];
    data.forEach(d=>{
        const user={
          "city": d.city,
          "costumeImgUrl": d.costumeImgUrl,
          "costumeTitle": d.costumeTitle,
          "country": d.country,
          "id": d.id,
          "name": d.name,
          "votes": d.votes,
        }
        result.push(user);
    })

    // var data = [{
    //     "city": "<string>",
    //     "costumeImgUrl": "<string>",
    //     "costumeTitle": "<string>",
    //     "country": "<string>",
    //     "id": "<string>",
    //     "name": "<string>",
    //     "votes": "<number>",
    //   }],
    //   status = '200';

     const status='200';

    return {
      status: status,
      data: result
    };  
  },

  /**
  * 

  * @param options.createContestantInlineReqJson.city required
  * @param options.createContestantInlineReqJson.costumeImgUrl required
  * @param options.createContestantInlineReqJson.costumeTitle required
  * @param options.createContestantInlineReqJson.country required
  * @param options.createContestantInlineReqJson.name required

  */
  createContestant: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500
    const ID=Math.random().toString(36).substring(2,8);
    const {name, costumeTitle, costumeImgUrl,city,country}=options.createContestantInlineReqJson;
    if(!name || !costumeTitle || !costumeImgUrl || !city || !country)
      return({ status: 404, data:{ "status":"error","message":"Must provide all fields" }});
    const user={
      id:ID,
      ...options.createContestantInlineReqJson
    };
    const newUser=new User(user);
    await newUser.save(err=>{
      if(err) {console.log(err);return new Error('Internal server problem');}
      else{
        console.log("User created");
        
      }
    })
    var data = {
      "id": ID,
      "status": "ok",
    },
    status = '201';

    return {
      status: status,
      data: data
    }; 
     
  },

  /**
  * 
  * @param options.id The id of a contestant 

  */
  getContestant: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500
    const id=options.id;
    const user=await User.findOne({id:id});

    if(!user) return({ status: 404, data:{ "status":"error","message":"Contestant not found" }});

    var data = {
        "city": user.city,
        "costumeImgUrl": user.costumeImgUrl,
        "costumeTitle": user.costumeTitle,
        "country": user.country,
        "id": user.id,
        "name": user.name,
        "votes": user.votes,
      },
      status = '200';

    return {
      status: status,
      data: data
    };  
  },

  /**
  * 
  * @param options.id The id of a contestant 

  */
  deleteContestant: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500
    const id=options.id;
    const user=await User.findOne({id:id});
    if(!user) return({ status: 404, data:{ "status":"error","message":"Contestant not found" }});
    const del=await User.findOneAndDelete({id:id});

    var data = {
        "status": "ok",
      },
      status = '200';

    return {
      status: status,
      data: data
    };  
  },

  /**
  * 
  * @param options.id the id of a contestant 

  */
  updateContestant: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500
    const id=options.id;
    const user=await User.findOne({id:id});
    if(!user) return({ status: 404, data:{ "status":"error","message":"Contestant not found" }});
    const update= await User.updateOne({id:id},[{$set:{name:options.name}}])

    var data = {
        "status": "ok",
      },
      status = '200';

    return {
      status: status,
      data: data
    };  
  },

  /**
  * 
  * @param options.id The id of a contestant 

  */
  upvoteContestant: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500
    const id=options.id;
    const user=await User.findOne({id:id});
    if(!user) return({ status: 404, data:{ "status":"error","message":"Contestant not found" }});
    const vote=user.votes;
    const update= await User.updateOne({id:id},[{$set:{votes:vote+1}}]);
    var data = {
        "status": "ok",
        "votes": vote+1,
      },
      status = '200';

    return {
      status: status,
      data: data
    };  
  },
};
