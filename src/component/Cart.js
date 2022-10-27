import React, { useState, useEffect } from "react";
import "./All.css";

const Cart = ({ cart, setCart, handleChange }) => {
  const [count, setCount] = useState(1);
  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
  };

  const minusItem = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="card">
            <p>{item.product}</p>
            <p>{item.quantity}</p>
            <p>{item.category}</p>
            <p>{item.description}</p>
        
          <div className="btn-arng">
            <button onClick={() => setCount(count + 1)}>+</button>
            <button>{count}</button>
            <button onClick={minusItem}>-</button>
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
