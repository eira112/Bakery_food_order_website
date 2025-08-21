import axios from "axios"

export const handleAddToCart = async(userId,quantity,itemId)=>{

    console.log(userId, quantity, itemId)
    let isPresent =false
    let userData =(await axios.get(`http://localhost:4000/users/${userId}`)).data
    let currentCart = userData.cart || []
    currentCart.forEach(
        (item)=>{
            if(item.itemId.trim() === itemId.trim()){
                item.quantity+=quantity
                isPresent = true
            }
        }
    )
    if(!isPresent){
        currentCart.push({itemId,quantity})
    }
    axios.patch(`http://localhost:4000/users/${userId}`,{cart: currentCart})

}