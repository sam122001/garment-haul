const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require('./Routes/products');
const authRoutes = require('./Routes/auth');
const cart = require('./Routes/cart')
const admin = require('./Routes/admin')
const customer = require('./Routes/customer')
const order = require('./Routes/order')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/employee')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

app.use('/api/product', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cart);
app.use('/api/admin', admin);
app.use('/api/customer', customer);
app.use('/api/order', order);

app.listen(3001, () => {
    console.log("server is running")
});

// app.post('/register',(req,res)=>{
//     EmployeeModel.create(req.body)
//     .then(employees => res.json(employees))
//     .catch(err => res.json(err))
// });




// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
    
//     const user = await EmployeeModel.findOne({ email:email , password:password });

//     if (user.email && user.password) {
    
//       res.json(user);
//     } else {
      
//       res.json({ message: "Email not registered" });
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


