import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { getCategories } from "../admin/apiAdmin";
import { getFilteredProducts } from "../core/apiCore";
import CheckBox from "./CheckBox";
import CheckBox1 from "./CheckBox1";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import Card1 from "./Card1";
import Menu from "./menu";
import { getCategoryRelatedProducts } from "../core/apiCore";
import CategoryPanel from "../core/CategoryPanel"

const CategoryPage = (props) => {

    const categoryId = props.match.params.categoryId
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [], sold: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [relatedProducts, setrelatedProducts] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [run, setRun] = useState(true)

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });

    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const showAll = () => {


        getCategoryRelatedProducts(props.match.params.categoryId)
            .then(resp => {

                console.log('categoryPPPPP:-----', resp)
               // setrelatedProducts(resp)
                // return (<div>{
                //     resp.map((data, i) => (

                //         <div key={i} className="col-4 col-xs-6 mb-3">
                //             <Card1 product={data} ></Card1>
                //         </div>
                //     ))}
                // </div>)
            }

            ).catch(error => {
                console.log(error)
            })


    }

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <div >
            <Menu />
            <CategoryPanel />
            <img src={`http://localhost:8000/api/category/photo/${categoryId}`} class="img-fluid" alt="Responsive image" />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-3">
                        <h4>Filter by categories</h4>
                        <ul>
                            <CheckBox categories={categories}
                                handleFilters={filters =>
                                    handleFilters(filters, "category")
                                }
                            />
                        </ul>
                        <h4>Filter by prices</h4>
                        <ul>
                            <RadioBox prices={prices}
                                handleFilters={filters =>
                                    handleFilters(filters, "price")

                                }
                            />
                        </ul>
                        <h4>Filter by Sell</h4>
                        <ul>
                            <CheckBox1 categories={categories}
                                handleFilters={filters =>
                                    handleFilters(filters, "quantity")
                                }
                            />
                        </ul>
                    </div>
                    <div className="col-8">
                        <h2 className="mb-4">Products</h2>
                        <div className="row">
                            {run ? showAll() :
                                filteredResults.map((product, i) => (
                                    <div key={i} className="col-4 col-xs-6 mb-3">
                                        <Card1 product={product} ></Card1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default CategoryPage;