/*
 * La liasse de billets en trois dimensions.
 *
 * Reprise du modèle posé sur `~/Desktop/money` (#038) : rien n'y a été
 * redessiné. Les cotes sont celles d'un vrai billet — 156 × 66,3 mm, papier
 * de 0,109 mm — et l'unité de scène est la hauteur du billet.
 *
 * Il n'y a aucun fichier de modèle à charger : les deux faces du billet sont
 * dessinées en `<canvas>` au montage, la lumière d'environnement aussi. Le
 * seul poids est celui de three.js.
 *
 * Ce qui a changé en entrant dans le site :
 *   — l'IIFE et son `window.MoneyStack3D` ont laissé la place à un module,
 *     et three.js est importé au lieu d'être attendu sur `window` ;
 *   — quatre réglages s'ajoutent — `interaction`, `noteTexture`,
 *     `shadowMapSize`, `onReady` : voir DEFAULTS ;
 *   — les billets sont composés dans la serif du site, et non dans la Bodoni
 *     Moda du modèle, qui venait de Google Fonts.
 *
 * Le fichier reste en JavaScript, tel qu'il a été écrit : mille lignes d'ES5
 * ne gagneraient rien à être retypées une à une. Ses types sont déclarés à
 * côté, dans `liasse3d.d.ts`.
 */

import * as THREE from 'three';


var NOTE_RATIO = 156 / 66.3;        // 2.3529 — longueur / hauteur
var PAPER_T    = 0.109 / 66.3;      // 0.001644 — epaisseur d'un billet

var DEFAULTS = {
  bills: 92,                 // 92 billets ~= une liasse de 10 000 $
  thickness: PAPER_T * 1.06, // + un souffle d'air entre les feuilles
  strap: true,               // banderole papier
  denomination: '100',
  issuer: 'RESERVE NOTE',
  spelled: 'ONE HUNDRED DOLLARS',
  series: 'SERIES 2026',
  serial: 'K 42 917 663 A',
  ink: '#1e5636',
  paper: '#c8d6b6',
  strapColor: '#d8bd52',
  autoRotate: true,
  autoRotateSpeed: 0.17,     // rad/s
  idleDelay: 2800,           // ms avant reprise de la rotation auto
  distance: 6.0,
  exposure: 1.02,
  shadow: true,              // ombres portees (la banderole sur le billet)
  groundShadow: true,        // + l'ombre au sol sous la liasse
  maxPixelRatio: 2,
  seed: 7,
  onFrame: null,             // callback(quaternion) — pour un affichage externe

  /* Les quatre réglages ajoutés par le site (#038). */
  interaction: true,         // false : ni glisser, ni molette, ni clavier
  noteTexture: 2048,         // largeur du canvas de la face imprimée, en px
  shadowMapSize: 2048,       // côté de la carte d'ombre, en px
  onReady: null              // callback() — à la première image peinte
};

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

/* La serif des billets.
 *
 * Le modèle composait en Bodoni Moda, chargée depuis Google Fonts ; le site
 * n'appelle personne et embarque ses trois polices (§ 5). C'est donc la sienne
 * qui imprime les billets — Playfair, celle du titre du hero, dont le nom de
 * famille est engendré au build et n'est connu que de la variable CSS.
 *
 * Hors navigateur — ou si la variable manque — la pile de secours du modèle
 * reprend la main. `ctx.font` n'accepte pas de `var()` : il faut la valeur. */
function serifDuSite() {
  var repli = 'Didot, Georgia, "Times New Roman", serif';
  if (typeof document === 'undefined') return repli;
  var v = getComputedStyle(document.documentElement)
    .getPropertyValue('--font-editorial').trim();
  return v ? v + ', ' + repli : repli;
}

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

// Texte avec interlettrage manuel (ctx.letterSpacing n'est pas universel).
function tracked(ctx, text, x, y, spacing, align) {
  var chars = String(text).split('');
  var i, w = 0;
  for (i = 0; i < chars.length; i++) w += ctx.measureText(chars[i]).width + spacing;
  w -= spacing;
  var cx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  var prevAlign = ctx.textAlign;
  ctx.textAlign = 'left';
  for (i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], cx, y);
    cx += ctx.measureText(chars[i]).width + spacing;
  }
  ctx.textAlign = prevAlign;
  return w;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Guillochis : hypotrochoide (le motif « spirographe » des billets gravés).
function guilloche(ctx, cx, cy, R, r, d, color, alpha, lw) {
  var g = gcd(Math.round(R), Math.round(r));
  var turns = Math.max(1, Math.round(r / g));
  var steps = Math.min(6000, turns * 170);
  var k = (R - r) / r;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  for (var i = 0; i <= steps; i++) {
    var t = Math.PI * 2 * turns * i / steps;
    var x = cx + (R - r) * Math.cos(t) + d * Math.cos(k * t);
    var y = cy + (R - r) * Math.sin(t) - d * Math.sin(k * t);
    if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function gcd(a, b) { while (b) { var t = b; b = a % b; a = t; } return a; }

// Bande « guillochee » rectiligne : sinusoides dephasees, comme un tour a guillocher.
function waveBand(ctx, x, y, w, h, lines, color, alpha, periods) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.9;
  for (var l = 0; l < lines; l++) {
    var phase = l / lines * Math.PI * 2;
    ctx.beginPath();
    for (var i = 0; i <= 260; i++) {
      var t = i / 260;
      var px = x + t * w;
      var py = y + h / 2 + Math.sin(t * Math.PI * 2 * periods + phase) * (h / 2 - 1) * (0.55 + 0.45 * Math.cos(phase));
      if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
    }
    ctx.stroke();
  }
  ctx.restore();
}

// Hachures gravees (ombrage de taille-douce) dans une zone detouree.
function engrave(ctx, x, y, w, h, step, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  for (var yy = y; yy < y + h; yy += step) {
    for (var i = 0; i <= 60; i++) {
      var t = i / 60;
      var px = x + t * w;
      var py = yy + Math.sin(t * Math.PI * 4 + yy * 0.05) * step * 0.22;
      if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
    }
  }
  ctx.stroke();
  ctx.restore();
}

// Paraphe manuscrit pseudo-aleatoire.
function signature(ctx, x, y, w, rnd, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.8;
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y);
  var n = 7, px = x;
  for (var i = 0; i < n; i++) {
    var seg = w / n;
    var c1x = px + seg * 0.3, c1y = y - 26 - rnd() * 34;
    var c2x = px + seg * 0.7, c2y = y + 14 + rnd() * 26;
    px += seg;
    ctx.bezierCurveTo(c1x, c1y, c2x, c2y, px, y - 4 + rnd() * 8);
  }
  ctx.stroke();
  ctx.restore();
}

