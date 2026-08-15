import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const out = join(process.cwd(), "public");
const booking = "https://bookings.gettimely.com/richmondbeautytherapist/bb/book";
const domain = "https://www.richmondbeautytherapist.co.uk";

const categories = [
  {
    slug: "hands-treatment",
    name: "Hands treatment",
    summary: "Classic, IBX and gel manicure",
    eyebrow: "Manicure treatments in Richmond",
    title: "Hands that feel cared for.",
    emphasis: "Nails that still feel like you.",
    intro: "Meticulous preparation and a finish selected around your natural nails, lifestyle and personal taste.",
    hero: "work-06.jpg",
    heroAlt: "Natural manicure result by Natalia Pol in Richmond",
    imageLabel: "Classic manicure",
    services: [
      ["Classic manicure", "45 min", "£50", "Nail and cuticle care, finished with regular colour."],
      ["IBX & classic manicure", "1 hour", "£55", "Strengthening IBX care with a full classic manicure."],
      ["Gel manicure (removal with new application)", "1 hour 30 min", "£65", "Existing gel removal, detailed preparation and a fresh gel colour."],
      ["Gel removal & classic manicure (without new application)", "1 hour", "£60", "Gentle removal followed by classic nail and cuticle care."]
    ],
    faqs: [
      ["Which manicure should I choose?", "Choose classic for regular polish, gel for a longer-lasting colour, or IBX when natural nails need extra care."],
      ["Can existing gel be removed?", "Yes. Select the option that includes either a new gel application or a classic manicure afterwards."],
      ["Will the result look natural?", "Yes. Shape, length and colour are discussed before treatment so the result feels right for you."]
    ]
  },
  {
    slug: "feet-treatment",
    name: "Feet treatment",
    summary: "Classic, gel and luxury pedicure",
    eyebrow: "Pedicure treatments in Richmond",
    title: "Care from heel to toe.",
    emphasis: "A beautifully finished pedicure.",
    intro: "Detailed preparation, thoughtful products and a finish chosen for comfort as well as appearance.",
    hero: "work-04.jpg",
    heroAlt: "Pedicure treatment result at Richmond Beauty Therapist",
    imageLabel: "Gel pedicure",
    services: [
      ["Gel removal & classic pedicure (without new application)", "1 hour 15 min", "£65", "Existing gel is removed before a full classic pedicure."],
      ["Classic pedicure", "1 hour", "£65", "Complete nail and cuticle care, scrub and regular colour."],
      ["Gel pedicure", "1 hour 30 min", "£70", "Full preparation with a longer-lasting gel colour finish."],
      ["Luxury pedicure (without colour)", "1 hour 30 min", "£85", "Classic care with scrub and foot mask for a restorative appointment."],
      ["Luxury pedicure (with colour)", "1 hour 45 min", "£95", "Luxury foot care completed with your chosen colour."]
    ],
    faqs: [
      ["What is the difference between classic and gel?", "Classic uses regular polish. Gel is cured for a longer-lasting finish and needs more application time."],
      ["What makes the luxury pedicure different?", "It adds a foot mask and extra restorative care to the full pedicure."],
      ["Can I arrive with gel on?", "Yes. Choose the treatment that includes removal or add a note when booking."]
    ]
  },
  {
    slug: "hands-feet-packages",
    name: "Hands & feet packages",
    summary: "Beautifully paired appointments",
    eyebrow: "Manicure and pedicure packages in Richmond",
    title: "Hands and feet, cared for together.",
    emphasis: "One calm appointment.",
    intro: "Coordinated manicure and pedicure care with enough time reserved for every detail.",
    hero: "work-01.jpg",
    heroAlt: "Coordinated manicure and pedicure treatment in Richmond",
    imageLabel: "Hands & feet",
    services: [
      ["Classic manicure & pedicure", "1 hour 45 min", "£90", "Classic care and regular colour for hands and feet."],
      ["Gel manicure & classic pedicure", "2 hours 30 min", "£110", "Gel hands paired with a classic pedicure."],
      ["Classic manicure & gel pedicure", "2 hours 30 min", "£110", "Classic hands paired with a gel pedicure."],
      ["Gel manicure & gel pedicure", "2 hours 45 min", "£125", "Complete gel colour care for hands and feet."]
    ],
    faqs: [
      ["Can hands and feet have different colours?", "Yes. Colours can coordinate or be chosen separately."],
      ["Does the package include removal?", "Please add a note if you arrive with existing gel so the required time can be confirmed."],
      ["Is the appointment private?", "Yes. Natalia sees one client at a time in the Richmond treatment room."]
    ]
  },
  {
    slug: "male-hands-feet-treatment",
    name: "Male hands & feet treatment",
    summary: "Natural grooming and gel options",
    eyebrow: "Men's manicure and pedicure treatments in Richmond",
    title: "Careful grooming for hands and feet.",
    emphasis: "A clean, considered finish.",
    intro: "Private manicure and pedicure treatments with natural and gel finishes, delivered carefully and without rush.",
    hero: "work-02.jpg",
    heroAlt: "Detailed manicure treatment in Richmond",
    imageLabel: "Men's hand care",
    services: [
      ["Classic manicure (no colour)", "30 min", "£40", "Nail shaping and cuticle care with a clean, natural finish."],
      ["Gel manicure (with colour)", "60–90 min", "£65", "Full manicure preparation completed with gel colour."],
      ["Male manicure & pedicure", "1 hour 15 min", "£80", "Classic hand and foot care with cuticle work, scrub and cream."],
      ["Classic manicure & gel pedicure", "2 hours 30 min", "£110", "Natural classic manicure care paired with a gel pedicure."],
      ["Gel manicure & classic pedicure", "2 hours 30 min", "£110", "Gel manicure paired with a natural classic pedicure."],
      ["Gel manicure & gel pedicure", "2 hours 30 min", "£125", "Gel colour care for hands and feet in one private appointment."]
    ],
    faqs: [
      ["Can I book without colour?", "Yes. Choose classic manicure or male manicure and pedicure for a natural finish."],
      ["Are gel colour options available?", "Yes. Gel treatments can be booked for hands, feet or both."],
      ["Is the appointment private?", "Yes. Natalia sees one client at a time in the Richmond treatment room."]
    ]
  },
  {
    slug: "kart-pedicure",
    name: "Pedicure KART",
    summary: "Targeted cosmetic foot care",
    eyebrow: "KART pedicure treatments in Richmond",
    title: "Focused care for smoother feet.",
    emphasis: "Professional products, thoughtfully used.",
    intro: "KART cosmetic foot-care treatments are selected for dry or hard skin and delivered with Natalia's close attention.",
    hero: "ritual-small.jpeg",
    heroAlt: "Professional foot care ritual in Richmond",
    imageLabel: "KART foot care",
    services: [
      ["KART pedicure", "1 hour", "£70", "Focused treatment using the professional KART foot-care range."],
      ["KART pedicure with colour", "1 hour 30 min", "£80", "Targeted KART care completed with a fresh colour application."],
      ["Callus peel", "1 hour", "£70", "Classic pedicure care with targeted treatment for hard skin."]
    ],
    faqs: [
      ["What is a KART pedicure?", "It is a cosmetic pedicure using professional KART products, selected for dry and hard skin."],
      ["Can colour be included?", "Yes. Choose KART pedicure with colour."],
      ["Who is KART care suitable for?", "It is designed for clients who want focused cosmetic care for dry or hard skin."]
    ]
  },
  {
    slug: "eyelash-eyebrows",
    name: "Eyelash & eyebrows",
    summary: "Natural-looking shape and definition",
    eyebrow: "Eyebrow and eyelash treatments in Richmond",
    title: "Small refinements.",
    emphasis: "A naturally defined finish.",
    intro: "Shaping and tinting appointments designed for balanced, low-maintenance definition.",
    hero: "work-03.png",
    heroAlt: "Natural eyelash and eyebrow treatment result in Richmond",
    imageLabel: "Natural definition",
    services: [
      ["Eyebrow shape", "15 min", "£12", "Careful shaping, with waxing available when requested."],
      ["Eyebrow tint", "15 min", "£13", "A balanced tint chosen around your natural colouring."],
      ["Eyebrow shape & tint", "30 min", "£25", "Shaping and tinting combined for a polished result."],
      ["Eyelash tint", "15 min", "£13", "Darker-looking lashes without daily mascara."],
      ["Eyelash & eyebrow tint", "30 min", "£25", "Coordinated tinting for natural-looking definition."]
    ],
    faqs: [
      ["How long does tint usually last?", "Results vary, but eyebrow tint commonly lasts around three to four weeks."],
      ["Can I ask for a subtle result?", "Yes. Colour and definition are selected around your preference."],
      ["Is a patch test required?", "Natalia will confirm patch-test requirements before your appointment where appropriate."]
    ]
  },
  {
    slug: "lash-lift",
    name: "Lash lift",
    summary: "Low-maintenance lift and definition",
    eyebrow: "Lash lift treatments in Richmond",
    title: "Your natural lashes, lifted.",
    emphasis: "A brighter, open-eyed finish.",
    intro: "A low-maintenance treatment that lifts and defines your natural lashes without extensions.",
    hero: "work-05.jpg",
    heroAlt: "Natural lash lift result by Natalia Pol in Richmond",
    imageLabel: "Lash lift",
    services: [
      ["LVL Enhance / lash lift", "1 hour", "£65", "A lash lift with lash tint for fuller-looking natural lashes."],
      ["LVL Enhance / lash lift & eyebrow", "1 hour", "£80", "Lash lift and tint combined with eyebrow tinting in one appointment."]
    ],
    faqs: [
      ["Does a lash lift use extensions?", "No. It works with your own natural lashes."],
      ["How long does the result last?", "Longevity varies with your natural lash cycle and aftercare."],
      ["Do I need a patch test?", "Natalia will confirm patch-test requirements before treatment."]
    ]
  }
];

