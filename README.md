# Tride Web — Tride 0.14.0

Plays Tride scenes (`.trd`) in a web page: `<tride-scene>` is one HTML tag on top of the Tride runtime
(WASM) and the Filament renderer (WebGL2) — the same player that draws the Tride Editor viewport. A scene
is built in Tride Editor ([tride-editor](https://github.com/trideapp/tride-editor)) and exported as
`.trd`; the page only writes values into it (bindings) and fires triggers — the scene decides what to
show.

This repository is generated from the Tride source repository: one commit per release, changes are not
accepted here; questions and bugs go to Issues. Licence — `LICENSE` (Tride Players Licence 1.1); third-party
components and their licences — `THIRD_PARTY_NOTICES.md`; which build this release is — `SNAPSHOT.md`;
what changed — `CHANGELOG.md`.

## What's inside

| | |
|---|---|
| GitHub Packages | The npm package `@trideapp/web` 0.14.0: the module, the runtime's WASM (full and lite), Filament, the environments |
| Releases | The same package as a `.tgz` file — to install without a token |
| `index.html`, `embed.html` | A ready static site — the pages below |
| `tride-web/`, `filament/`, `ibl/` | The library for the site: the module with the runtime's two WASM files, Filament, the built-in environments |

## See a scene

A clone of the repository is a ready static site. Serve it with any HTTP server **on `localhost`**:

```bash
python3 -m http.server 8080
```

- http://localhost:8080 — **the scene viewer**: any `.trd` from Tride Editor ("Open .trd…" or drop a file
  on the page), every binding and trigger of the scene, its states and events.
- http://localhost:8080/embed.html — the shortest page with a scene: put your `.trd` next to it as
  `scene.trd`.

It does not open from disk (`file://`): the browser refuses to load WASM that way. And only `localhost` or
https: from an address like `http://192.168.…` Safari runs WASM about 30 times slower (the page is not a
secure context).

## In your project

The package is in GitHub Packages: you need a GitHub token (classic) with the `read:packages` scope. In
the project's `.npmrc`:

```
@trideapp:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @trideapp/web@0.14.0
```

Without a token — `trideapp-web-0.14.0.tgz` from Releases: `npm install ./trideapp-web-0.14.0.tgz`.

Serve `filament/` and `ibl/` from the package (`node_modules/@trideapp/web/`) as static files of the
site and import the module:

```html
<script type="module">
  import '@trideapp/web';
</script>

<tride-scene src="/scenes/scene.trd" autoplay interactive
             filament-src="/filament/filament.js" ibl-base="/ibl">
  <span slot="loading-fallback">loading…</span>
  <span slot="error-fallback">the scene did not load</span>
</tride-scene>
```

Without a bundler — the same files from the site: `<script type="module" src="/tride-web/tride-web.js"></script>`.

**Bundlers and servers.**

- *Vite dev server* (`vite`, also under React, Vue and Svelte templates): the dev server pre-bundles
  the package, and the runtime's `.wasm` no longer sits next to its JavaScript — the dev server answers
  its index page for it and the scene fails with "the Tride runtime could not start". Add
  `optimizeDeps: { exclude: ['@trideapp/web'] }` to `vite.config`, or serve
  `node_modules/@trideapp/web/tride_runtime_api_bg.wasm` and `tride_runtime_api_lite_bg.wasm` yourself from
  one folder and set `runtime-src="/tride_runtime_api_bg.wasm"` on the tag (`runtimeWasm` in
  `TrideScene.create`; the lite file is looked up beside it). `vite build` needs neither.
- *Server rendering* (Next.js, Nuxt, SvelteKit, Astro): `import '@trideapp/web'` is safe on the server —
  it loads and registers nothing; the tag does its work in the browser. Create `TrideScene` (it needs a
  canvas) in client code only.
- *Content-Security-Policy*: the runtime's WASM needs `'wasm-unsafe-eval'` in `script-src`, and Filament
  builds its bindings with `new Function`, which needs `'unsafe-eval'` as well. Without it the tag ends
  in `tride-error` naming the policy.
- *TypeScript*: the types ship with the package and need nothing else installed; `querySelector('tride-scene')`
  is a `TrideSceneElement`. For JSX, tell your framework about the tag, e.g. for React
  `declare module 'react' { namespace JSX { interface IntrinsicElements { 'tride-scene': any } } }`.

| Attribute | What it does |
|---|---|
| `src` | The `.trd` URL; changing it loads the new scene (a `blob:` URL of a file works); removing it or setting it empty clears the tag |
| `autoplay`, `paused` | `autoplay` starts the scene's clock after loading, `paused` keeps it paused (`paused` wins) |
| `inputs` | JSON of bindings written after loading |
| `bind-inputs` | JSON of inputs the page measures, e.g. `{"boost":"scroll-speed"}` or `{"pass":{"source":"scroll-position","from":[0.2,0.8],"to":[1,0]}}` — see "The page's scroll" |
| `interactive` | Touch and mouse reach the scene's own gestures (tap, drag; the primary button only — a right or middle click stays the page's) |
| `pointer-scope` | `canvas` (the default) or `page`: where a hovering mouse or pen counts |
| `touch-pan` | `scene`: every one-finger swipe over an interactive scene goes to the scene (by default a vertical swipe scrolls the page) |
| `filament-src`, `ibl-base`, `runtime-src` | Where `filament.js`, the environments and the runtime's `.wasm` are served |
| `runtime-lite-src` | Where the lite runtime (`tride_runtime_api_lite_bg.wasm`) is served — by default beside the full one; `none`: every scene on the full runtime. See "Two runtimes" |
| `quality` | `production` (the default) or `editor` — the same look, a different per-frame loading budget |
| `preferred-fps` | Frames drawn a second, e.g. `30` on a slow device (property `preferredFps`); the scene's logic runs 60 steps a second either way, so animations and timings stay the same. Absent — every animation frame; 0, negative or not a number — the default and one `tride-problem`; changing it does not reload the scene |

