# Whiskerway verification

Verified on 12 October 2026 in the Codex browser, using the actual locally served game.

## Gameplay and refinement checks — 34 passed
The development-only test fixture executes the game's actual movement, collision, generation, lighting, and game-state code with deterministic scenarios:

1. Forward hop lands on exactly one row.
2. Sideways movement does not increase distance.
3. Backward movement preserves the furthest score.
4. Retreat before the start is rejected.
5. Blocked destination cells reject movement.
6. A single buffered hop executes after the current hop.
7. Car overlap produces the traffic failure state.
8. A cat on a log is carried by river flow.
9. Water without a platform produces splash failure.
10. Timber bridge remains safe over water.
11. Train overlap produces railway failure.
12. Fish are collected on contact.
13. Collected fish cannot be claimed again.
14. Solar interpolation is continuous and monotonic.
15. Late progress enables night and the collar light.
16. Journey reaches its win state at row 180.
17. Endless continues beyond the Journey goal.
18. The generated row set remains bounded.
19. Distant old rows are removed.
20. Restart restores daylight, score, fish and player state.
21–28. All four vehicle types, in both directions, keep glass inside the cabin silhouette, allowing only the thin surface layer necessary for rendering.
29. Cat model scale is exactly 0.6 on all axes.
30. Journey stopwatch measures real active elapsed seconds.
31. Pausing freezes the stopwatch.
32. Resuming preserves elapsed time and restarts the clock.
33. Personal leaderboard sorts completed journeys by fastest time.
34. Recorded times retain tenths of a second.

## Browser and visual review
- Inspected the live desktop title screen and daytime gameplay at 1280 × 720.
- Inspected the responsive title screen and touch controls at 390 × 844.
- Verified touch-pad movement and keyboard movement advance the visible score.
- Verified pause opens the modal, and help exposes instructions and reduced-motion settings.
- Changed cat selection, reloaded, and verified the selected coat persisted.
- Inspected a development night fixture at late-game progress: cat collar light, streetlight pools, signal lenses, moonlit environment and distant illuminated windows were visible.
- Corrected a static-geometry batching error affecting glow meshes, removed floating off-map vehicles, smoothed ambient color interpolation, added camera tracking for lateral mobile movement, and corrected a mobile title spacing issue.
- Final mechanics rerun passed all 34 scenarios following the refinement pass.
- Inspected all eight vehicle/direction combinations in an isolated model showcase. Cabin windows, truck cargo bodies, roofs, bumpers and wheels appeared correctly assembled.
- Verified the cleaned menu, menu-only branding, top-center hops/timer, top-left fish, vertical right-side meter, sun/moon dial and personal leaderboard empty state in the actual browser.

## Rendering measurements
The initial version's development scene measured 370 draw calls, 41,072 triangles, and 111 geometries, with roughly 1.67 ms of CPU submission work in a synchronous sample. These measurements predate the additional headlight effects and refined vehicle meshes; they are not final-version FPS claims. Pixel ratio is capped, static geometry is batched, and generated rows are removed outside the active window. Mobile-device performance remains unverified.

## Reproduce
From the source folder run `python tests/qa-server.py`, then open `http://127.0.0.1:8767/?qa=tests`. The server appends the test harness only for this local development session. Other fixtures: `?qa=night`, `?qa=dusk`, `?qa=river`, `?qa=rail`, `?qa=arrival`, `?qa=vehicles`, and `?qa=performance`. These fixtures are not present in the deployed game.

## Limits
Night and ending checks use controlled fixtures, not a claim of manually completing a three-minute, 180-hop run. Real touch hardware, audible sound quality, and a broad browser/GPU matrix have not been certified. Scores are local, not a network leaderboard. The final game contains the feature set documented in README and the roadmap, rather than the entirety of commercial Crossy Road.
