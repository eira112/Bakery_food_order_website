import axios from "axios"

export const addUser=async(user)=>{
    let data=await axios.post("http://localhost:4000/users",user)
    return data;
    
}

export const getUserById = async(id)=>{
    let data = await axios.get(`http://localhost:4000/users/${id}`)
    return data
}