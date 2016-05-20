'use strict';
import silabas from '../lib/silabas';
import test from 'ava';


test('Una vocal constituye una sílaba', t => {
  t.deepEqual(silabas('a'), ['a']);
  t.deepEqual(silabas('e'), ['e']);
  t.deepEqual(silabas('i'), ['i']);
  t.deepEqual(silabas('o'), ['o']);
  t.deepEqual(silabas('u'), ['u']);
});

test('Una consonante entre dos vocales siempre forma sílaba con la vocal que le sigue', t => {
  t.deepEqual(silabas('ala'), ['a', 'la']);
  t.deepEqual(silabas('eso'), ['e', 'so']);
  t.deepEqual(silabas('ira'), ['i', 'ra']);
});

test('Entro dos consonantes contiguas siempre hay una frontera silábica', t => {
  t.deepEqual(silabas('alba'), ['al', 'ba']);
  t.deepEqual(silabas('isla'), ['is', 'la']);
  t.deepEqual(silabas('arma'), ['ar', 'ma']);
});

test('consonante + /obstruyente/ + /líquida/', t => {
  t.deepEqual(silabas('desgracia'), ['des', 'gra', 'cia']);
});

test('consonante + /s/ ', t => {
  t.deepEqual(silabas('abstemio'), ['abs', 'te', 'mio']);
});

test('consonante + /s/ + /obstruyente/ + /líquida/', t => {
  t.deepEqual(silabas('abstracto'), ['abs', 'trac', 'to']);
});

test('Entre vocales fuertes siempre habrá un límite silábico', t => {
  t.deepEqual(silabas('aaronita'), ['a', 'a', 'ro', 'ni', 'ta']);
  t.deepEqual(silabas('raer'), ['ra', 'er']);
  t.deepEqual(silabas('faraón'), ['fa', 'ra', 'ón']);
  t.deepEqual(silabas('real'), ['re', 'al']);
  t.deepEqual(silabas('leer'), ['le', 'er']);
  t.deepEqual(silabas('feo'), ['fe', 'o']);
  t.deepEqual(silabas('boa'), ['bo', 'a']);
  t.deepEqual(silabas('roer'), ['ro', 'er']);
  t.deepEqual(silabas('loor'), ['lo', 'or']);
});

test('Las combinaciones de una vocal débil y una fuerte pueden formar diptongos', t => {
  // diptongos (vocal débil + vocal fuerte)
  t.deepEqual(silabas('hacia'), ['ha', 'cia']);
  t.deepEqual(silabas('cuatro'), ['cua', 'tro']);
  t.deepEqual(silabas('ciego'), ['cie', 'go']);
  t.deepEqual(silabas('luego'), ['lue', 'go']);
  t.deepEqual(silabas('afectuosidad'), ['a', 'fec', 'tuo', 'si', 'dad']);
});

test('Las combinaciones de una vocal débil y una fuerte pueden formar hiatos', t => {
  // hiatos (vocal débil + vocal fuerte)
  t.deepEqual(silabas('liar'), ['li', 'ar']);
  t.deepEqual(silabas('lié'), ['li', 'é']);
  t.deepEqual(silabas('actuar'), ['ac', 'tu', 'ar']);
  t.deepEqual(silabas('actué'), ['ac', 'tu', 'é']);
  t.deepEqual(silabas('actuó'), ['ac', 'tu', 'ó']);
});

test('Las combinaciones de una vocal fuerte y una débil pueden formar un diptongo', t => {
  // diptongo (vocal fuerte + vocal débil)
  t.deepEqual(silabas('baile'), ['bai', 'le']);
  t.deepEqual(silabas('balaustrada'), ['ba', 'laus', 'tra', 'da']);
  t.deepEqual(silabas('peine'), ['pei', 'ne']);
  t.deepEqual(silabas('deuda'), ['deu', 'da']);
  t.deepEqual(silabas('hoy'), ['hoy']);
  t.deepEqual(silabas('bou'), ['bou']);
});

test('Las combinaciones de una vocal fuerte y una débil pueden formar un hiato', t => {
  // hiato (vocal fuerte + vocal débil)
  t.deepEqual(silabas('caída'), ['ca', 'í', 'da']);
  t.deepEqual(silabas('baúl'), ['ba', 'úl']);
  t.deepEqual(silabas('reí'), ['re', 'í']);
  t.deepEqual(silabas('reúno'), ['re', 'ú', 'no']);
  t.deepEqual(silabas('oído'), ['o', 'í', 'do']);
  t.deepEqual(silabas('noúmero'), ['no', 'ú', 'me', 'ro']);
});

test('Las combinaciones de una vocal débil y otra débil pueden formar un diptongo', t => {
  // diptongo (vocal débil + vocal débil)
  t.deepEqual(silabas('cuidado'), ['cui', 'da', 'do']);
  t.deepEqual(silabas('ciudad'), ['ciu', 'dad']);
});

test('Las combinaciones de una vocal débil y otra débil pueden formar un hiato', t => {
  // hiato (vocal débil + vocal débil)
  t.deepEqual(silabas('huir'), ['hu', 'ir']);
  t.deepEqual(silabas('veintiuino'), ['vein', 'ti', 'u', 'no']);
  t.deepEqual(silabas('chiíta'), ['chi', 'í', 'ta']);
});

test('Ataque complejo entre vocales V C C V -> V - CCV', t => {
  t.deepEqual(silabas('abrí'), ['a', 'brí']);
  t.deepEqual(silabas('abril'), ['a', 'bril']);
  t.deepEqual(silabas('aclarar'), ['a', 'cla', 'rar']);
  t.deepEqual(silabas('ubre'), ['u', 'bre']);
  t.deepEqual(silabas('ebrio'), ['e', 'brio']);
});

test('consonante + /s/ + vocal -> C - SV', t => {
  t.deepEqual(silabas('salsa'), ['sal', 'sa']);
  t.deepEqual(silabas('manso'), ['man', 'so']);
  t.deepEqual(silabas('subsanar'), ['sub', 'sa', 'nar']);
  t.deepEqual(silabas('adsorción'), ['ad', 'sor', 'ción']);
  t.deepEqual(silabas('cansado'), ['can', 'sa', 'do']);
  t.deepEqual(silabas('pulso'), ['pul', 'so']);
  t.deepEqual(silabas('persona'), ['per', 'so', 'na']);
});
