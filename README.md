# MAU Staff Signature Generator

A small web application for Malawi Adventist University staff to create an official signature graphic from their contact details and a locally selected photograph.

## Architecture

The application uses plain PHP only as a shared-hosting-compatible entry point. Its interface is semantic HTML and CSS; JavaScript ES modules provide the browser-side behavior.

- `index.php` contains the accessible generator interface.
- `assets/js/app.js` owns form state, validation, locally selected photos, reset behavior, and renderer coordination.
- `assets/js/canvas.js` owns HTML5 Canvas drawing and PNG download preparation.
- `templates/mau-staff-signature.js` holds the editable dimensions, colours, typography, branding, and layout configuration.
- `assets/images/mau-logo.png` is the future location for the official approved logo. It is intentionally not included yet; the canvas uses a safe text fallback when the file is absent.

There is no database, upload endpoint, or server-side image processing. A selected staff photograph is read from the user's device with browser APIs and rendered directly onto the canvas. This keeps personal images off the hosting server and makes the project suitable for ordinary PHP shared hosting.

## Current status — Phase 2

The application now produces the MAU staff signature as a fixed **1600 × 600 pixel** Canvas graphic. The preview is the same canvas used for export: it scales visually to fit the page but the downloaded PNG keeps its full dimensions.

The institutional layout has a navy photo panel, gold accents, controlled university branding, a logo area, staff position and contact details, plus a footer containing the MAU website and motto: `Knowledge | Truth | Service`. Only the photograph, position, phone numbers, and email address are supplied by the staff member.

Photographs are processed only in the browser using an object URL and automatically cover-cropped inside a rounded frame; no file is posted to PHP or stored on the server. The renderer uses the browser's native `canvas.toBlob()` API to create the PNG download. The filename is safely derived from the entered position where possible, for example `mau-it-officer-signature.png`.

All institutional visual settings, including dimensions, colours, typography, spacing, decorative elements, branding copy, and logo placement, remain in `templates/mau-staff-signature.js`.

## Current limitations

- The approved `assets/images/mau-logo.png` file has not yet been supplied. The renderer displays a safe `MAU` text fallback and continues to work when the image is missing.
- Photo cropping is automatic cover-cropping only. There are no manual crop, zoom, or positioning controls.
- This release provides one fixed MAU template only.

## Run locally

Use any PHP-capable local web server from the project root. For example, with PHP installed:

```sh
php -S localhost:8000
```

Then open `http://localhost:8000`. The application also works when deployed to a standard PHP shared-hosting directory. No Composer, Node.js, database, or build step is required.

## Planned next steps

1. Add the approved `assets/images/mau-logo.png` asset and verify its placement against MAU brand guidance.
2. Review generated PNGs in the intended email clients.
3. Consider manual photo crop controls in a later phase if they are required.
