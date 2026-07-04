# Facile JS

Lightweight JavaScript utilities with simple, beginner-friendly features.

## Getting started

### CDN

You can use this library by just adding the following tag in the header of an HTML page:

```html
<script src="https://cdn.jsdelivr.net/npm/@side-xp/facilejs/dist/index.iife.js"></script>
```

The features are then available from a global `facile` object:

```html
<script>
  const n = facile.random(1, 6)
</script>
```

For production use, we recommend to target a specific version in the URL:

```html
<script src="https://cdn.jsdelivr.net/npm/@side-xp/facilejs@1.0.0/dist/index.iife.js"></script>
```

### Node

```sh
npm install @side-xp/facilejs
```

This library supports both ES Module (recommended):

```js
import { random } from '@side-xp/facilejs'
console.log(random());
```

And CommonJS syntax:

### CommonJS

```js
const { random } = require('@side-xp/facilejs')
```

## API documentation

[=> https://side-xp.github.io/node-facile/api](https://side-xp.github.io/node-facile/api)

---

Crafted and maintained with love by [Sideways Experiments](https://sideways-experiments.com)

(c) 2022-2026 Sideways Experiments