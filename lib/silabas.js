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

  function esCaracter(caracter) {
    if (typeof caracter !== 'string' || caracter.length !== 1) {
      throw new Error('Se esperaba un caracter');
    }
    return caracter.toLowerCase().match(/[a-záéíóúäëïöü]/) ? true : false;
  }

  function esVocalAbierta(caracter) {
    return esCaracter(caracter) && caracter.toLowerCase().match(/^[aeoáéóäëö]$/);
  }

  function esVocalCerrada(caracter) {
    return esCaracter(caracter) && caracter.toLowerCase().match(/^[iuíúïü]$/);
  }

  function esVocal(caracter) {
    return esCaracter(caracter) && (esVocalCerrada(caracter) || esVocalAbierta(caracter));
  }

  function esConsonante(caracter) {
    return esCaracter(caracter) && !esVocal(caracter);
  }

  function esDiptongo(str) {
    return str.toLowerCase()
      .match(/(ai|ái|au|ái|ei|éi|io|ió|ou|óu|ia|iá|ua|uá|ie|ié|ue|ué|oi|ói|uo|uó|ui|iu)/) ?
        true : false;
  }

  return {
    esCaracter: esCaracter,
    esVocalAbierta: esVocalAbierta,
    esVocalCerrada: esVocalCerrada,
    esVocal: esVocal,
    esConsonante: esConsonante,
    esDiptongo: esDiptongo
  };
}));
