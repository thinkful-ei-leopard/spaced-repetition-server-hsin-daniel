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

  getLanguageHead(db, id) {
    return db
      .from('word')
      .where('word.id', id)
      .innerJoin('language', 'language.id', '=', 'word.language_id')
      .select(
        'original',
        'total_score',
        'correct_count',
        'incorrect_count',
        
        )
  }
}

module.exports = LanguageService
