
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

  updateMemoryOnCorrectAnswer(db, word) {
    this.incrementTotalScore(db)
    return db
      .from('word')
      .where('word.id', word.id)
      .update({
        memory_value: ('word.memory_value' * 2),  //multiply memory value by 2
        correct_count: (word.memory_value + 1) //update correct count
      }) 
  },

  incrementTotalScore(db) {
    return db
      .from('language')
      .update({
        total_score: ('language.total_score' + 1) //increment total score
      })
  },

  //findNext

  updateNextValue(db, word, nextWord) {
    return db
      .from('word')
      .where('word.id', word.id)
      .update({
        next: nextWord.id
      })
  },

  getNextWord(db, word) {
    return db
      .from('word')
      .select('*')
      .where('word.id', word.next)
      .first()  
  },

  updateNewHead(db, word) {
    return db 
      .from('language')
      .where('language.id', word.language_id)
      .update({
        head: word.next //set head of language to be next in line
      })
  },

  updateMemoryOnIncorrectAnswer(db, word) {
    return db
      .from('word')
      .where('word.id', word.id)
      .update({
        memory_value: 1,  //set memory value to 1
        incorrect_count: (word.memory_value + 1) //update incorrect count
      }) 
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
      .select('*')
  }
}

module.exports = LanguageService
