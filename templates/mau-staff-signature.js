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
        decoration: "#e5edf5"
    }),
    typography: Object.freeze({
        family: "Arial, Helvetica, sans-serif",
        institution: Object.freeze({ weight: 700, size: 42, maxWidth: 760 }),
        descriptor: Object.freeze({ weight: 700, size: 17, letterSpacing: 3 }),
        position: Object.freeze({ weight: 700, size: 34, minSize: 25, lineHeight: 43, maxLines: 2, maxWidth: 760 }),
        contact: Object.freeze({ weight: 400, size: 24, minSize: 18, maxWidth: 760 }),
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
        signatureDescriptor: "OFFICIAL STAFF SIGNATURE",
        photoPlaceholder: "Staff photo"
    }),
    layout: Object.freeze({
        photoPanel: Object.freeze({ x: 0, y: 0, width: 410, height: 600 }),
        photo: Object.freeze({ x: 68, y: 142, width: 274, height: 322, radius: 14, borderWidth: 5 }),
        content: Object.freeze({ x: 480, right: 1240 }),
        header: Object.freeze({ descriptorY: 105, institutionY: 156, ruleY: 186, ruleWidth: 760, ruleHeight: 5 }),
        position: Object.freeze({ y: 260 }),
        contacts: Object.freeze({ firstY: 382, lineHeight: 42 }),
        footer: Object.freeze({ y: 510, height: 90, websiteX: 480, baselineY: 565, mottoRight: 1518 }),
        logo: Object.freeze({ x: 1310, y: 66, width: 210, height: 96, fallbackRuleInset: 28, fallbackRuleY: 70, fallbackRuleHeight: 4 }),
        decorations: Object.freeze({
            sideGoldBar: Object.freeze({ x: 0, y: 0, width: 18, height: 600 }),
            contentGoldBar: Object.freeze({ x: 410, y: 94, width: 8, height: 318 }),
            topShape: Object.freeze({ x: 1180, y: 0, width: 420, height: 22 }),
            paleBlock: Object.freeze({ x: 1450, y: 196, width: 150, height: 120 }),
            paleLine: Object.freeze({ x: 1320, y: 350, width: 210, height: 3 })
        })
    })
});
