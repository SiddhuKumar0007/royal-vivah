import assert from 'node:assert/strict';
import { test } from 'node:test';
import { wedding, mapsURL, getCountdown } from '../lib/wedding.ts';

test('wedding instant is 4:00 pm India time on 4 December', () => {
  assert.equal(new Date(wedding.dateISO).toISOString(), '2026-12-04T10:30:00.000Z');
  assert.equal(new Intl.DateTimeFormat('en-US', { timeZone: wedding.timezone, weekday: 'long' }).format(new Date(wedding.dateISO)), 'Friday');
});
test('countdown handles before, exact instant and after without negatives', () => {
  const instant = Date.parse(wedding.dateISO);
  assert.deepEqual(getCountdown(instant - 90061000), { passed:false, days:1, hours:1, minutes:1, seconds:1 });
  assert.deepEqual(getCountdown(instant), { passed:true, days:0, hours:0, minutes:0, seconds:0 });
  assert.deepEqual(getCountdown(instant + 86400000), { passed:true, days:0, hours:0, minutes:0, seconds:0 });
});
test('maps uses the complete postal address, not a fabricated coordinate', () => {
  const url = new URL(mapsURL);
  assert.equal(url.searchParams.get('query'), wedding.venue.join(' '));
  assert.equal(url.searchParams.get('api'), '1');
});
test('Preeti Bhoj has the date and time from the invitation card', () => {
  const ceremony = wedding.ceremonies.find(c => c.id === 'preeti-bhoj');
  assert.ok(ceremony);
  assert.equal(ceremony.date, '3 दिसम्बर 2026, शाम 4 बजे');
});
test('Lineage matches the invitation card', () => {
  assert.equal(wedding.groomFather, 'श्री पवन कुमार सिंह');
  assert.equal(wedding.groomGrandfather, 'श्री चंदेश्वर सिंह');
  assert.equal(wedding.brideFather, 'श्री कामेश्वर सिंह');
});
