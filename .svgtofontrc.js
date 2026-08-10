export default {
  fontSize: "12px",
  src: "./.temp/icons",
  dist: "./.temp/font",
  fontName: "Sketchybar App Font",
  // sketchybar only loads a TTF, so everything else svgtofont can emit
  // (demo site, css, react wrappers, web font formats) is dead weight.
  website: false,
  css: false,
  emptyDist: true,

  // The SVG file name becomes the glyph itself, that is why icons are named
  // exactly as the app is known to the system (`Steam Helper.svg`,
  // `wezterm-gui.svg`, `Толк.svg`) — a sketchybar config just prints the app
  // name as a string with `font = "Sketchybar App Font:Regular:16"`.
  useNameAsUnicode: true,
  outSVGPath: false,
  outSVGReact: false,
  excludeFormat: ["eot", "woff", "woff2", "svg", "symbol.svg"],
  // Icons are grabbed from all sorts of places and come with different
  // viewBoxes, so we scale them into one em box and give every glyph the same
  // advance width, otherwise app icons would jump in size and spacing on the
  // bar. `fontHeight` is the em size used while rasterizing paths — 1000 is
  // big enough to not lose detail on downscale.
  svgicons2svgfont: {
    centerhorizontally: true,
    centervertically: true,
    height: 16,
    normalize: true,
    preserveAspectRatio: true,
    fixedWidth: true,
    fontHeight: 1000,
  },
};