Methods: `setInput(name, value)`, `trigger(name)`, `availableBindings()`, `play()`, `pause()`,
`advance(scriptJson)`, `bindInput(name, source, mapping?)`, `unbindInput(name)`, `setImage(name, source)`,
`imageLoading(name)`, `clearImage(name)`, `attachAudioTrack(source)`, `attachAudioMedia(element)`,
`detachAudio(input?)`, `setRenderOverrides(knobs)`, `clearRenderOverrides()`, `reload()`, `dispose()`; `scene` is the `TrideScene` under the tag
(`layerStates()`, `pick(x, y)`, `boundInputs()` and so on), `status` is one of `idle`, `loading`,
`ready`, `playing`, `paused`, `error`. `setInput` and `trigger` called before the scene is ready wait for it and are applied,
in order, right after `tride-ready` (one the scene refuses is then a `tride-problem`); `advance` cannot
wait and returns `null` while there is no scene.

Render knobs: the scene's render settings are the designer's, and the page may change four switches over
them, for example on a slow laptop: `setRenderOverrides({ msaa, msaaSamples, bloom, shadows, depthOfField })`
(also on `TrideScene`). MSAA goes both ways (`msaaSamples` 2, 4 or 8; another count keeps the scene's);
bloom, shadows and depth of field can only be switched off (`true` keeps the scene's). A knob left out or
`null` keeps the scene's value; the scene's other settings (bloom strength, fog, tone mapping) stay the
designer's and animated values go on. `clearRenderOverrides()` returns the scene's settings; the
properties `renderOverrides` and `sceneRenderSettings` read the knobs and what the scene itself sets. A
change applies live, without reloading; a knob of the wrong type draws the scene's settings and fires one
`tride-problem`. The player never changes them on its own.

Moving the tag in the document (appending it into another parent) keeps its scene, bindings, pictures
and sound; removing it for good (`dispose()` or leaving the document) stops the scene and gives its WebGL
context back to the browser — a page holds about sixteen.

`availableBindings()` is the scene's contract: every binding with its kind (`number`, `bool`, `enum`,
`trigger`, `vec3`, `quat`, `color`, `image`), the enum variants (`options`) and the formula of a value the scene
computes itself (`computed`, read-only). The same list as `availableBindings()` of TrideKit on iOS and
Android.

Events (they bubble): `tride-load` (the scene is loaded), `tride-ready`, `tride-error` (`detail.error`),
`tride-event` (a scene event, `detail.name`), `tride-state` (`detail` = `{layerId, from, to}`),
`tride-problem` (`detail` = `{pointer, code, message}`), `tride-play`, `tride-pause`, `image.<input>`
(see "Pictures from the page").

`tride-error` and `tride-problem` are cancelable. One that no handler cancels is also written to the
console (`console.error` for a failed load, `console.warn` once per problem and load), like an uncaught
error — so a page that has not subscribed yet still sees why the tag is empty. A page that shows them
itself calls `event.preventDefault()`. If the browser takes the WebGL context away from a running scene
(a GPU reset, a background tab on a phone) the tag ends in `tride-error` and `error-fallback`;
`reload()` starts it again.

```js
const el = document.querySelector('tride-scene');
el.addEventListener('tride-event', (e) => { if (e.detail.name === 'finale_burst') showSummary(); });
el.setInput('work_elapsed', 600);   // a number, true / false or a string (an enum variant)
el.trigger('begin');
```

The drawing buffer follows the tag's CSS size × `devicePixelRatio`; off screen the loop pauses itself.
Without the tag — `TrideScene.create(canvas, { filamentScriptUrl, iblBase })`, then `load(url | bytes)`,
`play()` or `tick(dt)` from your own clock (see `tride-web.d.ts`). Which Tride the page runs —
`await TrideScene.buildInfo()`: `version` (the release), `commit`, `formatVersion` (the `.trd` format);
attach it to a bug report.

## Two runtimes

The package ships the runtime twice, side by side: `tride_runtime_api_bg.wasm` (full) and
`tride_runtime_api_lite_bg.wasm` — the same runtime without text layout, 17 % less to download. One
JavaScript file boots either. `<tride-scene>` picks by itself and the page does nothing:

- the scene file (one request) and Filament start downloading at once; once the scene file is in,
  its table of contents picks the runtime: a scene without fonts gets the lite one, a scene with text
  the full one;
- the runtime is the judge: the lite one refuses a scene that needs text and the tag loads it on the
  full one — a scene is never drawn without its words;
- each runtime is fetched and compiled once a page. A text scene on a page whose other scenes run the
  lite one fetches the full one beside it (a small extra JavaScript chunk, `tride_runtime_api-<hash>.js`,
  loads only then);
- serving only the full file still works: the lite one fails to start, one `console.warn`, and every
  scene runs on the full one (`runtime-lite-src="none"` skips the attempt). A bundler that copies the
  package's files keeps all three.

`TrideScene.buildInfo()` boots a runtime if the page runs none yet — the lite one (both answer the same
release, commit and format), so asking it before the first scene keeps that scene on the lite runtime.

## The page's scroll

A scene does not know the page. It declares a plain number input — say `boost` — and the page **binds**
what it measures to it: how fast the page scrolls (`scroll-speed`, up or down alike, in screen heights per
second) or the scene's pass through the window (`scroll-position`, 0 as its top comes in at the bottom of
the window, 1 as its bottom leaves past the top).

