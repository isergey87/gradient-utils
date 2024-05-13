# Utils to convert css gradients to svg

## Installation

from npm

`npm install gradient-utils`

from yarn

`yarn add gradient-utils`

## Usage

### gradient-utils/gradient-parser

**parseLinearGradient**

Parse css _linear-gradient_ return `LinearGradient | null`

**parseRepeatingLinearGradient**

Parse css _repeating-linear-gradient_ return `LinearGradient | null`

If the gradient is without an angle, then returns `180deg` according to the specification

If the color cannot be parsed, `Unknown Color` will be returned

**isLinearGradientWithAngle**

Checks if parsed gradient is gradient with angle e.g. `linear-gradient(217deg, red, green)`

**isLinearGradientWithSideOrCorner**

Checks if parsed gradient is gradient with side or corner e.g. `linear-gradient(to left, red, green)`

**isLinearGradientWithInterpolation**

Checks if parsed gradient is gradient with interpolation e.g. `linear-gradient(in hsl, blue, red)`

### gradient-utils/convert-css-gradient-to-svg

**convertLinearGradient**

Convert `LinearGradient` to `SVGLinearGradient` based on aspect ratio.
If it is impossible to convert, writes a warning to the console and returns null

Does not support
- repeatable gradient
- interpolation gradient
- if there are less than two colors in the gradient
- color hint e.g. `linear-gradient(red, 30%, blue);`
- color length except percentage

**getSvgColor**
Default css to svg color converter.
The named color is returned as is. (Don't check if color is supported in svg).
Supports HEX, RGB, HSL colors.

### gradient-utils/svg-gradient-from-css

Uses the functions described above to convert a css linear gradient to an svg gradient

