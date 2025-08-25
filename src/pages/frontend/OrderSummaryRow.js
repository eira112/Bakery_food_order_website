const OrderSummaryRow = (props)=>{
    return props.items.map(
        (item,index)=>{
            return (
                <div key={index} className={`checkout-page__cart-item ${index === props.items.length - 1 ? 'checkout-page__cart-item--last' : ''}`}>
                  <div className="checkout-page__item-details">
                    <div className="checkout-page__item-name">{item.name}</div>
                    {/* <div className="checkout-page__item-customization">{item.customization}</div> */}
                    <div className="checkout-page__item-qty">Qty: {item.quantity}</div>
                  </div>
                  <div className="checkout-page__item-price">
                    Rs.{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
            )
        }
    )
}

export default OrderSummaryRow