const Category = require('../models/category')
const { errorHandler } = require('../helper/dbErrorHandler')
const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')


exports.read = (req, res) => {
    return res.json(req.category)
}

exports.readSingleCategory = (req, res) => {
    const categoryId = req.profile._id
    Category.find({ '_id': categoryId })
        .select('-photo')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
}

exports.categoryPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set('Content-Type', req.profile.photo.contentType);
        return res.send(req.profile.photo.data);
    }
    next();
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
}
exports.readCategoryRelatedProducts = async (req, res) => {
    const categoryId = req.profile._id

    console.log('Category Id by product: ', categoryId)
    await Product.find({ category: categoryId }).populate('category')
        .select('-photo')
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            console.log('products by category: ', data)
            return res.json(data)
        })
}

exports.categoryById = (req, res, next, id) => {

    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category not found'
            });
        }
        req.profile = category;
        req.category = category;
        next();
    });

}

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({
            data
        })

    })

}


exports.create1 = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Category could not be uploaded'
            })
        }
        const { name } = fields
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            })
        }

        let category = new Category(fields)
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.statis(400).json({
                    error: 'Image size should be less than 1mb'
                })
            }
            category.photo.data = fs.readFileSync(files.photo.path)
            category.photo.contentType = files.photo.type
        }
        category.save((error, result) => {
            if (error) {
                return res.status(401).json({
                    err: errorHandler(error)
                })
            }
            res.json({
                result
            })
        })
    })

}
