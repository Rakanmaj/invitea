# Bassam & Lana · The Gilded Hour

An original pearl, antique-bronze and espresso invitation for 15 January 2027,
7:30 PM, Astor Ballroom, The St. Regis Amman. The architecture is imagined;
generated scenes are not photographs of the hotel's actual ballroom.

The live experience uses modeled geometry and a moving perspective camera.
Doors, arches, fluted columns, a coffered ceiling, fabric curtains, chandeliers,
flowers, furniture, candleholders, place settings and exterior window details
are built in `src/invitation/bassamLanaWorld.ts`. Live HTML lettering is projected
onto physical surfaces. The native scroll position controls the journey.
The generated bronze doors open on the guest's entry tap, which also starts
the music softly. The 3D salon loads behind the doors ahead of time; they reveal
the modeled room directly, without the former flat illustrated introduction.
The seal is the only entry control and always starts the music. The header
retains a music toggle after entry. This invitation's interface is Arabic-only.
The illustrated room is reserved for unavailable WebGL or reduced motion.
Phone journeys use a shorter 340svh scroll range, native touch scrolling, and
non-bouncing camera smoothing. Rendering targets 60 fps with a lower phone
pixel-ratio cap; actual frame rate depends on the device.
Arabic headings use Aref Ruqaa; Bismillah and longer prose use Amiri. Each
wall has a measured text-safe area, and text is fitted to that area without
stretching its letterforms. Font or language changes trigger a fresh fit.

`node scripts/export-bassam-lana-model.mjs` exports the architecture and furniture
to `assets-source/bassam-lana/salon.glb` for reuse. The web page builds the scene
directly, without downloading that larger export. Materials are loaded from
optimized web textures; reflections and shadows are rendered at runtime.

## Assets and generation mode

All raster art was generated with the built-in image generation tool. No CLI,
API key or third-party architectural model was used. Original PNGs are retained
in `assets-source/bassam-lana/`; optimized assets are in
`public/invitations/bassam-lana/`. The original generator outputs also remain in
the Codex generated-images directory.

- `threshold.webp`: entrance cover, portfolio cover crop, and final scene.
- `salon.webp`: fallback interior for unavailable WebGL or reduced motion.
- `evening.webp`: fallback evening and schedule illustration.
- `limestone.webp`: generated limestone texture applied in world space.
- `marble.webp`: generated espresso marble floor texture.
- `florals.webp`: generated alpha-cut orchid, rose and jasmine arrangements,
  placed on intersecting planes inside the modeled room.
- `ceremony-wall.webp`: carved ivory and bronze arch skin on the opening display.
- `salon-wall.webp`: floral relief and fine bronze molding on the message and venue walls.
- `evening-wall.webp`: dark walnut, brass and pearl skin on the countdown wall.
- Printed-lettering alternatives were generated, then withdrawn at the user’s
  request. They remain in `assets-source/bassam-lana/` as archived previews.
  The live invitation uses code-based text and unlettered wall artwork.
- `cover.webp`: portrait crop of the original threshold artwork.
- `public/social/invitations/bassam-lana.jpg`: social sharing crop.

## Final image prompts

### Threshold

Use case: stylized-concept. Asset type: cinematic wedding invitation opening
scene, original photorealistic architectural render. A landscape composition.
A completely frontal, perfectly symmetrical pair of CLOSED grand antique-bronze
wedding salon doors in a tall rounded limestone arch. Doors occupy the middle
45 percent; leaves meet exactly at center with a clean seam. Tasteful geometric
brass filigree, luminous champagne accents, mother-of-pearl inlays, real brass
handles. Original luxurious Amman-inspired contemporary salon, warm pale
Jordanian limestone, ivory walls, simple arch moldings, dark espresso marble
floor, subtle candles low at the extreme side corners. Quiet editorial rendering,
photographic physical materials. No green, burgundy, blue, royal excess, draped
walkway, stairs, people, vehicles, text, letters, logos or watermark. Eye-level
35mm, perfectly straight-on. Warm evening light along the seam, reflected on
bronze. The phone center crop must show the doors and arch. Full-screen entrance
split into moving left and right halves by code. Dark corners, luminous center.

### Salon · threshold supplied as a style reference

A NEW interior scene beyond those bronze doors, not a closed-door variation.
Original luxury Amman-inspired winter wedding salon, perfectly frontal and
symmetrical, photographic architectural visualization, wide 16:9. Pearl
limestone colonnade, bronze delicate arch outlines and amber lamps. A straight
polished espresso marble aisle toward a tall illuminated arch. The CENTRAL
40 percent is a calm pearl-ivory translucent sheer-curtain panel and uncluttered
bright wall for dark HTML typography; no words. Crystal chandeliers in the upper
corners, off-white orchids and jasmine at the low sides, candles and brass.
Through side windows: an authentic Amman pale limestone hillside at dusk;
no European landmarks, ocean, mountains, people or cars. Restrained mist and
reflected candlelight. Bronze, pearl, champagne and espresso only; no green,
burgundy or blue. Center empty and bright enough for readable names and date.
Single image, no UI or watermark.

### Evening · threshold supplied as a style reference

