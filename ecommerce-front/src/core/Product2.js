import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { read } from "../core/apiCore"
import Menu from "../core/menu"
import Rating from '../components/Rating'
// import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { AddTheItem, updateItem, removeItem } from './cartHelper'

const Product2 = (props) => {

    const [product, setProduct] = useState({})
    const [redirect, setRedirect] = useState(false)

    const loadingProduct = productId => {
        read(productId).then(data => {
            if (data) {
                setProduct(data)
                console.log('----products-----', product.name)
            } else {
                console.error(data)
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadingProduct(productId)
    }, [])

    const addToCart = () => {
        AddTheItem(product, setRedirect(true))
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    };

    return (
        <div>
            <Menu />
            <div className="container-fluid">

                <Link className="my-3 btn btn-light" to="/">
                    Go Back
                </Link>
                {shouldRedirect(redirect)}
                {/* <Meta title={product.name}></Meta> */}
                <Row >
                    <Col sm={4} md={4}>
                        <Image src={`http://localhost:8000/api/product/photo/${product._id}`} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>

                            </ListGroup.Item>
                            <br className="mb-0" />
                        </ListGroup>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <b>Price: </b>${product.price}
                            </ListGroup.Item>

                        </ListGroup>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <b>Rating:</b> <Rating value={product.rating} />
                            </ListGroup.Item>

                        </ListGroup>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <b>Description:</b> {product.description} {product.description} {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.quantitiy > 0 ? 'Out of Stock' : 'In Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty:</Col>
                                        <Col>
                                            2
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>

                                        <Col><Button onClick={addToCart} disabled={product.quantity === 0}
                                            type="button"
                                            className="btn-block mb-2 container-fluid"
                                            style={{ "padding": "2px" }}
                                        >
                                            Add To Cart
                                        </Button></Col>
                                    </Row>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Product2;