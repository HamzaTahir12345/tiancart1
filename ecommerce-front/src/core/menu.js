import React, { Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import { signout, isAuthenticated } from "../auth"
import { itemTotal } from "./cartHelper"
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'

const isActive = (history, path) => {

    if (history.location.pathname === path) {
        return { color: "#000000" }
    } else {
        return { color: '#ffffff' }
    }
}
const isButtonActive = (history, path) => {

    if (history.location.pathname === path) {
        return "true"
    } else {
        return 'false'
    }
}

const Menu = ({ history }) => (

    <Navbar collapseOnSelect expand="sm" style={{ color: "yellow", backgroundColor: "#ffc000", height: "60px" }} >
        <Container fluid >
            <Navbar.Brand href="/" style={{ color: "white" }}>Tiancart</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/" style={isActive(history, '/')}>Home</Nav.Link>
                    <Nav.Link href="/shop" style={isActive(history, '/shop')}>Shop</Nav.Link>

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <Nav.Link href="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>Dashboard</Nav.Link>

                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <Nav.Link href="/user/dashboard" style={isActive(history, '/user/dashboard')}>Dashboard</Nav.Link>

                    )}
                    {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/action">Action</NavDropdown.Item>
                        <NavDropdown.Item href="/action1">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="/action2">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/action3">Separated link</NavDropdown.Item>
                    </NavDropdown> */}

                </Nav>

                <Nav>
                    <Nav.Link href="/cart" style={isActive(history, '/cart')}>
                        <i class="fa fa-shopping-cart" style={{ paddingTop: "10px" }} ></i> Cart
                    </Nav.Link>
                    {!isAuthenticated() && (
                        <Nav.Link eventKey={2} href="/signin" >
                            <button type="button" class="btn btn-dark" style={{ width: "100px" }} disabled={history.location.pathname === '/signin'}>
                                Sign In</button>
                        </Nav.Link>
                    )}
                    {isAuthenticated() && (

                        <Nav>
                            <Nav.Link  >
                                <button type="button" class="btn btn-dark" style={{ width: "100px" }}
                                    onClick={() =>
                                        signout(() => {
                                            history.push("/")
                                        })}>
                                    Sign Out</button>
                            </Nav.Link>
                        </Nav>
                        // <li className="nav-item" style={{ textAlign: "right" }}>
                        //     <span className="nav-link"
                        //         style={{ cursor: 'pointer', color: '#ffffff' }}
                        //         onClick={() =>
                        //             signout(() => {
                        //                 history.push("/")
                        //             })

                        //         }
                        //     >
                        //                 Signout
                        //             </span>
                        // </li>

                    )}
                </Nav>
            </Navbar.Collapse>
        </Container >
    </Navbar >







    // <div >
    //     <ul className="nav nav-tabs" style={{ backgroundColor: "#ffc000", height: "60px", paddingTop: "6px" }}>

    //         <li className="nav-brand" style={{ fontWeight: "bold", fontFamily: "sans-serif", fontSize: "20px", fontStyle: "italic", color: "white", textAlign: "center" }}>
    //             <Link className="nav-link" style={isActive(history, '/abcdef')}
    //                 to="/">
    //                 TianCart
    //             </Link>
    //         </li>
    //         <li className="nav-item">
    //             <Link className="nav-link" style={isActive(history, '/')}
    //                 to="/">
    //                 Home
    //             </Link>
    //         </li>

    //         <li className="nav-item">
    //             <Link className="nav-link" style={isActive(history, '/shop')}
    //                 to="/shop">
    //                 Shop
    //             </Link>
    //         </li>

    //         <li className="nav-item">
    //             <Link className="nav-link" style={isActive(history, '/cart')}
    //                 to="/cart">
    //                 Cart<sup><small className="cart-badge">{itemTotal()}</small></sup>
    //             </Link>
    //         </li>

    //         {isAuthenticated() && isAuthenticated().user.role === 1 && (
    //             <li className="nav-item">
    //                 <Link className="nav-link" style={isActive(history, '/admin/dashboard')}
    //                     to="/admin/dashboard">
    //                     Dashboard
    //                 </Link>
    //             </li>


    //         )}

    //         {isAuthenticated() && isAuthenticated().user.role === 0 && (
    //             <li className="nav-item">
    //                 <Link className="nav-link" style={isActive(history, '/user/dashboard')}
    //                     to="/user/dashboard">
    //                     Dashboard
    //                 </Link>
    //             </li>


    //         )}
    //         {!isAuthenticated() && (
    //             <Fragment>
    //                 <li className="nav-item">
    //                     <Link className="nav-link"
    //                         style={isActive(history, "/signup")}
    //                         to="/signup">
    //                         Signup
    //                     </Link>
    //                 </li>
    //                 <li className="nav-item">
    //                     <Link className="nav-link"
    //                         style={isActive(history, "/signin")}
    //                         to="/signin">
    //                         Signin
    //                     </Link>
    //                 </li>

    //             </Fragment>
    //         )}
    //         {isAuthenticated() && (

    //             <li className="nav-item" style={{ textAlign: "right" }}>
    //                 <span className="nav-link"
    //                     style={{ cursor: 'pointer', color: '#ffffff' }}
    //                     onClick={() =>
    //                         signout(() => {
    //                             history.push("/")
    //                         })

    //                     }
    //                 >
    //                     Signout
    //                 </span>
    //             </li>

    //         )}


    //     </ul>
    // </div >
)
export default withRouter(Menu)