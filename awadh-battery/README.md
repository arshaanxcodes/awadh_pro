# Awadh Battery & Electronics Centre — Website

A one-page, animated marketing site for **Awadh Battery & Electronics Centre**
(Vijay Khand, Ujariyaon, Gomti Nagar, Lucknow), built as plain HTML/CSS/JS so
it can be hosted for free on GitHub Pages — no build step required.

## What's inside
```
index.html      – all page content and structure
css/style.css   – design tokens, layout, responsive rules, animation states
js/script.js    – scroll reveals, count-up stats, battery scroll-meter, nav
README.md       – this file
```

Motion is powered by [GSAP](https://gsap.com) + ScrollTrigger, loaded from a
CDN (no npm install needed). The signature visual is the amber bar fixed at
the top of the screen, styled like a battery — it fills up as you scroll
down the page.

## Before you publish — please review and update
- **Phone number**: currently set to `080 6548 6292` in the Call and
  WhatsApp buttons (`tel:` and `wa.me` links in `index.html`). Double-check
  the WhatsApp link uses the correct country code.
- **Hours**: the site says "closes 9:00 PM" — confirm opening time and any
  weekly closing day.
- **Reviews**: the testimonial cards are lightly paraphrased from public
  Google reviews. Swap in exact wording only with each reviewer's OK, or
  keep them as-is/paraphrased.
- **Map embed**: uses a name/address search, not a saved Place ID — it
  should resolve correctly, but it's worth opening `#location` once live to
  confirm the pin lands on the right building.

## Publish to GitHub Pages
1. Create a new GitHub repository (e.g. `awadh-battery-site`).
2. Upload all files in this folder, **keeping the `css/` and `js/`
   subfolders intact**.
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Pick the `main` branch and `/ (root)` folder, then **Save**.
6. GitHub gives you a URL like:
   `https://<your-username>.github.io/awadh-battery-site/`
   It can take 1–2 minutes to go live.

### Using a custom domain (optional)
If you'd like the site to appear at `awadhbattery.in` instead of the
`github.io` address:
1. In **Settings → Pages → Custom domain**, enter `awadhbattery.in`.
2. At your domain registrar, add the DNS records GitHub's docs specify for
   an apex domain (A records to GitHub's IPs, or a `CNAME` if using a
   subdomain like `www`).
3. Tick **Enforce HTTPS** once the certificate is issued.

## Local preview
Just open `index.html` in a browser — everything runs client-side. For a
closer-to-production preview (so relative paths behave exactly like on
GitHub Pages), you can also run a tiny local server from this folder:
```
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## Accessibility & performance notes
- Respects `prefers-reduced-motion` throughout (animations shortcut to
  instant states).
- All icons are inline SVG (no emoji-as-icon), decorative ones marked
  `aria-hidden`.
- Touch targets (buttons, links) are ≥44×44px.
- Layout is tested down to 375px width; no horizontal scroll at any
  breakpoint.
- Fonts load from Google Fonts; GSAP loads from cdnjs — both are the only
  external requests the page makes besides the Google Maps embed.
