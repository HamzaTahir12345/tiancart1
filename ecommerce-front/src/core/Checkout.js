import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { paypalPayment } from "./apiCore";
import { createOrder } from "../core/apiCore";
import { emptyCart, getCart } from "./cartHelper";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const __DEV__ = document.domain === "localhost";
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    name: "",
    email: "",
    phone: "",
    address: "",
    price: "",
  });
  const [show, setShow] = useState(false);
  const [toggleAddress, setToggleAddress] = useState(false);
  const [toggleName, setToggleName] = useState(false);

  const [togglePhone, setTogglePhone] = useState(false);

  const [toggleEmail, setToggleEmail] = useState(false);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    // getToken(userId, token)
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res =
      getCart() != 0 &&
      (await loadScript("https://checkout.razorpay.com/v1/checkout.js"));

    if (!res) {
      alert("Error! Razorpay SDK failed to load");
      return;
    }

    const data = await fetch(
      `http://localhost:8000/api//razorpay/payment/${userId}`,
      { method: "POST" }
    ).then((t) => t.json());

    console.log(data);

    const options = {
      key: __DEV__ ? "rzp_test_EPOGJf24mrVUeM" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Shopping Cart",
      description: "Thank you for shopping from Tiancart!",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "",
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    handleClick();
  }

  const getTotal = () => {
    if (localStorage.getItem("cart")) {
      console.log("=============productsss==============", products);
      return products.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
      }, 0);
    } else {
      console.log("ammount set: 0----------");
      return 0;
    }
  };
  const handleChangeName = (event) => {
    setData({ ...data, name: event.target.value });
  };
  const handleChangeEmail = (event) => {
    setData({ ...data, email: event.target.value });
  };
  const handleChangePhone = (event) => {
    setData({ ...data, phone: event.target.value });
  };
  const handleChangeAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const handleClick = (event) => {
    console.log("----------------------name---------------------", data.name);
    const createorderData = {
      products: products,
      ammount: `${getTotal()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      isPaid: true,
    };
    console.log("Created order data: ", createorderData);
    createOrder(userId, token, createorderData).then((response) => {
      emptyCart(() => {
        console.log("payment success and empty cart");
        setData({
          loading: false,
          success: true,
        });
        setRun(!run); // run useEffect in parent Cart
      });
    });
  };

  // const handleClick1 = event => {

  //     const createorderData = {

  //         products: products,
  //         ammount: `${getTotal()}`,
  //         address: data.address
  //     }
  //     console.log('------address------', data.address)
  // }

  // }
  console.log(toggleAddress, "---------------------------------------------");
  const displayForm = () =>
    show &&
    getCart() != 0 && (
      <div>
        {/* <label  className="text-muted border border-primary">Address</label> */}
        <div class=" bg-warning text-white text-center p-2 mt-4 rounded">
          Address
        </div>
        <input
          type="text"
          onChange={handleChangeAddress}
          className="form-control"
          required
        ></input>
        <button className="btn btn-dark  " onClick={() => setToggleEmail(true)}>
          + Submit Address{" "}
        </button>
      </div>
    );
  // && (
  //   <button onClick={() => setToggleAddress(true)}>
  //     + Add Address Field{" "}
  //   </button>
  // ) && (
  //   <button onClick={() => setToggleEmail(true)}>+ Add Email Field </button>
  // ) && (
  //   <button onClick={() => setTogglePhone(true)}>+ Add Phone Field </button>
  // );
  // <form>

  //   <div className="gorm-group mb-3 mt-4">
  //     <label className="text-muted">Email</label>
  //     <input
  //       type="email"
  //       onChange={handleChangeEmail}
  //       className="form-control"
  //       placeholder="Your Email"
  //       required
  //     ></input>
  //   </div>
  //   <div className="gorm-group mb-3 mt-4">
  //     <label className="text-muted">Phone no</label>
  //     <input
  //       type="number"
  //       onChange={handleChangePhone}
  //       className="form-control"
  //       placeholder="Your Phone no"
  //       required
  //     ></input>
  //   </div>
  //   <div className="gorm-group mb-3 mt-4">
  //     <label className="text-muted">Address</label>
  //     <input
  //       type="text"
  //       onChange={handleChangeAddress}
  //       className="form-control"
  //       placeholder="Your Address"
  //       required
  //     ></input>
  //   </div>
  //   <button
  //     type="submit"
  //     className="btn btn-success App-link mb-5"
  //     style={{ height: "50px", alignContent: "center" }}
  //   >
  //     Checkout
  //   </button>
  // </form>

  const showDropIn = () => {
    console.log("here====", products.length, data.clientToken);
    return (
      <div>
        {/* <button className="btn btn-success" onClick={handleClick} >Checkout</button> */}
        <h1 className="mt-4 mb-3">Choose your payment method</h1>
        <button
          className="btn btn-success App-link ml-3"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "blue", height: "50px" }}
        >
          Pay with RazorPay
        </button>

        <button
          className="btn btn-success App-link ml-3"
          style={{ height: "50px" }}
          onClick={() => {
            setShow(true);
          }}
        >
          Cash On Delivery
        </button>
      </div>
    );
  };

  const showCheckout = () => {
    console.log("--- iss ", isAuthenticated());
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to Checkout</button>
      </Link>
    );
  };

  return (
    <diV>
      <div className="row">
        <h3>Total :${getTotal()}</h3>
      </div>

      {showCheckout()}
      {displayForm()}

      {toggleEmail == true && (
        <div>
          <div class="h-50 bg-warning text-white text-center p-2 mt-4 rounded">
            Email
          </div>
          <input
            type="text"
            onChange={handleChangeEmail}
            className="form-control"
            required
          ></input>
          <button
            className="btn btn-dark ml-2"
            onClick={() => setTogglePhone(true)}
          >
            + Submit Email{" "}
          </button>
        </div>
      )}
      {togglePhone == true && (
        <div>
          <div class=" bg-warning text-white text-center p-2 mt-4 rounded">
            Phone
          </div>
          <input
            type="text"
            onChange={handleChangePhone}
            className="form-control"
            required
          ></input>
          <button
            className="btn btn-dark ml-2"
            onClick={() => setToggleName(true)}
          >
            + Submit Phone{" "}
          </button>
        </div>
      )}
      {toggleName == true && (
        <div>
          <div class=" bg-warning text-white text-center p-2 mt-4 rounded">
            Name
          </div>
          <input
            type="text"
            onChange={handleChangeName}
            className="form-control text-center"
            required
          ></input>
          <button className="btn btn-dark ml-2">+ Submit Name </button>
        </div>
      )}
      {toggleEmail == true && togglePhone == true && toggleName == true && (
        <div>
          <button className="btn btn-dark ml-2 mt-3 ">Checkout</button>
        </div>
      )}
    </diV>
  );
};
export default Checkout;
