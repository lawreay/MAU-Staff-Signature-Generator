"use strict";

export const mauStaffSignatureTemplate = Object.freeze({
    canvas: Object.freeze({ width: 1600, height: 600 }),
    colors: Object.freeze({
        navy: "#082b58",
        blue: "#174d86",
        gold: "#c89b3c",
        ink: "#1d2939",
        muted: "#667085",
        white: "#ffffff",
        background: "#f7f9fc",
        placeholder: "#dce5ef",
        decoration: "#dbe7f1"
    }),
    typography: Object.freeze({
        family: "Arial, Helvetica, sans-serif",
        institution: Object.freeze({ weight: 700, size: 44, maxWidth: 660 }),
        position: Object.freeze({ weight: 700, size: 35, minSize: 25, lineHeight: 43, maxLines: 2, maxWidth: 660 }),
        contact: Object.freeze({ weight: 400, size: 24, minSize: 18, maxWidth: 660 }),
        contactMarker: Object.freeze({ weight: 700, size: 15 }),
        footer: Object.freeze({ weight: 400, size: 19 }),
        fallback: Object.freeze({ weight: 700, size: 34 }),
        photoPlaceholder: Object.freeze({ weight: 700, size: 18 })
    }),
    branding: Object.freeze({
        institutionName: "Malawi Adventist University",
        motto: "Knowledge | Truth | Service",
        website: "www.mau.ac.mw",
        logoPath: "assets/images/mau-logo.png",
        logoFallback: "MAU",
        photoPlaceholder: "Staff photo",
        telephoneMarker: "T",
        emailMarker: "E"
    }),
    layout: Object.freeze({
        photoPanel: Object.freeze({ x: 0, y: 0, width: 440, height: 600 }),
        photo: Object.freeze({ x: 62, y: 120, width: 316, height: 348, radius: 16, borderWidth: 5 }),
        content: Object.freeze({ x: 500, right: 1180 }),
        header: Object.freeze({ institutionY: 146, ruleY: 177, ruleWidth: 660, ruleHeight: 5 }),
        position: Object.freeze({ y: 251 }),
        contacts: Object.freeze({
            firstY: 362,
            lineHeight: 52,
            marker: Object.freeze({ x: 500, size: 30, baselineOffset: 10, textBaselineOffset: 5, textX: 550 })
        }),
        footer: Object.freeze({ y: 516, height: 84, websiteX: 500, baselineY: 568, mottoRight: 1518 }),
        logo: Object.freeze({ x: 1230, y: 52, width: 290, height: 150, fallbackRuleInset: 36, fallbackRuleY: 100, fallbackRuleHeight: 4 }),
        decorations: Object.freeze({
            sideGoldBar: Object.freeze({ x: 0, y: 0, width: 14, height: 600 }),
            contentGoldBar: Object.freeze({ x: 440, y: 104, width: 5, height: 364 }),
            logoAccent: Object.freeze({ x: 1204, y: 67, width: 5, height: 116 }),
            ornament: Object.freeze({ x: 1260, y: 246, width: 220, height: 190, inset: 28, lineWidth: 3, startAngle: 3.8, endAngle: 6.35 })
        })
    })
});
