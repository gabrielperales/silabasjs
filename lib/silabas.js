(function (root, factory) {
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
        root.silabas = factory();
  }
}(this, function () {
  var REGEX_CARACTER = /[a-záéíóúäëïöü]/;
  var REGEX_VOCAL_ABIERTA = /[aeoáéóäëö]/;
  var REGEX_VOCAL_CERRADA = /[iuíúïü]/;
  var REGEX_VOCAL_TILDE = /[áéíóú]/;

  function esCaracter(caracter) {
    if (typeof caracter !== 'string' || caracter.length !== 1) {
      throw new Error('Se esperaba un caracter');
    }
    return REGEX_CARACTER.test(caracter.toLowerCase());
  }

  function esVocalAbierta(caracter) {
    return esCaracter(caracter) && REGEX_VOCAL_ABIERTA.test(caracter.toLowerCase());
  }

  function esVocalCerrada(caracter) {
    return esCaracter(caracter) && REGEX_VOCAL_CERRADA.test(caracter.toLowerCase());
  }

  function esVocal(caracter) {
    return esVocalCerrada(caracter) || esVocalAbierta(caracter);
  }

  function esVocalConTilde(caracter) {
    return esVocal(caracter) && REGEX_VOCAL_TILDE.test(caracter);
  }

  function esConsonante(caracter) {
    return esCaracter(caracter) && !esVocal(caracter);
  }

  function esDiptongo(str) {
    var regexAbiertaCerrada = new RegExp('h?' + REGEX_VOCAL_ABIERTA.source + 'h?' + REGEX_VOCAL_CERRADA.source);
    var regexCerradaAbierta = new RegExp('h?' + REGEX_VOCAL_CERRADA.source + 'h?' + REGEX_VOCAL_ABIERTA.source);
    return regexAbiertaCerrada.test(str.toLowerCase()) || regexCerradaAbierta.test(str.toLowerCase());
  }

  function esTriptongo(str) {
    var regexCerradaAbiertaCerrada = new RegExp(REGEX_VOCAL_CERRADA + REGEX_VOCAL_ABIERTA + REGEX_VOCAL_CERRADA);
    return regexCerradaAbiertaCerrada.test(str.toLowerCase());
  }

  return {
    esCaracter: esCaracter,
    esVocalAbierta: esVocalAbierta,
    esVocalCerrada: esVocalCerrada,
    esVocal: esVocal,
    esConsonante: esConsonante,
    esDiptongo: esDiptongo,
    esTriptongo: esTriptongo
  };
}));
