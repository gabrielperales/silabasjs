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
  const REGEX_CARACTER = /[a-záéíóúäëïöü]/;
  const REGEX_VOCAL_ABIERTA = /[aeoáéóäëö]/;
  const REGEX_VOCAL_CERRADA = /[iuíúïü]/;
  const REGEX_VOCAL = new RegExp(`${REGEX_VOCAL_ABIERTA.source}|${REGEX_VOCAL_CERRADA.source}`);
  const REGEX_CONSONANTE_LIQUIDA = /[lr]/;
  const REGEX_CONSONANTE_OBSTRUYENTE = /[pkbgfdt]/;
  const REGEX_CONSONANTE = /[^aeiouáéíóúäëïöü]/;

  function strToArray(str){
    return str.split('');
  }

  function esCaracter(caracter) {
    if (typeof caracter !== 'string' || caracter.length !== 1) {
      throw new Error('Se esperaba un caracter');
    }
    return REGEX_CARACTER.test(caracter.toLowerCase());
  }

  function esVocal(caracter) {
    return esCaracter(caracter) && REGEX_VOCAL.test(caracter);
  }

  function esConsonante(caracter) {
    return esCaracter(caracter) && REGEX_CONSONANTE.test(caracter);
  }

  function esDiptongo(trozo) {
    const regexAbiertaCerrada = new RegExp(`h?${REGEX_VOCAL_ABIERTA.source}h?${REGEX_VOCAL_CERRADA.source}`);
    const regexCerradaAbierta = new RegExp(`h?${REGEX_VOCAL_CERRADA.source}h?${REGEX_VOCAL_ABIERTA.source}`);
    return regexAbiertaCerrada.test(trozo.toLowerCase()) || regexCerradaAbierta.test(trozo.toLowerCase());
  }

  function esTriptongo(trozo) {
    var regexCerradaAbiertaCerrada = new RegExp(REGEX_VOCAL_CERRADA + REGEX_VOCAL_ABIERTA + REGEX_VOCAL_CERRADA);
    return regexCerradaAbiertaCerrada.test(trozo.toLowerCase());
  }

  function ataque(trozo){
    trozo = (trozo || '').toLowerCase();
    if (!strToArray(trozo).every(esConsonante) || /\w{3,}/.test(trozo)) return false;
    return (trozo.length === 1 && esConsonante(trozo)) || /[pkbgf][rl]|[dt]r/.test(trozo) && !/tl|dl/.test(trozo);
  }

  function nucleo(trozo){
    if (!strToArray(trozo).every(esVocal) || /\w{4,}/.test(trozo)) return false;
    return (new RegExp(`${REGEX_VOCAL_CERRADA.source}?${REGEX_VOCAL}${REGEX_VOCAL_CERRADA.source}?`)).test(trozo);
  }

  function coda(trozo){
    // consonantes más frecuentes: /d, z, s, n, l, r/
    // poco numerosos: /p, b, m, f, t, k, g/
    // extraños: /x, j/
    // extranjerismos con /s/ al final como en chalets, carnets...
    // consonante con /f/ al final como en golf, surf...
    // nunca: /y, ñ, w/
    if (!strToArray(trozo).every(esConsonante) || /\w{3,}/.test(trozo)) return false;
    return /^[yñ]|[bdknlr]s|[lr]f/.test(trozo);
  }

  function descomponer(palabra){
    palabra = palabra.toLowerCase();

    const len = palabra.length,
      letras = strToArray(palabra),
      l = letras;

    if (!len) return [];

    if (len === 1 && esVocal(l[0]))
      return [l[0]];

    // Normas de descomposición silábica del español:
    //
    // consonantes obstuyentes -> oclusivas / africadas / fricativas
    // consonantes obstuyentes -> /p , k, b, g, f, d, t/
    // consonantes líquidas /l/ /r/ y /ɾ//
    //  consonnantes oclusivas -> p, t, k, n y m
    //  consonantes africadas -> [pf], [ts], [dz], [f∫], [3ʒ], [tɕ], [d̠ʑ], [ʈʂ], [ɖʐ]
    //  consonantes fricativas -> s, f, x

    // 1 - Una consonante entre dos vocales siempre forma sílaba con la vocal
    // que le sigue (a-la, e-so, i-ra):
    //
    // V C V -> V - C V
    if (esVocal(l[0]) && esConsonante(l[1]) && esVocal(l[2]))
      return [l[0]].concat(get(palabra.substr(1)));

    // 2 - Entre dos consonantes contiguas siempre hay una frontera silábica
    // (al-ba, is-la, ar-ma), a no ser que formen un grupo de /obstruyente/
    // + /líquida/ en ataque o un grupo /consonante/ + /s/ en coda.
    //
    // C1 C2 -> - C1 C2 (C1 C2 = /obstruyente/ + /líquida/)
    // C1 C2 -> C1 C2 - (C1 C2 = /consonante/ + /s/)
    // C1 C2 -> C1 C2 - (C1 C2 ? = /obstruyente/ + /líquida/, ? /consonante/ + /s/)
    if (esConsonante(l[0]) && l[1] === 's' ||
       REGEX_CONSONANTE_OBSTRUYENTE.test(l[0]) && REGEX_CONSONANTE_LIQUIDA.test(l[1]))
      return [l[0] + l[1]].concat(get(palabra.substr(2)));

    // 3 - En las combinaciones de tres consonantes adyacentes se pueden dar
    // dos situaciones:
    //  3.a Si las dos últimas forman un grupo de /obstruyente/ + /líquida/,
    //    la frontera silábica estará ante ellas y la primera consonante se
    //    situará en posición de coda (des-gracia).
    //
    //  C1 C2 C3 -> C1 - C2 C3 (C2 C3 = /obstruyente/ + /líquida/)
    if (esConsonante(l[0]) && REGEX_CONSONANTE_OBSTRUYENTE.test(l[1]) && REGEX_CONSONANTE_LIQUIDA.test(l[2]))
      return [l[0]].concat(get(palabra.substr(1)));
    //
    //  3.b Si las dos últimas no forman un grupo de /obstruyente/ + /líquida/,
    //    la frontera silábica estará ante la última consonante del grupo y
    //    las dos primeras constituirán una coda compleja /consonante/ + /s/
    //    (abs-temio).
    //
    //  C1 C2 C3 -> C1 C2 - C3 (C1 C2 = /consonante/ + /s/; C2 C3 /obstruyente/ + /líquida/)
    if (esConsonante(l[0]) && esConsonante(l[1]) && l[2] === 's' || esConsonante(l[0]) && /[pkbgfdt]/.test(l[1]) && /[lr]/.test(l[2]))
      return [l[0] + l[1]].concat(get(palabra.substr(2)));

    // 4 - En las combinaciones de cuatro consonantes adyacentes la frontera
    // silábica se situará entre la segunda y la tercera: los dos primeros
    // segmentos han de ser una coda compleja de /consonante/ + /s/ y los dos
    // últimos, un grupo de /obstruyente/ + /líquida/ (abs-tracto).
    //
    // C1 C2 C3 C4 -> C1 C2 - C3 C4 (C1 C2 = /consonate/ + /s/; C3 C4 = /obstruyente/ + /liquida/)
    if (esConsonante(l[0]) && l[1] === 's' && REGEX_CONSONANTE_OBSTRUYENTE.test(l[2]) && REGEX_CONSONANTE_LIQUIDA.test(l[3]))
      return [l[0] + l[1]].concat(get(palabra.substr(2)));

    // 5 - Entre vocales [-altas] (o "no cerradas") siempre habrá un límite
    // silábico (a-aronita, ra-er, fara-ón, re-al, le-er, fe-o, bo-a, ro-er, lo-or).
    // En la transcripción del DEFE no tenemos en cuenta el proceso fonológico de sinéresis.
    //
    // V1 V2 -> V1 - V2 (V1 y V2 = [-alta])
    if (REGEX_VOCAL_ABIERTA.test(l[0]) && REGEX_VOCAL_ABIERTA.test(l[1]))
        return [l[0]].concat(get(palabra.substr(1)));

    // 6 - Las combinaciones de dos vocales [+altas], y de vocal [+alta] con
    // vocal [-alta], independientemente de la posición que ocupen estos
    // segmentos, pueden formar diptongo o hiato; es una propiedad idiosincrásica
    // de cada elemento léxico. Consideramos que el diptongo es la situación no
    // marcada en español, por lo que los casos de hiatos han de ser tratados como
    // excepciones en las reglas de silabación. No existen diptongos formados por
    // dos vocales [+altas] -una silábica y otra asilábica- homorgánicas.
    //
    // Diptongo: V1 V2 --> V1 V2 (V1 = [+alta], V2 = [-alta])
    // (hacia, cuatro, ciego, luego, vio, afectuosidad)
    //
    // Hiato: V1 V2 --> V1 - V2 (V1 = [+alta], V2 = [-alta])
    // (li-ar, li-é, li-ó, actu-ar, actu-é, actu-ó)
    if (REGEX_VOCAL_CERRADA.test(l[0]) && REGEX_VOCAL_ABIERTA.test(l[1]))
      return [l[0]].concat(get(palabra.substr(1)));

    // Diptongo: V1 V2 --> V1 V2 (V1 = [-alta], V2 = [+alta])
    // (baile, balaustrada, peine, deuda, hoy, bou)
    //if (esDiptongo(l[0] + l[1]) && REGEX_VOCAL_ABIERTA.test(l[0]) && REGEX_VOCAL_ABIERTA.test(l[1]))
      //return

    // Hiato: V1 V2 --> V1 - V2 (V1 = [-alta], V2 = [+alta])
    // (ca-ída, ba-úl, re-í, re-úno, o-ído, no-úmeno)
    if (!esDiptongo(l[0] + l[1]) && REGEX_VOCAL_ABIERTA.test(l[0]) && REGEX_VOCAL_CERRADA.test(l[1]))
      return [l[0]].concat(get(palabra.substr(1)));
    //
    // Diptongo: V1 V2 --> V1 V2 (V1 = [+alta], V2 = [+alta])
    // (cuidado, ciudad, *ii, *uu)
    //if (esDiptongo(l[0] + l[1]) && REGEX_VOCAL_CERRADA.test(l[0]) && REGEX_VOCAL_CERRADA.test(l[1]))
      //return

    //
    // Hiato: V1 V2 --> V1 - V2 (V1 = [+alta], V2 = [+alta])
    // (hu-ir, veinti-uno, chi-íta, *u-ú).
    if (REGEX_VOCAL_CERRADA.test(l[0]) && REGEX_VOCAL_CERRADA.test(l[1]))
      return [l[0]].concat(get(palabra.substr(1)));


  }

  return descomponer;
});
