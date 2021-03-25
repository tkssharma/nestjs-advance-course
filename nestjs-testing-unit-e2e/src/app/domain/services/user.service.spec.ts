import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { expect } from 'chai';
import User from '../entities/user';
import TestService from './test.service';
import UserService from './user.service';
describe("testing user Service", () => {
  let userService: UserService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {findOne: () => ({data:{}})}
        },
        {
          provide: TestService,
          useValue: { sayHi: () => 'test' }
        }
      ]
    }).compile();
    userService = await module.get<UserService>(UserService)
  });
  describe("Testing user Service after mock", () => {
    it("testing getById method", () => {
      expect(typeof userService.getById('1')).not.equal(null)
    })
    it("testing getByEmail method", () => {
      expect(typeof userService.getByEmail('test@gmail.com')).not.equal(null)
    })
    it("testing sayHello method", () => {
      expect(userService.sayHello('test@gmail.com')).equal('test')
    })
    it("testing register method", () => {
      expect(typeof userService.register({ email: '', name: '', password: '' })).not.equal(null)
    })
  })
})