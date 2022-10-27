import React from "react";
import './All.css'

const Card = ({ item, handleClick }) => {
  const {id, product, description, category, quantity } = item;
  return (
    <div className="cards">
      <div className="card">
        <p>{product}</p>
        <p>{description}</p>
        <p> {category}</p>
        <p> {quantity}</p>
        <button onClick={() => handleClick(item)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;

// id, title, autor, price, img
