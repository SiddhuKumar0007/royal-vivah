import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { wedding, dateLine } from '../lib/wedding.ts';

const directory = new URL('../public/', import.meta.url);
const art = await sharp(fileURLToPath(new URL('../public/art/mandap.webp', import.meta.url))).resize(600,630,{fit:'cover'}).png().toBuffer();
const escape = value => value.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#3a0713"/><image href="data:image/png;base64,${art.toString('base64')}" x="600" y="0" width="600" height="630"/><rect x="22" y="22" width="1156" height="586" fill="none" stroke="#e8cc8a" stroke-opacity=".65"/><rect x="32" y="32" width="570" height="566" fill="none" stroke="#e8cc8a" stroke-opacity=".18"/><g fill="#e8cc8a" text-anchor="middle" font-family="Georgia,serif"><text x="312" y="122" font-size="21" letter-spacing="4">THE ROYAL VIVAH</text><path d="M290 177q22-35 44 0-22 29-44 0Z" fill="none" stroke="#e8cc8a"/><text x="312" y="270" font-size="62">${escape(wedding.groomEnglish)}</text><text x="312" y="326" font-size="32" font-style="italic">&amp;</text><text x="312" y="398" font-size="62">${escape(wedding.brideEnglish)}</text><text x="312" y="470" font-size="23" font-style="italic">A timeless love story.</text><text x="312" y="545" font-size="17" letter-spacing="2">${escape(dateLine)}</text></g></svg>`;
await sharp(Buffer.from(og)).png().toFile(fileURLToPath(new URL('og-image.png', directory)));
await sharp(fileURLToPath(new URL('icon.svg',directory))).resize(180,180).png().toFile(fileURLToPath(new URL('apple-touch-icon.png', directory)));
const icsEscape = value => value.replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');
// Fold UTF-8 content lines at 75 bytes without splitting a Unicode code point.
function fold(line) { let parts=[], part=''; for(const character of line) {if(Buffer.byteLength(part+character)>75){parts.push(part);part=' '+character;}else part+=character;}parts.push(part);return parts.join('\r\n'); }
const instant=new Date(wedding.dateISO).toISOString().replace(/[-:]/g,'').replace('.000','');
const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//The Royal Vivah//Wedding Invitation//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:royal-vivah-20261204@invitation.local','DTSTAMP:20261122T000000Z',`DTSTART:${instant}`,`SUMMARY:${icsEscape(`${wedding.groom} एवं ${wedding.bride} — शुभ विवाह`)}`,`LOCATION:${icsEscape(wedding.venue.join(' '))}`,`DESCRIPTION:${icsEscape(`${wedding.invitation}\n${wedding.time}\nसमय क्षेत्र: ${wedding.timezone}`)}`,'END:VEVENT','END:VCALENDAR'];
await fs.writeFile(new URL('wedding.ics',directory),lines.map(fold).join('\r\n')+'\r\n');
console.log('Generated Open Graph image, touch icon and calendar invitation.');
