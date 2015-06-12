describe('librería sílabas', function() {
  'use strict';

  it('debe de haber una instancia de silabas', function() {
    expect(silabas).toBeDefined();
  });

  it('debe de reconocer vocales', function() {
    expect(silabas.esVocal('a')).toBeTruthy();
    expect(silabas.esVocal('á')).toBeTruthy();
    expect(silabas.esVocal('ü')).toBeTruthy();
    expect(silabas.esVocal('A')).toBeTruthy();
    expect(silabas.esVocal('Á')).toBeTruthy();
    expect(silabas.esVocal('í')).toBeTruthy();
    expect(silabas.esVocal('c')).toBeFalsy();
    expect(silabas.esVocal('m')).toBeFalsy();
    expect(silabas.esVocal('z')).toBeFalsy();
  });

  it('debe reconocer consonantes', function() {
    expect(silabas.esConsonante('c')).toBeTruthy();
    expect(silabas.esConsonante('l')).toBeTruthy();
    expect(silabas.esConsonante('q')).toBeTruthy();
    expect(silabas.esConsonante('p')).toBeTruthy();
    expect(silabas.esConsonante('P')).toBeTruthy();
    expect(silabas.esConsonante('a')).toBeFalsy();
    expect(silabas.esConsonante('i')).toBeFalsy();
    expect(silabas.esConsonante('I')).toBeFalsy();
    expect(silabas.esConsonante('í')).toBeFalsy();
    expect(silabas.esConsonante('ó')).toBeFalsy();
  });
});