const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function head({ title, description, path = "", image = "hero-nails.jpg" }) {
  const url = `${domain}/${path}`;
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#fefbf7">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Richmond Beauty Therapist">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${domain}/assets/${image}">
  <title>${esc(title)}</title>
  <link rel="icon" href="assets/richmond-logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&amp;family=Lexend:wght@300;400;500;600&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="colour-overrides.css">
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W693MNZ4');</script>
  <script src="script.js" defer></script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"Richmond Beauty Therapist","url":"${url}","image":"${domain}/assets/${image}","description":"${esc(description)}","email":"booking@richmondbeautytherapist.co.uk","priceRange":"££","address":{"@type":"PostalAddress","streetAddress":"Stanmore Road","addressLocality":"Richmond","postalCode":"TW9 2DD","addressCountry":"GB"},"founder":{"@type":"Person","name":"Natalia Pol","jobTitle":"Beauty Therapist"},"sameAs":["https://www.instagram.com/natalia_pol_richmond"]}</script>
</head>`;
}

function header() {
  return `<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W693MNZ4" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <a class="brand" href="index.html" aria-label="Richmond Beauty Therapist home"><img src="assets/richmond-logo.png" alt="Richmond Beauty Therapist"></a>
  <nav class="desktop-nav" aria-label="Main navigation"><a href="index.html#services">Treatments</a><a href="index.html#studio">The studio</a><a href="#contact">Contact</a></nav>
  <div class="header-actions"><a class="button button-small" href="${booking}" data-book>Book now</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span></button></div>
  <nav class="mobile-menu" id="mobile-menu" hidden><a href="index.html#services">Treatments</a><a href="index.html#studio">The studio</a><a href="#contact">Contact</a></nav>
