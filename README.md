# Whiskerway
One small cat. A very big way home.

A self-contained 3D browser game with original voxel geometry and procedural sound. Includes a 180-hop Journey and Endless mode, three cat coats, traffic, railways, rivers, logs, a timber bridge, collectible fish, local records, and a gradual day-to-night cycle.

## Play locally
Use a current browser with WebGL 2 enabled. From this folder run:

```sh
python -m http.server 8000 --directory dist
```

Then open http://localhost:8000. An HTTP server is necessary because browsers restrict JavaScript modules loaded directly from file URLs. There is no build step or npm installation.

## Controls
- Arrow keys or WASD: hop in four directions.
- Space: start or hop forward.
- P or Escape: pause; M: toggle audio.
- Touch: tap the world to hop forward, swipe for a direction, or use the directional pad.
- Reduced motion is available under the question-mark help button.

## Gameplay
Wait for traffic gaps. Red traffic signals slow and stop road traffic. Ride floating logs; water without a platform ends the run. Timber bridge planks are safe. Railway lights flash and a bell sounds before the train arrives. Fish are optional. There is no idle timeout. New furthest rows determine score, so moving sideways or backward cannot farm points.

Every run begins during the day. The solar clock combines time spent actively playing and furthest distance, then smooths the result; sunset is not an abrupt level switch. Full night requires late-stage progress and about three minutes of active play. A fast journey can finish before full night. Endless stays moonlit after night arrives. Pausing freezes world time. The cat's collar, streetlamps, signal lenses, house windows, fireflies and headlights become prominent at night.

## Editable source
- `dist/whiskerway/game.js`: rendering, procedural models, generation, physics, audio, input, and game states.
- `dist/whiskerway/style.css`: responsive menus and HUD.
- `dist/whiskerway/index.html`: interface and accessibility labels.
- `dist/whiskerway/cat-mark.svg`: original brand mark.
- `dist/whiskerway/vendor/three.module.js`: locally bundled Three.js r170 (MIT).
- `ROADMAP.md`: research, direction, art bible, mechanics, and delivery plan.
- `QA.md`: performed checks and verification limits.

Browser localStorage saves preferences, best score, and fish totals. No account, analytics, tracking, ads, remote assets, or paid mechanics. Settings and records are specific to each browser/origin. The game is rendered with procedural meshes, so there are no external art asset licenses to obtain.

## Refined edition
The cat uses 60% of its original model scale. The game HUD places hops and the Journey stopwatch at the top center, fish at the top left, a slim vertical progress meter on the right, and an animated sun/moon dial in place of written time-of-day labels. Branding appears only in the menu.

Journey completion times use real active elapsed time and exclude pauses and help screens. The menu trophy opens the five fastest completed journeys saved on this device. Failed runs do not enter the time leaderboard. This is a personal local leaderboard, not an online ranking.

All four vehicle designs were rebuilt with glass bounded to their respective cabin faces, including mirrored traffic directions. Night headlights cast soft ground glows; water ripples drift gently; whole-vehicle suspension adds restrained movement while preserving the assembled mesh.

## Scope
An original cat-focused interpretation of the arcade lane-crossing genre. It has its own branding, artwork, audio, interface, and pacing. It does not include the commercial Crossy Road character catalog, licensed worlds, multiplayer, store systems, or mobile-native packaging. Performance depends on device GPU and browser; actual mobile hardware has not been certified.

## Sound credits
Cat meows: Mixkit (https://mixkit.co) sound effects "Little cat pain meow", "Sweet kitty meow" and "Cartoon little cat meow", used under the Mixkit Sound Effects Free License. Trimmed, normalised and pitch/tempo-varied in `dist/whiskerway/audio/`.

## Site layout
- `dist/index.html`: the s1d33q.com games portal (featured game, game grid, coming-soon cards).
- `dist/assets/`: portal art, including the Whiskerway cover and card thumbnails.
- `dist/whiskerway/`: the game itself, served at https://s1d33q.com/whiskerway/.
