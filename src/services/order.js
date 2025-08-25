import axios from "axios"

export const placeCustomOrder=async(order)=>{
    const data= axios.post('http://localhost:4000/customOrders',order);
    return data;

}
export const getAllPendingCustomOrder=async()=>{
    const data=await axios.get('http://localhost:4000/customOrders/?status=pending')
    return data.data;
}

export const handleStatusChange = async (id, updates) => {
  const data = await axios.patch(`http://localhost:4000/customOrders/${id}`,updates 
  );
  return data;
};

export const placeOrder=async(order)=>{
    const data= await axios.post('http://localhost:4000/orders',order);
    return data;
}

export const emptyCart=async(userId)=>{
    const data=await axios.patch(`http://localhost:4000/users/${userId}`,{cart:[]});
    return data.data;
}
