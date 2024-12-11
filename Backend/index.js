import express, { json } from "express"
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())

const obj = [{
    id:1,
    value: "PUNE",
    displayText: "Pune"
},
{
    id:2,
    value: "MUMBAI",
    displayText: "Mumbai"
},
{
    id:3,
    value: "DELHI",
    displayText: "Delhi"
},
{
    id:4,
    value: "PATNA",
    displayText: "Patna"
},
{
    id:5,
    value: "CHENNAI",
    displayText: "Chennai"
},
{
    id:6,
    value: "KOLKATA",
    displayText: "Kolkata"
}]

const featuredTechnician = [
    {
        id:1,
        imageUrl: "https://res.cloudinary.com/dh8g9mloe/image/upload/v1733834397/Avatar_2_jlsqv8.png",
        role: "Metro Hardware",
        services: 22,
        rating: "8/10",
        reviews: 89
    },
    {
        id:1,
        imageUrl: "https://res.cloudinary.com/dh8g9mloe/image/upload/v1733834397/Avatar_2_jlsqv8.png",
        role: "Metro Hardware",
        services: 22,
        rating: "8/10",
        reviews: 89
    },
    {
        id:3,
        imageUrl: "https://res.cloudinary.com/dh8g9mloe/image/upload/v1733834397/Avatar_2_jlsqv8.png",
        role: "Metro Hardware",
        services: 22,
        rating: "8/10",
        reviews: 89
    }

]

const authorizedUser = [{
    username: "ritesh",
    password: 'ritesh@2021'
},
{
    username: "rahul",
    password: 'rahul@2021'
},]

app.get("/locations", (request, response) => {
    response.send(obj);
})

app.get("/featured-technicians", (request, response) => {
    response.send(featuredTechnician)
})

const secretkey = "your_secret_key"

app.post("/login", (request,response) => {
    const {username,password} = request.body
    const filteredData = authorizedUser.filter(eachItem => eachItem.username === username && eachItem.password === password)
    if(filteredData.length === 1){
        const payload = {
            username,
            password
        }
        const jwtToken = jwt.sign(payload, secretkey, {expiresIn: "1h"})
        response.send({jwtToken})
    }
    else{
        response.status(404)
        response.send({status:"username or password didn't match"})
    }
})

const port  = process.env.port || 3000

app.listen(port, () => 
    console.log(`server is running at port ${port}`)
)