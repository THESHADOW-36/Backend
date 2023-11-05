import ProductModal from "../Modals/Product.modal.js"


export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModal.find({}).limit(10)
    if (products.length) {
      return res.status(200).json({ success: true, message: "Products found", product: { products } })
    }
    return res.status(404).json({ success: false, message: "Product are unavailable" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}

export const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    if (!productId) return res.status(404).json({ success: false, message: "Product ID is required" })
    const product = await ProductModal.findById(productId).select("name -_id price image")
    if (product) {
      return res.status(200).json({ success: true, message: "Products found" })
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
    const { skip, page = 10, query, sorting } = req.body;

    const updatedQuery = { category: query }
    // updatedQuery.category = query

    const name = sorting.replace(/^-/, "")

    const order = sorting[0] == "-" ? "-" : "";

    const updatedSorting = { [name]: `${order}1` };

    const products = await ProductModal.find(updatedQuery).skip(skip * 10).limit(page).sort({ sorting: 1 })

    return res.status(201).json({ success: true, message: "Product found", products: products })

  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}