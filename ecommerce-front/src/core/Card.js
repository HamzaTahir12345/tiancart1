import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { AddTheItem, updateItem, removeItem } from './cartHelper'

const Card = ({
    product,
    showViewButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    removeProductButton = false,
    setRun = f => f, // default value of function
    run = undefined // default value of undefined 
}) => {

    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const showViewButtonF = showViewButton => {
        return (
            showViewButton && (
                <button className="btn btn-outline-info mt-2 mb-2">View Product</button>
            )
        )
    }

    const showStockButton = (quantity) => {
        return quantity > 0 ? <span className="badge badge-primary badge-pill">
            Out of Stock
        </span>
            : <span className="badge badge-primary badge-pill" >In Stock</span>
    }

    const addToCart = () => {
        AddTheItem(product, setRedirect(true))
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showCartButton = showAddToCartButton => {
        return (
            showAddToCartButton &&
            (
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 ml-0.5">
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveProductButton = removeProductButton => {
        return (
            removeProductButton &&
            (
                <button onClick={() => {
                    removeItem(product._id)
                    setRun(!run)
                }}
                    className="btn btn-outline-warning mt-2 mb-2 ml-0.5">
                    Remove Product
                </button>
            )
        )
    }

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value > 1) {
            updateItem(productId, event.target.value)
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        </div>
    }
    return (
        <div className="container">
            <div className="card mb-3 ml-0 mr-0" >
                {/* <div class="text-info" className="card-header"><b>{product.name}</b></div> */}
                <div className="card-body ">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product" />
                    <p class="lead" style={{ marginBottom: "0px" }} ><b>{product.name}</b></p>
                    <p class="black-9">${product.price}</p>
                    {/* <p class="black-9">Category:{product.category && product.category.name}</p> */}
                    {/* <p className="balack-8">Added on {moment(product.createdAt).fromNow()}</p> */}
                    {showStockButton()}
                    <br />
                    <Link to={`/product/${product._id}`}>
                        {showViewButtonF(showViewButton)}
                    </Link>
                    {showCartButton(showAddToCartButton)}
                    {showRemoveProductButton(removeProductButton)}
                    {showCartUpdateOptions(cartUpdate)}

                </div>
            </div>
        </div>
    )
}
export default Card;