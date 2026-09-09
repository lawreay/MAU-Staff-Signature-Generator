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

## Current status

The foundation is complete: responsive form and preview layout, client-side photo selection, validation, a configurable canvas rendering path, reset handling, and client-side PNG download are in place. The rendered signature is an initial configurable layout, not a final approved MAU brand design.

## Run locally

Use any PHP-capable local web server from the project root. For example, with PHP installed:

```sh
php -S localhost:8000
```

Then open `http://localhost:8000`. The application also works when deployed to a standard PHP shared-hosting directory. No Composer, Node.js, database, or build step is required.

## Planned next steps

1. Add the approved `assets/images/mau-logo.png` asset.
2. Confirm MAU's final signature specification, including the approved motto, website presentation, fonts, dimensions, and contact labels.
3. Refine the canvas template against that approved design and test output in target email clients.
