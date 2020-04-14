const LinkedList = require('../modules/LinkedList')

let questionsList = new LinkedList();

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

  poplulateQuestionsList(db, language_id, ll) {
    let words = this.getLanguageWords(db, language_id);
    words.forEach(word => {
      word = {...word, M: 1}
      ll.insertLast(word)
    })
    return ll;
  },

  processIncorrectAnswer(ll) {
    ll.head.value.M = ll.head.value.M * 2; //double M
    let currNode = ll.head; //store head as currNode
    ll.head = currNode.next;  //set head of ll to be the next question in linked list
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

module.exports = {
  LanguageService,
  LinkedList
}
