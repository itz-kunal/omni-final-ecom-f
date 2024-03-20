const saveDocs = require("../Middlewares/saveDocs");

const {
    FashionProduct,
    GeneralProduct,
    PendingProduct
} = require("../Models/product.model");
const Shop = require("../Models/shop.model");
const User = require("../Models/user.model");
const Category = require('../Models/categories.model');
const {
    default: mongoose
} = require("mongoose");


//send random products to user based on size
const getProducts = async (req, res) => {
    try {
        const {
            coordinates,
            size,
        } = req.query;

        // const coordinates = [longitude, latitude];
        const [fashionProducts, generalProducts] = await Promise.all([
            FashionProduct.aggregate([{
                $sample: {
                    size: (parseInt(size)) || 10
                }
            }, {
                $project: {
                    _id: 1,
                    name: 1,
                    rate: 1,
                    category: 1,
                    price: 1,
                    image: {
                        $arrayElemAt: ["$images", 0]
                    }
                }
            }]),
            // GeneralProduct.aggregate([{
            //     $sample: {
            //         size: (parseInt(size)) || 10
            //     }
            // }, {
            //     $project: {
            //         _id: 1,
            //         name: 1,
            //         category: 1,
            //         price: 1,
            //         image: {
            //             $arrayElemAt: ["$images", 0]
            //         }
            //     }
            // }]),

            // Provide the coordinates for nearby shops
            GeneralProduct.aggregate([{
                    $sample: {
                        size: (parseInt(size)) || 10
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        category: 1,
                        price: 1,
                        image: {
                            $arrayElemAt: ["$images", 0]
                        }
                    }
                },
                {
                    $unwind: "$shops"
                },
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: coordinates
                        },
                        distanceField: "shops.distance",
                        spherical: true,
                        maxDistance: 10000, // Adjust the maxDistance as needed 
                        limit: 1 // Limit to 1 nearest shops 
                    }
                }
            ])

        ])

        const products = [...generalProducts, ...fashionProducts]

        return res.send({msg:'successfull', products})

    } catch (err) {
        console.error('error in getting products in product controller', err)
        return res.status(500).send({msg:'something went wrong try again'})
    }
}
const getPendingProducts = async (req, res) => {
    try {
        const pendingProducts = await PendingProduct.find({});
        res.send(pendingProducts)
    } catch (err) {
        console.error('error in getting pending products in product controller', err)
        return res.status(500).send('something went wrong try again')
    }
}

//search product based on key and size
const searchProducts = async (req, res) => {
    try {
        const {
            size,
            coordinates,
            searchedKey
        } = req.body;

        if (!searchedKey) {
            return res.status(201).send('missing searched parameter')
        }

        const pipeLine = [
            {
                $match: {
                    name: {
                        $regex: searchedKey,
                        $options: 'i'
                    }
                }
            },
            {
                $sample: {
                    size: (size) || 10
                }
            }, {
                $project: {
                    _id: 1,
                    name: 1,
                    category: 1,
                    price: 1,
                    image: {
                        $arrayElemAt: ["$images", 0]
                    }
                }
            }
        ]

        if(coordinates){
            pipeLine.push(
                {
                    $unwind: "$shops"
                }
            )

            pipeLine.push(
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: coordinates
                        },
                        distanceField: "shops.distance",
                        spherical: true,
                        maxDistance: 10000, // Adjust the maxDistance as needed 
                        limit: 1 // Limit to 1 nearest shops 
                    }
                }
            )
        }

        const [fashionProducts, generalProducts] = await Promise.all([
            FashionProduct.aggregate([{
                    $match: {
                        name: {
                            $regex: searchedKey,
                            $options: 'i'
                        }
                    }
                },
                {
                    $sample: {
                        size: (size) || 10
                    }
                }, {
                    $project: {
                        _id: 1,
                        name: 1,
                        rate: 1,
                        category: 1,
                        price: 1,
                        image: {
                            $arrayElemAt: ["$images", 0]
                        }
                    }
                }
            ]),
            GeneralProduct.aggregate(pipeLine)
        ])

        const products = [...generalProducts, ...fashionProducts]

        return res.send(products)
    } catch (err) {
        console.error('error in searching products in product controller', err)
        return res.status(500).send('something went wrong try again')
    }
}

