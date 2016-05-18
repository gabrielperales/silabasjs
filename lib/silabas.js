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
  const OPEN_VOWEL = /[aeo]/i;
  const CLOSED_VOWEL = /[iuüÜ]/i;
  const VOWEL = /[aeiouüÜ]/i;
  const LIQUID_CONSONANT = /[lr]i/;
  const OBSTRUENT_CONSONANT = /[bcdfgpt]/i;
  const CONSONANT = /[b-df-hj-np-tv-zñÑ]/i;

  const DIPHTHONG = new RegExp(
    `${OPEN_VOWEL.source}h?${CLOSED_VOWEL.source}|${CLOSED_VOWEL.source}h?${OPEN_VOWEL.source}|ui|iu|uy|yu`, 'i'
  );
  const TRIPHTHONG = new RegExp(
    `${CLOSED_VOWEL.source}${OPEN_VOWEL.source}(?:${CLOSED_VOWEL.source}|y)`, 'i'
  );
  const CONSONANT_GROUPS = new RegExp(`ch|${OBSTRUENT_CONSONANT.source}${LIQUID_CONSONANT.source}|ll|rr`, 'i');

  const ONSET = new RegExp(`${CONSONANT_GROUPS.source}|${CONSONANT.source}`);
  const NUCLEUS = new RegExp(`${TRIPHTHONG.source}|${DIPHTHONG.source}|${VOWEL.source}`);
  const CODA = new RegExp(`${CONSONANT.source}s?`);

  const SYLLABLES = new RegExp(`${ONSET.source}?(?:${NUCLEUS.source}${CODA.source}|${NUCLEUS.source})`, 'gi');

  return (word = '') => word.match(SYLLABLES);
});
