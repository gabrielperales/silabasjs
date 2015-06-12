(function(w) {
  'use strict';

  function esCaracter(caracter) {
    if (typeof caracter !== 'string' || caracter.length !== 1) {
      throw new Error('Se esperaba un caracter');
    }
    return caracter.toLowerCase().match(/[a-záéíóúäëïöü]/);
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

  w.silabas = {
    esCaracter: esCaracter,
    esVocalAbierta: esVocalAbierta,
    esVocalCerrada: esVocalCerrada,
    esVocal: esVocal,
    esConsonante: esConsonante
  };
}(window));