/* ------------------------------------------------------------------ */
/* Textures : le billet est dessine au canvas, en « note-space »        */
/* (2048 x 870,4) puis etire verticalement sur un canvas POT.           */
/* ------------------------------------------------------------------ */

function noteCanvas(o, side, size) {
  var W = size, H = size / 2;                 // canvas puissance de deux
  var NW = size, NH = size / NOTE_RATIO;      // repere de dessin reel
  var c = document.createElement('canvas');
  c.width = W; c.height = H;
  var ctx = c.getContext('2d');
  ctx.save();
  ctx.scale(1, H / NH);                       // le maillage retablit le ratio

  var s = NW / 2048;                          // facteur d'echelle du dessin
  var rnd = mulberry32(o.seed + (side === 'back' ? 991 : 17));
  var ink = o.ink, paper = o.paper;
  var deep = '#153b26';
  var gold = '#8a6a1e';

  /* --- papier --------------------------------------------------- */
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, NW, NH);

  // marbrures : le papier n'est jamais d'un ton uniforme
  for (var i = 0; i < 90; i++) {
    var mx = rnd() * NW, my = rnd() * NH, mr = (60 + rnd() * 240) * s;
    var g = ctx.createRadialGradient(mx, my, 0, mx, my, mr);
    g.addColorStop(0, rnd() > 0.5 ? 'rgba(246,252,236,0.48)' : 'rgba(146,164,128,0.34)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(mx - mr, my - mr, mr * 2, mr * 2);
  }

  // lavis de securite (les tons chauds/froids des coupures modernes)
  var wash = ctx.createLinearGradient(NW * 0.25, 0, NW, NH);
  wash.addColorStop(0, 'rgba(164,190,146,0.22)');
  wash.addColorStop(0.55, 'rgba(198,208,158,0.15)');
  wash.addColorStop(1, 'rgba(132,174,148,0.22)');
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, NW, NH);

  // fibres rouges et bleues noyees dans la pate a papier
  for (var f = 0; f < 620; f++) {
    var fx = rnd() * NW, fy = rnd() * NH, fa = rnd() * Math.PI, fl = (6 + rnd() * 16) * s;
    ctx.strokeStyle = rnd() > 0.5 ? 'rgba(178,58,58,0.30)' : 'rgba(52,74,150,0.26)';
    ctx.lineWidth = 1.15 * s;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx + Math.cos(fa) * fl, fy + Math.sin(fa) * fl);
    ctx.stroke();
  }

  /* --- fond guilloche ------------------------------------------- */
  guilloche(ctx, NW * 0.5, NH * 0.5, 430 * s, 140 * s, 268 * s, ink, 0.17, 0.9 * s);
  guilloche(ctx, NW * 0.5, NH * 0.5, 372 * s, 132 * s, 231 * s, ink, 0.15, 0.9 * s);

  if (side === 'front') {
    drawFront(ctx, o, s, NW, NH, rnd, ink, deep, gold);
  } else {
    drawBack(ctx, o, s, NW, NH, rnd, ink, deep);
  }

  /* --- cadre commun ---------------------------------------------- */
  ctx.save();
  ctx.strokeStyle = ink;
  ctx.globalAlpha = 0.92;
  ctx.lineWidth = 5 * s;
  roundRect(ctx, 46 * s, 46 * s, NW - 92 * s, NH - 92 * s, 16 * s);
  ctx.stroke();
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = 1.6 * s;
  roundRect(ctx, 68 * s, 68 * s, NW - 136 * s, NH - 136 * s, 10 * s);
  ctx.stroke();
  ctx.restore();

  // bandes guillochees dans la marge haute et basse
  waveBand(ctx, 68 * s, 50 * s, NW - 136 * s, 16 * s, 7, ink, 0.5, 46);
  waveBand(ctx, 68 * s, NH - 66 * s, NW - 136 * s, 16 * s, 7, ink, 0.5, 46);

  // rosaces d'angle
  var cy0 = NH / s - 118;
  var corners = [[118, 118], [NW / s - 118, 118], [118, cy0], [NW / s - 118, cy0]];
  for (var ci = 0; ci < corners.length; ci++) {
    guilloche(ctx, corners[ci][0] * s, corners[ci][1] * s, 34 * s, 13 * s, 23 * s, ink, 0.6, 0.9 * s);
  }

  // usure : encre legerement mangee sur les bords
  ctx.save();
  var vg = ctx.createRadialGradient(NW / 2, NH / 2, NH * 0.25, NW / 2, NH / 2, NW * 0.62);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(30,54,34,0.18)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, NW, NH);
  ctx.restore();

  ctx.restore();
  return c;
}

