import UserModal from "../Modals/User.modal.js";
import ProductModal from "../Modals/Product.modal.js";

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

    if (user) {
      var userCart = [];
      for (var i = 0; i < user.cart.length; i++) {
        const productData = await ProductModal.findById(user.cart[i])
        userCart.push(productData)
      }
      console.log(userCart, "userCart")
      return res.status(201).json({ success: true, message: "Products fetched successfully.", products: userCart })
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}

export const deleteToCart = async (req, res) => {
  try {
    const { proId, userId } = req.body;
    if (!proId || userId) return res.status(404).json({ success: false, message: "User and products are mandatory" })

    const user = await UserModal.findById(userId)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })

    const index = user.cart.indexOf(proId)
    user.cart.splice(index, 1)
    await user.save();

    var userCart = [];
    for (var i = 0; i < user.cart.length; i++) {
      const productData = await ProductModal.findById(user.cart[i])
      userCart.push(productData)
    }
    return res.status(201).json({ success: true, message: "Product deleted successfully.", products: userCart })
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}