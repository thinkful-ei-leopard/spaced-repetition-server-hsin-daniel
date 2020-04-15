const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')

const languageRouter = express.Router()
const jsonBodyParser = express.json()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )
      res
        .status(200)
        .json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const word = await LanguageService.getLanguageHead(req.app.get('db'))
      res.json({
        "nextWord": `${word.original}`,
        "totalScore": word.total_score,
        "wordCorrectCount": word.correct_count,
        "wordIncorrectCount": word.incorrect_count
        })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess',jsonBodyParser, async (req, res, next) => {
    let { guess } = req.body;
    if (!guess) {
      return res
        .status(400)
        .send({
          error: `Missing 'guess' in request body`,
        })
    }
    let word = await LanguageService.getLanguageHead(req.app.get('db'))
    const translation = word.translation
    if (guess !== translation) {  //guess is not equal to language head value) 
      await LanguageService.updateMemoryOnIncorrectAnswer(req.app.get('db'), word) //change memory_value
      word = await LanguageService.getLanguageHead(req.app.get('db'))
      console.log(word)
      await LanguageService.updateNewHead(req.app.get('db'), word) //change head to be next
      let wordToUpdate = await findMSpacesBack(req.app.get('db'), word, word.memory_value) //find word we want to move before
      await LanguageService.updateNextValue(req.app.get('db'), word, wordToUpdate) //update this word's next to be found word's id
      let otherWordToUpdate = await findMSpacesBack(req.app.get('db'), word, word.memory_value - 1) //find the word we want to move after
      await LanguageService.updateNextValue(req.app.get('db'), otherWordToUpdate, word) //update that word's next to be this word's id
      res
        .status(200)
        .json(word)
    }
    else if (guess === translation) {
    await LanguageService.updateMemoryOnCorrectAnswer(req.app.get('db'), word)
    word = await LanguageService.getLanguageHead(req.app.get('db'))
    await LanguageService.updateNewHead(req.app.get('db'), word)
    let wordToUpdate = await findMSpacesBack(req.app.get('db'), word, word.memory_value)
    await LanguageService.updateNextValue(req.app.get('db'), word, wordToUpdate)
    let otherWordToUpdate = await findMSpacesBack(req.app.get('db'), word, word.memory_value - 1)
    await LanguageService.updateNextValue(req.app.get('db'), otherWordToUpdate, word)
    res 
      .status(200)
      .json(word)
    }
  })

  async function findMSpacesBack(db, word, memory_value) {
    if(memory_value < 0 || word.next === null) {
      return word
    }
    let num = memory_value - 1;
    let nextWord = await LanguageService.getNextWord(db, word)
    return await findMSpacesBack(db, nextWord, num)
  }  

module.exports = languageRouter
