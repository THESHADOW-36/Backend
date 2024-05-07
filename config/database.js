import { connect } from "mongoose";

const connectDB = async () => {
   await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
   console.log('Connected to DataBase.');
}

export default connectDB;