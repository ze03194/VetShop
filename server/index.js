const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser');
const credentials = require('./config/credentials')
app.use(credentials)


app.use(express.json())

const db = require('./models')

app.use(cookieParser());
app.use(cors(corsOptions))

// Routers
const userRouter = require('./routes/Users')
app.use('/users', userRouter)

const petRouter = require('./routes/Pets')
app.use('/pets', petRouter)

const appointmentRouter = require('./routes/Appointments')
app.use('/appointments', appointmentRouter)

const employeeRouter = require('./routes/Employees')
app.use('/employees', employeeRouter)

const authenticationRouter = require('./routes/Authentication')
app.use('/authentication', authenticationRouter)

const refreshRouter = require('./routes/Refresh')
app.use('/refresh', refreshRouter)

const logoutRouter = require('./routes/Logout')
app.use('/logout', logoutRouter)

const orderRouter = require('./routes/Orders')
app.use('/orders', orderRouter)

const productRouter = require('./routes/Products')
app.use('/products', productRouter)


db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("Server running on port 8080")
    })
})




