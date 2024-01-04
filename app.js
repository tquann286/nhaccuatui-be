const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

const getSongStreamData = async (streamUrl) => {
  try {
    const fetch = await import('node-fetch')
    const response = await fetch.default(streamUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://beta.nhaccuatui.com/',
      },
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return buffer
  } catch (error) {
    console.error(error)
  }
}

const getSong = async (req, res, next) => {
  try {
    const { url } = req.params
    console.log('url: ', url)
    const data = await getSongStreamData(url)

    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Type', 'audio/mp3')
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

app.get('/api/streamUrl/:url', getSong)

app.listen(8080, () => {
  console.log('http://localhost:8080/')
})
