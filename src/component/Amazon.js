import React, { useState,useEffect } from "react";
import Cards from "./Card";
import axios from 'axios';


const Amazon = ({ handleClick }) => {
    const [itemData, setItemData] = useState([]);
    const [count, setCount] = React.useState(0);
    const [invisible, setInvisible] = React.useState(false);
    const [query,setQuery]=useState("");

    const getProduct = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/showList/`);
          if (res.status === 200) {
            setItemData(res.data);
          }
        } catch (error) {
          console.warn("error", error);
        }
      };
    
      useEffect(() => {
        console.log("UseEffect");
        getProduct();
      }, []);
    
  return (
    <section>
         <div className="search-box">
        <input
          id="search-box"
          onChange={(e) => setQuery(e.target.value)}
          className="search"
          placeholder="...Search By product name"
        />
      </div>
      {itemData.filter((data)=>data.product.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1).map((item) => (
        <Cards key={item.id} item={item} handleClick={handleClick} />
      ))}
    </section>
  );
};

export default Amazon;
