import axios from "axios"

export const logUserIn=async(email,password)=>{
    let data=await axios.get(`http://localhost:4000/users/?email=${email}&password=${password}`)
    return data;
}

export const findEmail=async(email)=>{
    let data=await axios.get(`http://localhost:4000/users/?email=${email}`)
    return data.data;

}