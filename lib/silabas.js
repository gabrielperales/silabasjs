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
  const ACCENT_VOWEL = /[áéíóúÁÉÍÓÚ]/i;
  const STRONG_VOWEL = /[aeo]/i;
  const WEAK_VOWEL = /[iuüÜ]/i;
  const VOWEL = /[aeiouüÜ]/i;
  const LIQUID_CONSONANT = /[lr]i/;
  const OBSTRUENT_CONSONANT = /[bcdfgpt]/i;
  const CONSONANT = /[b-df-hj-np-tv-zñÑ]/i;

  const HIATUS = new RegExp(`${STRONG_VOWEL.source}{2}`);

  const DIPHTHONG = new RegExp(`${STRONG_VOWEL.source}h?${WEAK_VOWEL.source}|${WEAK_VOWEL.source}h?${STRONG_VOWEL.source}|ui|iu|uy|yu`);
  const TRIPHTHONG = new RegExp(`${WEAK_VOWEL.source}${STRONG_VOWEL.source}(?:${WEAK_VOWEL.source}|y)`);
  const CONSONANT_GROUPS = new RegExp(`ch|${OBSTRUENT_CONSONANT.source}${LIQUID_CONSONANT.source}|ll|rr`);

  const ONSET = new RegExp(`${CONSONANT_GROUPS.source}|${CONSONANT.source}`);
  const NUCLEUS = new RegExp(`${TRIPHTHONG.source}|${DIPHTHONG.source}|${VOWEL.source}`);
  const CODA = new RegExp(`${CONSONANT.source}s?`);

  const SYLLABLES = new RegExp(
    `(?:${ONSET.source})?${VOWEL.source}+`+
    `(?:`+
      `(?=${CONSONANT_GROUPS.source})`+
      `|`+
      `${CONSONANT.source}{2}(?=${CONSONANT.source}{2}|${CONSONANT.source})`+
      `|`+
      `${CONSONANT.source}(?=${CONSONANT.source}|\Z)`+
    `)?`
  , 'ig');

  return (word = '') => word.match(SYLLABLES);
});
