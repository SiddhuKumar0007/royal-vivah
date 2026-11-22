'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { wedding, mapsURL, getCountdown, dateDisplay, dateLine } from '@/lib/wedding';
import { ArchFrame, DoorPanel } from './palace-door';
import { Bell, Botanical, CeremonyArt, Diya, Ganesha, Garlands, Lotus, Ornament } from './ornaments';

function Petals({ count = 14 }: { count?: number }) {
  return <div className="petals" aria-hidden="true">{Array.from({ length: count }, (_, i) => <i key={i} style={{ '--x': `${(i * 37 + 11) % 100}%`, '--delay': `${-i * 2.7}s`, '--duration': `${13 + i % 7 * 2}s`, '--drift': `${i % 2 ? -70 : 90}px`, '--scale': .5 + (i % 4) * .2 } as CSSProperties} />)}</div>;
}

function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getCountdown> | null>(null);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const update = () => setTime(getCountdown(Date.now()));
    const sync = () => { clearInterval(interval); if (!document.hidden) { update(); interval = setInterval(update, 1000); } };
    sync(); document.addEventListener('visibilitychange', sync);
    return () => { clearInterval(interval); document.removeEventListener('visibilitychange', sync); };
  }, []);
  if (time?.passed) return <p className="celebratory" role="status">शुभ विवाह · एक नई यात्रा का शुभारंभ</p>;
  return <div className="countdown" role="timer" aria-label="Time remaining until the wedding" aria-live="off">{(['days', 'hours', 'minutes', 'seconds'] as const).map((part, i) => <div key={part}><span>{time ? String(time[part]).padStart(2, '0') : '—'}</span><small lang="en">{['DAYS', 'HOURS', 'MINUTES', 'SECONDS'][i]}</small></div>)}</div>;
}

