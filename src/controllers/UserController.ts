import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"


// Get all Users
export const getUsers = async(req:Request, res:Response) => {

  const userRepository = AppDataSource.getRepository(User)
  const users = await userRepository.find()
  return res.status(200).json(users)

}

// Create a User
export const createUser = async(req: Request, res:Response) => {
  try {
    const { firstName, lastName, age } = req.body

    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.age = age

    const userRepository = AppDataSource.getRepository(User)
    
    await userRepository.save(user)    
    
    return res.status(200).send(user)
    
  } catch (error) {
    res.status(400).json({message: "Invalid Credentials"})
  }  
}

// Update User
export const updateUser = async(req:Request, res:Response) => {
  try {
    const { firstName, lastName, age } = req.body

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id: parseInt(req.params.id)})
    
    user.firstName = firstName
    user.lastName = lastName
    user.age = age

    await userRepository.save(user)

    return res.status(200).send(user)

  } catch (error) {
    res.status(400).json({message: `No user with id:${req.params.id}`})
  }

}

// Delete User
export const deleteUser = async(req:Request, res:Response) => {
  try {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id: parseInt(req.params.id)})

    await userRepository.remove(user)
    
    return res.status(200).json({message: "User deleted successfully"})

  } catch (error) {
    res.status(400).json({message: "Invalid id"})
  }
}