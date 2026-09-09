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

function fontValue(style, family, size = style.size) {
    return `${style.weight} ${size}px ${family}`;
}

function drawLetterSpacedText(context, text, x, y, spacing) {
    let cursor = x;
    for (const character of text) {
        context.fillText(character, cursor, y);
        cursor += context.measureText(character).width + spacing;
    }
}

function drawCoverImage(context, image, frame) {
    const scale = Math.max(frame.width / image.naturalWidth, frame.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    context.drawImage(image, frame.x + (frame.width - width) / 2, frame.y + (frame.height - height) / 2, width, height);
}

function truncateToWidth(context, text, maxWidth) {
    if (context.measureText(text).width <= maxWidth) {
        return text;
    }

    const suffix = "…";
    let shortened = text;
    while (shortened && context.measureText(`${shortened}${suffix}`).width > maxWidth) {
        shortened = shortened.slice(0, -1);
    }
    return `${shortened}${suffix}`;
}

function drawFittedLine(context, text, x, y, style, family, color, maxWidth) {
    let size = style.size;
    while (size > style.minSize) {
        context.font = fontValue(style, family, size);
        if (context.measureText(text).width <= maxWidth) {
            break;
        }
        size -= 1;
    }
    context.font = fontValue(style, family, size);
    context.fillStyle = color;
    context.fillText(truncateToWidth(context, text, maxWidth), x, y);
}

function wrapText(context, text, maxWidth, maxLines) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";

    for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        if (context.measureText(candidate).width <= maxWidth) {
            line = candidate;
            continue;
        }
        if (line) {
            lines.push(line);
        }
        line = truncateToWidth(context, word, maxWidth);
    }
    if (line) {
        lines.push(line);
    }

    if (lines.length <= maxLines) {
        return lines;
    }
    const visibleLines = lines.slice(0, maxLines);
    visibleLines[maxLines - 1] = truncateToWidth(context, `${visibleLines[maxLines - 1]}…`, maxWidth);
    return visibleLines;
}

function drawPhoto(context, image, template) {
    const { colors, layout, typography, branding } = template;
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
        context.font = fontValue(typography.photoPlaceholder, typography.family);
        context.textAlign = "center";
        context.fillText(branding.photoPlaceholder, frame.x + frame.width / 2, frame.y + frame.height / 2);
    }
    context.restore();

    context.save();
    roundedRect(context, frame.x, frame.y, frame.width, frame.height, frame.radius);
    context.lineWidth = frame.borderWidth;
    context.strokeStyle = colors.white;
    context.stroke();
    context.restore();
}

function drawLogo(context, image, template) {
    const { colors, layout, typography, branding } = template;
    const frame = layout.logo;
    if (image) {
        const ratio = Math.min(frame.width / image.naturalWidth, frame.height / image.naturalHeight);
        const width = image.naturalWidth * ratio;
        const height = image.naturalHeight * ratio;
        context.drawImage(image, frame.x + (frame.width - width) / 2, frame.y + (frame.height - height) / 2, width, height);
        return;
    }

    context.textAlign = "center";
    context.fillStyle = colors.navy;
    context.font = fontValue(typography.fallback, typography.family);
    context.fillText(branding.logoFallback, frame.x + frame.width / 2, frame.y + frame.height / 2 - 7);
    context.fillStyle = colors.gold;
    context.fillRect(frame.x + frame.fallbackRuleInset, frame.y + frame.fallbackRuleY, frame.width - frame.fallbackRuleInset * 2, frame.fallbackRuleHeight);
}

