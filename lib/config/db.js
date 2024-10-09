import mongoose from "mongoose";

export const connectionDB = async () => {
  await mongoose.connect(
    "mongodb+srv://deltacodingketan:bRFEx5FyzKUuiSCS@cluster0.wwguo.mongodb.net/todo-app"
  );
  console.log("DB Connected");
};
