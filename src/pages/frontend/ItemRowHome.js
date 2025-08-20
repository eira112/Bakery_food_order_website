import { useNavigate } from "react-router"

const ItemRowHome = (props)=>{
    const navigate=useNavigate();
    if(props.items.length > 0){
        return props.items.map((item,index)=>{
            if(item.category === props.category){
                return(
                    <div className="col-md-4 mb-4" key={index} onClick={()=>navigate(`/description/${item.id}`)}>
                        <div className="card h-100 shadow-sm">
                            <img src={item.productImage} className="card-img-top" alt="Item 1" />
                            <div className="card-body">
                                <h5 className="card-title">{item.productName}</h5>
                                <p className="card-text">{item.description}</p>
                                <div className="d-flex justify-content-between align-items-center price-and-cart">
                                <span className="fw-bold">Rs. {item.price}</span>
                                <button className="btn btn-sm cart-btn" onClick={(e)=>{
                                    e.stopPropagation();
                                    // add add to cart logic later
                                }}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            
        })
    }
}

export default ItemRowHome