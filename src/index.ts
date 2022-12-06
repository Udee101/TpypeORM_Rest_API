import * as express from "express"
import { AppDataSource } from "./data-source"
import userRoutes from "./routes/usersRoutes"
AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!");
    
}).catch(error => console.log(error))

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)

app.listen(5000)