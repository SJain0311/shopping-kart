import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./component/login/Login";
import Item from "./component/item/Item";
import AdminLogin from "./admin/adminLogin/AdminLogin";
import AddProduct from "./admin/addProduct/AddProduct";




function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Item" element={<Item />} />
          <Route exact path="/AdminLogin" element={<AdminLogin/>}/>
          <Route exact path="/AddProduct" element={<AddProduct />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
