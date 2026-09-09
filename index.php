<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Create an official Malawi Adventist University staff signature graphic.">
    <title>MAU Staff Signature Generator</title>
    <link rel="stylesheet" href="assets/css/app.css">
</head>
<body>
    <main class="page-shell">
        <header class="site-header">
            <p class="eyebrow">Malawi Adventist University</p>
            <h1>Staff Signature Generator</h1>
            <p class="intro">Create your official staff signature graphic. Your photograph is processed only in your browser and is never uploaded.</p>
        </header>

        <section class="generator" aria-label="Staff signature generator">
            <form id="signature-form" class="generator-form" novalidate>
                <div class="section-heading">
                    <p class="eyebrow">Staff details</p>
                    <h2>Build your signature</h2>
                </div>

                <div id="form-status" class="form-status" role="alert" aria-live="polite" hidden></div>

                <div class="field-group">
                    <label for="staff-photo">Staff photo <span aria-hidden="true">*</span></label>
                    <input id="staff-photo" name="staff-photo" type="file" accept="image/*" required aria-describedby="photo-help">
                    <p id="photo-help" class="field-help">Choose an image file. It stays on this device and is processed locally in your browser.</p>
                </div>

                <div class="field-group">
                    <label for="position">Position <span aria-hidden="true">*</span></label>
                    <input id="position" name="position" type="text" autocomplete="organization-title" required>
                </div>

                <div class="field-group">
                    <label for="phone-one">Phone number 1 <span aria-hidden="true">*</span></label>
                    <input id="phone-one" name="phone-one" type="tel" autocomplete="tel" required>
                </div>

                <div class="field-group">
                    <label for="phone-two">Phone number 2 <span class="optional">(optional)</span></label>
                    <input id="phone-two" name="phone-two" type="tel">
                </div>

                <div class="field-group">
                    <label for="email">Email address <span aria-hidden="true">*</span></label>
                    <input id="email" name="email" type="email" autocomplete="email" required>
                </div>

                <div class="form-actions">
                    <button id="download-button" class="button button-primary" type="button" disabled>Download PNG</button>
                    <button id="reset-button" class="button button-secondary" type="reset">Reset</button>
                </div>
            </form>

            <section class="preview-panel" aria-labelledby="preview-title">
                <div class="section-heading">
                    <p class="eyebrow">Live preview</p>
                    <h2 id="preview-title">Signature preview</h2>
                </div>
                <div class="canvas-frame">
                    <canvas id="signature-canvas" width="1600" height="600" aria-label="Staff signature preview">
                        Your browser does not support the canvas element required to preview the signature.
                    </canvas>
                </div>
                <p class="preview-note">The preview is the exact 1600 × 600 PNG that will be downloaded, scaled here to fit your screen.</p>
            </section>
        </section>
    </main>

    <script type="module" src="assets/js/app.js"></script>
</body>
</html>
