import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

jest.setTimeout(15000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.collection("users").deleteMany({});
  await mongoose.connection.close();
});

describe("User API", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Test Jest",
      email: "jest@example.com",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test Jest");
  });
});
