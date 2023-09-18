import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Cart = (props) => {
  const [carts, setCarts] = useState([]);
  const [payload, setPayloader] = useState({});
  const [hasError, setError] = useState(false);
  async function fetchCart() {
    await fetch("http://localhost:8000/cart")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCarts(json);
        setPayloader(json);
      })
      .catch((error) => {
        setError(error);
      });
  }
  async function increaseQty(id) {
    try {
      const res = await fetch("http://localhost:8000/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(res);
      fetchCart();
      alert("Item Increamented");
    } catch (err) {
      console.log(err);
    }
  }
  async function emptyCart() {
    try {
      const res = await fetch("http://localhost:8000/cart/empty-cart", {
        method: "DELETE",
      });
      await res.json();
      fetchCart();
      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div>
        <div>
            <h1>Cart</h1>
        </div>
        <div>
            {carts.map((product)=>(
                <div className='products'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={"http://localhost:8000/" + product.phone_image} alt={product.phone_image} className="img-fluid" />
                        <Card.Body>
                            <Card.Title>{product.phone_name}</Card.Title>
                            <Card.Text>
                                <p>{product.phone_storage}{product.phone_ram}</p>
                                <p>Price : {product.phone_price}</p>
                            </Card.Text>
                            <Button onClick={(e) => increaseQty(product._id)}className="btn btn-primary btn-sm">+</Button>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    </div>
  );
};