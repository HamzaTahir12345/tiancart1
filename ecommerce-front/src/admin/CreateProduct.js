
import React, { useState, useEffect } from 'react'
import Layout from '../core/layout'
import { isAuthenticated } from '../auth'
import { createProduct, getCategories } from './apiAdmin'


const CreateProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        brand: '',
        category: '',
        shipping: '',
        quantity: '',
        size: 0,
        colour: '',
        weight: 0,
        SKU: 0,
        sold: 0,
        numReviews: 0,
        reviews: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        brand,
        categories,
        category,
        shipping,
        quantity,
        sold,
        numReviews,
        reviews,
        rating,
        loading,
        error,
        size,
        colour,
        weight,
        SKU,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                //  console.log('Categories nai milein')
                setValues({ ...values, error: data.error })
            } else {
                //   console.log('Categories mil gye hain')
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        })
    }

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    brand: '',
                    rating: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    size: '',
                    color: '',
                    weight: '',
                    SKU: '',
                    sold: '',
                    numReviews: '',
                    reviews: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="text-muted">Brand</label>
                <textarea onChange={handleChange('brand')} className="form-control" value={brand} />
            </div>


            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Rating</label>
                <select onChange={handleChange('rating')} className="form-control">
                    <option>Please select</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4">4</option>
                    <option value="4.5">4.5</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>
            <div className="form-group">
                <label className="text-muted">Size(optional)</label>
                <input onChange={handleChange('size')} type="number" className="form-control" value={size} />
            </div>
            <div className="form-group">
                <label className="text-muted">Weight(optional)</label>
                <input onChange={handleChange('weight')} type="number" className="form-control" value={weight} />
            </div>
            <div className="form-group">
                <label className="text-muted">Color(optional)</label>
                <textarea onChange={handleChange('colour')} className="form-control" value={colour} />
            </div>
            <div className="form-group">
                <label className="text-muted">SKU(optional)</label>
                <textarea onChange={handleChange('SKU')} className="form-control" value={SKU} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;