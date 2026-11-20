# Changelog

## v0.19.0 — 2026-11-20

- Tride 0.19.0 writes the same format as 0.18 (0.78), and scenes saved by earlier Tride open unchanged. A scene where the author set a Noise's Compute to Per vertex or First octaves per vertex opens in the 0.18 editor without that look, with a warning; players 0.18 draw it correctly.
- The web player now needs WebAssembly SIMD: Safari and iOS Safari 16.4 or later, Chrome and Edge 91 or later, Firefox 110 or later. In an older browser `<tride-scene>` shows its error state with a message naming these versions.
- A Curl cloud no longer flickers when a value its paths are built from changes: the older paths stay on screen while the new ones build.
- Noise is computed faster: the core reads four lattice points at once with SIMD, natively and in WebAssembly, and gives the same values bit for bit.
- A hidden object that nothing else uses (as a cloner's source, for example) costs nothing while it is hidden: its mesh, bends, text, effectors and generators are not computed. Shown again, it looks exactly as if it had never been hidden.
- An object whose material makes it fully transparent at that moment (faded to zero opacity, for example) is not drawn and costs no GPU time. A touch still picks it as before, and its children are drawn.