function drawDecorations(context, template) {
    const { colors, layout } = template;
    const decoration = layout.decorations;
    context.fillStyle = colors.navy;
    context.fillRect(layout.photoPanel.x, layout.photoPanel.y, layout.photoPanel.width, layout.photoPanel.height);
    context.fillStyle = colors.gold;
    context.fillRect(decoration.sideGoldBar.x, decoration.sideGoldBar.y, decoration.sideGoldBar.width, decoration.sideGoldBar.height);
    context.fillRect(decoration.contentGoldBar.x, decoration.contentGoldBar.y, decoration.contentGoldBar.width, decoration.contentGoldBar.height);
    context.fillRect(decoration.topShape.x, decoration.topShape.y, decoration.topShape.width, decoration.topShape.height);
    context.fillStyle = colors.decoration;
    context.fillRect(decoration.paleBlock.x, decoration.paleBlock.y, decoration.paleBlock.width, decoration.paleBlock.height);
    context.fillRect(decoration.paleLine.x, decoration.paleLine.y, decoration.paleLine.width, decoration.paleLine.height);
}

export function createSignatureRenderer(canvas, template) {
    const context = canvas.getContext("2d");
    const { canvas: dimensions, branding, colors, layout, typography } = template;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    // The official logo is optional during setup; a missing asset deliberately resolves to a safe fallback.
    const logoPromise = loadImage(new URL(branding.logoPath, window.location.href).href);
    let renderVersion = 0;

    async function render(state) {
        const version = ++renderVersion;
        const logo = await logoPromise;
        if (version !== renderVersion) {
            return;
        }

        context.clearRect(0, 0, dimensions.width, dimensions.height);
        context.fillStyle = colors.background;
        context.fillRect(0, 0, dimensions.width, dimensions.height);
        drawDecorations(context, template);
        drawPhoto(context, state.photoImage, template);
        drawLogo(context, logo, template);

        context.textAlign = "left";
        context.fillStyle = colors.blue;
        context.font = fontValue(typography.descriptor, typography.family);
        drawLetterSpacedText(context, branding.signatureDescriptor, layout.content.x, layout.header.descriptorY, typography.descriptor.letterSpacing);

        context.fillStyle = colors.navy;
        context.font = fontValue(typography.institution, typography.family);
        context.fillText(branding.institutionName, layout.content.x, layout.header.institutionY);
        context.fillStyle = colors.gold;
        context.fillRect(layout.content.x, layout.header.ruleY, layout.header.ruleWidth, layout.header.ruleHeight);

        context.fillStyle = colors.navy;
        context.font = fontValue(typography.position, typography.family);
        const positionLines = wrapText(context, state.position || "Position", typography.position.maxWidth, typography.position.maxLines);
        positionLines.forEach((line, index) => {
            context.fillText(line, layout.content.x, layout.position.y + index * typography.position.lineHeight);
        });

        const contactMaxWidth = Math.min(typography.contact.maxWidth, layout.content.right - layout.content.x);
        let contactY = layout.contacts.firstY;
        drawFittedLine(context, `T: ${state.phoneOne || "Phone number"}`, layout.content.x, contactY, typography.contact, typography.family, colors.ink, contactMaxWidth);
        if (state.phoneTwo) {
            contactY += layout.contacts.lineHeight;
            drawFittedLine(context, `T: ${state.phoneTwo}`, layout.content.x, contactY, typography.contact, typography.family, colors.ink, contactMaxWidth);
        }
        contactY += layout.contacts.lineHeight;
        drawFittedLine(context, `E: ${state.email || "Email address"}`, layout.content.x, contactY, typography.contact, typography.family, colors.ink, contactMaxWidth);

        context.fillStyle = colors.navy;
        context.fillRect(0, layout.footer.y, dimensions.width, layout.footer.height);
        context.fillStyle = colors.white;
        context.font = fontValue(typography.footer, typography.family);
        context.textAlign = "left";
        context.fillText(branding.website, layout.footer.websiteX, layout.footer.baselineY);
        context.textAlign = "right";
        context.fillText(branding.motto, layout.footer.mottoRight, layout.footer.baselineY);
    }

    function download(filename) {
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("The signature image could not be prepared for download."));
                    return;
                }
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.setTimeout(() => URL.revokeObjectURL(url), 0);
                resolve();
            }, "image/png");
        });
    }

    return Object.freeze({ render, download });
}
