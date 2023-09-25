import React , {useState,useEffect}from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [hasError, setError] = useState(false);
    async function fetchData() {
    try {
      const response = await fetch("http://localhost:8000/");
      const json = await response.json();
      setProducts(json);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  async function addToCart(phone_name,phone_image,phone_price) {
    try {
      const response = await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({phone_name,phone_image,phone_price }) 
      });
      const json = await response.json();
      console.log(json);
      alert("Item Added To Cart");
    } catch (err) {
      alert("Something Went Wrong");
      console.log(err);
    }
  }
    useEffect(() => {
        fetchData();
      }, []);
      console.log(products);
    return (
        <div className='shop'>
            <div className='title'>
                <h1>Easy Shopping</h1>
            </div>
            <div>
                {products.map((product)=>(
                    <div className='products' key={product._id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={"http://localhost:8000/" + product.phone_image} alt={product.phone_image} className="img-fluid" />
                            <Card.Body>
                                <Card.Title>{product.phone_name}</Card.Title>
                                <Card.Text>
                                    <p>Brand:{product.phone_brand}</p>
                                    <p>storage:{product.phone_storage} ram:{product.phone_ram}</p>
                                    <p>Camera:{product.phone_camera}</p>
                                    <p>Price : {product.phone_price}</p>
                                </Card.Text>
                                <Button onClick={() => addToCart(product.phone_name,product.phone_image,product.phone_price)}className="btn btn-primary btn-sm">Add To Cart</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
    }
