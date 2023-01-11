/*
 * @Author: 张为杰 zhangweijie@cestc.cn
 * @Date: 2022-12-27 13:56:51
 * @LastEditors: 张为杰 zhangweijie@cestc.cn
 * @LastEditTime: 2023-01-09 10:37:00
 * @FilePath: /react-admin-dashboard-20221227/server/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import clientRoutes from '../routes/client.js'
import generalRoutes from '../routes/general.js'
import managementRoutes from '../routes/management.js'
import salesRoutes from '../routes/sales.js'

// data imports

// import User from './models/User.js'
// import Product from './models/Product.js'
// import ProductStat from './models/ProductStat.js'
// import Transaction from './models/Transaction.js'
// import OverallStat from './models/OverallStat.js'
// import AffiliateStat from './models/AffiliateStat.js'
// import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from './data/index.js'

/* CONFIGURATION */
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/* ROUTES */
app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat)
    // OverallStat.insertMany(dataOverallStat)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
    // User.insertMany(dataUser)
  })
  .catch((error) => console.log(`${error} did not connect`))

export default app
