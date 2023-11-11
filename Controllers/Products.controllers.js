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
    const { productId } = req.body;
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
    const { name, price, category, image} = req.body.productData;
    if (!name || !price || !category || !image) return res.status(404).json({ success: false, message: "All fields are required" })

    const product = new ProductModal({ name, price, category, image})
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