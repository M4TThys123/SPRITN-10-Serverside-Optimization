# 🚧 Performance optimalisatie Coding the Curbs
![Screenshot Prototype](https://github.com/M4TThys123/SPRINT-10-Coding-the-Curbs/blob/main/assets/Schermafbeelding%202022-07-06%20om%2014.35.59.png)

## Beschrijving
Deze website is serverside gemaakt via NPM en is gedeployd via Heroku. Om deze website te verbeteren ben ik daarom ook begonnen om deze serverside te optimaliseren. Vervolgens ben ik clientside aan de gang gegaan.

## 🚀 Lighthouse test voor optimalisatie
![Screenshot Prototype](https://github.com/M4TThys123/SPRINT-10-Coding-the-Curbs/blob/main/assets/before.png)

## Lighthouse test na optimalisatie
![Screenshot Prototype](https://github.com/M4TThys123/SPRINT-10-Coding-the-Curbs/blob/main/assets/coding-max.png)

## Optimalisatie
### Minifying
Ik ga gebruikmaken van ```PostCSS``` om gemakkelijk CSS code te verkleinen. Als eerste gaan we de juiste NPM packages installeren.

```
npm install postcss cssnano autoprefixer
```
```CSSnano```  en ```autoprefixer``` zijn plugins voor ```PostCSS``` die vertellen hoe de CSS gemanipuleerd moet worden.
 * ```CSSnano``` Package komt met ingebouwede technieken om CSS kleiner te maken.
 *  ```autoprefixer``` voegt de -webkit- of -moz-prefixen toe waar nodig om uw CSS compatibel te maken met alle browsers.

Dit is de code om de NPM Packages te gebruiken
```JavaScript
const postcss = require('postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

// Wrapped in a function so we can use async/await
const minifyCss = async () => {
  // This CSS might be imported from a file, or anywhere else
  const css = `
    * {
      font-family: system-ui;
    }
  `

  // We pass in an array of the plugins we want to use: `cssnano` and `autoprefixer`
  const output = await postcss([cssnano, autoprefixer])
    .process(css)

  // The `css` property of `output` is the minified CSS as a string
  const minifiedCss = output.css
}

minifyCss()
```

Voeg het ```minify``` script toe aan het ```package.json``` file
```JSON
"scripts": {
    "minify": "node ./scripts/minify.js",
  },
```
Daarna kun je het bestand via de terminal minify'en door:
```
npm run minify
```

### Code splitting
Het doel is om de code in verschillende bundels en componenten te splitsen, die vervolgens op een aanvraag of parallel kunnen worden geladen. Om te voorkomen dat je onnodige bytes indlaad van scrips of files die (nog) niet nodig zijn. 

Ik heb gebruik gemaakt van een simpele express server en er lade geen overige pagina's. Daarom was code splitting n.v.t. Maar voor de toekomst is dit wel super handig


### Compressie
De NPM Compresion package zorgt ervoor dat de filesize verkleint wordt. De ```Content-Encoding:``` verandert naar ```gzip```.

Compression installeren
```
npm install compression
```
Compression gebruiken
```JavaScript
const compression = require('compression')

app.use(compression())
```
![GNU GPL V3](https://github.com/M4TThys123/SPRITN-10-Serverside-Optimization/blob/main/docs/perfomance-1.png)
Hier zie je dat de ```Content-Encoding:``` verandert naar ```gzip```.

### Caching Controll Headers
Caching kan de performance van een server verbeteren, doordat de request sneller worden afgehandeld en het verkeleinen van de werk die de server moet doen. 

Node-Cache installeren
```
npm install node-cage
```

Node-Cache gebruiken 
In ```main.js```
```JavaScript
const cache = require('./scripts/routeCache')
```

In ```routeCache.js```
```JavaScript
const NodeCache = require('node-cache')

const cache = new NodeCache()

modules.exports = duration => (req, res, next) => {
  // is request a GET?
  // if not, call next
  if (req.method !== 'GET') {
    console.error('Cannot cache not-GET methods!')
    return next()
  }
  // check if key exists in cache
  const key = req.originalUrl;
  const cachedResponse = cache.get(key)
  // if it exists, send cache result
  if (cachedResponse) {
    console.log(`Cache hit for ${key}`)
    res.send(cachedResponse)
 } else {
    console.log(`Cache mis for ${key}`)
    res.originalSend = res.send
    res.send = body => {
        res.originalSend(body)
        cache.set(key, body, duration)
    }
    next()
 }
  // if not, replace .send with method to set response to cache
}
```


## Afbeeldingen

### Squoosh 
Met squoosh heb ik mijn afbeeldingen gemainpuleert, ik heb ze gexporteerd als avif webp.


### Lazy loading
```HTML
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Photo" width="450" height="350">
</picture>

<picture>
<source
  sizes="(max-width: 608px) 100vw, 608px"
  srcset="
    /img/Z1s3TKV-1920w.avif 1920w,
    /img/Z1s3TKV-1280w.avif 1280w,
    /img/Z1s3TKV-640w.avif   640w,
    /img/Z1s3TKV-320w.avif   320w"
  type="image/avif"
/>
<source
  sizes="(max-width: 608px) 100vw, 608px"
  srcset="
    /img/Z1s3TKV-1920w.webp 1920w,
    /img/Z1s3TKV-1280w.webp 1280w,
    /img/Z1s3TKV-640w.webp   640w,
    /img/Z1s3TKV-320w.webp   320w"
  type="image/webp"
/>
<source
  sizes="(max-width: 608px) 100vw, 608px"
  srcset="
    /img/Z1s3TKV-1920w.jpg 1920w,
    /img/Z1s3TKV-1280w.jpg 1280w,
    /img/Z1s3TKV-640w.jpg   640w,
    /img/Z1s3TKV-320w.jpg   320w"
  type="image/jpeg"
/>
  <img src="fallback-image.jpg" alt="Photo" width="450" height="350">
</picture>
```

### Lazy loading
```HTML
<img loading="lazy" src="./afb1" alt="afb1_placeholer">
```

## 👉 Kenmerken

### 💻 Client-Side
  * 🧭 HTML
  * 🏦 CSS
  * 🏥 JavaScript
  
### 💾 Server-Side
 * [🏛️ Node.js](https://nodejs.dev/)
 * [🚣 Express](https://www.npmjs.com/package/express)

### ‼️ Dependencies
 * [🏡 Ejs](https://www.npmjs.com/package/ejs)
 * [📹 Compression](https://www.npmjs.com/package/compression)
 * [🖥️ Cssnano](https://www.npmjs.com/package/cssnano)
 * [💤 Postcss](https://www.npmjs.com/package/postcss)

## 🌐 Bronnen
* [Lazy Loading](https://web.dev/browser-level-image-lazy-loading/)
* [Lazy Loading](https://web.dev/browser-level-image-lazy-loading/)

## 🔒 Licentie

![GNU GPL V3](https://www.gnu.org/graphics/gplv3-127x51.png)

This work is licensed under [GNU GPLv3](./LICENSE).
