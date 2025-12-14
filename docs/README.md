# Getting Started

## Import using ESM (recommended)

You can import this library as a module into an HTML page from *jsDelivr* CDN, using the ES script:

```html
<body>
  <button id="generate">Roll</button>
  <p>Value: <span id="value">1</span></p>
  <script type="module">
    import * as facile from 'https://cdn.jsdelivr.net/npm/facilejs/facile.es.js';
    facile.onClick('#generate', () => {
      facile.write('#value', facile.random(1, 6 + 1));
    });
  </script>
</body>
```

## Import using UMD (simpler)

You can import this library as a module into an HTML page from *jsDelivr* CDN, using the UMD script.

Note that the `facile` object is stored in `window`, so it's available globally.

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/facilejs/facile.umd.js"></script>
</head>
<body>
  <button id="generate">Roll</button>
  <p>Value: <span id="value">1</span></p>
  <script>
    facile.onClick('#generate', () => {
      facile.write('#value', facile.random(1, 6 + 1));
    });
  </script>
</body>
```

## Import as NPM package

You can also import this library as a dependency into your Node project:

```sh
npm i facilejs
```