</header>`;
}

function footer() {
  return `<footer class="site-footer" id="contact">
  <div class="footer-brand"><img src="assets/richmond-logo.png" alt="Richmond Beauty Therapist"></div>
  <div class="footer-copy"><p>I’m a fully insured and qualified nail technician with NVQ Level 2 as well as a registered member of The British Association of Foot Health Professionals.</p><p class="signature">Natalia Pol</p></div>
  <div class="footer-links"><a href="mailto:booking@richmondbeautytherapist.co.uk">booking@richmondbeautytherapist.co.uk</a><span>Stanmore Road, Richmond, TW9 2DD</span><a href="https://www.instagram.com/natalia_pol_richmond" target="_blank" rel="noopener"><span class="instagram" aria-hidden="true">◎</span> Instagram</a></div>
</footer>
<a class="mobile-book" href="${booking}" data-book><span>Book now</span></a>
</body></html>`;
}

function serviceRows(services, linked = false, slug = "") {
  return services.map(([name, duration, price]) => linked
    ? `<a class="service-row" href="${slug}.html"><span><strong>${esc(name)}</strong><small>${esc(duration)}</small></span><b>${esc(price)}</b></a>`
    : `<div class="service-card"><div><p class="eyebrow">Treatment</p><h3>${esc(name)}</h3><p>${esc(arguments[0][0]?.[3] || "")}</p></div><div class="service-meta"><span>${esc(duration)}</span><strong>${esc(price)}</strong></div></div>`
  ).join("");
}

function homepage() {
  const accordions = categories.map((category, index) => `<article class="service-accordion${index === 0 ? " is-open" : ""}" data-accordion>
    <button class="accordion-trigger" type="button" aria-expanded="${index === 0}"><span><strong>${esc(category.name)}</strong><small>${esc(category.summary)}</small></span><i aria-hidden="true"></i></button>
    <div class="accordion-panel" ${index === 0 ? "" : "hidden"}>${serviceRows(category.services, true, category.slug)}</div>
  </article>`).join("");
  return `${head({title:"Richmond Beauty Therapist | Private Nail & Beauty Appointments", description:"Private one-to-one manicure, pedicure, KART foot care and lash treatments in Richmond, London."})}
