const request = require("supertest");
const app = require("../index"); // Express app is defined in this file


//This test case tests static data passed through user 
describe("POST /users", () => {
  it("This creates a new user", async () => {
    const user = { name: "Safwan", location: "Mangalore" };
    const res = await request(app).post("/users").send(user);
    expect(res.statusCode).toBe(200);
  }, 10000);
});

//This fail test case tests static data passed through user which is not having required arguments 
describe("POST /users", () => {
  it("This creates a new user", async () => {
    const user = { name: "Safwan" };
    const res = await request(app).post("/users").send(user);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      message: "User validation failed: location: Please enter user location",
    });
  });
});

//This test case fetches the data 
describe("GET /users", () => {
  it("User data fetched ", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
  });
});

//This fail test case tries Update data passed through updateUser with wrong id_
describe("PUT /users", () => {
  it("User updated successfully", async () => {
    const id = "645243630a0d83d8202a9a0e";
    const updateUser = { name: "xyz", location: "ixe" };
    const res = await request(app).put(`/users/${id}`).send(updateUser);
    expect(res.statusCode).toBe(200);
  }, 10000);
});

//This test case Updates data passed through updateUser 
describe("PUT /users", () => {
  it("User updation failed id ", async () => {
    const updatedUser = { name: "xyz", location: "mangalore" };
    const res = await request(app)
      .put("/users/Udft24")
      .send(updatedUser);
    expect(res.statusCode).toBe(500);
  }, 10000);
});
