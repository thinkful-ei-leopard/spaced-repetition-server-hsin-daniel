class _Node {
    constructor(value = null, next = null){
      this.value = value;
      this.next = next;
    }
  }
 class LinkedList {
    constructor(){
      this.length = 0;
      this.head = null;
    }
    insertFirst(item){
      this.head = new _Node(item,this.head);
      this.length++;
    }
    insertLast(item) {
      if(this.head === null){
        this.insertFirst(item);
      }
      let tempNode = this.head;
      while(tempNode.next !== null){
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item,null);
      this.length++
    }
    insertBefore(item, key) {
      if (!this.head) {
        return null;
      }
      if(this.head.value === key) {
        this.head = new _Node(item,this.head)
      }
      let currNode = this.head;
      let previousNode = this.head;
      while ((currNode !== null) && (currNode.value !==key)) {
        previousNode = currNode;
        currNode = currNode.next;
      }
      if(currNode === null) {
        console.log('Item not found');
        return;
      }
      previousNode.next = new _Node(item, currNode);
      this.length++;
    }
    insertAfter(item, key) {
      if (!this.head) {
        return null;
      }
      let currNode = this.head;
      let nextNode = this.head;
      while ((currNode !== null) && (currNode.value !== key)) {
        currNode = nextNode;
        nextNode = nextNode.next;
      }
      if(currNode === null) {
        console.log('Item not found');
        return;
      }
      currNode.next = new _Node(item, nextNode);
      this.length++;
    }
    insertAt(item, position){
      if (!this.head) {
        return null;
      }
      let currNode = this.head;
      let nextNode = this.head;
      for(let i = 1; i < position; i++) {
        currNode = nextNode;
        nextNode = nextNode.next;
      }
      if(currNode === null) {
        console.log('Invalid position')
        return;
      }
  
      currNode.next = new _Node(item, nextNode);
      this.length++;
    }
    remove(item){
      if (!this.head) {
        return null;
      }
      if(this.head.value === item) {
        this.head = this.head.next;
        return;
      }
      let currNode = this.head;
      let previousNode = this.head;
      while ((currNode !== null) && (currNode.value !==item)) {
        previousNode = currNode;
        currNode = currNode.next;
      }
      if(currNode === null) {
        console.log('Item not found');
        return;
      }
      previousNode.next = currNode.next;
      this.length--;
    }
    find(item){
      let currNode = this.head;
      if(!this.head) {
        return null;
      }
      while (currNode.value !== item){
        if(currNode.next === null){
          return null;
        } else {
          currNode = currNode.next;
        }
      }
      return currNode;
    }
  }

  module.exports = LinkedList