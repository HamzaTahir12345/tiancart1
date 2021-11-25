const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)
const productSchema = new mongoose.Schema({
    name: {
        trim: true,
        unique: 32,
        maxlength: 40,
        type: String,
        required: true,
    },
    description: {
        maxlength: 2000,
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32
    },
    discountedPrice: {
        type: Number,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,

    },
    sold: {
        type: Number
    },
    quantity: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    },
    brand: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 5,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    size: {
        type: Number
    },
    colour: {
        type: String
    },
    weight: {
        type: Number
    },
    SKU: {
        type: String
    },


},
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema)