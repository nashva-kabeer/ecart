import React , {useState,useEffect}from 'react';
import Card from 'react-bootstrap/Card';

export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [hasError, setError] = useState(false);
    async function fetchData() {
        await fetch("http://localhost:8000/")
        .then((res) => res.json())
        .then ((json)=> {
            console.log(json);
            setProducts(json);
        })
        .catch((error) => {
            setError(error);
        });
    }
    async function addToCart(id, quantity) {
        try {
          const response = await fetch("http://localhost:8000/cart", {
            method: "POST",
            body: JSON.stringify({
              productId: id,
              quantity: quantity,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          let data = await response.json();
          alert("Item Added To Cart");
          console.log(data);
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
                    <div className='products'>
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
                                <form>
                                    <input type='hidden' value={product._id}/>
                                    <input type='hidden' value={product.phone_name}/>
                                    <input type='hidden' value={product.phone_storage}/>
                                    <input type='hidden' value={product.phone_ram}/>
                                    <input type='hidden' value={product.phone_price}/>
                                    <input type='hidden' value={product.phone_image}/>
                                    <input type='hidden' value={product.phone_brand}/>
                                    <input type='hidden' value={product.phone_camera}/>
                                    <input type='submit' value='add t0 cart'/>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
    }
