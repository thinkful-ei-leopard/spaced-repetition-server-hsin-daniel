
const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

 //assign correct starting head values and memory values to language and words

  updateMemoryOnCorrectAnswer(db, wordId) {
    this.incrementTotalScore()
    return db
      .from('word')
      .where('word.id', wordId)
      .update({
        memory_value: ('word.memory_value' * 2),  //multiply memory value by 2
        correct_count: ('word.correct_count' + 1) //update correct count
      }) 
      //set new head
      //move this word back M spaces
  },

  incrementTotalScore(db) {
    return db
      .from('language')
      .update({
        total_score: ('language.total_score' + 1) //increment total score
      })
  },

  //findNext

  moveBackMSpaces(db, next, num) {
    for (let i = 0; i <num; i++) {
      return db //find next word
        .from('word')
        .where('word.id', next)
    }
      //find the word back M spaces
      //move word back M spaces
      //set this word's next to be the new language.head
      //set next to be the id of the word that is m spaces back in line
      //set the next of the word m - 1 spaces back in line to be this words id
  },

  updateMemoryOnIncorrectAnswer(db, wordId) {
    return db
      .from('word')
      .where('word.id', wordId)
      .update({
        memory_value: 1,  //set memory value to 1
        incorrect_count: ('word.incorrect_count' + 1) //update incorrect count
      }) 
     //set head of ll to be the next question in linked list
    //need to move currNode back M spaces...
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getLanguageHead(db) {
    return db
      .from('language')
      .innerJoin('word', 'word.id', '=', 'language.head')
      .first()
      .select(
        'original',
        'total_score',
        'correct_count',
        'incorrect_count',
        'translation'
        )
  }
}

module.exports = LanguageService