const getByCategory = async (req, res) => {
    try {
        const {
            productType,
            category,
            size
        } = req.body;

        if (!category || !productType) {
            return res.status(402).send({
                msg: 'missing category or productType'
            })
        }

        let products;
        if (productType == 'general') {
            products = await GeneralProduct.aggregate([{
                    $match: {
                        category
                    }
                },
                {
                    $sample: {
                        size: size || 1000000
                    }
                }, {
                    $project: {
                        _id: 1,
                        name: 1,
                        category: 1,
                        price: 1,
                        image: {
                            $arrayElemAt: ["$images", 0]
                        }
                    }
                }, {
                    $unwind: "$shops"
                },
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: coordinates
                        },
                        distanceField: "shops.distance",
                        spherical: true,
                        maxDistance: 10000, // Adjust the maxDistance as needed 
                        limit: 1 // Limit to 1 nearest shops 
                    }
                }
            ]);

        } else if (productType == 'fashion') {
            products = await FashionProduct.aggregate([{
                    $match: {
                        category
                    }
                },
                {
                    $sample: {
                        size: size || 10
                    }
                }, {
                    $project: {
                        _id: 1,
                        name: 1,
                        rate: 1,
                        category: 1,
                        price: 1,
                        image: {
                            $arrayElemAt: ["$images", 0]
                        }
                    }
                }
            ]);
        }

        return res.send({
            msg: 'successfull',
            products
        })

    } catch (err) {
        console.error('error in searching products in product controller', err)
        return res.status(500).send({
            msg: 'internal server error'
        })
    }
}

