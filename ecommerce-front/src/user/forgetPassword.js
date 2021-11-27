import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

class forgetpassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confirmpassword: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      confirmpassword: this.state.confirmpassword,
      password: this.state.password,
    };
    console.log(this.props.match.params.token);
    axios
      .post(
        `http://localhost:8000/api/forget-password/${this.props.match.params.token}`,
        user
      )
      .then((res) => {
        // Set current user
        this.props.history.push("/login");
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <container>
        <form onSubmit={this.onSubmit}>
          <h1>Setup New Password </h1>
          <p className="text-muted">You are one step away from setting up</p>

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={this.state.confirmpassword}
            onChange={this.onChange}
            required
          />

          <button type="submit" color="primary" className="px-4">
            Reset Password
          </button>

          {/* <Link to="/login">Login</Link> */}
        </form>
      </container>
    );
  }
}

export default forgetpassword;