function drawFront(ctx, o, s, NW, NH, rnd, ink, deep, gold) {
  var serif = serifDuSite();
  var mono  = '"SFMono-Regular", Menlo, Consolas, monospace';

  /* ruban de securite iridescent */
  ctx.save();
  var rb = ctx.createLinearGradient(1216 * s, 0, 1296 * s, 0);
  rb.addColorStop(0, 'rgba(150,196,214,0.05)');
  rb.addColorStop(0.35, 'rgba(126,178,206,0.45)');
  rb.addColorStop(0.6, 'rgba(196,220,228,0.32)');
  rb.addColorStop(1, 'rgba(140,190,210,0.06)');
  ctx.fillStyle = rb;
  ctx.fillRect(1216 * s, 74 * s, 80 * s, NH - 148 * s);
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = '#5d8ea6';
  ctx.lineWidth = 1 * s;
  for (var rr = 0; rr < 26; rr++) {
    var ry = 84 * s + rr * ((NH - 168 * s) / 26);
    ctx.beginPath(); ctx.moveTo(1220 * s, ry); ctx.lineTo(1292 * s, ry + 6 * s); ctx.stroke();
  }
  ctx.restore();

  /* medaillon central-gauche : le « portrait » */
  var mx = 700 * s, my = 452 * s, rx = 248 * s, ry2 = 292 * s;
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(mx, my, rx, ry2, 0, 0, Math.PI * 2);
  ctx.clip();
  var mg = ctx.createRadialGradient(mx - 60 * s, my - 80 * s, 20 * s, mx, my, rx * 1.4);
  mg.addColorStop(0, 'rgba(240,247,227,0.88)');
  mg.addColorStop(1, 'rgba(158,180,144,0.55)');
  ctx.fillStyle = mg;
  ctx.fillRect(mx - rx, my - ry2, rx * 2, ry2 * 2);
  engrave(ctx, mx - rx, my - ry2, rx * 2, ry2 * 2, 11 * s, deep, 0.30);
  guilloche(ctx, mx, my, 210 * s, 78 * s, 132 * s, deep, 0.35, 1 * s);
  // le symbole, grave puis raye d'horizontales pour l'effet taille-douce
  ctx.fillStyle = deep;
  ctx.globalAlpha = 0.88;
  ctx.font = '700 ' + (398 * s) + 'px ' + serif;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('$', mx, my + 8 * s);
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2.6 * s;
  ctx.strokeStyle = o.paper;
  for (var e = 0; e < 46; e++) {
    var ey = my - ry2 + e * (ry2 * 2 / 46);
    ctx.beginPath(); ctx.moveTo(mx - rx, ey); ctx.lineTo(mx + rx, ey); ctx.stroke();
  }
  ctx.restore();

  // cadre du medaillon
  ctx.save();
  ctx.strokeStyle = ink; ctx.globalAlpha = 0.85; ctx.lineWidth = 3.4 * s;
  ctx.beginPath(); ctx.ellipse(mx, my, rx, ry2, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.globalAlpha = 0.5; ctx.lineWidth = 1.2 * s;
  ctx.beginPath(); ctx.ellipse(mx, my, rx + 13 * s, ry2 + 13 * s, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  /* disque de droite : la valeur */
  var dx = 1590 * s, dy = 452 * s;
  guilloche(ctx, dx, dy, 216 * s, 78 * s, 132 * s, ink, 0.40, 1 * s);
  guilloche(ctx, dx, dy, 170 * s, 65 * s, 108 * s, ink, 0.30, 0.9 * s);
  ctx.save();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = '700 ' + (236 * s) + 'px ' + serif;
  ctx.fillStyle = deep; ctx.globalAlpha = 0.9;
  ctx.fillText(o.denomination, dx, dy + 6 * s);
  ctx.globalAlpha = 0.5; ctx.lineWidth = 2 * s; ctx.strokeStyle = paperShade();
  ctx.strokeText(o.denomination, dx, dy + 6 * s);
  ctx.restore();

  /* colonne centrale : mentions, sceau, paraphes */
  ctx.save();
  ctx.fillStyle = deep;
  ctx.textBaseline = 'alphabetic';
  ctx.font = '600 ' + (46 * s) + 'px ' + serif;
  tracked(ctx, o.issuer, 1024 * s, 168 * s, 11 * s, 'center');
  ctx.globalAlpha = 0.75;
  ctx.font = '400 ' + (23 * s) + 'px ' + serif;
  tracked(ctx, 'LEGAL TENDER FOR ALL DEBTS', 1024 * s, 212 * s, 4.2 * s, 'center');
  ctx.restore();

  // sceau circulaire
  var sx = 1042 * s, sy = 452 * s;
  ctx.save();
  ctx.strokeStyle = deep; ctx.globalAlpha = 0.55;
  ctx.lineWidth = 4 * s;
  ctx.beginPath(); ctx.arc(sx, sy, 74 * s, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1.4 * s;
  ctx.beginPath(); ctx.arc(sx, sy, 62 * s, 0, Math.PI * 2); ctx.stroke();
  for (var t = 0; t < 40; t++) {
    var a = t / 40 * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(sx + Math.cos(a) * 64 * s, sy + Math.sin(a) * 64 * s);
    ctx.lineTo(sx + Math.cos(a) * 73 * s, sy + Math.sin(a) * 73 * s);
    ctx.stroke();
  }
  guilloche(ctx, sx, sy, 56 * s, 19 * s, 34 * s, deep, 0.5, 0.9 * s);
  ctx.restore();

  // numeros de serie
  ctx.save();
  ctx.fillStyle = gold;
  ctx.font = '600 ' + (34 * s) + 'px ' + mono;
  ctx.globalAlpha = 0.92;
  tracked(ctx, o.serial, 1130 * s, 300 * s, 3 * s, 'center');
  tracked(ctx, o.serial, 1130 * s, 694 * s, 3 * s, 'center');
  ctx.restore();

  // paraphes
  signature(ctx, 906 * s, 618 * s, 210 * s, rnd, deep);
  signature(ctx, 1178 * s, 618 * s, 210 * s, rnd, deep);
  ctx.save();
  ctx.fillStyle = deep; ctx.globalAlpha = 0.6;
  ctx.font = '400 ' + (19 * s) + 'px ' + serif;
  tracked(ctx, 'TREASURER', 1011 * s, 648 * s, 2.4 * s, 'center');
  tracked(ctx, 'SECRETARY', 1283 * s, 648 * s, 2.4 * s, 'center');
  ctx.restore();

  /* chiffres d'angle */
  ctx.save();
  ctx.fillStyle = deep;
  ctx.font = '700 ' + (84 * s) + 'px ' + serif;
  ctx.textAlign = 'left';  ctx.fillText(o.denomination, 198 * s, 262 * s);
  ctx.textAlign = 'right'; ctx.fillText(o.denomination, 1850 * s, 776 * s);
  ctx.globalAlpha = 0.85;
  ctx.font = '700 ' + (52 * s) + 'px ' + serif;
  ctx.textAlign = 'right'; ctx.fillText(o.denomination, 1850 * s, 226 * s);
  ctx.textAlign = 'left';  ctx.fillText(o.denomination, 198 * s, 762 * s);
  ctx.restore();

  /* mention en toutes lettres */
  ctx.save();
  ctx.fillStyle = deep;
  ctx.font = '600 ' + (44 * s) + 'px ' + serif;
  tracked(ctx, o.spelled, 1024 * s, 792 * s, 9 * s, 'center');
  ctx.globalAlpha = 0.62;
  ctx.font = '400 ' + (20 * s) + 'px ' + serif;
  tracked(ctx, o.series, 1590 * s, 690 * s, 3.4 * s, 'center');
  ctx.restore();

  /* microtexte le long du cadre */
  ctx.save();
  ctx.fillStyle = ink; ctx.globalAlpha = 0.5;
  ctx.font = '400 ' + (11 * s) + 'px ' + mono;
  var micro = '';
  for (var m = 0; m < 64; m++) micro += o.denomination + ' ';
  ctx.beginPath();
  ctx.rect(80 * s, 70 * s, NW - 160 * s, 24 * s);
  ctx.clip();
  ctx.textAlign = 'left';
  ctx.fillText(micro, 82 * s, 88 * s);
  ctx.restore();
}

function paperShade() { return 'rgba(238,247,225,0.55)'; }

function drawBack(ctx, o, s, NW, NH, rnd, ink, deep) {
  var serif = serifDuSite();
  var cx = 1024 * s, cy = 452 * s;

  guilloche(ctx, cx, cy, 300 * s, 110 * s, 186 * s, ink, 0.42, 1 * s);
  guilloche(ctx, cx, cy, 232 * s, 88 * s, 140 * s, ink, 0.34, 0.9 * s);

  ctx.save();
  ctx.strokeStyle = ink; ctx.globalAlpha = 0.8; ctx.lineWidth = 3 * s;
  ctx.beginPath(); ctx.ellipse(cx, cy, 340 * s, 250 * s, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = deep; ctx.globalAlpha = 0.88;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = '700 ' + (190 * s) + 'px ' + serif;
  ctx.fillText(o.denomination, cx, cy + 4 * s);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = deep; ctx.globalAlpha = 0.8;
  ctx.font = '600 ' + (40 * s) + 'px ' + serif;
  tracked(ctx, o.spelled, cx, 178 * s, 10 * s, 'center');
  ctx.globalAlpha = 0.65;
  ctx.font = '400 ' + (26 * s) + 'px ' + serif;
  tracked(ctx, o.issuer, cx, 780 * s, 7 * s, 'center');
  ctx.restore();

  var spots = [[400, 452], [1648, 452]];
  for (var i = 0; i < spots.length; i++) {
    guilloche(ctx, spots[i][0] * s, spots[i][1] * s, 150 * s, 54 * s, 92 * s, ink, 0.42, 0.9 * s);
    ctx.save();
    ctx.fillStyle = deep; ctx.globalAlpha = 0.82;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '700 ' + (98 * s) + 'px ' + serif;
    ctx.fillText(o.denomination, spots[i][0] * s, spots[i][1] * s);
    ctx.restore();
  }
}

// Grain du papier, en relief.
function bumpCanvas(seed) {
  var S = 512, c = document.createElement('canvas');
  c.width = c.height = S;
  var ctx = c.getContext('2d');
  var img = ctx.createImageData(S, S);
  var rnd = mulberry32(seed + 313);
  for (var y = 0; y < S; y++) {
    for (var x = 0; x < S; x++) {
      var i = (y * S + x) * 4;
      var v = 128 + (rnd() - 0.5) * 74 + Math.sin(y * 0.9 + Math.sin(x * 0.05) * 3) * 7;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// Banderole : mustard = 10 000 $ en coupures de 100 (code couleur ABA).
function strapCanvas(o) {
  var W = 256, H = 512, c = document.createElement('canvas');
  c.width = W; c.height = H;
  var ctx = c.getContext('2d');
  ctx.fillStyle = o.strapColor;
  ctx.fillRect(0, 0, W, H);
  var g = ctx.createLinearGradient(0, 0, W, 0);
  g.addColorStop(0, 'rgba(120,90,20,0.22)');
  g.addColorStop(0.35, 'rgba(255,246,214,0.30)');
  g.addColorStop(1, 'rgba(120,90,20,0.20)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.translate(W / 2, H / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#4a3608';
  ctx.font = '700 62px ' + serifDuSite();
  ctx.fillText('$10,000', 0, -26);
  ctx.font = '600 26px "Archivo", "Helvetica Neue", Arial, sans-serif';
  tracked(ctx, '100 x $100', 0, 22, 3, 'center');
  ctx.globalAlpha = 0.55;
  ctx.fillRect(-150, 46, 300, 2);
  ctx.globalAlpha = 0.85;
  for (var b = 0; b < 34; b++) {
    var bw = 1 + (b % 4) * 1.4;
    ctx.fillRect(-150 + b * 9, 60, bw, 22);
  }
  return c;
}

// Environnement equirectangulaire : un studio a deux boites a lumiere.
function envCanvas() {
  var W = 512, H = 256, c = document.createElement('canvas');
  c.width = W; c.height = H;
  var ctx = c.getContext('2d');
  var g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#d7e2dc');
  g.addColorStop(0.45, '#8b968f');
  g.addColorStop(0.62, '#3a423d');
  g.addColorStop(1, '#171b19');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  var lights = [[130, 62, 120, 70, 'rgba(255,255,255,1)'],
                [372, 96, 96, 54, 'rgba(255,236,206,0.95)'],
                [258, 30, 180, 40, 'rgba(214,232,255,0.7)']];
  for (var i = 0; i < lights.length; i++) {
    var L = lights[i];
    var rg = ctx.createRadialGradient(L[0], L[1], 0, L[0], L[1], L[2]);
    rg.addColorStop(0, L[4]);
    rg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.save();
    ctx.translate(L[0], L[1]);
    ctx.scale(1, L[3] / L[2]);
    ctx.translate(-L[0], -L[1]);
    ctx.fillStyle = rg;
    ctx.fillRect(L[0] - L[2], L[1] - L[2], L[2] * 2, L[2] * 2);
    ctx.restore();
  }
  return c;
}

/* Les faces ne sont dessinées qu'une fois : les composer avant que la serif
   soit là les figerait dans la police de secours. Le plafond de 1600 ms les
   dessine quand même — un billet en Times vaut mieux qu'une liasse blanche. */
function whenFontsReady(cb) {
  if (!document.fonts || !document.fonts.load) { cb(); return; }
  var done = false;
  var fire = function () { if (!done) { done = true; cb(); } };
  var t = setTimeout(fire, 1600);
  var serif = serifDuSite();
  Promise.all([
    document.fonts.load('700 100px ' + serif),
    document.fonts.load('600 40px ' + serif)
  ]).catch(function () {}).then(function () { clearTimeout(t); fire(); });
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

function create(container, options) {
  if (typeof container === 'string') container = document.querySelector(container);
  if (!container) throw new Error('MoneyStack3D : conteneur introuvable.');

  var o = Object.assign({}, DEFAULTS, options || {});
  var rnd = mulberry32(o.seed);
  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  /* --- rendu ------------------------------------------------------ */
  var renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true, powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, o.maxPixelRatio));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = o.exposure;
  if (o.shadow) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
  var canvas = renderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;outline:none;';
  /* Sans interaction, la liasse n'est plus un objet à manipuler mais une
     image : ni rôle applicatif, ni tabulation, et l'aide vocale la lit comme
     elle lisait l'`alt` du rouleau qu'elle remplace. */
  if (o.interaction) {
    canvas.setAttribute('role', 'application');
    canvas.setAttribute('tabindex', '0');
    canvas.setAttribute('aria-label',
      'Liasse de billets en 3D. Glissez pour la faire tourner sur tous les axes, ' +
      'utilisez les fleches du clavier, plus et moins pour zoomer, R pour recentrer.');
  } else {
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Une liasse de billets de cent dollars.');
  }
  container.appendChild(canvas);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, o.distance);

  /* --- environnement ---------------------------------------------- */
  var pmrem = new THREE.PMREMGenerator(renderer);
  var envTex = new THREE.CanvasTexture(envCanvas());
  envTex.mapping = THREE.EquirectangularReflectionMapping;
  var envRT = pmrem.fromEquirectangular(envTex);
  scene.environment = envRT.texture;
  envTex.dispose();
  pmrem.dispose();

  /* --- lumieres ---------------------------------------------------- */
  var hemi = new THREE.HemisphereLight(0xd8e6de, 0x1a201c, 0.45);
  scene.add(hemi);

  var key = new THREE.DirectionalLight(0xfff3e2, 2.35);
  key.position.set(3.1, 5.2, 2.7);
  if (o.shadow) {
    key.castShadow = true;
    key.shadow.mapSize.set(o.shadowMapSize, o.shadowMapSize);
    key.shadow.radius = 4;
    key.shadow.bias = -0.0006;
    key.shadow.normalBias = 0.015;
    var sc = key.shadow.camera;
    sc.near = 1; sc.far = 14;
    sc.left = -2.6; sc.right = 2.6; sc.top = 2.6; sc.bottom = -2.6;
    sc.updateProjectionMatrix();
  }
  scene.add(key);

  var fill = new THREE.DirectionalLight(0x9fbcd8, 0.55);
  fill.position.set(-4.2, 1.4, 2.2);
  scene.add(fill);

  var rim = new THREE.DirectionalLight(0xffffff, 0.95);
  rim.position.set(-2.4, 2.2, -4.6);
  scene.add(rim);

  /* --- ombre portee ------------------------------------------------ */
  var ground = null;
  if (o.shadow && o.groundShadow) {
    ground = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.ShadowMaterial({ color: 0x0b1410, opacity: 0.34 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.02;
    ground.receiveShadow = true;
    scene.add(ground);
  }

  /* --- hierarchie : root (translation) > pivot (rotation) > model --- */
  var root = new THREE.Group();
  var pivot = new THREE.Group();
  var model = new THREE.Group();
  pivot.add(model);
  root.add(pivot);
  scene.add(root);

  // Rx positif : la face superieure bascule VERS la camera (Rx envoie +Y sur
  // +Z). Avec un angle negatif on regarderait le dessous de la liasse.
  var baseQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0.46, -0.62, 0.06, 'YXZ'));
  pivot.quaternion.copy(baseQuat);

  /* --- la liasse ---------------------------------------------------- */
  var t = o.thickness;
  var n = Math.max(3, o.bills | 0);
  var stackH = n * t;
  var geo = new THREE.BoxGeometry(NOTE_RATIO, t, 1);

  var paperCol = new THREE.Color(o.paper);
  var edgeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, roughness: 0.94, metalness: 0.0, envMapIntensity: 0.55
  });

  // Les feuilles internes : un seul draw call, teinte variee par instance.
  // les tranches des feuilles imprimees : meme papier, mais sans instanceColor
  var sheetEdgeMat = edgeMat.clone();
  sheetEdgeMat.color.copy(paperCol).multiplyScalar(0.94);

  var inner = new THREE.InstancedMesh(geo, edgeMat, n - 2);
  inner.castShadow = true;
  inner.receiveShadow = true;
  var dummy = new THREE.Object3D();
  var col = new THREE.Color();
  var jitter = [];
  for (var i = 0; i < n; i++) {
    jitter.push({
      x: (rnd() - 0.5) * 0.016,
      z: (rnd() - 0.5) * 0.011,
      r: (rnd() - 0.5) * 0.020 + Math.sin(i * 0.21) * 0.004,
      tilt: (rnd() - 0.5) * 0.004
    });
  }
  for (var j = 1; j < n - 1; j++) {
    var ji = jitter[j];
    dummy.position.set(ji.x, -stackH / 2 + j * t + t / 2, ji.z);
    dummy.rotation.set(ji.tilt, ji.r, ji.tilt * 0.6);
    dummy.updateMatrix();
    inner.setMatrixAt(j - 1, dummy.matrix);
    // strates : bruit haute frequence + ondulation lente, comme un vrai chant
    var shade = 0.80 + rnd() * 0.20 - Math.abs(Math.sin(j * 0.37)) * 0.07;
    col.copy(paperCol).multiplyScalar(shade);
    col.offsetHSL(0.02 * (rnd() - 0.5), 0.03 * (rnd() - 0.5), 0);
    inner.setColorAt(j - 1, col);
  }
  inner.instanceMatrix.needsUpdate = true;
  if (inner.instanceColor) inner.instanceColor.needsUpdate = true;
  model.add(inner);

  // Billet du dessus et du dessous : imprimes, donc materiaux par face.
  var faceMats = { front: null, back: null };
  function sheet(index, y) {
    var mats = [sheetEdgeMat, sheetEdgeMat, sheetEdgeMat,
                sheetEdgeMat, sheetEdgeMat, sheetEdgeMat];
    var mesh = new THREE.Mesh(geo, mats);
    var ji = jitter[index];
    mesh.position.set(ji.x, y, ji.z);
    mesh.rotation.set(ji.tilt, ji.r, ji.tilt * 0.6);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    model.add(mesh);
    return mesh;
  }
  var topSheet = sheet(n - 1, stackH / 2 - t / 2);
  var bottomSheet = sheet(0, -stackH / 2 + t / 2);

  /* --- banderole ---------------------------------------------------- */
  var strapGroup = null;
  if (o.strap) {
    strapGroup = new THREE.Group();
    var sw = 0.52;                       // largeur de bande, sur la longueur du billet
    var st = 0.0032;                     // epaisseur du papier de banderole
    var sh = stackH + st * 2 + 0.004;    // hauteur du tour
    var sd = 1 + st * 2 + 0.006;         // profondeur du tour
    var strapMat = new THREE.MeshStandardMaterial({
      color: o.strapColor, roughness: 0.82, metalness: 0, envMapIntensity: 0.5
    });
    var strapTexMat = strapMat.clone();
    var topBand = new THREE.Mesh(
      new THREE.BoxGeometry(sw, st, sd),
      [strapMat, strapMat, strapTexMat, strapMat, strapMat, strapMat]
    );
    topBand.position.y = stackH / 2 + st / 2 + 0.002;
    var botBand = new THREE.Mesh(new THREE.BoxGeometry(sw, st, sd), strapMat);
    botBand.position.y = -stackH / 2 - st / 2 - 0.002;
    var frontBand = new THREE.Mesh(new THREE.BoxGeometry(sw, sh, st), strapMat);
    frontBand.position.z = sd / 2 - st / 2;
    var backBand = frontBand.clone();
    backBand.position.z = -sd / 2 + st / 2;
    [topBand, botBand, frontBand, backBand].forEach(function (m) {
      m.castShadow = true; m.receiveShadow = true; strapGroup.add(m);
    });
    strapGroup.position.x = -0.12;
    model.add(strapGroup);
    faceMats.strap = strapTexMat;
  }

  /* --- textures (apres chargement des polices) ---------------------- */
  var textures = [];
  function applyTextures() {
    var isGL2 = renderer.capabilities.isWebGL2;
    var maxAniso = renderer.capabilities.getMaxAnisotropy();
    function tex(cv, srgb) {
      var tx = new THREE.CanvasTexture(cv);
      if (srgb) tx.encoding = THREE.sRGBEncoding;
      tx.anisotropy = maxAniso;
      if (!isGL2) { tx.generateMipmaps = false; tx.minFilter = THREE.LinearFilter; }
      textures.push(tx);
      return tx;
    }
    var bump = tex(bumpCanvas(o.seed), false);
    bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
    bump.repeat.set(3, 1.4);

    var common = { roughness: 0.9, metalness: 0, envMapIntensity: 0.55,
                   bumpMap: bump, bumpScale: 0.0016 };
    faceMats.front = new THREE.MeshStandardMaterial(
      Object.assign({ map: tex(noteCanvas(o, 'front', o.noteTexture), true) }, common));
    faceMats.back = new THREE.MeshStandardMaterial(
      Object.assign({ map: tex(noteCanvas(o, 'back', Math.round(o.noteTexture / 2)), true) }, common));

    var se = sheetEdgeMat;
    topSheet.material    = [se, se, faceMats.front, faceMats.back, se, se];
    bottomSheet.material = [se, se, faceMats.front, faceMats.back, se, se];
    edgeMat.bumpMap = sheetEdgeMat.bumpMap = bump;
    edgeMat.bumpScale = sheetEdgeMat.bumpScale = 0.0012;
    edgeMat.needsUpdate = sheetEdgeMat.needsUpdate = true;
    if (faceMats.strap) {
      faceMats.strap.map = tex(strapCanvas(o), true);
      faceMats.strap.needsUpdate = true;
    }
    render();
  }

  /* ------------------------------------------------------------------ */
  /* Interaction : arcball (un seul glisser = les trois axes, roulis     */
  /* compris), translation, zoom, clavier, tactile.                      */
  /* ------------------------------------------------------------------ */

  var pointers = new Map();
  var mode = null;                       // 'rotate' | 'pan' | 'pinch'
  var lastBall = new THREE.Vector3();
  var spinAxis = new THREE.Vector3(0, 1, 0);
  var spinSpeed = 0;
  var panOffset = new THREE.Vector3();
  var lastInput = -1e9;
  var pinchDist = 0;
  var userZoomed = false;
  var pinchMid = { x: 0, y: 0 };
  var tween = 0;
  var fromQuat = new THREE.Quaternion();
  var fromPan = new THREE.Vector3();
  var fromDist = o.distance;
  var autoOn = o.autoRotate && !reduceMotion;
  var q = new THREE.Quaternion();
  var vA = new THREE.Vector3();

  function localXY(ev) {
    var r = container.getBoundingClientRect();
    var m = Math.min(r.width, r.height) / 2;
    return { x: (ev.clientX - r.left - r.width / 2) / m,
             y: -(ev.clientY - r.top - r.height / 2) / m };
  }

  // Projection sur une sphere prolongee par une hyperbole (Holroyd),
  // pour que le geste reste continu au-dela du bord de la boule.
  function ball(x, y) {
    x *= 0.82; y *= 0.82;
    var r2 = x * x + y * y;
    var z = r2 <= 0.5 ? Math.sqrt(1 - r2) : 0.5 / Math.sqrt(r2);
    return vA.set(x, y, z).normalize().clone();
  }

  function markInput() { lastInput = performance.now(); tween = 0; wake(); }

  function onDown(ev) {
    pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    canvas.setPointerCapture(ev.pointerId);
    canvas.focus({ preventScroll: true });
    markInput();
    if (pointers.size === 2) {
      var p = Array.from(pointers.values());
      pinchDist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      pinchMid = { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 };
      mode = 'pinch';
      spinSpeed = 0;
      return;
    }
    var pan = ev.shiftKey || ev.button === 1 || ev.button === 2;
    mode = pan ? 'pan' : 'rotate';
    spinSpeed = 0;
    var l = localXY(ev);
    lastBall = ball(l.x, l.y);
    canvas.style.cursor = pan ? 'move' : 'grabbing';
  }

  function onMove(ev) {
    if (!pointers.has(ev.pointerId)) return;
    var prev = pointers.get(ev.pointerId);
    pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    markInput();

    if (mode === 'pinch' && pointers.size === 2) {
      var p = Array.from(pointers.values());
      var d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      var mid = { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 };
      if (pinchDist > 0) zoomBy((pinchDist - d) * 0.006);
      panBy(mid.x - pinchMid.x, mid.y - pinchMid.y);
      pinchDist = d; pinchMid = mid;
      return;
    }
    if (mode === 'pan') {
      panBy(ev.clientX - prev.x, ev.clientY - prev.y);
      return;
    }
    if (mode === 'rotate') {
      var l = localXY(ev);
      var now = ball(l.x, l.y);
      q.setFromUnitVectors(lastBall, now);
      // camera non tournee : l'espace ecran est deja l'espace monde
      pivot.quaternion.premultiply(q);
      var angle = 2 * Math.acos(clamp(Math.abs(q.w), -1, 1));
      if (angle > 1e-5) {
        spinAxis.set(q.x, q.y, q.z).normalize();
        if (q.w < 0) spinAxis.negate();
        spinSpeed = clamp(angle * 34, 0, 7);
      }
      lastBall = now;
    }
  }

  function onUp(ev) {
    pointers.delete(ev.pointerId);
    try { canvas.releasePointerCapture(ev.pointerId); } catch { /* deja relache */ }
    if (pointers.size === 0) { mode = null; canvas.style.cursor = 'grab'; }
    else if (pointers.size === 1) {
      mode = 'rotate';
      var p = Array.from(pointers.values())[0];
      var r = container.getBoundingClientRect();
      var m = Math.min(r.width, r.height) / 2;
      lastBall = ball((p.x - r.left - r.width / 2) / m, -(p.y - r.top - r.height / 2) / m);
    }
    markInput();
  }

  function panBy(dx, dy) {
    var r = container.getBoundingClientRect();
    var h = 2 * Math.tan(camera.fov * Math.PI / 360) * camera.position.z;
    var k = h / r.height;
    panOffset.x = clamp(panOffset.x + dx * k, -1.9, 1.9);
    panOffset.y = clamp(panOffset.y - dy * k, -1.3, 1.3);
  }

  function zoomBy(amount) {
    userZoomed = true;
    camera.position.z = clamp(camera.position.z * (1 + amount), 2.35, 11);
  }

  function onWheel(ev) {
    ev.preventDefault();
    markInput();
    zoomBy(clamp(ev.deltaY * (ev.deltaMode === 1 ? 0.02 : 0.0012), -0.35, 0.35));
  }

  function onKey(ev) {
    var step = ev.shiftKey ? 0.16 : 0.07;
    var axis = null, ang = 0;
    switch (ev.key) {
      case 'ArrowLeft':  axis = new THREE.Vector3(0, 1, 0); ang = -step; break;
      case 'ArrowRight': axis = new THREE.Vector3(0, 1, 0); ang = step; break;
      case 'ArrowUp':    axis = new THREE.Vector3(1, 0, 0); ang = -step; break;
      case 'ArrowDown':  axis = new THREE.Vector3(1, 0, 0); ang = step; break;
      case 'q': case 'Q': axis = new THREE.Vector3(0, 0, 1); ang = step; break;
      case 'e': case 'E': axis = new THREE.Vector3(0, 0, 1); ang = -step; break;
      case '+': case '=': zoomBy(-0.08); break;
      case '-': case '_': zoomBy(0.08); break;
      case 'r': case 'R': api.reset(); break;
      default: return;
    }
    ev.preventDefault();
    markInput();
    if (axis) pivot.quaternion.premultiply(q.setFromAxisAngle(axis, ang));
  }

  /* La molette est prise avec `preventDefault` : posée dans un hero, la liasse
     confisquerait le défilement de la page. Ou bien elle se manipule et prend
     tout, ou bien elle ne prend rien — d'où le tout ou rien de `interaction`.
     `destroy` retire les écouteurs sans condition : en retirer un qui n'a
     jamais été posé ne coûte rien. */
  if (o.interaction) {
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('keydown', onKey);
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    canvas.addEventListener('dblclick', function () { api.reset(); });
    canvas.style.cursor = 'grab';
  } else {
    canvas.style.pointerEvents = 'none';
  }

  /* ------------------------------------------------------------------ */
  /* Boucle                                                              */
  /* ------------------------------------------------------------------ */

  var visible = true, running = true, raf = 0, prev = performance.now(), idleClock = 0;

  function resize() {
    var w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // en portrait, on recule pour garder la liasse entiere dans le cadre
    var fit = clamp(1.55 / Math.max(0.62, camera.aspect), 1, 1.9);
    camera.userData.fit = fit;
    if (!userZoomed) camera.position.z = o.distance * fit;
    camera.updateProjectionMatrix();
    render();
  }

  /* La première image peinte, annoncée une fois. Le rideau d'intro l'attend :
     il ne se lève pas sur un trou au milieu du titre. Le rendu est synchrone,
     mais la commande n'est qu'empilée pour le GPU — d'où l'appel *après*,
     au plus près de ce qui sera à l'écran. */
  var annoncé = false;

  function render() {
    renderer.render(scene, camera);
    if (!annoncé) {
      annoncé = true;
      if (o.onReady) o.onReady();
    }
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    var dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    if (!visible || !running) return;

    // inertie
    if (!mode && spinSpeed > 0.0004) {
      pivot.quaternion.premultiply(q.setFromAxisAngle(spinAxis, spinSpeed * dt));
      spinSpeed *= Math.pow(0.945, dt * 60);
    } else if (!mode) { spinSpeed = 0; }

    // reprise douce de la rotation d'ambiance
    if (autoOn && !mode && spinSpeed < 0.02 && !tween) {
      var idle = (now - lastInput) / 1000 - o.idleDelay / 1000;
      if (idle > 0) {
        var ramp = Math.min(1, idle / 1.2);
        pivot.quaternion.premultiply(
          q.setFromAxisAngle(vA.set(0, 1, 0), o.autoRotateSpeed * ramp * dt));
      }
    }

    // recentrage
    if (tween > 0) {
      tween = Math.min(1, tween + dt * 1.7);
      var k = 1 - Math.pow(1 - tween, 3);
      pivot.quaternion.copy(fromQuat).slerp(baseQuat, k);
      panOffset.lerpVectors(fromPan, vA.set(0, 0, 0), k);
      camera.position.z = fromDist + (o.distance * (camera.userData.fit || 1) - fromDist) * k;
      if (tween >= 1) tween = 0;
    }

    idleClock += dt;
    root.position.set(panOffset.x, panOffset.y + (reduceMotion ? 0 : Math.sin(idleClock * 0.55) * 0.016), 0);

    render();
    if (o.onFrame) o.onFrame(pivot.quaternion, camera.position.z);
  }

  function wake() { if (!raf) { prev = performance.now(); raf = requestAnimationFrame(frame); } }

  var ro = window.ResizeObserver ? new ResizeObserver(resize) : null;
  if (ro) ro.observe(container); else window.addEventListener('resize', resize);

  var io = window.IntersectionObserver ? new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
  }, { threshold: 0.01 }) : null;
  if (io) io.observe(container);

  function onVisibility() { running = !document.hidden; prev = performance.now(); }
  document.addEventListener('visibilitychange', onVisibility);

  /* --- API ---------------------------------------------------------- */
  var api = {
    canvas: canvas,
    scene: scene,
    camera: camera,
    object: pivot,
    reset: function () {
      fromQuat.copy(pivot.quaternion);
      fromPan.copy(panOffset);
      fromDist = camera.position.z;
      spinSpeed = 0;
      tween = 0.0001;
      lastInput = performance.now();
    },
    setAutoRotate: function (v) { autoOn = !!v && !reduceMotion; lastInput = performance.now(); return autoOn; },
    isAutoRotate: function () { return autoOn; },
    destroy: function () {
      cancelAnimationFrame(raf); raf = 0;
      if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('keydown', onKey);
      textures.forEach(function (tx) { tx.dispose(); });
      scene.traverse(function (obj) {
        if (obj.geometry) obj.geometry.dispose();
        var m = obj.material;
        if (Array.isArray(m)) m.forEach(function (x) { x.dispose(); });
        else if (m) m.dispose();
      });
      envRT.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }
  };

  resize();
  camera.position.z = o.distance * (camera.userData.fit || 1);
  whenFontsReady(applyTextures);
  wake();
  return api;
}

// Le billet seul, en <canvas> : utile pour une impression, un favicon,
// ou pour texturer autre chose. MoneyStack3D.note({}, 'front', 2048)
function note(options, side, size) {
  return noteCanvas(Object.assign({}, DEFAULTS, options || {}),
                    side === 'back' ? 'back' : 'front', size || 2048);
}

export { create, note, DEFAULTS as defaults, NOTE_RATIO };
