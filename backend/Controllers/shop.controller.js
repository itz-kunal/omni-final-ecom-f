const Shop = require("../Models/shop.model");
const User = require("../Models/user.model");
const {FashionProduct, GeneralProduct} = require("../Models/product.model");

const saveDocs = require("../Middlewares/saveDocs");

const checkUniqueName = async (req, res) => {
    try {
        const {
            uniqueName
        } = req.body;
        const isUniqueName = await Shop.findOne({
            uniqueName
        })

        if (isUniqueName) {
            return res.send({
                msg: 'shop id already taken',
                status: false
            })
        }

        return res.send({
            msg: 'shop id looks preety impressive',
            status: true
        })
    } catch (err) {
        console.error('error at checking unique id for shop', err);
        return res.status(500).send('something went wrong try again')
    }
}

const registerShop = async (req, res) => {
    try {
        const ownerId = req.user.userId ;
        const {
            uniqueName,
            name,
            phone,
            email,
            GST,
            location,
            address
        } = req.body;
        const [isUniqueName, isShopExist, owner] = await Promise.all([Shop.findOne({
            uniqueName
        }), Shop.findOne({
            owner:ownerId
        }), User.findById(ownerId)])

        if (!owner) {
            return res.status(400).send("it seems you haven't register to the shop yet")
        }
        if (isUniqueName) {
            return res.status(400).send('the shop id has already been taken try with another one')
        }
        if (isShopExist) {
            return res.status(400).send('your shop has already been created')
        }

        const shop = new Shop({
            uniqueName,
            name,
            phone,
            email,
            GST,
            owner,
            location,
            address
        })

        owner.role = 'seller';
        await Promise.all([owner.save(), shop.save()]);

        return res.send('shop registered successfully !')
    } catch (err) {
        console.error('error in regestering shop at shop controller', err);
        return res.status(500).send('something went wrong please try again')
    }
}
const editShop = async (req, res) => {
    try {
        const {
            shopId
        } = req.shop;

        const {
            modifiedData
        } = req.body;

        await Shop.findByIdAndUpdate(shopId, modifiedData, async (err) => {
            if (err) {
                console.error('error in db at editing shop', err);
                return res.status(402).send('db error in editing shop try again')
            }

            return res.send('shop updated successfully')
        })
    } catch (err) {
        console.error('error in updating shop at shop controller', err);
        return res.status(500).send('something went wrong please try again')
    }
}
//send some random shop
const getShops = async (req, res) => {
    try {
        const {
            size
        } = req.body;

        const shops = await Shop.aggregate([{
            $sample: {
                size: size || 10
            }
        }]);

        return res.send(shops)
    } catch (err) {
        console.error('error in getting shops at shop controller', err);
        return res.status(500).send('something went wrong try again')
    }
}

//getting near by shop ...
const getNearByShops = async (req, res) => {
    try {
        const {
            size,
            maxDistance,
            location
        } = req.body;

        const shops = await Shop.aggregate([{
                $project: {
                    _id: 1,
                    name: 1,
                    shopImage: 1,
                    address: 1
                }
            },
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [location.longitude, location.latitude],
                    },
                    key: 'location',
                    distanceMultiplier: 6371,
                    maxDistance: maxDistance || (500 * 1000),
                    distanceField: 'distance',
                    spherical: true
                }
            }
        ]).limit(size);

        return res.send(shops)
    } catch (err) {
        console.error('error in getting shops at shop controller', err);
        return res.status(500).send('something went wrong try again')
    }
}
//send unique shop
const getShop = async (req, res) => {
    try {
        const uniqueName = req.params.id
        const {
            size
        } = req.body;

        const shop =  await  Shop.findOne({
            uniqueName
        })

        const [fashionProducts, generalProducts] = await Promise.all([
          

            FashionProduct.aggregate([{
                    $match: {
                        shop: shop._id
                    }
                }, {
                    $sample: {
                        size: size || 10
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        category: 1,
                        price: 1,
                        images: 1,
                    }
                }
            ]),

            GeneralProduct.aggregate([{
                    $match: {
                        'shops.shop': shop._id
                    }
                },
                {
                    $sample: {
                        size: size || 10
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        category: 1,
                        price: 1,
                        images: 1,
                    }
                }
            ])
        ])

        delete shop.location
        delete shop.owner
        delete shop.GST
        delete shop.status
        delete shop.createdAt

        const finalData = {
            ...shop,
            products: [...generalProducts, ...fashionProducts]
        }

        return res.send(finalData)

    } catch (err) {
        console.error('something went wrong in searching shop at shop controller', err);
        return res.status(500).send('something went wrong try again')
    }
}
const searchShop = async (req, res) => {
    try {
        const {
            uniqueName,
            name
        } = req.body;

        const shops = await Shop.find({
            $or: [{
                    uniqueName: {
                        $regex: new RegExp(uniqueName, 'i')
                    }
                },
                {
                    name: {
                        $regex: new RegExp(name, 'i')
                    }
                }
            ],
        }, {
            _id: 1,
            uniqueName: 1,
            name: 1,
            shopImage: 1
        }).limit()

        return res.send(shops)
    } catch (err) {
        console.error('error in searching shop at shop controller', err);
        return res.status(500).send('something went wrong try again')
    }
}

const searchProductInShop = async (req, res) => {
    try {
        const {
            searchedKey,
            shopId
        } = req.body;

        const [generalProducts, fashionProducts] = await Promise.all([
            GeneralProduct.aggregate([{
                    $match: {
                        name: {
                            $regex: new RegExp(searchedKey, 'i')
                        },
                        "shops.shop": shopId
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
                        category: 1,
                        price: 1,
                        images: 1,
                    }
                }
            ]),

            FashionProduct.aggregate([{
                    $match: {
                        name: {
                            $regex: new RegExp(searchedKey, 'i')
                        },
                        shop: shopId
                    }
                }, {
                    $sample: {
                        size: size || 10
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        category: 1,
                        price: 1,
                        images: 1,
                    }
                }
            ])
        ])

        const finalData = [...generalProducts, ...fashionProducts]
        return res.send(finalData)
    } catch (err) {
        console.error('error in searching product at shop controller', err);
        return res.status(500).send('something went wrong try again')
    }
}

const getSellerShop = async (req, res) => {
    try {
        const {
            shopId
        } = req.shop;
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(400).send('shop not found try again')
        }
        return res.send(shop)
    } catch (err) {
        console.error('error in getting shop data at shop controller', err);
        return res.status(500).send('something went wrong try again')
    }
}

//get products data for shop pagination left
const shopProducts = async (req, res) => {
    try {
        const {
            shopId
        } = req.shop;
        const {
            size
        } = req.body
        const [fashionProducts, generalProducts] = await Promise.all([
            FashionProduct.find({
                shop: shopId
            }, {
                _id: 1,
                name: 1,
                category: 1,
                price: 1,
                images: 1,
            }),

            GeneralProduct.find({
                'shops.shop': shopId
            }, {
                _id: 1,
                name: 1,
                category: 1,
                price: 1,
                images: 1,
            })
        ])

        return res.send([...fashionProducts, ...generalProducts])
    } catch (err) {
        console.error('error in getting shop products at shop controller', err);
        return res.status(500).send('something went wrong try again')
    }
}

const shopController = {
    checkUniqueName,
    registerShop,
    editShop,
    getShop,
    getNearByShops,
    searchShop,
    searchProductInShop,
    getShops,
    getSellerShop,
    shopProducts
}

module.exports = shopController;