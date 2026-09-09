"use strict";

import { createSignatureRenderer } from "./canvas.js";
import { mauStaffSignatureTemplate } from "../../templates/mau-staff-signature.js";

const form = document.querySelector("#signature-form");
const canvas = document.querySelector("#signature-canvas");
const photoInput = document.querySelector("#staff-photo");
const downloadButton = document.querySelector("#download-button");
const statusMessage = document.querySelector("#form-status");
const requiredInputs = [
    photoInput,
    document.querySelector("#position"),
    document.querySelector("#phone-one"),
    document.querySelector("#email")
];

const renderer = createSignatureRenderer(canvas, mauStaffSignatureTemplate);
let photoImage = null;
let photoObjectUrl = null;
let photoVersion = 0;

function formState() {
    return {
        photoImage,
        position: document.querySelector("#position").value.trim(),
        phoneOne: document.querySelector("#phone-one").value.trim(),
        phoneTwo: document.querySelector("#phone-two").value.trim(),
        email: document.querySelector("#email").value.trim()
    };
}

function setStatus(message = "") {
    statusMessage.textContent = message;
    statusMessage.hidden = !message;
}

function showFieldValidation(input) {
    if (input.validity.valid) {
        input.removeAttribute("aria-invalid");
        return true;
    }

    input.setAttribute("aria-invalid", "true");
    const label = document.querySelector(`label[for="${input.id}"]`).textContent.replace(/\s*\*.*/, "").trim();
    setStatus(`${label}: ${input.validationMessage}`);
    return false;
}

function isReadyToDownload() {
    return requiredInputs.every((input) => input.validity.valid) && Boolean(photoImage);
}

async function updatePreview() {
    await renderer.render(formState());
    downloadButton.disabled = !isReadyToDownload();
}

async function loadPhoto(file) {
    const version = ++photoVersion;
    if (photoObjectUrl) {
        URL.revokeObjectURL(photoObjectUrl);
        photoObjectUrl = null;
    }
    photoImage = null;

    if (!file) {
        await updatePreview();
        return;
    }
    if (!file.type.startsWith("image/")) {
        photoInput.value = "";
        setStatus("Please choose a valid image file for the staff photo.");
        await updatePreview();
        return;
    }

    photoObjectUrl = URL.createObjectURL(file);
    const selectedObjectUrl = photoObjectUrl;
    const image = new Image();
    image.onload = async () => {
        if (version !== photoVersion) {
            URL.revokeObjectURL(selectedObjectUrl);
            return;
        }
        photoImage = image;
        setStatus("");
        await updatePreview();
    };
    image.onerror = async () => {
        if (version !== photoVersion) {
            URL.revokeObjectURL(selectedObjectUrl);
            return;
        }
        URL.revokeObjectURL(selectedObjectUrl);
        photoObjectUrl = null;
        photoInput.value = "";
        setStatus("The selected image could not be read. Please choose another file.");
        await updatePreview();
    };
    image.src = photoObjectUrl;
}

photoInput.addEventListener("change", () => loadPhoto(photoInput.files[0]));

form.addEventListener("input", () => {
    setStatus("");
    updatePreview();
});

requiredInputs.forEach((input) => {
    input.addEventListener("blur", () => showFieldValidation(input));
    input.addEventListener("input", () => {
        if (input.validity.valid) {
            input.removeAttribute("aria-invalid");
        }
    });
});

form.addEventListener("reset", () => {
    window.setTimeout(async () => {
        photoVersion += 1;
        if (photoObjectUrl) {
            URL.revokeObjectURL(photoObjectUrl);
            photoObjectUrl = null;
        }
        photoImage = null;
        setStatus("");
        await updatePreview();
    }, 0);
});

downloadButton.addEventListener("click", () => {
    if (!isReadyToDownload()) {
        setStatus("Add a staff photo and complete all required fields before downloading.");
        requiredInputs.forEach(showFieldValidation);
        return;
    }
    requiredInputs.forEach((input) => input.removeAttribute("aria-invalid"));
    const safePosition = document.querySelector("#position").value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 64);
    const filename = safePosition ? `mau-${safePosition}-signature.png` : "mau-staff-signature.png";
    renderer.download(filename).catch(() => {
        setStatus("The signature could not be downloaded. Please try again.");
    });
});

updatePreview();
