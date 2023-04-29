const mongoose=require('mongoose');
mongoose.set("strictQuery", true);
const dotenv=require('dotenv');
dotenv.config();
// in <password we use %40 at the place of @>
mongoose.connect(process.env.DATA_BASE,
{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

mongoose.connection.on("error", (err) => {
    console.log("Connection failed");
  });
  mongoose.connection.on("connected", (connected) => {
    console.log("Connected with database");
  });