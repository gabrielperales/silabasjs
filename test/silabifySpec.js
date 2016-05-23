'use strict';
import silabify from '../src/silabify';
import test from 'ava';

test('Una vocal constituye una sílaba', t => {
  t.deepEqual(silabify('a'), ['a']);
  t.deepEqual(silabify('e'), ['e']);
  t.deepEqual(silabify('i'), ['i']);
  t.deepEqual(silabify('o'), ['o']);
  t.deepEqual(silabify('u'), ['u']);
});

test('Una consonante entre dos vocales siempre forma sílaba con la vocal que le sigue', t => {
  t.deepEqual(silabify('ala'), ['a', 'la']);
  t.deepEqual(silabify('eso'), ['e', 'so']);
  t.deepEqual(silabify('ira'), ['i', 'ra']);
});

test('Entro dos consonantes contiguas siempre hay una frontera silábica', t => {
  t.deepEqual(silabify('alba'), ['al', 'ba']);
  t.deepEqual(silabify('isla'), ['is', 'la']);
  t.deepEqual(silabify('arma'), ['ar', 'ma']);
});

test('consonante + /obstruyente/ + /líquida/', t => {
  t.deepEqual(silabify('desgracia'), ['des', 'gra', 'cia']);
});

test('consonante + /s/ ', t => {
  t.deepEqual(silabify('abstemio'), ['abs', 'te', 'mio']);
});

test('consonante + /s/ + /obstruyente/ + /líquida/', t => {
  t.deepEqual(silabify('abstracto'), ['abs', 'trac', 'to']);
});

test('Entre vocales fuertes siempre habrá un límite silábico', t => {
  t.deepEqual(silabify('aaronita'), ['a', 'a', 'ro', 'ni', 'ta']);
  t.deepEqual(silabify('raer'), ['ra', 'er']);
  t.deepEqual(silabify('faraón'), ['fa', 'ra', 'ón']);
  t.deepEqual(silabify('real'), ['re', 'al']);
  t.deepEqual(silabify('leer'), ['le', 'er']);
  t.deepEqual(silabify('feo'), ['fe', 'o']);
  t.deepEqual(silabify('boa'), ['bo', 'a']);
  t.deepEqual(silabify('roer'), ['ro', 'er']);
  t.deepEqual(silabify('loor'), ['lo', 'or']);
});

test('Las combinaciones de una vocal débil y una fuerte pueden formar diptongos', t => {
  // diptongos (vocal débil + vocal fuerte)
  t.deepEqual(silabify('hacia'), ['ha', 'cia']);
  t.deepEqual(silabify('cuatro'), ['cua', 'tro']);
  t.deepEqual(silabify('ciego'), ['cie', 'go']);
  t.deepEqual(silabify('luego'), ['lue', 'go']);
  t.deepEqual(silabify('liar'), ['liar']);
  t.deepEqual(silabify('actuar'), ['ac', 'tuar']);
  t.deepEqual(silabify('afectuosidad'), ['a', 'fec', 'tuo', 'si', 'dad']);

  t.deepEqual(silabify('actué'), ['ac', 'tué']);
  t.deepEqual(silabify('actuó'), ['ac', 'tuó']);
  t.deepEqual(silabify('lié'), ['lié']);
});

test('Las combinaciones de una vocal fuerte y una débil pueden formar un diptongo', t => {
  // diptongo (vocal fuerte + vocal débil)
  t.deepEqual(silabify('baile'), ['bai', 'le']);
  t.deepEqual(silabify('balaustrada'), ['ba', 'laus', 'tra', 'da']);
  t.deepEqual(silabify('peine'), ['pei', 'ne']);
  t.deepEqual(silabify('deuda'), ['deu', 'da']);
  t.deepEqual(silabify('hoy'), ['hoy']);
  t.deepEqual(silabify('bou'), ['bou']);
});

test('Las combinaciones de una vocal fuerte y una débil pueden formar un hiato', t => {
  // hiato (vocal fuerte + vocal débil)
  t.deepEqual(silabify('caída'), ['ca', 'í', 'da']);
  t.deepEqual(silabify('baúl'), ['ba', 'úl']);
  t.deepEqual(silabify('reí'), ['re', 'í']);
  t.deepEqual(silabify('reúno'), ['re', 'ú', 'no']);
  t.deepEqual(silabify('oído'), ['o', 'í', 'do']);
  t.deepEqual(silabify('noúmero'), ['no', 'ú', 'me', 'ro']);
  t.deepEqual(silabify('país'), ['pa', 'ís']);
  t.deepEqual(silabify('maíz'), ['ma', 'íz']);
  t.deepEqual(silabify('ataúd'), ['a', 'ta', 'úd']);
  t.deepEqual(silabify('aúpa'), ['a', 'ú', 'pa']);
  t.deepEqual(silabify('extraíble'), ['ex', 'tra', 'í', 'ble']);
  t.deepEqual(silabify('arcoíris'), ['ar', 'co', 'í', 'ris']);
  t.deepEqual(silabify('María'), ['Ma', 'rí', 'a']);
  t.deepEqual(silabify('río'), ['rí', 'o']);
  t.deepEqual(silabify('ahí'), ['a', 'hí']);
});

test('Las combinaciones de una vocal débil y otra débil pueden formar un diptongo', t => {
  // diptongo (vocal débil + vocal débil)
  t.deepEqual(silabify('cuidado'), ['cui', 'da', 'do']);
  t.deepEqual(silabify('ciudad'), ['ciu', 'dad']);
  t.deepEqual(silabify('huir'), ['huir']);
  t.deepEqual(silabify('veintiuno'), ['vein', 'tiu', 'no']);
});

test('Las combinaciones de una vocal débil y otra débil pueden formar un hiato', t => {
  // hiato (vocal débil + vocal débil)
  t.deepEqual(silabify('chiíta'), ['chi', 'í', 'ta']);
  t.deepEqual(silabify('chiita'), ['chi', 'i', 'ta']);
  t.deepEqual(silabify('semiinconsciente'), ['se', 'mi', 'in', 'cons', 'cien', 'te']);
  t.deepEqual(silabify('duunviro'), ['du', 'un', 'vi', 'ro']);
});

test('Ataque complejo entre vocales V C C V -> V - CCV', t => {
  t.deepEqual(silabify('abrí'), ['a', 'brí']);
  t.deepEqual(silabify('abril'), ['a', 'bril']);
  t.deepEqual(silabify('aclarar'), ['a', 'cla', 'rar']);
  t.deepEqual(silabify('ubre'), ['u', 'bre']);
  t.deepEqual(silabify('ebrio'), ['e', 'brio']);
});

test('consonante + /s/ + vocal -> C - SV', t => {
  t.deepEqual(silabify('salsa'), ['sal', 'sa']);
  t.deepEqual(silabify('manso'), ['man', 'so']);
  t.deepEqual(silabify('subsanar'), ['sub', 'sa', 'nar']);
  t.deepEqual(silabify('adsorción'), ['ad', 'sor', 'ción']);
  t.deepEqual(silabify('cansado'), ['can', 'sa', 'do']);
  t.deepEqual(silabify('pulso'), ['pul', 'so']);
  t.deepEqual(silabify('persona'), ['per', 'so', 'na']);
});
