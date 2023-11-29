import ProductModal from "../Modals/Product.modal.js"


export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModal.find({}).select("-createdAt -updatedAt -__v")
    if (products.length) {
      return res.status(200).json({ success: true, message: "Products found", products: products })
    }
    return res.status(404).json({ success: false, message: "Product are unavailable" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}



export const getSingleProduct = async (req, res) => {
  try {
    const { id: productId } = req.query;
    if (!productId) return res.status(404).json({ success: false, message: "Product ID is required" })
    const product = await ProductModal.findById(productId).select("-createdAt -updatedAt -__v")
    if (product) {
      return res.status(200).json({ success: true, message: "Products found", product })
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}



export const addProduct = async (req, res) => {
  try {
    const { name, price, category, image, id } = req.body;
    if (!name || !price || !category || !image) return res.status(404).json({ success: false, message: "All fields are required" })

    const product = new ProductModal({ name, price, category, image, userId: id })
    // console.log("product-", product)

    const ress = await product.save();
    // console.log("res-", ress) 

    return res.status(201).json({ success: true, message: "Product added successfully" })

  } catch (error) {
    console.log("Error-", error)
    return res.status(500).json({ success: false, message: error })
  }
}



export const filterProducts = async (req, res) => {
  try {
    const { query } = req.body;

    const updatedQuery = {}
    updatedQuery.category = query
    const products = await ProductModal.find(updatedQuery)

    return res.status(200).json({ success: true, message: "Product found", products: products })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: error })
  }
}



export const sortingFilterProducts = async (req, res) => {
  try {
    const { sorting } = req.body;

    const name = sorting.replace(/^-/, "")

    const order = sorting[0] == "-" ? "-" : "";

    const updatedSorting = { [name]: `${order}1` }

    const products = await ProductModal.find({}).sort(updatedSorting)

    return res.status(200).json({ success: true, message: "Product found", products: products })

  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}

export const pageFilterProducts = async (req, res) => {
  try {
    const { skip, page = 10 } = req.body;

    const products = await ProductModal.find({}).skip(skip * 10).limit(page)

    return res.status(200).json({ success: true, message: "Product found", products: products })

  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}


export const yourProducts = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(404).json({ success: false, message: "ID not found" })

    const allProducts = await ProductModal.find({ userId: id })

    return res.status(200).json({ success: true, products: allProducts })

  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { name, price, image, category, _id } = req.body.productData;
    if (!name || !price || !category || !image || !_id) return res.status(404).json({ success: false, message: "All fields are required" })

    await ProductModal.findByIdAndUpdate(_id, { name, price, image, category })

    return res.status(200).json({ success: true, message: "Product updated successfully." })

  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ success: false, message: "ID is not found" })
    await ProductModal.findByIdAndRemove(id)

    return res.status(200).json({ success: true, message: "Product deleted successfully." })

  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}