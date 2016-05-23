'use strict';
((root, factory) => {
  if (typeof define === 'function' && define['amd']) {
      // AMD. Register as an anonymous module.
      define([], factory);
  } else if (typeof module === 'object' && module['exports']) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module['exports'] = factory();
  } else {
      // Browser globals (root is window)
      root['silabify'] = factory();
  }
})(this, () => {
  const S_VOWEL = /[aeoáéóíú]/i; // Strong vowel
  const W_VOWEL = /[iuüÜ]/i; // Weak vowel
  const L_CONSONANT = /[lr]/i; // Liquid Consonant
  const O_CONSONANT = /[bcdfgpt]/i; // Obstruent Consonant
  const VOWEL = /^[aeiouáéíóúü]/i; // Vowel
  const CONSONANT = /^[b-df-hj-np-tv-zñ]/i; // Consonant

  const DIPHTHONG = new RegExp(
    `(?!^ií)^(${S_VOWEL.source}h?${W_VOWEL.source}|${W_VOWEL.source}h?${S_VOWEL.source}|ui|iu|uy|yu)`
  , 'i');
  const TRIPHTHONG = new RegExp(`^(${W_VOWEL.source}${S_VOWEL.source}(?:${W_VOWEL.source}|y))`, 'i');
  const CONSONANT_GROUPS = new RegExp(`^(${O_CONSONANT.source}${L_CONSONANT.source}|dr|kr|ll|rr|ch)`, 'i');

  return (word = '') => {
    const syllables = [];

    for (let letter = 0, jump = 0, len = word.length; letter < len; letter = jump) {

      // Onset
      if (CONSONANT_GROUPS.test(word.substr(jump))) {
        jump += 2;
      } else if (CONSONANT.test(word[jump])) {
        jump += 1;
      }

      // Nucleus
      if (TRIPHTHONG.test(word.substr(jump))) {
        jump += 3;
      } else if (DIPHTHONG.test(word.substr(jump))) {
        jump += 2;
      } else if (VOWEL.test(word[jump]) || /y/.test(word[jump])) { // sometimes y can act as a vowel
        jump += 1;
      } else {
        throw new Error('A vowel was expected');
      }

      // Coda
      if (len - jump < 2 && CONSONANT.test(word[jump])) {
        jump += 1;
      } else if (len - jump > 1 && CONSONANT_GROUPS.test(word.substr(jump))) {
        jump += 0;
      } else if (len - jump > 1 && CONSONANT.test(word[jump]) && VOWEL.test(word[jump + 1])) {
        jump += 0;
      } else if (len - jump > 2 && CONSONANT.test(word[jump]) && CONSONANT.test(word[jump + 1]) && VOWEL.test(word[jump + 2])) {
        jump += 1;
      } else if (len - jump > 3 && CONSONANT.test(word[jump]) && CONSONANT_GROUPS.test(word.substr(jump + 1)) && VOWEL.test(word[jump + 3])) {
        jump += 1;
      } else if (len - jump > 3 && CONSONANT.test(word[jump]) && CONSONANT.test(word[jump + 1]) && CONSONANT.test(word[jump + 2]) && VOWEL.test(word[jump + 3])) {
        jump += 2;
      } else if (len - jump > 3 && CONSONANT.test(word[jump]) && CONSONANT.test(word[jump + 1]) && CONSONANT.test(word[jump + 2]) && CONSONANT.test(word[jump + 3])) {
        jump += 2;
      }

      syllables.push(word.substring(letter, jump));
    }

    return syllables;
  };
});
