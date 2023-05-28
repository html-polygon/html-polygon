# HTML Polygon for Vue 3

HTML Polygon is a polygon element generator for the following web frameworks:

* [React](../react)
* Vue 3 ← this package

Visit the playground and complete documentation at [the HTML Polygon website](https://html-polygon.sambauers.com).

## Install

```sh
# NPM
npm install @html-polygon/vue

# Yarn
yarn add @html-polygon/vue

# PNPM
pnpm add @html-polygon/vue
```

## Quick start

Import the component:

```vue
import { Polygon } from '@html-polygon/vue'
```

Use the component:

```vue
<Polygon
  sides="5"
  :style="{
    height: '300px',
    width: '300px',
  }"
>
  I have 5 sides.
</Polygon>
```

Complete documentation can be found at [the HTML Polygon website](https://html-polygon.sambauers.com).

## Why?

There are lots of polygon building utilities out there. They all generate
either embedded SVGs, or they use CSS clip paths to clip the shape of standard
divs.

The thing they all have in common is their inability to reliably contain text
that "flows" into the shape to fill the polygon.

This is where HTML Polygon differs. This component builds an HTML element that
both looks like a polygon, and behaves like a polygon.
