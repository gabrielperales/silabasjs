# Silabify [![Build Status](https://travis-ci.org/gabrielperales/silabify.svg?branch=master)](https://travis-ci.org/gabrielperales/silabify)

Syllabify spanish words. [Try it out](https://tonicdev.com/57447382a9e8791200e1df5a/574476b0a9e8791200e1e055)

## Install

You can install it through NPM or cloning this repo


- NPM:
```bash
$ npm install silabify
```


- Cloning this repo (for use within a browser):
```bash
$ git clone https://github.com/gabrielperales/silabify.git
```

```bash
$ cd silabify && npm run build
# this command will generate two builds in the *dist* folder
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
