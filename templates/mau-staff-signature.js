"use strict";

export const mauStaffSignatureTemplate = Object.freeze({
    canvas: Object.freeze({ width: 1200, height: 420 }),
    colors: Object.freeze({
        navy: "#082b58",
        blue: "#174d86",
        gold: "#c89b3c",
        ink: "#1d2939",
        muted: "#667085",
        white: "#ffffff",
        placeholder: "#e9eff5"
    }),
    typography: Object.freeze({
        family: "Arial, Helvetica, sans-serif",
        institutionSize: 31,
        positionSize: 24,
        contactSize: 20,
        smallSize: 16
    }),
    branding: Object.freeze({
        institutionName: "Malawi Adventist University",
        motto: "Motto to be confirmed",
        website: "www.mau.ac.mw",
        logoPath: "assets/images/mau-logo.png"
    }),
    layout: Object.freeze({
        padding: 48,
        photo: Object.freeze({ x: 48, y: 64, width: 236, height: 236, radius: 8 }),
        dividerX: 330,
        contentX: 380,
        topRuleY: 45,
        institutionY: 108,
        positionY: 153,
        contactsY: 218,
        footerY: 365,
        logo: Object.freeze({ x: 1000, y: 62, width: 150, height: 90 })
    })
});
