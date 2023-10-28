import UserModal from "../Modals/User.modal.js";

export const Login = (req, res) => {
  res.send("Login pg")
}

export const Register = async (req, res) => {
  try {

    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) return res.status(401).json({ success: false, message: "All fields are mandatory" })

    const user = new UserModal({ name, email, password, phone })

    await user.save();

    return res.status(200).json({ success: true, message: "Registration Successfull" })

  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }

}