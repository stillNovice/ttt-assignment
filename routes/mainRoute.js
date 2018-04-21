/*eslint-disable no-console*/

import express from 'express';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import colors from 'colors';
import Trie from '../src/trie';
import { AsyncResource } from 'async_hooks';

const router = express.Router();

let freqOfWordsArr = [];

router.get('/', function(req, res, next) {
  axios.get('http://terriblytinytales.com/test.txt')
    .then(function(response) {
      let data = response.data;
      if(!data) {
        res.send('<h1> Nothing to display here </h1>');
      }
      let lines = data.split('\n');
      
      let allWords = [];
      lines.forEach((line, idx) => {
        allWords.push(...line.split(' '));
      });

      let MyTrie = new Trie();

      // process words
      for (let i = 0; i < allWords.length; i++) {
        allWords[i] = allWords[i].replace(/[^a-zA-Z']/g, "").toLowerCase();
        MyTrie.add(allWords[i]);
      }
      //const sss = new Set(allWords);
      //console.log('sss', sss.size);
      //console.log('allwords', allWords);
      let freqOfWords = MyTrie.traverse().sort(function(a, b) {
        if(a.freq > b.freq) {
          return -1;
        }
        if(a.freq < b.freq) {
          return 1;
        }
        return 0;
      });

      freqOfWordsArr = freqOfWords;
      //console.log(freqOfWords);
    })
    .catch(err => console.error('errorrrr', err));

  res.render('freqTable', {});
});

router.post('/getFrequencies', function(req, res, next) {
  let n = req.body.inputN;

  let ans = [];
  let prev = -111;
  
  for (let i = 0, cnt = 0; i < freqOfWordsArr.length; i++) {
    let elem = freqOfWordsArr[i];
    if(elem.word == '') continue;

    if(prev != elem.freq) {
      n--;
      prev = elem.freq;
    }

    if(n < 0) break;
    elem.idx = cnt + 1;
    cnt++;
    ans.push(elem);
  }

  res.render('freqTable', {data: ans});
});

router.get('/getFrequencies', function(req, res, next) {
  res.redirect('/');
});

export default router;