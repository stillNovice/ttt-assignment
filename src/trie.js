/*eslint-disable no-console*/

function Node(data) {
  this.data = data;
  this.words = 0;
  this.children = {};
}

function Trie() {
  this.root = new Node('');
}

Trie.prototype.add = function(word) {
  this._addword(this.root, word);
};

Trie.prototype._addword = function(node, word) {
  if(!word) {
    node.words++;
    return;
  }
  
  let firstChar = word.charAt(0);
  let thatChild = node.children[firstChar];
  if(!thatChild || typeof thatChild == 'undefined') {
    thatChild = new Node(firstChar);
    node.children[firstChar] = thatChild;
  }

  let remaining = word.substring(1);
  this._addword(thatChild, remaining);
};

Trie.prototype.count = function(word) {
  return this._countWords(this.root, word);
};

Trie.prototype._countWords = function(node, word) {
  if(!word) {
    return node.words;
  }

  if(!node ) {
    return 0;
  }

  let firstChar = word.charAt(0);
  let thatChild = node.children[firstChar];
  let remaining = word.substring(1);

  return this._countWords(thatChild, remaining);
};

Trie.prototype.traverse = function() {
  return this._traverse(this.root, '');
};

Trie.prototype._traverse = function(node, prev) {
  let obj = node.children;
  let arr = [];
  if(node.words > 0) {
    arr.push({
      freq: node.words,
      word: prev + node.data
    });
  }

  for (let key in obj) {
    if(obj.hasOwnProperty) {
      arr.push(...this._traverse(obj[key], prev + node.data));
    }
  }

  return arr;
};

export default Trie;