A different scene: an intimate magnificent wedding dinner salon in AMMAN,
JORDAN at night. Photographic architectural visualization, landscape 16:9,
perfectly frontal eye level. A long candlelit table runs from the LOWER LEFT
foreground into the distance, pearl linens, off-white orchids and jasmine,
bronze candelabras, crystal, dark wood, no people. Table in the lower third
and left; central and right areas are spacious DARK ESPRESSO interior and
bronze arched windows framing Amman pale limestone hillside homes and tiny
warm lights. No Europe, skyscrapers, focal domes or minarets. Dark limestone
arches with the reference's Jordanian geometry, chandelier at upper LEFT.
Warm candles, haze, champagne highlights. Center RIGHT 45 percent: dark
uncluttered wall for ivory HTML. Bronze, pearl, champagne, espresso; no green,
burgundy or blue. Imagined original salon, not a claim of a real hotel photograph.
No words, letters, people, watermarks, logos, collage or UI.

### Limestone · material texture

Use case: texture material for a REAL 3D wedding salon. Generate a seamless flat
diffuse/albedo texture of refined light warm ivory Jordanian limestone / polished
travertine. Entire image only the stone surface, viewed perfectly perpendicular,
no perspective, no objects, no architecture, no shadows, no illumination
gradients, no labels, no border. Extremely subtle pale beige veining, tiny natural
pores, quiet irregular warmth, smooth luxurious texture. Very light ivory palette
#E7DBC7. Edges must tile seamlessly in every direction. Photorealistic
architectural PBR material base-color texture. Square 1024 x 1024.

### Marble · material texture

Asset: seamless architectural PBR BASE COLOR texture, square. Dark warm espresso
marble, polished Emperador-style stone. Extremely fine natural bronze-taupe and
muted cream veining, understated sparse delicate interconnected veins, rich dark
brown base #3B3028, elegant luxurious hotel floor material. Flat perpendicular
surface scan. No room, perspective, objects, reflections, shadows, lighting
gradient or text. Entire image only a realistic stone material tile. Edges must
tile seamlessly. Photorealistic, quiet and refined, not busy, no large white cracks.

### Florals · transparent botanical prop

Asset: photorealistic isolated luxurious wedding floral arrangement for a real
3D interior, transparent background cutout. A lush sculptural white floral
arrangement in a small antique-bronze urn: ivory garden roses with distinctly
layered soft petals, cascading white orchids, delicate white jasmine, and
restrained muted dark olive foliage. The arrangement is tall and airy, wide full
upper silhouette with cascading stems, around 130 cm tall relative to the 35 cm
urn. Show the entire urn and arrangement frontally, slight natural perspective.
Exquisite hotel wedding florist quality, realistic photographic PBR look, pearl
and champagne palette, soft neutral warm studio lighting, no ground shadow baked
behind it. Clean transparent alpha edges, no background, people, text, frames
or collage. One single complete centered arrangement with generous clear margins.

### Ceremony wall · threshold supplied as a style reference

Photorealistic frontal orthographic tall rounded-top ivory limestone niche,
portrait 4:5. Antique bronze fine outlines, pearl carved floral relief at the
outer sides, tiny jasmine and olive details. Keep the central 65 percent quiet,
pale ivory and empty for live Arabic names. Expensive sculptural depth and fine
stone texture. No floor, perspective, room, people, text or furniture.

### Salon wall · threshold supplied as a style reference

Photorealistic orthographic ivory salon wall panel, square or 4:5. Antique bronze
hairline double moldings, embossed botanical outer corners, fine filigree at
the top center, tiny jasmine at the bottom corners. Central 70 percent ivory,
calm and empty. No floor, perspective, text, furniture or lamps.

### Evening wall · threshold supplied as a style reference

Dark espresso walnut and bronze wall panel, orthographic square or 4:5.
Antique brass double outline, carved outer botanical corners, central 70 percent
calm dark matte and empty for ivory countdown lettering. Photographic wood grain
and raking candlelight. No actual candles, room, text or furniture.

All three wall images use the built-in generation tool and are mapped onto
physical display meshes, with live lettering above them. Their original PNGs
are saved beside the other source assets. Borders and panel thickness remain
modeled, so camera turns preserve depth instead of replacing the room with slides.

## Soundtrack

**Almost in F — Kevin MacLeod**, explicitly selected by the user.
Publisher: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100394
License: https://creativecommons.org/licenses/by/4.0/

The invitation credits the artist and license. The web audio is a four-minute
excerpt with a three-second opening fade, a six-second closing fade and web
compression. Playback begins on the guest's “Open with music” gesture, softly
at volume 0.16. A quiet entrance and persistent music control are also available.

## Event functions

Map link: Google Maps search for the St. Regis Amman on Shafiq Al Hayek Street.
Calendar: 15 January 2027, 19:30–23:30 Asia/Amman (UTC+03:00).
Venue reference: https://www.marriott.com/en-us/hotels/ammxr-the-st-regis-amman/events/
RSVP uses the existing published invitation API. It stays closed until a
published `bassam-lana` event is configured in the backend; no replies are
silently discarded or simulated.
