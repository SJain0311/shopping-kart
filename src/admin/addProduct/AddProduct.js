import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Await, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [newFormValues, setNewFormValues] = useState({});
  const [getdata, setGetData] = useState([]);
  const [products, setProducts] = useState([]);
  const [addDetail, setAddDetail] = useState({
    id: "",
    product: "",
    quantity: "",
    description: "",
    category: "",
  });

  const [pageDetail, setPageDetail] = useState();
  const [editFormData, setEditFormData] = useState({
    id: "",
    product: "",
    quantity: "",
    description: "",
    category: "",
  });
  const [editProductId, setEditProductId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFormData = { ...addDetail };
    newFormData[fieldName] = fieldValue;
    setAddDetail(newFormData);
  };

  const handleGetData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/data");
      if (res.status === 200) {
        setProducts(res.data);
        console.log("products", products);
      }
    } catch (error) {
      console.warn("error", error);
    }
  };

  useEffect(() => {
    handleGetData();
    handleDeleteClick();
    handleEditFormSubmit();
    console.log("useEffect");
  }, []);

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:3001/data", addDetail);
    setPageDetail(res.data);
    console.log("setPage", pageDetail.id);
    const newProduct = {
      id: pageDetail.id,
      product: addDetail.product,
      quantity: addDetail.quantity,
      description: addDetail.description,
      category: addDetail.category,
    };
    const newProducts = [...products, newProduct];
    setProducts(newProducts);

    console.log("ppppppp", products);
    // localStorage.setItem("set", JSON.stringify(products));
    // console.log("Add Data",newProducts);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = async (newid) => {
    console.log("editId", newid);
    const editedProduct = {
      id: editFormData.id,
      product: editFormData.product,
      quantity: editFormData.quantity,
      description: editFormData.description,
      category: editFormData.category,
    };
    console.log("hellllllllllllo", editedProduct);

    await fetch(`http://localhost:3001/data/${newid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });
  };

  // const res = await axios.put("http://localhost:3001/products",editedProduct);
  // console.log("Reid res ", res.data)

  // setEditFormData(
  //   res.data.filter((product) => {
  //      return product.id !== newid.id;
  //    })
  //  );
  //  console.log("edit id",editFormData)

  // const newProducts = [...products];

  // const index = products.findIndex((product) => product.id === editProductId);

  // newProducts[index] = editedProduct;

  // setProducts(newProducts);
  //   setEditProductId(null);
  // };

  const handleEditClick = (event, productItem) => {
    event.preventDefault();
    setEditProductId(productItem.id);

    const formValues = {
      id: productItem.id,
      product: productItem.product,
      quantity: productItem.quantity,
      description: productItem.description,
      category: productItem.category,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditProductId(null);
  };

  const handleDeleteClick = async (newid) => {
    console.log("id---", newid);

    const res = await axios.delete("http://localhost:3001/data/" + newid);
    setProducts(
      products.filter((product) => {
        return product.id !== newid;
      })
    );
    // const newProducts = [...products];

    // const index = products.findIndex((product) => product.id === productId);

    // newProducts.splice(index, 1);

    // setProducts(newProducts);
  };

  // const handleAddToList = (e) => {
  //   e.preventDefault();

  //   const newProduct = {
  //     id: products.id,
  //     product: products.product,
  //     quantity: products.quantity,
  //     description: products.description,
  //     category: products.category,
  //   };
  //   const newProducts = [...products, newProduct];
  //   setProducts(newProducts);

  //   console.log("Add Data", newProducts);

  //   navigate("/Item", state={ newPro:newP});
  //   e.preventDefault();
  //   setNewFormValues((prevValues) => {
  //     return [...prevValues, newProduct];
  //   });
  //   setProducts("");
  // };
  // setPageDetail(products)

  return (
    <div>
      <h1>Admin DashBoard</h1>
      <StyledEngineProvider injectFirst>
        <form>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((productItem, idx) => (
                  <>
                    <>
                      {editProductId === productItem.id ? (
                        <TableRow>
                          <td>{productItem.id}</td>
                          <TableCell>
                            <TextField
                              type="text"
                              placeholder="Enter a product..."
                              name="product"
                              value={editFormData.product}
                              onChange={handleEditFormChange}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              placeholder="Enter an quantity..."
                              name="quantity"
                              value={editFormData.quantity}
                              onChange={handleEditFormChange}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              label="Description"
                              multiline
                              rows={1}
                              type="text"
                              placeholder="Enter a description..."
                              name="description"
                              value={editFormData.description}
                              onChange={handleEditFormChange}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="text"
                              placeholder="Enter an category"
                              name="category"
                              value={editFormData.category}
                              onChange={handleEditFormChange}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="submit"
                              onClick={handleEditFormSubmit(editFormData.id)}
                            >
                              Save
                            </Button>
                            <Button type="button" onClick={handleCancelClick}>
                              Cancel
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow>
                          <td>{productItem.id}</td>
                          <TableCell>{productItem.product}</TableCell>
                          <TableCell>{productItem.quantity}</TableCell>
                          <TableCell>{productItem.description}</TableCell>
                          <TableCell>{productItem.category}</TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              onClick={(event) =>
                                handleEditClick(event, productItem)
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              type="button"
                              onClick={() => handleDeleteClick(productItem.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                    {/* <Link
                      to={`/Item`}
                      onClick={() => {
                        console.log("Hello", productItem.id);
                        navigate(`/Item/${productItem.id}/`, {
                          state: { itemId: JSON.stringify(productItem.id) },
                        });
                      }}
                      className="text-decoration text-violet font-weight-bold"
                    >
                      Add To List
                    </Link> */}
                    <Button
                      type="button"
                      style={{ textAlign: "center" }}
                    >
                      <Link
                      to={`/Item`}
                      onClick={() => {
                        console.log("Hello", productItem.id);
                        navigate(`/Item/${productItem.id}/`, {
                          state: { itemId: JSON.stringify(productItem.id) },
                        });
                      }}
                    >
                      Add To List
                    </Link>
                    </Button>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
        <h2>Add a Product</h2>
        <form onSubmit={handleAddFormSubmit}>
          <TextField
            label="Product"
            type="text"
            name="product"
            onChange={handleAddFormChange}
            placeholder="Enter product here.."
            value={products.product}
          />
          <TextField
            label="Quantity"
            type="number"
            name="quantity"
            onChange={handleAddFormChange}
            placeholder="Enter product Quantity"
            value={products.quantity}
          />
          <TextField
            label="Description"
            multiline
            rows={1}
            type="text"
            required="required"
            placeholder="Enter a description..."
            name="description"
            value={products.description}
            onChange={handleAddFormChange}
          />

          <TextField
            label="Category"
            type="text"
            name="category"
            onChange={handleAddFormChange}
            placeholder="Enter product Category"
            value={products.category}
          />
          <Button type="submit">Add</Button>
        </form>
      </StyledEngineProvider>
    </div>
  );
};

export default AddProduct;
