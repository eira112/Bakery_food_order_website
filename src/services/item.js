import axios from "axios"

export const addMenuItem=async(item)=>{
    const data=await axios.post('http://localhost:4000/items',item);
    return data;
}

export const getAllItem=async()=>{
    const data=await axios.get("http://localhost:4000/items");
    return data;
}

export const getItemByCategory = async(category)=>{
    const data = await axios.get(`http://localhost:4000/items/?category=${category}`)
    return data
}


export const fileToBase64 = (file)=>{

    return new Promise((resolve, reject)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>resolve(reader.result)
        reader.onerror = (error)=> reject(error)
    })
}