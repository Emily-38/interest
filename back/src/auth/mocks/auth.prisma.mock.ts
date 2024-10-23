export const authPrismaMock = {
    user:{
        findUnique: jest.fn(),
        create: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn()
    }
}