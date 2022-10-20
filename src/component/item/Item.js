import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import SearchIcon from "@mui/icons-material/Search";
import { StyledEngineProvider } from "@mui/material/styles";

const Item = (props) => {
  const location = useLocation();
  console.log("location", location);
  const productData = location.state.newProducts;
  console.log("item", productData);
  // const [itemData,setItemData] = useState(productData)
  // console.log("itemdata",itemData)
  const [selected, setSelected] = React.useState([]);
  const [inputText, setInputText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [searched, setSearched] = useState("");
  const [query, setQuery] = useState("");
  // const itemData = localStorage.getItem("set");
  // const dataGet = localStorage.getItem("setItems");

  return (
    <div>
      <div className="search-box">
        <input
          id="search-box"
          onChange={(e) => setQuery(e.target.value)}
          className="search"
          placeholder="...Search"
        />
      </div>
     
   
        <div>
        <h2>Product</h2>
          {productData.map((data, index) => (
             <div class="card">
             <div class="container">
             
               <h4>
                 <b>{data.product}</b>
               </h4>
               <p>{data.quantity}</p>
               <p>{data.category}</p>
               <p>{data.description}</p>
             </div>
           </div>
          
          ))}
        </div>
        <CardActions>
          <Button size="small">Add to cart</Button>
        </CardActions>
     
    </div>
  );
};

export default Item;
