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
