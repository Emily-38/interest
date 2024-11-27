import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthServiceMock } from './mocks/auth.service.mock';
import { authMocks} from './mocks/auth.mock';
import { JwtGuard } from './guards';

describe('AuthController', () => { 
  let controller: AuthController;
  let service: AuthService
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{provide : AuthService, useClass: AuthServiceMock }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService)
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
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
