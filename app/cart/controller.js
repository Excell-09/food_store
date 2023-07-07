const Product = require("../product/model");
const CartItem = require("../cart-item/model");

const update = async (req, res, next) => {
  try {
    const { items } = req.body;
    const productsIds = items.map((item) => item.product._id);
    const products = await Product.find({ _id: { $in: productsIds } });
    let cartitems = items.map((item) => {
      let relatedProduct = products.find((product) => product._id.toString() === item.product._id);
      return {
        product: relatedProduct._id,
        price: relatedProduct.price * item.qty,
        image_url: relatedProduct.image_url,
        name: relatedProduct.name,
        user: req.user._id,
        qty: item.qty,
      };
    });
    await CartItem.deleteMany({ user: req.user._id });
    await CartItem.bulkWrite(
      cartitems.map((item) => {
        return {
          updateOne: {
            filter: {
              user: req.user._id,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        };
      })
    );

    return res.json(cartitems);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        massage: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let items = await CartItem.find({ user: req.user._id }).populate("product");
    return res.json(items);
  } catch (error) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        massage: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  update,
  index,
};
