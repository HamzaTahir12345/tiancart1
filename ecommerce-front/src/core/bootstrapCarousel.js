import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'

const BootstrapCarousel = ({ Sid }) => {

    return (
        <div>
            {(Sid == 1) ?
                <div className='container-fluid mt-2 mb-4' >
                    <Carousel className="CarouselItem">
                        <Carousel.Item style={{ 'height': "300px" }} >
                            <img style={{ 'height': "300px" }}
                                className="d-block w-100"
                                src={'assets/img/GamingLaptop.JPG'} />
                            <Carousel.Caption>
                                {/* <h3>First Demo </h3> */}
                            </Carousel.Caption>
                        </Carousel.Item  >
                        <Carousel.Item style={{ 'height': "300px" }}>
                            <img style={{ 'height': "300px" }}
                                className="d-block w-100"
                                src={'assets/img/slider1.webp'} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div> : (Sid == "2") ?
                    <div className='container-fluid mt-2 mb-4' >
                        <Carousel className="CarouselItem">
                            <Carousel.Item style={{ 'height': "300px" }} >
                                <img style={{ 'height': "300px" }}
                                    className="d-block w-100"
                                    src={'assets/img/samsungMobile.JPG'} />
                                <Carousel.Caption>
                                    {/* <h3>First Demo </h3> */}
                                </Carousel.Caption>
                            </Carousel.Item  >
                            <Carousel.Item style={{ 'height': "300px" }}>
                                <img style={{ 'height': "300px" }}
                                    className="d-block w-100"
                                    src={'assets/img/PocoMobile.JPG'} />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div> :
                    <div className='container-fluid mt-2 mb-4' >
                        <Carousel className="CarouselItem">
                            <Carousel.Item style={{ 'height': "300px" }} >
                                <img style={{ 'height': "300px" }}
                                    className="d-block w-100"
                                    src={'assets/img/bigdiwali.JPG'} />
                                <Carousel.Caption>
                                    {/* <h3>First Demo </h3> */}
                                </Carousel.Caption>
                            </Carousel.Item  >
                            <Carousel.Item style={{ 'height': "300px" }}>
                                <img style={{ 'height': "300px" }}
                                    className="d-block w-100"
                                    src={'assets/img/img1.jpg'} />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
            }
        </div>

    )

}

export default BootstrapCarousel

