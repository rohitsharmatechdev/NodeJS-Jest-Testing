const request = require("supertest");
const User = require("../database/models/user");
const Receipe = require("../database/models/receipe");

const app = require("../index");
const bcrypt = require("bcrypt");
const mongoose = require("../database/dbConnection");

let token;

const payload = {
  login: {
    username: "testuser",
    password: "testuser",
  },
  receipe: {
    name: "test-egg curry",
    type: "Non-veg",
  },
};

beforeAll(async () => {
  //create a user
  const password = bcrypt.hashSync(payload.login.password, 10);
  const user = {
    username: payload.login.username,
    password,
  };
  await User.create(user);
});

afterAll(async () => {
  await User.deleteMany({ username: payload.login.username });
  await Receipe.deleteMany({ name: payload.receipe.name });

  mongoose.disconnect();
});

describe("Test the receipe API", () => {
  describe("API", () => {
    describe("GET /health", () => {
      it("should return a 200", async () => {
        const res = await request(app).get("/health");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: "working" });
      });
    });

    describe("POST /login", () => {
      it("authencticate user and sign him in", async () => {
        const res = await request(app).post("/login").send(payload.login);
        token = res.body.token;

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
          status: true,
          token,
          data: { ...res.body.data },
        });
      });
    });

    describe("POST /receipe", () => {
      it("should be create a receipe", async () => {
        const response = await request(app)
          .post("/receipe")
          .send(payload.receipe)
          .set("token", token);
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({ ...payload.receipe, id: response.body.id });
      });
    });
  });
});
