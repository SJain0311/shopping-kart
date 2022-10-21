import React, { useEffect, useState } from "react";
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
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./item.css";
import axios from "axios";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Item = (props) => {
  const [count, setCount] = React.useState(0);
  const [invisible, setInvisible] = React.useState(false);
  const location = useLocation();
  console.log("location", location.state);
  // const productData = location.state.newProducts;
  // console.log("item", productData);
  const [itemData,setItemData] = useState([])
  // console.log("itemdata",itemData)
  const [selected, setSelected] = React.useState([]);
  const [inputText, setInputText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [searched, setSearched] = useState("");
  const [query,setQuery]=useState("");
  const [itemCount, setItemCount] = useState(0);
  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3001/data");
      if(res.status===200){
        setItemData(res.data)
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
    <div>
      <div>
        <Badge color="secondary" badgeContent={count}>
          <ShoppingCartIcon />
        </Badge>
        <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          {/* <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button> */}
        </ButtonGroup>
      </div>
      <div className="search-box">
        <input
          id="search-box"
          onChange={(e) => setQuery(e.target.value)}
          className="search"
          placeholder="...Search"
        />
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}>Product Card</h2>
        {itemData.filter((data)=>data.product.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1).map((data, index) => (
          <div className="card">
            <label /> <h1>{data.product}</h1>
 
              <p className="price">{data.quantity}</p>
            <p>{data.description}</p>
            <p>{data.category}</p>
            <p>
              {" "}
              <CardActions>
                <Button size="small" onClick={() => setCount(count + 1)}>
                  Add to cart
                </Button>
              </CardActions>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
