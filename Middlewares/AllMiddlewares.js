import UserModal from "../Modals/User.modal.js";

export const checkUserId = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await UserModal.findById(id);
    if (user) {
      next();
    } else {
      return res.status(404).json({ success: false, message: "User not found" })
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}