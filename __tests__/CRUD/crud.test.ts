
import { expect, test, describe } from "vitest";
import request from "supertest";
// import app from "../../server";

//Vitest
describe('CRUD', () => {
    // test('POST /register should add a new user correctly', async() => {
    //     const newUser = {
    //         usuario:"jose23",
    //         email:"jose23@jose3.com",
    //         password:"jose3"
    //     }
    //     const response = await request('http://localhost:3002')
    //         .post("/register")
    //         .send(newUser) 
    //     expect(response.statusCode).toBe(201)
    // })
    test('/user/:id should give me the parameter 2', async() => {
        const userId = "sergio"
        const response = await request('http://localhost:3002')
            .get(`/user/${userId}`)
        expect(response.text).toBe(userId)
        expect(response.status).toBe(200)
    })
    test('/show_users should show all users', async() => {
        const response = await request("http://localhost:3002/show_users")
        expect(response).toBe(200)
    })
})