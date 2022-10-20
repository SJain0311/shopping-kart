import { nanoid } from "nanoid";
import React, { useState } from "react";
import data from "../../data.json";
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
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [newFormValues, setNewFormValues] = useState({});
  const [products, setProducts] = useState(data);
  const [addDetail, setAddDetail] = useState({
    product: "",
    quantity: "",
    description: "",
    category: "",
  });
  const [pageDetail, setPageDetail] = useState({
    product: "",
    quantity: "",
    description: "",
    category: "",
  });
  const [editFormData, setEditFormData] = useState({
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
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      id: nanoid(),
      product: addDetail.product,
      quantity: addDetail.quantity,
      description: addDetail.description,
      category: addDetail.category,
    };
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
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

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedProduct = {
      id: editProductId,
      product: editFormData.product,
      quantity: editFormData.quantity,
      description: editFormData.description,
      category: editFormData.category,
    };

    const newProducts = [...products];

    const index = products.findIndex((product) => product.id === editProductId);

    newProducts[index] = editedProduct;

    // setProducts(newProducts);
    setEditProductId(null);
  };

  const handleEditClick = (event, productItem) => {
    event.preventDefault();
    setEditProductId(productItem.id);

    const formValues = {
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

  const handleDeleteClick = (productId) => {
    const newProducts = [...products];

    const index = products.findIndex((product) => product.id === productId);

    newProducts.splice(index, 1);

    setProducts(newProducts);
  };

  const handleAddToList = (e) => {

    e.preventDefault();

    const newProduct = {
      id: nanoid(),
      product: addDetail.product,
      quantity: addDetail.quantity,
      description: addDetail.description,
      category: addDetail.category,
    };
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    console.log("Add Data",newProducts);
    
    navigate("/Item", { state: { newProducts } });
    e.preventDefault();
    setNewFormValues((prevValues) => {
      return [...prevValues, newProduct];
    });
    setProducts("");
  };

  const handleDeleteToList = (event) => {};

  return (
    <div>
      <h1>Admin DashBoard</h1>
      <form onSubmit={handleEditFormSubmit}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <th>Id</th> */}
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
                        <td>
                          <input
                            type="text"
                            required="required"
                            placeholder="Enter a ID..."
                            name="id"
                          ></input>
                        </td>
                        <TableCell>
                          <TextField
                            type="text"
                            required="required"
                            placeholder="Enter a product..."
                            name="product"
                            value={editFormData.product}
                            onChange={handleEditFormChange}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            required="required"
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
                            required="required"
                            placeholder="Enter a description..."
                            name="description"
                            value={editFormData.description}
                            onChange={handleEditFormChange}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="text"
                            required="required"
                            placeholder="Enter an category"
                            name="category"
                            value={editFormData.category}
                            onChange={handleEditFormChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Button type="submit">Save</Button>
                          <Button type="button" onClick={handleCancelClick}>
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        {/* <td>{productItem.id}</td> */}
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
                  <Button
                    type="button"
                    style={{ textAlign: "center" }}
                    onClick={handleAddToList}
                  >
                    Add to Product
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
        />
        <TextField
          label="Quantity"
          type="number"
          name="quantity"
          onChange={handleAddFormChange}
          placeholder="Enter product Quantity"
        />
        <TextField
          label="Description"
          multiline
          rows={1}
          type="text"
          required="required"
          placeholder="Enter a description..."
          name="description"
          onChange={handleAddFormChange}
        />

        <TextField
          label="Category"
          type="text"
          name="category"
          onChange={handleAddFormChange}
          placeholder="Enter product Category"
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddProduct;
