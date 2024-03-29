# HTML Polygon

HTML Polygon is a polygon element generator for the following web frameworks:

* [React](https://github.com/html-polygon/html-polygon/tree/main/packages/react)
* [Vue 3](https://github.com/html-polygon/html-polygon/tree/main/packages/vue)

Visit the playground and complete documentation at [the HTML Polygon website](https://html-polygon.com).

## Why?

There are lots of polygon building utilities out there. They all generate
either embedded SVGs, or they use CSS clip paths to clip the shape of standard
divs.

The thing they all have in common is their inability to reliably contain text
that "flows" into the shape to fill the polygon.

This is where HTML Polygon differs. This component builds an HTML element that
both looks like a polygon, and behaves like a polygon.

You can use HTML Polygen to emulate the effects of the proposed CSS Shapes
property `shape-inside`.
