'use strict';(function(root, factory) {
  if (typeof define === "function" && define["amd"]) {
    define([], factory);
  } else {
    if (typeof module === "object" && module["exports"]) {
      module["exports"] = factory();
    } else {
      root["silabify"] = factory();
    }
  }
})(this, function() {
  var S_VOWEL = /[aeo\u00e1\u00e9\u00f3\u00ed\u00fa]/i;
  var W_VOWEL = /[iu\u00fc\u00dc]/i;
  var L_CONSONANT = /[lr]/i;
  var O_CONSONANT = /[bcdfgpt]/i;
  var VOWEL = /^[aeiou\u00e1\u00e9\u00ed\u00f3\u00fa\u00fc]/i;
  var CONSONANT = /^[b-df-hj-np-tv-z\u00f1]/i;
  var DIPHTHONG = new RegExp("(?!^i\u00ed)^(" + S_VOWEL.source + "h?" + W_VOWEL.source + "|" + W_VOWEL.source + "h?" + S_VOWEL.source + "|ui|iu|uy|yu)", "i");
  var TRIPHTHONG = new RegExp("^(" + W_VOWEL.source + S_VOWEL.source + "(?:" + W_VOWEL.source + "|y))", "i");
  var CONSONANT_GROUPS = new RegExp("^(" + O_CONSONANT.source + L_CONSONANT.source + "|dr|kr|ll|rr|ch)", "i");
  return function(word) {
    word = word === undefined ? "" : word;
    var syllables = [];
    for (var letter = 0, jump = 0, len = word.length;letter < len;letter = jump) {
      if (CONSONANT_GROUPS.test(word.substr(jump))) {
        jump += 2;
      } else {
        if (CONSONANT.test(word[jump])) {
          jump += 1;
        }
      }
      if (TRIPHTHONG.test(word.substr(jump))) {
        jump += 3;
      } else {
        if (DIPHTHONG.test(word.substr(jump))) {
          jump += 2;
        } else {
          if (VOWEL.test(word[jump]) || /y/.test(word[jump])) {
            jump += 1;
          } else {
            throw new Error("A vowel was expected");
          }
        }
      }
      if (len - jump < 2 && CONSONANT.test(word[jump])) {
        jump += 1;
      } else {
        if (len - jump > 1 && CONSONANT_GROUPS.test(word.substr(jump))) {
          jump += 0;
        } else {
          if (len - jump > 1 && CONSONANT.test(word[jump]) && VOWEL.test(word[jump + 1])) {
            jump += 0;
          } else {
            if (len - jump > 2 && CONSONANT.test(word[jump]) && CONSONANT.test(word[jump + 1]) && VOWEL.test(word[jump + 2])) {
              jump += 1;
            } else {
              if (len - jump > 3 && CONSONANT.test(word[jump]) && CONSONANT_GROUPS.test(word.substr(jump + 1)) && VOWEL.test(word[jump + 3])) {
                jump += 1;
              } else {
                if (len - jump > 3 && CONSONANT.test(word[jump]) && CONSONANT.test(word[jump + 1]) && CONSONANT.test(word[jump + 2]) && VOWEL.test(word[jump + 3])) {
                  jump += 2;
                } else {
                  if (len - jump > 3 && CONSONANT.test(word[jump]) && CONSONANT.test(word[jump + 1]) && CONSONANT.test(word[jump + 2]) && CONSONANT.test(word[jump + 3])) {
                    jump += 2;
                  }
                }
              }
            }
          }
        }
      }
      syllables.push(word.substring(letter, jump));
    }
    return syllables;
  };
});

