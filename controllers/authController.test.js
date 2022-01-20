import { jest } from "@jest/globals";
import { registration } from "./authController";
import authService from "../service/auth.js";
import { httpCode } from "../lib/constants";

describe("Unit test registration", () => {
  let req, res, next;
  beforeEach(() => {
    req = { body: { email: "test@test.com", password: "123456789" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    next = jest.fn();
    authService.create = jest.fn(async (data) => data);
  });

  test("SignUp new User", async () => {
    authService.isUserExist = jest.fn(async () => false);
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(httpCode.CREATED);
  });

  test("SignUp already existed User", async () => {
    authService.isUserExist = jest.fn(async () => true);
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(httpCode.CONFLICT);
  });

  test("SignUp with error database", async () => {
    const testError = new Error("Database error");
    authService.isUserExist = jest.fn(async () => {
      throw testError;
    });
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(next).toHaveBeenCalledWith(testError);
  });
});
