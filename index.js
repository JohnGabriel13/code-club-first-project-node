/* - Query params => meusite.com/users?nome=gabriel&age=24 //FILTROS
   - Route params => /users/2  //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
   - Request Body => { "name": "Gabriel", "age":24 }

   - GET           => BUSCAR INFORMAÇÕES NO BACK-END
   - POST          => CRIAR INFORMAÇÕES NO BACK-END
   - PUT / PATCH   => ALTERAR/ATUALIZAR INFORMAÇÕES BACK-END
   - DELETE        => DELETAR INFORMAÇÃO NO BACK- END 
   
   - Middlewares   => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição 
   */




const express = require ('express')
const uuid =  require ('uuid')

const port = 3000
const app = express ()
app.use ( express.json())



const users = []

const checkUserId = (request,response,next) => {
    const { id } =  request.params

    const index = users.findIndex ( user => user.id === id )
    
    if (index < 0){
        return response.status(404).json({message: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next ()
}

app.get('/users', (request, response) => {  
    // o Get ele mostra o valor do array atualizado então voce sempre vai puxar o o array original " Users"
    return response.json (users) 
})

app.post('/users', (request, response) => {
    // colocar novos usuario
    const { name , age } = request.body  
    const user = { id:uuid.v4(), name , age }

    users.push(user)
    return response.status(201).json( users )
})

app.put('/users/:id',checkUserId, (request, response) => {
    // atualiza os users
    const { name, age } = request.body 
    const id = request.userId

    const index = request.userIndex

    const updatedUser =  { id , name , age }

    users [index] = updatedUser 

    return response.json (updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {  

    const index = request.userIndex

    users.splice (index,1)

    return response.status(204).json()
})

app.listen (port, () => {
    console.log(`🤖 Server started on port ${port}`)
})


