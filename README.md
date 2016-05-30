# Silabify [![Build Status](https://travis-ci.org/gabrielperales/silabify.svg?branch=master)](https://travis-ci.org/gabrielperales/silabify)

Syllabify spanish words. [Try it out](https://tonicdev.com/57447382a9e8791200e1df5a/574476b0a9e8791200e1e055)

## Install

You can install it through NPM or Bower


- NPM:
```bash
$ npm install silabify
```


- Bower:
```bash
$ bower install silabify
```


## Usage

```javascript
const silabify = require('silabify');

silabify('Gabriel');
//=> ['Ga', 'briel']
```

## API

### silabify(word)

#### word

Type: `String`

Word to syllabize.

## Resources:
- [Syllabify rules](http://elies.rediris.es/elies4/Fon2.htm)
- [Accent punctuation rules](http://elies.rediris.es/elies4/Fon4.htm)

## License

MIT © [Gabriel Perales](http://gabriel.perales.me)
