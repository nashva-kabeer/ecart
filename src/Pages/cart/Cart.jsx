import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './cart.css';

export const Cart = (props) => {
  const [carts, setCarts] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0)
  const [hasError, setError] = useState(false);

  async function fetchCart() {
  try {
    const response = await fetch("http://localhost:8000/cart");
    const json = await response.json();
    setCarts(json);
  } catch (error) {
    setError(true);
    console.log(error);
  }
  }

async function updateQty(phone_name, quantityChange) {
  try {
    const res = await fetch("http://localhost:8000/cart", {
      method: "POST",
      body: JSON.stringify({
        phone_name,
        quantityChange,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (res.status === 200) {
      const updatedCart = await res.json();
      const updatedCarts = carts.map((item) => {
        if (item._id === updatedCart._id) {
          return updatedCart; 
        }
        return item;
      });

      setCarts(updatedCarts); 
    } else {
      console.log("Error updating quantity");
    }
  } catch (err) {
    console.log(err);
  }
}

  async function emptyCart() {
    try {
      const res = await fetch("http://localhost:8000/empty-cart", {
        method: "DELETE",
      });
      
      if (res.status === 204) {
        window.confirm("clearing cart");
        fetchCart(); 
        props.history.push("/"); 
      } else {
        console.log("Error emptying the cart");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    let total = 0;
    carts.forEach((item) => {
      total += item.subtotal;
    });
    setGrandTotal(total);
  }, [carts]);

  return (
    <div>
      <div>
        <h1>Cart</h1>
      </div>
      <div>
        {carts.map((product) => (
          <div className='cart' key={product._id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={"http://localhost:8000/" + product.phone_image} alt={product.phone_image} className="img-fluid"/>
              <Card.Body>
                <Card.Title>{product.phone_name}</Card.Title>
                <Card.Text>
                  <p>Price: {product.phone_price}</p>
                </Card.Text>
                <Button onClick={() => updateQty(product.phone_name, -1)} className=" btn-quantity ">-</Button>
                 {product.quantity}  
                <Button onClick={() => updateQty(product.phone_name, 1)} className=" btn-quantity ">+</Button>
                 Total:{product.subtotal}
              </Card.Body>
            </Card>
          </div>
        ))}
        <h2>Grand Total: {grandTotal}</h2>
        <Button onClick={() => emptyCart()} className=" btn-empty-cart ">Delete All</Button>
      </div>
    </div>
  );
};
