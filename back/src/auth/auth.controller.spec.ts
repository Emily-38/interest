import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthServiceMock } from './mocks/auth.service.mock';
import { authMocks} from './mocks/auth.mock';

describe('AuthController', () => { 
  let controller: AuthController;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{provide : AuthService, useClass: AuthServiceMock }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

describe('login',()=>{
  it("should return jwt and interest", ()=>{
    const dto={
      email: "test@gmail.com",
      password:"test"}
     
    expect(controller.login(dto)).resolves.toEqual(authMocks)
  })
})
describe('validateAccount',()=>{
  it("should return 'compte activé' ", ()=>{
    const token= "test"
    expect(controller.validateAccount(token)).resolves.toEqual('compte activé')
  })
})

});