```html
<tride-scene src="/hero.trd" autoplay bind-inputs='{"boost": "scroll-speed"}'></tride-scene>
<tride-scene src="/story.trd" autoplay
             bind-inputs='{"progress": {"source": "scroll-position", "from": [0.2, 0.8], "to": [0, 1]}}'></tride-scene>
```

A binding maps the source's range `from: [a, b]` onto the input's `to: [c, d]`, clamped (by default the
speed `[0, 2]` and the pass `[0, 1]`, onto `[0, 1]`). From JavaScript: `el.bindInput('boost',
'scroll-speed', { to: [0, 2] })`, `el.unbindInput('boost')`. Every scene the tag loads gets the bindings;
a bound input belongs to its source — `el.setInput` on it throws until it is unbound — and a binding the
scene refuses is a `tride-problem`. While a scroll source is bound the tag listens to the window's
`scroll` and `resize` passively (wheel, trackpad, swipe, keyboard and smooth-scroll libraries alike) and
never cancels them. Off screen the loop pauses — as soon as no pixel of the tag shows — and resumes by
itself; a tag several screens tall plays while any part of it is on screen.

## Sound the scene hears

A scene can move to the music the page plays: its Sound effectors and Sound fields, and any property it
binds to `audio.<input>.<probe>` (bloom strength, a scale, a colour), follow the sound. No microphone, no
permission. On `<tride-scene>` and `TrideScene`, `attachAudioTrack(source)` plays a file the browser decodes
whole (about 23 MB a stereo minute: play long mixes through an element); `attachAudioMedia(element)` hears an
`<audio>` / `<video>`, radio included (another origin: CORS and `crossorigin="anonymous"`); `detachAudio` stops.

```js
const track = await el.attachAudioTrack('/music/focus.mp3');   // input "music"
playButton.addEventListener('click', () => track.play());       // browsers start sound on a click
```

## Pictures from the page

A scene can show the page's own picture — the user's photo, an avatar, a product shot — in the places
its author marked. In Tride Editor the author adds an **image input** (a binding of kind `image`, e.g.
`photo`) and binds it to the picture of an Image Texture; the picture already standing there is the
**placeholder**. The scene shows the placeholder until the page hands a picture over, and again when the
picture fails. The picture is the page's: it is never written into a `.trd`.

