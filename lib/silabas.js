(function(w) {
  'use strict';

  function esVocal (caracter) {
    if (typeof caracter !== 'string' || caracter.length !== 1) {
      throw new Error('Se esperaba un caracter');
    }
    return caracter.toLowerCase().match(/^[aeiouáéíóúäëïöü]$/);
  }

  function esConsonante(caracter) {
    return !esVocal(caracter);
  }

  w.silabas = {
    esVocal: esVocal,
    esConsonante: esConsonante
  };
}(window));
