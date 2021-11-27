import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// import setAuthToken from "../../utils/setAuthToken";

class forgetpasswordlink extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
    };
    console.log(this.props.match.params.token);
    axios
      .post(`http://localhost:8000/api/forget-password-link`, user)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Link Send Successfull",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) =>
        Swal.fire({
          title: "Failed!",
          text: "Email not valid",
          icon: "error",
          confirmButtonText: "OK",
        })
      );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <container>
        <form onSubmit={this.onSubmit}>
          <h1>Forget Password</h1>
          <p>&nbsp;</p>

          <input
            type="email"
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            required
          />

          <button type="submit" color="primary" className="px-4">
            Send Link
          </button>

          {/* <CCol col-sm-6 className="text-right">
                            <button color="link" className="px-0">
                              Forgot password?
                            </button>
                          </CCol> */}
        </form>
      </container>
    );
  }
}

export default forgetpasswordlink;