const getProduct = async (req, res) => {
    const productId = req.params.productId
    try {
        const {
            productType,
            shopId
        } = req.body;

        if (!productId || !productType) {
            return res.send('missing productId or productType')
        }

        let product;
        if (productType == 'fashion') {
            product = await FashionProduct.findById(productId);
            delete product.platformCharge;
            delete product.linkedCategory;
            delete product.addedAt;

        } else if (productType == 'general') {
            product = await GeneralProduct.findById(productId, {
                _id: 1,
                name: 1,
                category: 1,
                description: 1,
                images: 1,
                price: 1,
                quantity: {
                    $cond: {
                        if: {
                            $eq: [shopId, null]
                        }, // Check if shopId is null or undefined
                        then: "$$REMOVE", // Exclude the field if shopId is null or undefined
                        else: {
                            $let: {
                                vars: {
                                    matchingShop: {
                                        $arrayElemAt: [{
                                                $filter: {
                                                    input: "$shops",
                                                    as: "shop",
                                                    cond: {
                                                        $eq: ["$$shop.shop", shopId]
                                                    }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                },
                                in: "$$matchingShop.quantity"
                            }
                        }
                    }
                }

            })
        }

        return res.send(product)
    } catch (err) {
        console.error('error in searching products in product controller', err)
        return res.status(500).send('something went wrong try again')
    }
}

const addProduct = async (req, res) => {
    try {
        const {
            userId
        } = req.user;
        const {
            shopId
        } = req.shop;
        const {
            productType,
            description,
            name,
            category,
            quantity,
            size,
            price
        } = req.body;

        const user = await User.findById(userId);
        const shop = await Shop.findById(shopId);
        if (!shop && user.role !== 'admin') {
            return res.status(402).send({
                msg: 'You are not allowed to perform these action'
            })
        }

        const images = req.files.map(file => ({
            url: file.path
        }));

        const product = new PendingProduct({
            productType,
            name,
            category,
            description,
            quantity,
            size,
            images,
            price,
            addedBy: shopId
        })

        await product.save();

        return res.send({
            msg: 'Product added successfully !',
            product
        });

    } catch (err) {
        console.error('error in adding product at seller controller', err)
        return res.status(500).send({
            msg: 'Something Went Wrong Please Try Again'
        })
    }
}
const addExistingProduct = async (req, res) => {
    console.log('hi re')
    try {
        const {
            shopId
        } = req.shop;
        const {
            productId,
            quantity,
            price
        } = req.body;
        const shop = await Shop.findById(shopId);
        const product = await GeneralProduct.findById(productId);

        shop.products.push({
            product: productId,
            productType: 'general'
        })
        product.shops.push({
            shop: shopId,
            price,
            quantity
        })

        await saveDocs(shop, product)

        return res.send('product added successfully !')
    } catch (err) {
        console.error('error at adding existing product product.controller', err);
        return res.status(500).send('something went wrong try agai')
    }
}
const editProduct = async (req, res) => {
    try {
        const {
            shopId
        } = req.shop;
        const {
            productType,
            productId,
            modifiedData
        } = req.body;

        if (productType == 'general') {
            const product = GeneralProduct.findById(productId);
            const shopProduct = product.shops.find(shop => shop.shop.equals(shopId));
            const {
                price,
                quantity
            } = modifiedData;

            if (!shopProduct || !price || !quantity) {
                return res.send('invalid attempt ! try again')
            }

            shopProduct.price = price;
            shopProduct.quantity = quantity;
            product.save()

        } else if (productType == 'fashion') {
            FashionProduct.findByIdAndUpdate(productId, modifiedData, (err) => {
                if (err) {
                    console.error('error in updating product at shop controller', err);
                    return res.status(401).send('something went wrong try again !', err)
                }
                return res.send('product updated successfully')
            })
        }

    } catch (err) {
        console.error('error in editing product at shop controller', err);
        return res.status(500).send('something went wrong ! try again.')
    }
}

//admin action
const approveProduct = async (req, res) => {
    try {
        const {
            productId,
            status
        } = req.body;

        const pendingProduct = await PendingProduct.findById(productId);

        if (status == 'decline') {
            await pendingProduct.deleteOne()
            return res.send('product removed successfully !')
        }

        let product;
        if (pendingProduct.productType == 'general') {
            product = new GeneralProduct({
                ...pendingProduct,
                shops: [{
                    shop: pendingProduct.addedBy,
                    price: pendingProduct.price,
                    quantity: pendingProduct.quantity,
                }]
            })

            delete product._id

        } else {
            console.log({
                ...pendingProduct._doc
            })

            product = new FashionProduct({
                ...pendingProduct._doc,
                shop: pendingProduct.addedBy
            })
            delete product._id

            console.log(product)
        }

        const shop = await Shop.findById(pendingProduct.addedBy);
        shop.products.push({
            product: product._id,
            productType: pendingProduct.productType
        })

        const session = await mongoose.startSession();
        session.startTransaction();
        try {

            await Promise.all([pendingProduct.deleteOne(), product.save(), shop.save()]);

            await session.commitTransaction();
            session.endSession();
            return res.send('Product approved successfully !');

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }

    } catch (err) {
        console.error('error in adding product at seller controller', err)
        return res.status(500).send('Something Went Wrong Please Try Again')
    }
}

//admin action
const getCategories = async (req, res) => {
    try {
        const {
            type
        } = req.params;
        const categories = await Category.find({
            type
        });
        console.log(type, categories)
        res.send(categories)
    } catch (err) {
        console.log('category err product controller', err);
        res.status(500).send('something went wrong !')
    }
}

const productController = {
    getProducts,
    searchProducts,
    getByCategory,
    getProduct,
    addProduct,
    addExistingProduct,
    editProduct,
    approveProduct,
    getCategories,
    getPendingProducts
}
module.exports = productController;