${header()}
<main id="main">
  <section class="hero home-hero">
    <div class="hero-copy"><p class="eyebrow">Richmond Beauty Therapist</p><h1>Looking good is not a luxury.<br><em>It is time reserved for you.</em></h1><p class="hero-intro">Private manicure, pedicure and lash appointments with meticulous preparation, premium products and Natalia's full attention.</p><div class="button-row"><a class="button" href="${booking}" data-book>Book an appointment</a><a class="text-link" href="#services">See treatments</a></div></div>
    <figure class="hero-media reveal"><img src="assets/hero-nails.jpg" alt="Burgundy manicure by Natalia Pol at Richmond Beauty Therapist"><figcaption>Classic manicure</figcaption></figure>
  </section>

  <section class="trust-strip" aria-label="Appointment benefits"><p><i></i> One client at a time</p><p><i></i> Natural-looking results</p><p><i></i> Premium products</p><p><i></i> Fully insured</p></section>

  <section class="showcase section-pad">
    <div class="section-heading"><p class="eyebrow">Selected work</p><h2>Thoughtful colour.<br><em>Beautifully prepared nails.</em></h2><p>Real results from Natalia's work, from quiet neutrals to confident colour.</p></div>
    <div class="work-grid"><figure class="work-tall reveal"><img src="assets/work-06.jpg" alt="Natural classic manicure"><figcaption>Classic manicure</figcaption></figure><figure class="reveal"><img src="assets/work-01.jpg" alt="Detailed manicure result"><figcaption>Gel manicure</figcaption></figure><figure class="reveal"><img src="assets/work-04.jpg" alt="Pedicure result"><figcaption>Pedicure</figcaption></figure><figure class="work-wide reveal"><img src="assets/work-02.jpg" alt="Beauty treatment result"><figcaption>Considered finish</figcaption></figure></div>
  </section>

  <section class="services section-pad" id="services"><div class="section-heading"><p class="eyebrow">Treatments & prices</p><h2>Choose the appointment<br><em>that feels right for you.</em></h2><p>Tap any category to see its services, appointment times and prices.</p></div><div class="accordion-list">${accordions}</div></section>

  <section class="privacy section-pad"><div><p class="eyebrow">The luxury of privacy</p><h2>A beauty appointment<br><em>that feels personal.</em></h2><p>No crowded waiting room and no rushed handover. Natalia welcomes one client at a time.</p></div><div class="privacy-list"><article><i></i><span><h3>Unhurried</h3><p>Time is reserved for your treatment, preferences and questions.</p></span></article><article><i></i><span><h3>Immaculate</h3><p>High-standard hygiene, prepared instruments and a clean private setting.</p></span></article><article><i></i><span><h3>Considered</h3><p>A result selected around you, with practical aftercare.</p></span></article></div></section>

  <section class="studio section-pad" id="studio"><div class="studio-copy"><p class="eyebrow">The Richmond studio</p><h2>Professional care,<br><em>privately delivered.</em></h2><p>Natalia Pol is an experienced, fully insured beauty therapist. Her Richmond appointments combine careful preparation with the calm of a one-to-one treatment room.</p><a class="button" href="${booking}" data-book>Book an appointment</a></div><div class="studio-images reveal"><img class="studio-main" src="assets/natalia-standing.jpeg" alt="Natalia Pol standing in her private treatment studio"><img class="studio-small" src="assets/ritual-large.jpeg" alt="Beauty products prepared for a private appointment"><span>Richmond · by appointment</span></div></section>

  <section class="final-cta"><p class="eyebrow">Your appointment</p><h2>Ready for a little time<br><em>that is entirely yours?</em></h2><p>Private nail, pedicure and lash treatments in Richmond.</p><a class="button button-light" href="${booking}" data-book>Book now</a></section>
