import express from 'express'
import axios from 'axios'
import _ from 'lodash'
import Logger, { LOGGING_LEVEL } from './logger'
import { SearchResult } from 'types/search'
import { generateCharUrls, getCharacterDetail } from './character'
import { CharacterDetails } from './types'
import { getRaiderMessages } from './raider.io'

const app = express()
export const logger = Logger.getConsoleLogger("Raider.io", LOGGING_LEVEL.SILLY)

// https://raider.io/api/search?term=muchgrace
const searchBaseUrl = `https://raider.io/api/search?`

app.get('/character', async (req, res) => {
  const name = req.query.name
  const response = await axios.get(`${searchBaseUrl}term=${name}`)
  let matches: SearchResult[] = response.data.matches

  if (matches.length < 1) {
    return res.send({ success: false, message: `${name} does not exist.` })
  }

  // get char relative urls
  const urls = generateCharUrls(matches)

  try {
    const details = await Promise.all(_.map(urls, (url) => {
      return new Promise<CharacterDetails>(async (resolve, reject) => {
        try {
          const detail = await getCharacterDetail(url)
          resolve(detail)
        } catch{
          reject()
        }
      })
    }))
    res.send({ success: true, data: details })

  }
  catch (e) {
    res.send({ success: false, message: "Error: too much same name characters" })
  }
})

app.get('/raider', async (req, res) => {
  const name = req.query.name
  const messages = await getRaiderMessages(<string>name)
  res.send({
    success: true,
    data: messages
  })
})


const PORT = process.env.PORT || 6005
app.listen(6005, () => {
  logger.info('Server is running at '+ PORT)
})