# DitherTone · Photopea Plugin

**A sleek, tri‑tone‑capable, 30‑algorithm dithering powerhouse for your Photopea workflow.**

## Deploy

1. Fork / download this folder.
2. Push to a Vercel project (`vercel --prod`).
3. Open https://photopea.com → More → Plugins → Manage
   and paste the URL to **plugins.json**:
   ```
   https://your-vercel-domain.vercel.app/plugins.json
   ```
4. Enjoy the new **DitherTone** button in Photopea's right sidebar.

## Development

All UI is vanilla JS. If you change `dithertone_filter.json`, reload the plugin pane
(Photopea caches aggressively).