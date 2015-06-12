describe('librería sílabas', function() {
  'use strict';

  it('debe de haber una instancia de silabas', function() {
    expect(silabas).toBeDefined();
  });

  it('debe reconocer caracteres', function() {
    expect(silabas.esCaracter('a')).toBeTruthy();
    expect(silabas.esCaracter('á')).toBeTruthy();
    expect(silabas.esCaracter('A')).toBeTruthy();
    expect(silabas.esCaracter('C')).toBeTruthy();
    expect(silabas.esCaracter('P')).toBeTruthy();
    expect(silabas.esCaracter('d')).toBeTruthy();
    expect(silabas.esCaracter('s')).toBeTruthy();
    expect(silabas.esCaracter('l')).toBeTruthy();

    try {
      silabas.esCaracter('ll');
    } catch (e) {
      expect(e.message).toBe('Se esperaba un caracter');
    }
    try {
      silabas.esCaracter(534);
    } catch (e) {
      expect(e.message).toBe('Se esperaba un caracter');
    }
    try {
      silabas.esCaracter({});
    } catch (e) {
      expect(e.message).toBe('Se esperaba un caracter');
    }
  });

  it('debe reconocer vocales abiertas', function() {
    expect(silabas.esVocalAbierta('a')).toBeTruthy();
    expect(silabas.esVocalAbierta('e')).toBeTruthy();
    expect(silabas.esVocalAbierta('o')).toBeTruthy();
    expect(silabas.esVocalAbierta('á')).toBeTruthy();
    expect(silabas.esVocalAbierta('é')).toBeTruthy();
    expect(silabas.esVocalAbierta('ó')).toBeTruthy();
    expect(silabas.esVocalAbierta('A')).toBeTruthy();
    expect(silabas.esVocalAbierta('O')).toBeTruthy();
    expect(silabas.esVocalAbierta('I')).toBeFalsy();
    expect(silabas.esVocalAbierta('U')).toBeFalsy();
  });

  it('debe reconocer vocales cerradas', function() {
    expect(silabas.esVocalCerrada('Í')).toBeTruthy();
    expect(silabas.esVocalCerrada('ü')).toBeTruthy();
    expect(silabas.esVocalCerrada('U')).toBeTruthy();
    expect(silabas.esVocalCerrada('i')).toBeTruthy();
    expect(silabas.esVocalCerrada('O')).toBeFalsy();
    expect(silabas.esVocalCerrada('Á')).toBeFalsy();
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

  it('debe reconocer diptongos', function() {
    expect(silabas.esDiptongo('avión')).toBeTruthy();
    expect(silabas.esDiptongo('agua')).toBeTruthy();
    expect(silabas.esDiptongo('pie')).toBeTruthy();
  });
});
