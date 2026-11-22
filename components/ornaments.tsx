import type { CSSProperties } from 'react';

export function Garlands() {
  return <svg className="jasmine-garlands" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><defs><g id="jasmine-flower"><circle r="4.5" fill="#d7cbb1"/>{[0,60,120,180,240,300].map(a=><ellipse key={a} cy="-3.7" rx="2.7" ry="4" fill="#fffdf6" stroke="#d5c7a3" strokeWidth=".3" transform={`rotate(${a})`}/>)}<circle r="1.3" fill="#bba16b"/></g></defs>{[0,1,2,3].map(n=><g key={n}><path d={`M${n*300} 0q150 132 300 0`} stroke="#7b8051" fill="none" strokeWidth="2"/>{Array.from({length:31},(_,i)=>{const t=i/30;return <use key={i} href="#jasmine-flower" x={n*300+t*300} y={264*t*(1-t)}/>;})}</g>)}</svg>;
}

export function Lotus({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 160 110" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.3"><path d="M80 91C43 69 56 30 80 9c24 21 37 60 0 82Z"/><path d="M80 91C42 94 24 64 27 31c29 3 51 23 53 60ZM80 91c38 3 56-27 53-60-29 3-51 23-53 60Z"/><path d="M80 91C42 108 10 81 5 58c29-4 56 7 75 33ZM80 91c38 17 70-10 75-33-29-4-56 7-75 33Z"/><path d="M40 100h80M55 106h50M80 20v59"/></g></svg>;
}

export function Ornament({ className = '' }: { className?: string }) {
  return <div className={`ornament ${className}`} aria-hidden="true"><span/><svg viewBox="0 0 90 36" fill="none"><g stroke="currentColor" strokeWidth="1"><path d="M45 32C25 18 36 8 45 3c9 5 20 15 0 29Z"/><path d="M45 32C20 33 13 21 15 12c13 0 23 9 30 20ZM45 32c25 1 32-11 30-20-13 0-23 9-30 20Z"/><path d="M30 28C8 31 4 18 2 20M60 28c22 3 26-10 28-8"/><circle cx="45" cy="19" r="3"/></g></svg><span/></div>;
}

export function Ganesha() {
  return <svg className="ganesha" viewBox="0 0 120 120" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M42 40C29 17 11 37 22 61c4 9 13 15 21 12M78 40c13-23 31-3 20 21-4 9-13 15-21 12M44 42c-10 25 2 40 15 37 13-2 10-18 3-16-7 1-1 12 5 13 17 3 22-23 9-34M49 43c5-4 17-4 22 0M52 53h2M68 53h2"/><path d="M41 33h38l-4-8-7 2-8-15-8 15-7-2-4 8ZM47 20l13-15 13 15M35 77c-23 5-20 29 6 25l19-7 19 7c26 4 29-20 6-25M40 84l-12 9M80 84l12 9M45 108h30M58 45h4M60 42v7"/><path d="M9 70l5-6 4 7M102 71l4-7 5 6"/><circle cx="60" cy="23" r="2"/></g></svg>;
}

export function Diya({ className = '' }: { className?: string }) {
  return <svg className={`diya ${className}`} viewBox="0 0 100 130" fill="none" aria-hidden="true"><ellipse className="flame-glow" cx="50" cy="44" rx="24" ry="31" fill="#efb64b" opacity=".14"/><path className="flame" d="M50 61C30 50 43 35 50 20c-1 20 22 26 0 41Z" fill="#F7CA6C"/><path className="flame" d="M50 61c-8-8-2-13 0-21 4 8 9 15 0 21Z" fill="#fff9da"/><g stroke="currentColor" strokeWidth="1.3"><path d="M15 64h70c-5 18-23 22-35 22S20 82 15 64Z" fill="currentColor" fillOpacity=".18"/><path d="M20 70h60M45 87v26M55 87v26M30 120c0-7 40-7 40 0ZM25 125h50M42 91h16M43 108h14"/><ellipse cx="50" cy="64" rx="35" ry="4"/></g></svg>;
}

export function Botanical({ className = '' }: { className?: string }) {
  return <svg className={`botanical ${className}`} viewBox="0 0 240 500" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1"><path d="M89 500C170 351 43 224 152 11M116 414c-3-46-44-48-50-90M119 359c54-42 54-88 70-119M110 279C67 233 87 185 57 157M117 188c58-26 56-55 74-80M131 98c-34-30-21-62-23-84"/>{Array.from({length:8},(_,i)=><g key={i} transform={`translate(${i%2?109:116} ${70+i*48}) rotate(${i%2?-50:38})`}><path d="M0 0C-8-32 5-52 21-61 30-38 23-14 0 0Z"/><path d="M1-3l18-52M7-20l-8-12M13-36l-6-10"/></g>)}<path d="M63 323c-31-2-41-26-38-47 29 4 43 17 38 47ZM186 241c-5-32 10-49 32-56 0 28-11 46-32 56ZM56 158c-27-7-35-26-29-49 26 10 35 26 29 49Z"/></g></svg>;
}

export function Bell({ style }: { style?: CSSProperties }) {
  return <svg className="bell" style={style} viewBox="0 0 50 180" fill="none" aria-hidden="true"><g stroke="currentColor"><path d="M25 0v119M22 14h6M22 30h6M22 46h6M22 62h6M22 78h6M22 94h6"/><path d="M11 150c8-7 0-24 14-26 14 2 6 19 14 26l4 7H7l4-7Z" fill="currentColor" fillOpacity=".2"/><path d="M10 151h30M21 161c0 7 8 7 8 0"/><circle cx="25" cy="121" r="3"/></g></svg>;
}

export function CeremonyArt({ kind }: { kind: string }) {
  return <svg className="ceremony-art" viewBox="0 0 300 250" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.2"><circle cx="150" cy="126" r="99" strokeOpacity=".18"/><circle cx="150" cy="126" r="92" strokeDasharray="2 7" strokeOpacity=".5"/>{kind==='kalash'?<><path d="M121 118c-44 63-15 91 29 91s73-28 29-91Z" fill="currentColor" fillOpacity=".1"/><path d="M117 119h66v9h-66ZM109 155c26 14 56 14 82 0M108 171c28 17 56 17 84 0M118 192h64M140 172h20M150 162v20"/><path d="M150 116c-29-16-20-47 0-64 20 17 29 48 0 64Z" fill="currentColor" fillOpacity=".18"/><path d="M150 119c-31-30-49-16-58-23 9 26 26 32 58 23ZM150 119c31-30 49-16 58-23-9 26-26 32-58 23ZM146 114c-21-31-25-27-34-36 2 24 15 36 34 36ZM154 114c21-31 25-27 34-36-2 24-15 36-34 36Z"/><path d="M129 70c-10-10-8-20-5-28M179 70c11-11 8-20 4-28"/></>:kind==='lotus'?<><path d="M150 185c-61-34-40-93 0-127 40 34 61 93 0 127Z" fill="currentColor" fillOpacity=".14"/><path d="M150 185c-57 7-87-42-77-95 43 7 72 40 77 95ZM150 185c57 7 87-42 77-95-43 7-72 40-77 95Z"/><path d="M150 185c-61 29-104-9-113-47 43-3 85 15 113 47ZM150 185c61 29 104-9 113-47-43-3-85 15-113 47ZM87 208h126M104 218h92"/><circle cx="150" cy="33" r="5"/><path d="M150 15v7M134 24l5 5M166 24l-5 5"/></>:<><path d="M112 65c-44 59-56 143 3 147 58 4 93-119 53-150-39-30-36 152 5 146 41-6 71-114 21-142-42-25-64 123-29 139" strokeWidth="2"/><path d="M117 66c-44 59-56 143 3 147 58 4 93-119 53-150-39-30-36 152 5 146 41-6 71-114 21-142-42-25-64 123-29 139" strokeOpacity=".45"/><path d="M158 195l-8 28M165 199l-3 27M172 198v23M99 64c18-14 37-12 51-8"/><path d="M143 51l4 12 9-4-4-12Z" fill="currentColor" fillOpacity=".3"/></>}</g></svg>;
}
