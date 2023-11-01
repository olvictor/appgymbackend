const { cadastarUsuario } = require("../usuarios")
const request = require('supertest')
// const app = require('../../')
const app = require('../../index')


describe('Teste Usuarios',() =>{
    // test("Cadastrar usuário com sucesso", async()=>{
        
        //     const req = {
            //         body: {
                //             username: "testando",
    //             email: "aaaa3@aa.com",
    //             senha: "123"
    //         }
    //     }
    //     const res = {
        //         status : jest.fn().mockReturnThis(),
        //         json: jest.fn()
        //     }
        
        //     await cadastarUsuario(req,res);
        
        //     expect(res.status).toHaveBeenCalledWith(201);
        
        // })
        
        it('Testando it', async ()=>{
        
            const res = await request(app).post('/user/cadastrar').send({
                username:'teste',
                email:'teste10010@teste.com',
                senha:'123'
            })


        expect(res.status).toBe(201);
    })
})