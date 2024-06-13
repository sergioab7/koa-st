
import { expect, test } from "vitest";
import request from "supertest";
import app from "../../server";

//Vitest
test('POST /register should add a new user correctly', async() => {
    const newUser = {
        usuario:"jose",
        email:"jose@jose.com",
        password:"jose"
    }
    const response = await request('http://localhost:3002')
        .post("/register")
        .send(newUser) 
    expect(response.statusCode).toBe(201)
})