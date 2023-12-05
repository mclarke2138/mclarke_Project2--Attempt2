import InventoryCard from "./InventoryCard";
import CartList from "./CartList";
import InventoryForm from "./InventoryForm";
import { useState, useEffect} from "react";
import axios from "axios"

export default function GroceriesApp() {
  // State variables
  const [cartList, setCartList] = useState([]);
  const [products, setProducts] = useState([])
  const [resData, setResData] = useState("")
  const [toggleEdit,setToggleEdit] = useState(false)
  const [formData, setFormData] = useState({
    id:"",
    productName: "",
    brand:"",
    quantity:"",
    image:"",
    price:""
  })

  // Placeholder object
  const emptyProduct={
    id:"",
    productName: "",
    brand:"",
    quantity:"",
    image:"",
    price:""
  }

  // Event handler for input changes in the form
  const handleOnChange = (evt) =>{
    const fieldName = evt.target.name
    const fieldValue = evt.target.value
    setFormData((prevData)=>{
        return{
            ...prevData,
            id: crypto.randomUUID(),
            [fieldName]:fieldValue,
        }
    })
  }

  // Fetch products from the server when resData changes
  useEffect(()=>{
    handleGetProducts()
  },[resData])

  const handleGetProducts = async()=>{
    await axios.get("http://localhost:3000/products").then((response)=> {
        setProducts(response.data)
    })
  }

  // Function to post new products to the server
  const handlePostProducts = async(product)=>{
    const postProduct = {
        id: product.id,
        productName: product.productName,
        brand: product.brand,
        quantity: product.quantity,
        image: product.image,
        price: product.price
    }
    await axios.post("http://localhost:3000/addProduct",postProduct)
    .then(response => setResData(<p>{response.data}</p>))
  }

  // Form submission handler for adding/editing
  const handleOnSubmit= (evt) =>{
    evt.preventDefault;
    toggleEdit ? handleProductEdit(formData) : handlePostProducts(formData)
    setFormData(emptyProduct)
  }

  // Function to handle editing
  const handleProductEdit = async(product)=>{
    const id = product._id
    const editData = {
        id: product.id,
        productName: product.productName,
        brand: product.brand,
        quantity: product.quantity,
        image: product.image,
        price: product.price,
    }
    await axios.patch(`http://localhost:3000/product/${id}`, editData)
    .then((response)=>setResData(<p>{response.data}</p>))
    .then(setToggleEdit(false))
  }

  // Function to toggle edit
  const handleToggleEdit = (product) =>{
    setFormData(product)
    setToggleEdit(true)
  }

  // Function to handle delete
  const handleProductDelete = async(product) =>{
    const id = product._id
    const productName= product.productName
    axios.delete(`http://localhost:3000/product/${id}/${productName}`).then((response) =>setResData(<p>{response.data}</p>) )  
  }

  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      console.log(cartList);
      return [...prevList, { ...item, id: crypto.randomUUID() }];
    });
  };

  const handleEmptyCart = () => {
    setCartList([]);
  };

  const handleRemoveItem = (id) => {
    setCartList((prevList) => {
      return prevList.filter((i) => i.id !== id);
    });
  };

  return (
    <>
      <h1>Groceries App</h1>
      {/* InventoryForm component for adding/editing products */}
      <InventoryForm 
        formData={formData} 
        handleOnChange = {handleOnChange} 
        handleOnSubmit = {handleOnSubmit}
        editValue={toggleEdit} 
      />
      {resData}
      <div className="GroceriesApp-Container">
        {/* InventoryCard component for displaying and managing products */}
        <InventoryCard 
            list={products} 
            onClick={handleAddToCart} 
            onDelete={handleProductDelete}
            handleToggleEdit={handleToggleEdit}
        />
        {/* CartList component for displaying and managing the shopping cart */}
        <CartList
          cartList={cartList}
          onClickEmpty={handleEmptyCart}
          onClickRemove={handleRemoveItem}
        />
      </div>
    </>
  );
}