</main>
${footer()}`;
}

function categoryPage(category) {
  const cards = category.services.map(([name,duration,price,description]) => `<article class="service-card"><div><p class="eyebrow">Treatment</p><h3>${esc(name)}</h3><p>${esc(description)}</p></div><div class="service-meta"><span>${esc(duration)}</span><strong>${esc(price)}</strong></div></article>`).join("");
  const faqs = category.faqs.map(([q,a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
  return `${head({title:`${category.name} in Richmond | Richmond Beauty Therapist`,description:`Private ${category.name.toLowerCase()} appointments with Natalia Pol in Richmond, London. View treatments, times and prices.`,path:category.slug,image:category.hero})}
${header()}
<main id="main">
  <section class="category-hero"><div><p class="eyebrow">${esc(category.eyebrow)}</p><h1>${esc(category.title)}<br><em>${esc(category.emphasis)}</em></h1><p class="hero-intro">${esc(category.intro)}</p><a class="button" href="${booking}" data-book>Book an appointment</a></div><figure class="reveal"><img src="assets/${category.hero}" alt="${esc(category.heroAlt)}"><figcaption>${esc(category.imageLabel)}</figcaption></figure></section>
  <section class="treatment-menu section-pad"><div class="section-heading"><p class="eyebrow">Treatments & prices</p><h2>Choose your<br><em>${esc(category.name.toLowerCase())}.</em></h2></div><div class="service-grid">${cards}</div></section>
  <section class="expect section-pad"><div><p class="eyebrow">Your appointment</p><h2>Calm, private<br><em>and carefully paced.</em></h2></div><div class="expect-list"><article><i></i><span><h3>A private conversation</h3><p>Your preferences and the result you want are discussed first.</p></span></article><article><i></i><span><h3>Detailed preparation</h3><p>Natalia works carefully, one client at a time.</p></span></article><article><i></i><span><h3>A considered finish</h3><p>Your treatment is completed with practical aftercare guidance.</p></span></article></div></section>
  <section class="faq section-pad"><div class="section-heading"><p class="eyebrow">Useful to know</p><h2>Questions,<br><em>answered simply.</em></h2></div><div class="faq-list">${faqs}</div></section>
  <section class="final-cta"><p class="eyebrow">Richmond appointments</p><h2>Ready to reserve<br><em>your time?</em></h2><a class="button button-light" href="${booking}" data-book>Book now</a></section>
