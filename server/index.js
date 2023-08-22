import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import dalleRoutes from './routes/dalle.routes.js'
import html from './rootHtml.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/dalle', dalleRoutes)

app.get('/', (req, res) => {
  res.type('html').send(html)
})

app.listen(8080, () => console.log('Server has started on port 8080'))
