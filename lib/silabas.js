'use strict';
(factory => {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
  } else {
      // Browser globals (root is window)
      this.silabas = factory();
  }
})(() => {
  const S_VOWEL = /[aeoáéóíú]/i; // Strong vowel
  const W_VOWEL = /[iuüÜ]/i; // Weak vowel
  const VOWEL = /[aeiouüÜ]/i; // Vowel
  const L_CONSONANT = /[lr]/i; // Liquid Consonant
  const O_CONSONANT = /[bcdfgpt]/i; // Obstruent Consonant
  const CONSONANT = /[b-df-hj-np-tv-zñÑ]/i; // Consonant

  const DIPHTHONG = new RegExp(`${S_VOWEL.source}h?${W_VOWEL.source}|${W_VOWEL.source}h?${S_VOWEL.source}|ui|iu|uy|yu`, 'i');
  const TRIPHTHONG = new RegExp(`${W_VOWEL.source}${S_VOWEL.source}(?:${W_VOWEL.source}|y)`, 'i');
  const CONSONANT_GROUPS = new RegExp(`${O_CONSONANT.source}${L_CONSONANT.source}|dr|kr|ll|rr|ch`, 'i');

  return (word = '') => {
    const syllables = [];

    for (let letter = 0, jump = 0, len = word.length; letter < len; letter += jump, jump = 0) {

      // Onset
      if (CONSONANT_GROUPS.test(word.substr(letter, 2))) jump += 2;
      else if (CONSONANT.test(word[letter])) jump += 1;

      // Nucleus
      if (TRIPHTHONG.test(word.substr(letter + jump, 3))) jump += 3;
      else if (DIPHTHONG.test(word.substr(letter + jump, 2))) jump += 2;
      else if (VOWEL.test(word[letter + jump])) jump += 1;
      else {
        throw new Error('A vowel was expected');
      }

      // Coda
      if (len - (letter + jump) < 2 && CONSONANT.test(word)) {
        jump += 1;
      } else if (len - (letter + jump) > 1 && CONSONANT_GROUPS.test(word.substr(letter + jump, 2))) {
        jump += 0;
      } else if (len - (letter + jump) > 1 && CONSONANT.test(word[letter + jump]) && VOWEL.test(word[letter + jump + 1])) {
        jump += 0;
      } else if (len - (letter + jump) > 2 && CONSONANT.test(word[letter + jump]) && CONSONANT.test(word[letter + jump + 1]) && VOWEL.test(word[letter + jump + 2])) {
        jump += 1;
      } else if (len - (letter + jump) > 3 && CONSONANT.test(word[letter + jump]) && CONSONANT_GROUPS.test(word.substr(letter + jump + 1, 2)) ) { //&& VOWEL.test(word[letter + jump + 3])) {
        jump += 1;
      } else if (len - (letter + jump) > 3 && CONSONANT.test(word[letter + jump]) && CONSONANT.test(word[letter + jump + 1]) && CONSONANT.test(word[letter + jump + 2]) && VOWEL.test(word[letter + jump + 3])) {
        jump += 2;
      } else if (len - (letter + jump) > 3 && CONSONANT.test(word[letter + jump]) && CONSONANT.test(word[letter + jump + 1]) && CONSONANT.test(word[letter + jump + 2]) && CONSONANT.test(word[letter + jump + 3])) {
        jump += 2;
      }

      syllables.push(word.substr(letter, jump));
    }

    return syllables;
  };
});
