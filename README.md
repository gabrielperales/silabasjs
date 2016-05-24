# Silabify

Syllabify spanish words

## Install

```bash
$ git clone https://github.com/gabrielperales/silabify.git
```

```bash
$ cd silabify && npm run build
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
