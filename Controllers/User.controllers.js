import UserModal from "../Modals/User.modal.js";

export const AddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) return res.status(404).json({ success: false, message: "ID not found" })

    await UserModal.findByIdAndUpdate(userId, { $push: { cart: productId } })

    return res.status(201).json({ success: true, message: "Product added to cart successfully." })

  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}
