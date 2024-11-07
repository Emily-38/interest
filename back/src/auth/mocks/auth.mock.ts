export const interestMock ={
    id:1,
    name:"test",
    createdAt:"0000000",
    updatedAt:"0000000"
  }

  export const authMocks={ 
    token: { access_token: expect.any(String)},
    interest: interestMock,
  }
 export const dto = {
    email: 'test@gmail.com',
    password: 'test', 
  };
  export const user = {
    email: 'test@gmail.com',
    pseudo: 'test',
    age: 18,
    gender: 'Femme',
    password:'Test38450*',
    confirmPassword:'Test38450*'
  }