</main>
${footer()}`;
}

await mkdir(out, { recursive: true });
await writeFile(join(out, "index.html"), homepage());
for (const category of categories) await writeFile(join(out, `${category.slug}.html`), categoryPage(category));

const urls = ["", ...categories.map((c) => c.slug)].map((path) => `  <url><loc>${domain}/${path}</loc></url>`).join("\n");
await writeFile(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(join(out, "robots.txt"), `User-agent: *\nDisallow: /\n\nSitemap: ${domain}/sitemap.xml\n`);

await writeFile(join(out, "_redirects"), `
/prices/hands-treatment /hands-treatment 301
/prices/feet-treatment /feet-treatment 301
/prices/hands-feet-packages /hands-feet-packages 301
/prices/pedicure-kart /kart-pedicure 301
/prices/eyelash-eyebrows /eyelash-eyebrows 301
/prices/eyelash-extensions /eyelash-eyebrows 301
/prices/lash-lift /lash-lift 301
/prices/medical-pedicure / 301
/procedure/file-polish /hands-treatment 301
/procedure/classic-manicure /hands-treatment 301
/procedure/ibx-classic-manicure /hands-treatment 301
/procedure/gel-manicure-with-app /hands-treatment 301
/procedure/gel-manicure-without /hands-treatment 301
/procedure/gel-removal-classic-pedicure-nonew /feet-treatment 301
/procedure/classic-pedicure /feet-treatment 301
/procedure/gel-pedicure /feet-treatment 301
/procedure/luxury-pedicure /feet-treatment 301
/procedure/luxury-pedicure-with-colour /feet-treatment 301
/procedure/classic-manicure-pedicure /hands-feet-packages 301
/procedure/gel-manicure-classic-pedicure /hands-feet-packages 301
/procedure/classic-manicure-gel-pedicure /hands-feet-packages 301
/procedure/gel-manicure-gel-pedicure /hands-feet-packages 301
/procedure/male-manicure-pedicure /hands-feet-packages 301
/procedure/kart-pedicure /kart-pedicure 301
/procedure/kart-pedicure-colour /kart-pedicure 301
/procedure/callus-peel /kart-pedicure 301
/procedure/male-classic-pedicure /kart-pedicure 301
/procedure/eyebrow-shape /eyelash-eyebrows 301
/procedure/eyebrow-tint /eyelash-eyebrows 301
/procedure/eyebrow-shape-tint /eyelash-eyebrows 301
/procedure/eyelash-tint /eyelash-eyebrows 301
/procedure/eyelash-eyebrow-tint /eyelash-eyebrows 301
/procedure/eyelash-extension-individual /eyelash-eyebrows 301
/procedure/eyelash-extension-top-up /eyelash-eyebrows 301
/procedure/lvl-enhance-lash-lift /lash-lift 301
/procedure/lvl-enhance-lashlift-eyebrow /lash-lift 301
/procedure/lvl-enhance-eyebrows /lash-lift 301
/procedure/initial-consultation-routine-treatment / 301
/procedure/diabetic-foot-assessment / 301
/procedure/ingrowing-nail-post-surgery-assessment / 301
/procedure/cut-toenails-after-consultation / 301
/procedure/verruca-treatment-per-session / 301
`);

console.log(`Generated Richmond homepage and ${categories.length} treatment pages.`);
