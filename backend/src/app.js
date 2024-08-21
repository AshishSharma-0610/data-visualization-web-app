const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const salesRoutes = require('./routes/SalesRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/sales', salesRoutes);
app.use('/api/customers', customerRoutes);
app.get('/',(req,res)=>{
  res.send("Working Fine");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
