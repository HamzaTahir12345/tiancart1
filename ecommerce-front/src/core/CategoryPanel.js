import React from 'react'
import { Link } from 'react-router-dom'

const CategoryPanel = () => {
    return (
        <div>
            <div style={{ height: "50px", backgroundColor: "#EEE7E7", padding: "9px" }} className="mt-1 container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 col-xxs-6" style={{ alignItems: "center", textAlign: "center" }}>
                                <Link to={'/product/by/category/6187351d5f6f9c391758083f'}>
                                    <img src={'assets/img/grocer-cat.jfif'} className="rounded-circle" style={{ height: "50px", width: "50px" }} alt="Cinque Terre" />
                                </Link>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 col-xxs-6" style={{ alignContent: "center", textAlign: "center" }}>
                                <Link to={'/product/by/category/6187351d5f6f9c391758083f'}>
                                    <img src={'assets/img/mobile-cat.jpg'} className="rounded-circle" style={{ height: "50px", width: "50px" }} alt="Mobile" />
                                </Link>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4" style={{ alignContent: "center", textAlign: "center" }}>
                                <Link to={'/product/by/category/6187351d5f6f9c391758083f'}>
                                    <img src={'assets/img/laptop-cat.jpg'} className="rounded-circle" style={{ height: "50px", width: "50px" }} alt="Electronics" />
                                </Link>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3" style={{ alignContent: "center", textAlign: "center" }}>
                                <Link to={'/product/by/category/6187351d5f6f9c391758083f'}>
                                    <img src={'assets/img/furniture-cat.jfif'} className="rounded-circle" style={{ height: "50px", width: "50px" }} alt="Furniture" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6" >
                        <div className="row">
                            <div className="col-lg-3 col-md-3 " id="fadeshow1" style={{ alignContent: "center", textAlign: "center" }}>
                                <img src={'assets/img/beauty-cat.jpg'} className="rounded-circle" style={{ height: "50px", width: "50px" }} alt="Beauty" />
                            </div>
                            <div className="col-lg-3 col-md-3 " id="fadeshow1" style={{ alignContent: "center", textAlign: "center" }}>
                                <Link to={'/product/by/category/6187351d5f6f9c391758083f'}>
                                    <img src={'assets/img/fashion-cat.png'} className="rounded-circle" style={{ height: "50px", width: "50px" }} alt="Fashion" />
                                </Link>
                            </div>
                            <div className="col-lg-3 col-md-3 " id="fadeshow1" style={{ alignContent: "center", textAlign: "center" }}>
                                <Link to={'/product/by/category/6187351d5f6f9c391758083f'}>
                                    <img src={'assets/img/books-cat.jpg'} className="rounded-circle" style={{ height: "50px", width: "50px" }} alt="Fashion" />
                                </Link>
                            </div>
                            <div className="col-lg-3 col-md-3 " id="fadeshow1" style={{ alignContent: "center", textAlign: "center" }}>
                                <Link to={'/product/by/category/6187351d5f6f9c391758083f'}>
                                    <img src={'assets/img/sports-cat4.jpg'} className="rounded-circle" style={{ height: "50px", width: "50px" }} alt="Fashion" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: "40px", backgroundColor: "#EEE7E7", padding: "9px" }} className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 col-xxs-6" style={{ textAlign: "center" }}>Grocery</div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 col-xxs-6" style={{ textAlign: "center" }}>Mobile</div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4" style={{ textAlign: "center" }}> Laptop</div>
                            <div className="col-lg-3 col-md-3 col-sm-3" style={{ textAlign: "center" }}>Furniture</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 " id="fadeshow1" style={{ textAlign: "center" }}>Beauty</div>
                            <div className="col-lg-3 col-md-3 " id="fadeshow1" style={{ textAlign: "center" }}>Fashion</div>
                            <div className="col-lg-3 col-md-3 " id="fadeshow1" style={{ textAlign: "center" }}>Books</div>
                            <div className="col-lg-3 col-md-3 " id="fadeshow1" style={{ textAlign: "center" }}>Sports</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CategoryPanel 