```js
const el = document.querySelector('tride-scene');

// A file the user picked: say "loading" before the bytes arrive, then hand the file over.
pickButton.addEventListener('click', () => {
  el.imageLoading('photo');                  // the scene sees 'loading'; the picture shown stays
  picker.click();
});
picker.addEventListener('change', async () => {
  const outcome = await el.setImage('photo', picker.files[0]);   // 'loaded' | 'failed' | 'superseded'
  if (outcome === 'failed') showRetry();     // the placeholder is back
});

// Or a URL (another origin must allow it with CORS), or the file's bytes (ArrayBuffer, Uint8Array).
await el.setImage('photo', 'https://cdn.example.com/gift/photo.jpg');

el.addEventListener('image.photo', (e) => {
  // e.detail: { status: 'empty' | 'loading' | 'loaded' | 'failed', revision, width, height, reason? }
  spinner.hidden = e.detail.status !== 'loading';
});

el.clearImage('photo');                      // no picture: the placeholder shows
```

| Method | What it does |
|---|---|
| `setImage(name, source)` | `source` is a `Blob` / `File`, the file's bytes (`ArrayBuffer`, `Uint8Array`) or a URL. Resolves `'loaded'` (the scene shows it from its next step), `'failed'` (the placeholder shows) or `'superseded'` (a later call for the same input came first: the scene never saw this picture, there is nothing to show) |
| `imageLoading(name)` | A picture is on its way and the page has no bytes yet (its own picker, a download): the scene sees `loading`, the picture shown stays |
| `clearImage(name)` | The input has no picture: the placeholder shows |

- **What the scene sees.** The input's status — `empty`, `loading`, `loaded`, `failed` — is a binding
  the scene's state machine reads (a transition on `bindings.photo == 'loaded'`, say). Every change also
  comes as the event `image.<input>`: in `tride-event` and on the tag as a DOM event of that name, with
  `status`, `revision`, `width` × `height` (the picture shown; `0 × 0` when none) and, for `failed`, the
  `reason`.
- **Fill or fit is the scene's.** The Image Texture frames the picture as its author set it: `stretch`
  (the default — the picture is stretched over the placeholder's place), `fill` (the placeholder's
  proportions, filled whole, the picture cropped around its centre) or `fit` (the whole picture, the
  margins in the Image Texture's edge mode, e.g. black). The page passes any size; nothing to crop.
- **Size and formats.** JPEG, PNG and WebP (whatever the browser decodes). The browser decodes off the
  main thread, turns the picture by its EXIF orientation and scales it down to 2048 px on the long side,
  the proportions kept; colours are converted to sRGB.
- **A replacement keeps the old picture** on screen while it loads: no flash of the placeholder. The
  latest call for an input wins.
- **One picture, several places.** An input bound to several Image Textures is decoded once.
- **Failures.** A URL that does not load (network, HTTP error, no CORS) or bytes that do not decode
  resolve `'failed'`; `tride-problem` and the console say why once. A name that is not an image input of
  the scene is a mistake in the page, not a failed picture: `setImage` rejects with
  `{ kind: 'image.input', message }`, `imageLoading` and `clearImage` throw, and nothing changes — the
  same rule as on iOS and Android.
- **The tag keeps the picture** for every scene its `src` loads, and a `setImage` before the scene is
  ready settles once it is. `TrideScene` has the same three methods.

## Requirements and size

- WebGL2 (without it `tride-error` says "WebGL2 is not available"). Tested in Chrome and Safari on macOS and in Edge and Firefox on Windows; mobile browsers
  should work but are not tested.
- On Windows, browsers compile shaders for Direct3D 11, so the first open of a scene takes longer
  there: a scene with a few node materials is ready in ~9 s in Edge with an empty shader cache; later opens use the browser's
  cache.
- Before the first frame the page downloads ~4.1 MB gzipped for a scene without text (the lite runtime
  ~2.2 of it) and ~4.6 MB for a scene with text (the full runtime ~2.7), the player's JS and Filament
  included; with brotli ~2.8 / ~3.1 MB. A scene adds its own size, often most of it the compiled shaders of
  its node materials (~2 MB for a scene with several). A server with gzip / brotli for `.wasm`, `.js` and `.trd` makes the first load
  noticeably faster.
- A scene opens in the player of the same release and newer; a scene from a newer editor does not open in
  an older player ("newer format"). Take the editor from the release with the same number in
  `tride-editor`.
