# Sketchybar App Font

An icon font for [sketchybar](https://github.com/FelixKratz/SketchyBar), built locally from a set
of SVG icons.

Every glyph is keyed by the name of the app it belongs to, so a sketchybar item can render an
icon by simply printing the app name in this font — no lookup table, no mapping script.

[Русский](README.ru.md)

## Requirements

- macOS
- [sketchybar](https://github.com/FelixKratz/SketchyBar) available in `PATH`
- Node.js

## Usage

```bash
npx @aimuzov/sketchybar-app-font
```

The command builds the font and installs it, in one shot:

1. collects the bundled icons from `icons/`, then the user icons from
   `~/.config/sketchybar-icons` (if that directory exists);
2. builds `Sketchybar App Font.ttf` out of them;
3. copies the font into `~/Library/Fonts`;
4. runs `sketchybar --reload` so the bar picks up the new font;
5. removes its temporary build directories.

Re-run it whenever you add or change an icon.

## Using the font in sketchybar

Set the font on whichever item should show app icons, and feed it the app names as a string:

```lua
local space = sbar.add("space", {
  label = { font = "Sketchybar App Font:Regular:16" },
  space = 1,
})

space:subscribe("space_windows_change", function(env)
  local apps = ""

  for app in pairs(env.INFO.apps) do
    apps = apps .. app .. " "
  end

  space:set({ label = { string = apps } })
end)
```

Since the glyphs are keyed by app name, `env.INFO.apps` can be passed through as-is.

## Adding your own icons

Drop an SVG into `~/.config/sketchybar-icons` and run the command again:

```bash
mkdir -p ~/.config/sketchybar-icons
cp ~/Downloads/MyApp.svg ~/.config/sketchybar-icons/
npx @aimuzov/sketchybar-app-font
```

**The file name must match the app name exactly** — that name is what becomes the glyph. Use the
name as the system reports it, which is not always the name you see in the Dock (hence
`Steam Helper.svg` and `wezterm-gui.svg` among the bundled icons).

User icons are applied on top of the bundled ones, so a file with the same name overrides the
built-in icon. This means you can customize any icon without forking the repo.

Icons are normalized during the build — they are scaled into a single em box and given a fixed
advance width, so sources with different `viewBox` values still line up on the bar.

## Contributing icons

Add the SVG to `icons/` and commit it following the convention used in the history:

```
feat(<app>): add icon
```

## License

[MIT](LICENSE)
