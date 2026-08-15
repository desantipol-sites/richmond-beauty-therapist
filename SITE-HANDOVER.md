# Richmond Beauty Therapist website handover

## Project identity

- Business: Richmond Beauty Therapist
- Practitioner: Natalia Pol
- Location: Stanmore Road, Richmond, TW9 2DD
- Website: https://www.richmondbeautytherapist.co.uk/
- Instagram: https://www.instagram.com/natalia_pol_richmond
- Booking: https://bookings.gettimely.com/richmondbeautytherapist/bb/book
- GitHub: https://github.com/desantipol-sites/richmond-beauty-therapist
- Planned Cloudflare project: `richmond-beauty-therapist`

This is a separate website from Surrey Nail Artisan. Do not merge the two repositories or deploy the Richmond files over the Hampton Worker.

## Brand direction

The Richmond identity uses no green. Its core palette is:

- Ivory `#fefbf7`
- Warm cream `#faf7f4`
- Sand `#eee5dc`
- Taupe `#bba18e`
- Deep taupe `#8f7d6b`
- Muted blush `#d8b8ad`
- Wine `#5a3840`
- Charcoal `#342c29`

Display type uses Cormorant Garamond. Interface and body copy use Lexend to retain continuity with the original Richmond site.

## Service scope

Richmond offers cosmetic beauty services only:

- Hands treatment
- Feet treatment
- Hands and feet packages
- Male hands and feet treatment
- Pedicure KART
- Eyelash and eyebrow treatments
- Lash lift

Medical Pedicure is not offered at Richmond and must not appear in visible page content, navigation, structured data or the sitemap.

## Files

- `build.mjs`: service data and HTML generator
- `public/index.html`: generated homepage
- `public/*.html`: generated treatment-category pages
- `public/styles.css`: shared design system and responsive layout
- `public/script.js`: menu, accordions, reveals and booking-click data-layer event
- `public/_redirects`: old Webflow URL preservation
- `public/robots.txt`: blocks indexing during preview
- `public/sitemap.xml`: prepared sitemap
- `wrangler.jsonc`: Cloudflare static-assets configuration

After editing service data or shared HTML in `build.mjs`, run:

```text
node build.mjs
```

## Analytics

The current Richmond Google Tag Manager container `GTM-W693MNZ4` is preserved. Every booking link pushes this event before leaving the site:

```text
event: book_appointment_click
booking_location: Richmond
```

## Going live

The preview intentionally contains `noindex, nofollow` on every page and `Disallow: /` in `robots.txt`.

Immediately before launch:

1. Change all robots meta tags to `index, follow` in `build.mjs`.
2. Change `robots.txt` to `Allow: /`.
3. Run `node build.mjs` again.
4. Deploy and confirm the custom domain works on both `www` and the root domain.
5. Submit `https://www.richmondbeautytherapist.co.uk/sitemap.xml` in Google Search Console.

## Important deployment separation

- Surrey Worker: `surrey-nail-artisan`
- Richmond Worker: `richmond-beauty-therapist`
- Surrey repository: `desantipol-sites/surrey-nail-artisan`
- Richmond repository: `desantipol-sites/richmond-beauty-therapist`

Always check the project name before committing or deploying.
