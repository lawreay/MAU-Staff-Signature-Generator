"use strict";

function loadImage(source) {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = source;
    });
}

function roundedRect(context, x, y, width, height, radius) {
    const safeRadius = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + safeRadius, y);
    context.arcTo(x + width, y, x + width, y + height, safeRadius);
    context.arcTo(x + width, y + height, x, y + height, safeRadius);
    context.arcTo(x, y + height, x, y, safeRadius);
    context.arcTo(x, y, x + width, y, safeRadius);
    context.closePath();
}

function drawCoverImage(context, image, frame) {
    const scale = Math.max(frame.width / image.naturalWidth, frame.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    context.drawImage(image, frame.x + (frame.width - width) / 2, frame.y + (frame.height - height) / 2, width, height);
}

function drawPhoto(context, image, layout, colors) {
    const frame = layout.photo;
    context.save();
    roundedRect(context, frame.x, frame.y, frame.width, frame.height, frame.radius);
    context.clip();
    context.fillStyle = colors.placeholder;
    context.fillRect(frame.x, frame.y, frame.width, frame.height);

    if (image) {
        drawCoverImage(context, image, frame);
    } else {
        context.fillStyle = colors.muted;
        context.font = "600 18px Arial, Helvetica, sans-serif";
        context.textAlign = "center";
        context.fillText("Staff photo", frame.x + frame.width / 2, frame.y + frame.height / 2);
    }
    context.restore();
}

function drawLogo(context, image, template) {
    const { colors, layout } = template;
    const frame = layout.logo;
    if (image) {
        const ratio = Math.min(frame.width / image.naturalWidth, frame.height / image.naturalHeight);
        const width = image.naturalWidth * ratio;
        const height = image.naturalHeight * ratio;
        context.drawImage(image, frame.x + (frame.width - width) / 2, frame.y + (frame.height - height) / 2, width, height);
        return;
    }

    context.fillStyle = colors.navy;
    context.font = "700 27px Arial, Helvetica, sans-serif";
    context.textAlign = "center";
    context.fillText("MAU", frame.x + frame.width / 2, frame.y + 43);
    context.fillStyle = colors.gold;
    context.fillRect(frame.x + 20, frame.y + 55, frame.width - 40, 3);
}

export function createSignatureRenderer(canvas, template) {
    const context = canvas.getContext("2d");
    const { canvas: dimensions, branding, colors, layout, typography } = template;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // A missing official logo is expected during setup; rendering continues with a text fallback.
    const logoPromise = loadImage(new URL(branding.logoPath, window.location.href).href);

    async function render(state) {
        const logo = await logoPromise;
        context.clearRect(0, 0, dimensions.width, dimensions.height);
        context.fillStyle = colors.white;
        context.fillRect(0, 0, dimensions.width, dimensions.height);

        context.fillStyle = colors.navy;
        context.fillRect(0, 0, dimensions.width, 18);
        context.fillStyle = colors.gold;
        context.fillRect(0, layout.topRuleY, dimensions.width, 5);
        drawPhoto(context, state.photoImage, layout, colors);

        context.strokeStyle = colors.gold;
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(layout.dividerX, 65);
        context.lineTo(layout.dividerX, 300);
        context.stroke();

        context.textAlign = "left";
        context.fillStyle = colors.navy;
        context.font = `700 ${typography.institutionSize}px ${typography.family}`;
        context.fillText(branding.institutionName, layout.contentX, layout.institutionY);
        context.fillStyle = colors.blue;
        context.font = `600 ${typography.positionSize}px ${typography.family}`;
        context.fillText(state.position || "Position", layout.contentX, layout.positionY);
        context.fillStyle = colors.ink;
        context.font = `${typography.contactSize}px ${typography.family}`;
        context.fillText(`T: ${state.phoneOne || "Phone number"}`, layout.contentX, layout.contactsY);
        if (state.phoneTwo) {
            context.fillText(`T: ${state.phoneTwo}`, layout.contentX, layout.contactsY + 33);
        }
        context.fillText(`E: ${state.email || "Email address"}`, layout.contentX, layout.contactsY + 66);

        context.fillStyle = colors.navy;
        context.fillRect(0, 330, dimensions.width, 90);
        context.fillStyle = colors.white;
        context.font = `${typography.smallSize}px ${typography.family}`;
        context.fillText(branding.website, layout.padding, layout.footerY);
        context.textAlign = "right";
        context.fillText(branding.motto, dimensions.width - layout.padding, layout.footerY);
        drawLogo(context, logo, template);
    }

    function download(filename = "mau-staff-signature.png") {
        const link = document.createElement("a");
        link.download = filename;
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    return Object.freeze({ render, download });
}
