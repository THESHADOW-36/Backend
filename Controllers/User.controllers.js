import UserModal from "../Modals/User.modal.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) return res.status(404).json({ success: false, message: "ID not found" })

    await UserModal.findByIdAndUpdate(userId, { $push: { cart: productId } })

    return res.status(201).json({ success: true, message: "Product added to cart successfully." })

  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}

export const cart = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(404).json({ success: false, message: "User is mandatory" })

    const user = await UserModal.findById(id)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}