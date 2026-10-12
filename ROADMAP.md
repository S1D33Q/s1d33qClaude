# Whiskerway
## One small cat. A very big way home.

## 1. Research and direction
Crossy Road's official press kit establishes an endless arcade hopper built around roads, railways, rivers, and collectible characters: https://www.crossyroad.com/crossy-road-classic-press-kit

The original developers' GDC slides discuss voxel art (slide 15), procedural generation and difficulty (18), a combination of taps and swipes (19–20), delightful failure feedback (25–26), and cosmetic characters with equal gameplay (66): https://media.gdcvault.com/gdc2015/presentations/Hall_Matthew_Crossy_Road_Whale.pdf

The current official App Store description confirms the continuing lane-crossing formula and breadth of character/world collection: https://apps.apple.com/us/app/crossy-road/id924373886

These sources inform the design principles below. Exact physics, timings, collision boxes, lighting, and generation rules below are original implementation decisions, not claims about the original game's source code. Whiskerway uses original geometry, branding, audio, interface, and a cat-centered world; it does not reproduce the commercial game's entire character catalog or licensed worlds.

## 2. Director's game brief
You are Miso, an adventurous ginger cat exploring a miniature town. Every hop carries you further from a sunny garden into busy roads, riverside parks, railway crossings, and finally a lantern-lit night. The story is told by scenery and changing light, keeping play immediate.

Core loop: read the next lanes → choose a gap → hop → reposition → collect fish → rest on a verge → attempt a harder crossing. Distance increases only when reaching a new furthest row. Death provides a clear cause, run score, best score, and immediate retry. No paid advantages or forced ads.

Two modes: Journey, a 180-row expedition ending at a warmly lit home; Endless, a continuously generated score challenge. A new run begins in daylight. Three freely selectable cat coats provide cosmetic variety. Fish, records, and selected settings persist locally when browser storage is available.

## 3. World and challenge roadmap
- Garden opening: three safe rows, flowers, picket fences, shrubs, introductory slow traffic.
- Town roads: one to three lanes, alternating traffic, sedans, vans, taxis, trucks; signal cycles create readable windows. Park verges interrupt hazard groups.
- River: two or three water lanes, drifting logs carrying the cat; a fixed timber footbridge creates a different crossing rhythm.
- Railway: signal flashes and warning bell precede a fast train; sleepers, rails, crossing poles, and barriers telegraph danger.
- Night neighborhood: same fair mechanics, cooler ambient light and warmer practical lights. Visibility is maintained rather than used as an unfair hazard.
- Journey finale: safe garden approach, illuminated cottage, arrival celebration. Endless repeats biome phrases with bounded difficulty increases.

Generation rules: safe start; each grass row keeps the central three cells unblocked; hazard groups end in a safe verge; road speeds grow gradually and cap; river log gaps remain jumpable by waiting and repositioning; at least several upcoming rows remain visible. A retreat limit prevents unbounded backtracking. No invisible instant-kill timer while considering a crossing.

## 4. Art direction and object inventory
Orthographic three-dimensional miniature diorama, crisp cube silhouettes, flat-shaded surfaces, soft contact shadows, warm cream interface, moss greens, river turquoise, charcoal asphalt, ginger/coral accents. Camera looks diagonally across lanes with enough elevation to read landing cells.

Cat: compact body, cream muzzle and paws, independent ears, nose, eyes, whiskers, striped back, curved segmented tail, coral collar, small luminous charm. Hops have anticipation-like compression, a readable arc, landing squash, footstep particles, and facing changes. Idle tail sway and breathing prevent a frozen mascot.

Environment: layered block trees, varied bushes, grass tufts, flower clusters, picket fences, benches, litter bins, curbs, lane paint, crosswalks, streetlamps, signal heads, railway sleepers and ties, wooden logs with end grain, timber bridge planks and supports, water ripples, cottages with roofs/chimneys/windows, floating pollen by day and fireflies at night.

Vehicles: distinct multi-part silhouettes, windows, roofs, wheels, bumpers, headlamps and tail lamps. Train consists of locomotive and linked carriages with windows and warning cues.

## 5. Lighting and atmosphere
Start at clear morning. Advance the solar clock only in active play and according to distance milestones; interpolate continuously rather than switching presets. Journey night should arrive after roughly 120–180 seconds or more, constrained by progress. Sunset warms directional light, lengthens the visual color transition, and shifts the sky into lavender. Moonlight preserves object readability. Cat collar pool, streetlight pools, car lamps, illuminated signal lenses, lit house windows, and fireflies ramp up progressively. Pausing freezes world time.

## 6. Input, interface, and sound
Keyboard arrows/WASD move; Space hops forward or begins; Escape/P pauses; M toggles audio. Touch tap hops forward, swipes choose direction, and a visible directional pad supports precise movement. Input is buffered once during hops, avoiding runaway queues. Start screen previews the living diorama; HUD shows distance, fish, record, and time of day. Pause, help, audio toggle, cat selection, mode selection, retry, and home are functional.

Procedural Web Audio: soft hop notes, fish chimes, collision stinger, splash, train bell, and sparse ambient notes. Audio begins after user input and respects mute. Reduced motion removes extra camera shake and celebration particles. Responsive layout keeps action and controls accessible on portrait phones.

## 7. Engineering and quality gates
Browser delivery with local Three.js module and original procedural geometry, no external asset runtime dependency. Fixed-step simulation, frame-rate-independent movement, bounded row lifecycle, material/geometry reuse, capped pixel ratio, localStorage with graceful failure handling, pause on hidden tab, explicit game state transitions.

Verify: starting/retrying resets run state; all four movement directions; blocked cells; traffic collisions; carried river movement and splash; train timing; bridge safety; pause freezes simulation; scores only increase on new rows; touch controls; sound toggle; saved preference reload; start/day and later/night visuals; Journey arrival and Endless continuation. Inspect real browser screenshots and address observed issues before packaging.

## 8. Delivery
Playable private hosted site plus editable source, this roadmap, and a verification report. This is an original browser game inspired by the lane-crossing genre, with the explicitly implemented feature set described here; it is not a claim of full commercial Crossy Road feature parity.

## 9. Requested refinement pass
Remove the introductory paragraph, wanderers footer and postcard. Keep the brand in the menu only. Move score and Journey elapsed time to the top center, fish to the top left, and Journey progress into a slim vertical meter on the right. Replace written time-of-day and district labels with an animated sun/moon dial. Scale the cat uniformly to 0.6. Rebuild car windows within their own cabin dimensions and verify every vehicle in both directions. Add active-time Journey records, accessible through the menu trophy; retain five fastest local completions. Refine moving water, whole-vehicle suspension and night headlight glows.
