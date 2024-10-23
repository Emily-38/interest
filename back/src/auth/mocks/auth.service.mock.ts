import { authMocks } from "./auth.mock"

export class AuthServiceMock {
 register = jest.fn()
 login = jest.fn().mockResolvedValue(authMocks)
 validateAccount= jest.fn().mockResolvedValue('compte activé')
}