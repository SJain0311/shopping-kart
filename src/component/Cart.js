import React, { useState, useEffect } from "react";
import "./All.css";

const Cart = ({ cart, setCart, handleChange,itemData,setItemData }) => {
  const [count, setCount] = useState(1);
  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
  };

  const minusItem = (key) => {
    if (count > 0) {
      let listData=[...cart]
      listData[key]={...listData[key],limit:0}
      setCart(listData)
      setCount(count - 1);     
    } else {
      setCount(0);
    }
  };

console.log("Test",cart);


  return (
    <article>
      {cart.map((item,index) => (
        <div className="cart_box" key={item.id}>
          <div className="card">
            <p>{item.product}</p>
            <p>{item.quantity}</p>
            <p>{item.category}</p>
            <p>{item.description}</p>
        
          <div className="btn-arng">
            <button onClick={() => setCount(count + 1)}>+</button>
            <button>{item.limit}</button>
            <button onClick={()=>minusItem(index)}>-</button>
          </div>
          <div>
            <span>{item.price}</span>
            <button className="btn" onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
          </div>
      ))}
    </article>
  );
};

export default Cart;
