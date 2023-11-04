import ProductModal from "../Modals/Product.modal.js"


export const getAllProducts = (req, res) => {
  return res.status(200).send("All products")
}

export const getSingleProduct = (req, res) => {
  return res.status(200).send("Single product")
}

export const addProduct = async (req, res) => {
  try {
    const { name, price, category, image, id} = req.body;
    if (!name || !price || !category || !image) return res.status(404).json({ success: false, message: "All fields are required" })

    const product = new ProductModal({ name, price, category, image, userId:id})
    // console.log("product-", product)

    const ress = await product.save();
    // console.log("res-", ress)

    return res.status(201).json({ success: true, message: "Product added successfully" })

  } catch (error) {
    console.log("Error-", error)
    return res.status(500).json({ success: false, message: error })
  }
}