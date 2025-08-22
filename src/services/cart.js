import axios from "axios"

export const handleAddToCart = async(userId,quantity,itemId,price)=>{

    console.log(userId, quantity, itemId)
    let isPresent =false
    let userData =(await axios.get(`http://localhost:4000/users/${userId}`)).data
    let currentCart = userData.cart || []
    if(currentCart.length>0){
        currentCart.forEach(
            (item)=>{
                if(item.itemId.trim() === itemId.trim()){
                    item.quantity+=quantity
                    isPresent = true
                }
            }
        )
    }
    if(!isPresent){
        currentCart.push({itemId,quantity,price})
    }
    axios.patch(`http://localhost:4000/users/${userId}`,{cart: currentCart})

}

export const updateUserCart = async (userId, cart) => {
  return axios.patch(`http://localhost:4000/users/${userId}`, { "cart":cart });
};