export default function Invitation() {
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(false);
  const [motion, setMotion] = useState(true);
  const [status, setStatus] = useState('');
  const [manualURL, setManualURL] = useState('');
  const [active, setActive] = useState('couple');
  const content = useRef<HTMLDivElement>(null);
  const entrance = useRef<HTMLDivElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const openingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    setMotion(!media.matches);
    const change = () => setMotion(!media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
    const change = () => { document.documentElement.dataset.background = document.hidden ? 'true' : 'false'; };
    document.addEventListener('visibilitychange', change);
    return () => { document.removeEventListener('visibilitychange', change); };
  }, [motion]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = entered ? previous : 'hidden';
    if (content.current) content.current.inert = !entered;
    if (!entered) openButton.current?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = previous; if (content.current) content.current.inert = false; };
  }, [entered]);

  useEffect(() => () => { clearTimeout(openingTimer.current); clearTimeout(statusTimer.current); }, []);

  const finishEntrance = useCallback(() => {
    clearTimeout(openingTimer.current);
    setEntered(true);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      history.replaceState(null, '', window.location.pathname + window.location.search);
      title.current?.focus({ preventScroll: true });
    });
  }, []);

  function openInvitation() {
    if (!motion) { finishEntrance(); return; }
    if (opening) return;
    setOpening(true);
    openingTimer.current = setTimeout(finishEntrance, 2600);
  }

  useEffect(() => {
    if (!entered || !motion) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo('.couple-reveal', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, stagger: .24, ease: 'power3.out', clearProps: 'all' });
        gsap.fromTo('.curtain-left', { xPercent: 35 }, { xPercent: 0, duration: 2.2, ease: 'power2.inOut' });
        gsap.fromTo('.curtain-right', { xPercent: -35 }, { xPercent: 0, duration: 2.2, ease: 'power2.inOut' });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.fromTo(element, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
        });
        gsap.to('.mandap-image', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.mandap-scene', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
        gsap.to('.hero-botanical', { y: -45, ease: 'none', scrollTrigger: { trigger: '.couple-hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
      }, content);
      const pause = () => { gsap.globalTimeline.paused(document.hidden); };
      document.addEventListener('visibilitychange', pause);
      cleanup = () => { document.removeEventListener('visibilitychange', pause); gsap.globalTimeline.paused(false); ctx.revert(); };
    }).catch(() => { /* Content remains readable when optional motion cannot load. */ });
    return () => { cancelled = true; cleanup?.(); };
  }, [entered, motion]);

  useEffect(() => {
    if (!entered) return;
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: '-25% 0px -45% 0px' });
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [entered]);

  function notify(message: string) {
    setStatus(message); clearTimeout(statusTimer.current); statusTimer.current = setTimeout(() => setStatus(''), 5000);
  }

  async function share() {
    const url = window.location.href.split('#')[0];
    if (navigator.share) {
      try { await navigator.share({ title: `${wedding.couple} · ${wedding.title}`, text: `${wedding.invitation} ${wedding.dateHindi}`, url }); return; }
      catch (error) { if (error instanceof Error && error.name === 'AbortError') return; }
    }
    await copyLink();
  }

  async function copyLink() {
    const url = window.location.href.split('#')[0];
    try { await navigator.clipboard.writeText(url); notify('Invitation link copied'); }
    catch { setManualURL(url); }
  }

  return <>
    {!entered && <div ref={entrance} className={`entrance ${opening ? 'is-opening' : ''}`} role="dialog" aria-modal="true" aria-labelledby="entrance-title" onKeyDown={e => {
      if (e.key === 'Escape') finishEntrance();
      if (e.key === 'Tab') {
        const buttons = entrance.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
        if (!buttons?.length) return;
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }}>
      <div className="entrance-border" aria-hidden="true"/>
      <Botanical className="entrance-leaf leaf-left"/><Botanical className="entrance-leaf leaf-right"/>
      <Petals/>
      <div className="entrance-brand" lang="en"><span className="brand-star">✧</span><p id="entrance-title">THE ROYAL VIVAH</p><span className="brand-caption">A TIMELESS LOVE STORY</span></div>
      <div className="entrance-layout">
        <p className="entrance-side side-left" lang="en">TWO SOULS. ONE SACRED PROMISE.</p>
        <div className="palace-stage">
          <div className="beyond-doors"><img src="/art/mandap-mobile.webp" alt=""/><div/></div>
          <div className="door-leaves"><div className="door-leaf door-left"><DoorPanel side="left"/></div><div className="door-leaf door-right"><DoorPanel side="right"/></div></div>
          <ArchFrame/>
          <div className="door-light" aria-hidden="true"/>
          <div className="entrance-copy"><Ganesha/><p className="sacred">॥ श्री गणेशाय नमः ॥</p><div className="door-invitation"><p>सस्नेह आमंत्रण</p><h1>{wedding.shortGroom} <span>एवं</span> {wedding.shortBride}</h1><Ornament/></div><button ref={openButton} className="gold-button entrance-button" onClick={openInvitation} aria-disabled={opening}><span className="button-flower">✧</span>{opening ? 'सुस्वागतम्' : 'निमंत्रण खोलें'}</button></div>
          <Diya className="entrance-diya diya-left"/><Diya className="entrance-diya diya-right"/>
        </div>
        <p className="entrance-side side-right" lang="en">{wedding.venueShortEnglish.toUpperCase()} · {dateLine}</p>
      </div>
      <div className="entrance-bottom"><p lang="en">{dateDisplay.day} <span>·</span> {dateDisplay.monthNumber} <span>·</span> {dateDisplay.year}</p><button className="skip-button" onClick={finishEntrance}>{opening ? 'Skip opening animation' : 'Skip the cinematic entrance'}</button></div>
    </div>}

    <div ref={content} className="invitation-content" onClick={event => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: motion ? 'smooth' : 'instant', block: 'start' });
      history.replaceState(null, '', link.hash);
    }}>
      <a className="skip-link" href="#couple">Skip to invitation</a>
      <header className="site-header"><a className="wordmark" href="#couple" lang="en">THE ROYAL <span>VIVAH</span></a><nav aria-label="Invitation chapters"><a href="#celebrations" aria-current={active==='celebrations'?'location':undefined}>Celebrations</a><a href="#wedding" aria-current={active==='wedding'?'location':undefined}>The day</a><a href="#venue" aria-current={active==='venue'?'location':undefined}>Venue</a></nav><button className="motion-control" onClick={()=>setMotion(v=>!v)} aria-label={motion?'Pause decorative motion':'Enable decorative motion'} title={motion?'Pause motion':'Enable motion'} aria-pressed={!motion}>{motion?<span aria-hidden="true">Ⅱ</span>:<span aria-hidden="true">▷</span>}<span className="motion-label">{motion?'Pause motion':'Play motion'}</span></button></header>
      <main>
        <section id="couple" className="couple-hero">
          <div className="hero-frame" aria-hidden="true"/>
          <Garlands/>
          <div className="curtain curtain-left" aria-hidden="true"/><div className="curtain curtain-right" aria-hidden="true"/>
          <Bell style={{ left:'13%', height:180 }}/><Bell style={{ right:'13%', height:180 }}/><Bell style={{ left:'21%', height:115 }}/><Bell style={{ right:'21%', height:115 }}/>
          <Botanical className="hero-botanical botanical-left"/><Botanical className="hero-botanical botanical-right"/>
          <div className="hero-copy">
            <div className="couple-reveal sacred-intro"><Ganesha/><p>॥ श्री गणेशाय नमः ॥</p></div>
            <p className="eyebrow couple-reveal" lang="en">WITH BLESSINGS, A BEAUTIFUL BEGINNING</p>
            <h1 ref={title} tabIndex={-1} className="couple-names"><span className="couple-reveal">{wedding.groom}</span><span className="couple-reveal conjunction">एवं</span><span className="couple-reveal">{wedding.bride}</span></h1>
            <div className="couple-reveal"><Ornament/><h2 className="shubh">शुभ विवाह</h2></div>
            <p className="hero-english couple-reveal" lang="en">A timeless love story.</p>
            <div className="hero-date couple-reveal" lang="en"><span>{dateLine}</span><i/><span>{wedding.venueShortEnglish.toUpperCase()}</span></div>
            <a className="discover couple-reveal" href="#mandap"><span lang="en">THE CELEBRATION BEGINS</span><span className="scroll-line" aria-hidden="true"/></a>
          </div>
          <Petals count={9}/>
        </section>

        <section id="mandap" className="mandap-scene" aria-labelledby="mandap-title">
          <picture><source media="(max-width: 600px)" srcSet="/art/mandap-mobile.webp"/><img className="mandap-image" src="/art/mandap.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Symbolic royal wedding mandap with carved palace arches, jasmine garlands and glowing brass lamps"/></picture>
          <div className="mandap-shade"/>
          <div className="mandap-copy" data-reveal><p className="eyebrow" lang="en">A SACRED UNION</p><h2 id="mandap-title">दो आत्माएँ।<br/><em>एक पावन बंधन।</em></h2><Ornament/><p>प्रेम, परंपरा और आशीर्वाद के संग</p></div>
          <span className="art-caption" lang="en">AN ARTISTIC CELEBRATION OF TRADITION</span>
        </section>

        <section id="celebrations" className="celebrations section-space" aria-labelledby="celebrations-title">
          <div className="section-heading" data-reveal><p className="eyebrow" lang="en">THE WEDDING CELEBRATIONS</p><h2 id="celebrations-title">उत्सव के रंग</h2><p>हर रस्म में प्रेम, हर पल में अपनापन</p><Ornament/></div>
          <div className="ceremonies">{wedding.ceremonies.map(c=><article className={`ceremony ${c.id}`} key={c.id} data-reveal><div className="ceremony-arch"><CeremonyArt kind={c.kind}/><span>{c.caption}</span></div><div className="ceremony-info"><p className="eyebrow" lang="en">{c.english}</p><h3>{c.name}</h3><p className="ceremony-date">{'date' in c ? c.date : c.time}</p></div></article>)}</div>
          <p className="celebration-footnote" data-reveal>आपकी उपस्थिति इन पलों को और भी सुंदर बनाएगी।</p>
        </section>

        <section id="wedding" className="big-day section-space" aria-labelledby="day-title">
          <Botanical className="date-botanical botanical-left"/><Botanical className="date-botanical botanical-right"/><Petals count={8}/>
          <div className="date-surround" data-reveal><p className="eyebrow" lang="en">A DAY TO REMEMBER, FOREVER</p><h2 id="day-title">शुभ विवाह</h2><div className="date-numeral" lang="en"><span>{dateDisplay.day}</span><p>{dateDisplay.month}</p><div className="year"><i/>{dateDisplay.year}<i/></div></div><p className="wedding-weekday">{dateDisplay.weekdayHindi}</p><p className="wedding-time">{wedding.time}</p><Ornament/><p className="countdown-label" lang="en">EVERY MOMENT BRINGS US CLOSER</p><Countdown/><a className="outline-button" href="/wedding.ics" download="Saurabh-Deepanjali-Wedding.ics">Save the date <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="6" width="16" height="15" rx="1"/><path d="M8 3v6M16 3v6M4 11h16M8 15h3M8 18h3"/></svg></a></div>
        </section>

        <section id="blessings" className="blessings section-space" aria-labelledby="blessings-title">
          <div className="section-heading" data-reveal><Lotus className="blessings-lotus"/><p className="eyebrow" lang="en">ROOTED IN LOVE. BLESSED BY FAMILY.</p><h2 id="blessings-title">शुभ आशीर्वाद</h2><p>दो परिवारों का स्नेहिल मिलन</p></div>
          <div className="families" data-reveal><div><span className="family-label">वर पक्ष</span><h3>{wedding.groom}</h3><p>सुपुत्र — {wedding.groomFather}</p></div><div className="family-divider" aria-hidden="true"><Ornament/></div><div><span className="family-label">वधू पक्ष</span><h3>{wedding.bride}</h3><p>सुपुत्री — {wedding.brideFather}</p></div></div>
        </section>

        <section id="venue" className="venue section-space" aria-labelledby="venue-title">
          <div className="venue-art" aria-hidden="true"><div className="venue-arch"><svg viewBox="0 0 400 480" fill="none"><g stroke="currentColor" strokeWidth="1"><path d="M40 440V216Q40 160 90 158Q90 103 140 110Q160 65 200 49Q240 65 260 110Q310 103 310 158Q360 160 360 216v224Z"/><path d="M55 440V220Q55 172 104 173Q102 119 149 124Q168 82 200 66Q232 82 251 124Q298 119 296 173Q345 172 345 220v220Z"/><path d="M40 433h320M30 448h340M20 461h360M70 390h260M92 390V274q0-44 48-45 10-43 60-72 50 29 60 72 48 1 48 45v116"/><path d="M122 390V280q0-28 38-30 7-35 40-53 33 18 40 53 38 2 38 30v110M160 390V287q0-27 40-44 40 17 40 44v103M200 250v140"/>{[65,335].map(x=><g key={x}><path d={`M${x} 235v195M${x-8} 241h16M${x-8} 421h16`}/></g>)}<circle cx="200" cy="118" r="13"/><path d="m200 108 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/></g></svg><Botanical className="venue-sprig"/></div><span lang="en">WHERE OUR FOREVER BEGINS</span></div>
          <div className="venue-details" data-reveal><p className="eyebrow" lang="en">JOIN US IN {wedding.venueShortEnglish.toUpperCase()}</p><h2 id="venue-title">शुभ विवाह स्थल</h2><Ornament/><address>{wedding.venue.map(line=><span key={line}>{line}</span>)}</address><a className="burgundy-button" href={mapsURL} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>Google Maps पर खोजें</a><p className="venue-note">गाँव के पते से खोजें · पहुँचने की जानकारी परिवार से प्राप्त करें</p></div>
        </section>

        <section id="invitation" className="finale section-space" aria-labelledby="finale-title"><Botanical className="finale-leaf botanical-left"/><Botanical className="finale-leaf botanical-right"/><Petals count={12}/><div className="finale-inner" data-reveal><Lotus className="finale-lotus"/><p className="eyebrow" lang="en">YOUR PRESENCE IS OUR MOST PRECIOUS GIFT</p><h2 id="finale-title">आप सपरिवार पधारकर<br/>शुभ अवसर की शोभा बढ़ाएँ।</h2><Ornament/><p className="final-couple">{wedding.closing}</p><p className="final-date" lang="en">{dateLine} · {wedding.venueShortEnglish.toUpperCase()}</p><button className="gold-button share-button" onClick={share}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 11 6-4M9 13l6 4"/></svg>Share Invitation</button><button className="copy-link" onClick={copyLink}>Copy link</button><div className="finale-lamps"><Diya/><Diya/><Diya/></div></div></section>
      </main>
      <footer><span lang="en">THE ROYAL VIVAH</span><span>सप्रेम आमंत्रण</span><a href="#couple" lang="en">Back to the beginning</a></footer>
    </div>
    <div className={`toast ${status?'visible':''}`} role="status" aria-live="polite">{status}</div>
    {manualURL && <div className="share-fallback" role="dialog" aria-modal="true" aria-labelledby="share-title" onKeyDown={e=>{if(e.key==='Escape')setManualURL('');if(e.key==='Tab'){const items=e.currentTarget.querySelectorAll<HTMLElement>('input,button');if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items[1].focus();}else if(!e.shiftKey&&document.activeElement===items[1]){e.preventDefault();items[0].focus();}}}}><div><h2 id="share-title">Copy invitation link</h2><p>Select and copy this link to share the invitation.</p><input autoFocus readOnly value={manualURL} aria-label="Invitation URL" onFocus={e=>e.target.select()}/><button className="burgundy-button" onClick={()=>{setManualURL('');document.querySelector<HTMLButtonElement>('.share-button')?.focus();}}>Done</button></div></div>}
    <noscript><style>{'.entrance{display:none!important}.invitation-content{visibility:visible!important}.motion-control,.share-button{display:none!important}'}</style></noscript>
  </>;
}
