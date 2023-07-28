const path = require("path");
const config = require("../config");
const Product = require("./model");
const fs = require("fs");
const Category = require("../category/model");
const Tag = require("../tag/model");

async function store(req, res, next) {
    try {
        let payload = req.body;

        if (payload.category) {
            let category = await Category.findById(payload.category);
            if (category) {
                payload = {...payload, category: category._id};
            } else {
                delete payload.category;
            }
        }

        if (payload.tags && payload.tags.length > 0) {
            let tags = await Tag.find({_id: {$in: payload.tags.split(",")}});

            if (tags && tags.length > 0) {
                payload = {...payload, tags: tags.map((tag) => tag._id)};
            } else {
                delete payload.tags;
            }
        }

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt =
                req.file.originalname.split(".")[
                    req.file.originalname.split(".").length - 1
                ];
            let filename = req.file.filename + "." + originalExt;
            let target_path = path.resolve(
                config.rootPath,
                `public/images/products/${filename}`
            );

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on("end", async () => {
                try {
                    let product = await new Product({
                        ...payload,
                        image_url: filename,
                    });
                    await product.save();
                    return res.json(product);
                } catch (err) {
                    fs.unlinkSync(target_path);
                    if (err && err.name === "ValidationError") {
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors,
                        });
                    }
                    next(err);
                }
            });
            src.on("error", async (err) => {
                next(err);
            });
        } else {
            let product = await new Product(product);
            return res.json(product);
        }
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
}

async function update(req, res, next) {
    try {
        let payload = req.body;
        let {id} = req.params;

        if (payload.category) {
            let category = await Category.findOne({
                name: {$regex: payload.category, $options: "i"},
            });
            if (category) {
                payload = {...payload, category: category._id};
            } else {
                delete payload.category;
            }
        }

        if (payload.tags && payload.tags.length > 0) {
            let tags = await Tag.find({name: {$in: payload.tags.split(",")}});
            if (tags && tags.length > 0) {
                payload = {...payload, tags: tags.map((tag) => tag._id)};
            } else {
                delete payload.tags;
            }
        }

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt =
                req.file.originalname.split(".")[
                    req.file.originalname.split(".").length - 1
                ];
            let filename = req.file.filename + "." + originalExt;
            let target_path = path.resolve(
                config.rootPath,
                `public/images/products/${filename}`
            );

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on("end", async () => {
                try {
                    let product = await Product.findById(id);
                    let currentImage = path.resolve(
                        config.rootPath,
                        `public/images/products/${product.image_url}`
                    );
                    console.log(currentImage);

                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage);
                    }

                    product = await Product.findByIdAndUpdate(
                        id,
                        {...payload, image_url: filename},
                        {
                            new: true,
                            runValidator: true,
                        }
                    );
                    return res.json(product);
                } catch (err) {
                    fs.unlinkSync(target_path);
                    if (err && err.name === "ValidationError") {
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors,
                        });
                    }
                    next(err);
                }
            });
            src.on("error", async (err) => {
                next(err);
            });
        } else {
            let product = await Product.findByIdAndUpdate(id, payload, {
                new: true,
                runValidator: true,
            });
            return res.json(product);
        }
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
}

async function index(req, res, next) {
    const {skip = 0, limit = 10, q = "", category = "", tags = []} = req.query;
    console.log(tags);

    let criteria = {};

    if (q.length) {
        criteria = {...criteria, name: {$regex: q, $options: "i"}};
    }

    if (category.length) {
        let categoryResult = await Category.findOne({
            name: {$regex: category, $options: "i"},
        });

        if (categoryResult) {
            criteria = {...criteria, category: categoryResult._id};
        }
    }

    if (tags.length > 0) {
        let tagsResult = await Tag.find({name: {$in: tags.split(",")}});
        if (tagsResult.length > 0) {
            criteria = {
                ...criteria,
                tags: {$in: tagsResult.map((tag) => tag._id)},
            };
        }
    }

    try {
        let product = await Product.find(criteria)
            .skip(Number(skip))
            .limit(Number(limit))
            .sort("-updatedAt")
            .populate("category")
            .populate("tags");
        let count = await Product.find(criteria)
            .sort("-updatedAt")
            .populate("category")
            .populate("tags")
            .countDocuments();

        return res.json({
            data: product,
            count,
        });
    } catch (err) {
        next(err);
    }
}

async function destroy(req, res, next) {
    try {
        let product = await Product.findByIdAndDelete(req.params.id);
        let currentImage = path.resolve(
            config.rootPath,
            `public/images/products/${product.image_url}`
        );
        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
        }
        return res.json(product);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    store,
    index,
    update,
    destroy,
};
