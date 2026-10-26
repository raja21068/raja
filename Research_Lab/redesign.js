(()=>{
'use strict';
const $ = s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
// A source-grounded, static walkthrough of the published software architecture.
const stages=[
 {label:'STAGE 01 / RESEARCH QUESTION',title:'Define a falsifiable question.',text:'Idea selection creates candidate hypotheses and explicitly asks what result could refute them. In validation mode, a researcher reviews and locks protocol information before the run.',notation:'HYPOTHESIS → CRITICAL ASSESSMENT → PROTOCOL'},
 {label:'STAGE 02 / EXECUTION',title:'Execute inside an isolated environment.',text:'Generated experiments are run in a network-restricted Docker workflow. Outputs can receive code, environment, and data-provenance records. This is not a live execution in the webpage.',notation:'SOURCE + DATA + SEED → ISOLATED RUN → RESULT'},
 {label:'STAGE 03 / PROVENANCE',title:'Make every quantitative claim traceable.',text:'The research ledger links claim identifiers (C###), evidence identifiers (E###), and experiment runs (R####). A displayed result should be bound to an executed artifact, rather than inserted by a language model.',notation:'CLAIM C### ↔ EVIDENCE E### ↔ RUN R####'},
 {label:'STAGE 04 / AUDIT',title:'Check integrity—not scientific truth.',text:'Automated checks inspect declared claim bindings, protocol metadata, and isolated repeats. These gates cannot certify novelty, correct statistics, independent replication, or publication readiness.',notation:'INTEGRITY CHECKS ≠ INDEPENDENT VALIDATION'}
];
const detail=$('#workflow-detail');
$$('.workflow-tab').forEach((button)=>button.addEventListener('click',()=>{
 $$('.workflow-tab').forEach(btn=>{btn.classList.remove('active');btn.setAttribute('aria-selected','false')});
 button.classList.add('active');button.setAttribute('aria-selected','true');let s=stages[Number(button.dataset.stage)];
 detail.replaceChildren();
 const a=document.createElement('span');a.className='detail-overline';a.textContent=s.label;
 const h=document.createElement('h3');h.textContent=s.title;
 const p=document.createElement('p');p.textContent=s.text;
 const d=document.createElement('div');d.className='detail-notation';d.textContent=s.notation;
 detail.append(a,h,p,d);
}));
$$('[data-project-link]').forEach(button=>button.addEventListener('click',()=>{location.hash='#/project/'+button.dataset.projectLink}));
const search=$('#paper-search'),papers=$$('.paper-row'), count=$('#paper-count');
if(search)search.addEventListener('input',()=>{let n=0,query=search.value.toLowerCase().trim();papers.forEach(row=>{let ok=row.dataset.paper.toLowerCase().includes(query)||row.textContent.toLowerCase().includes(query);row.hidden=!ok;if(ok)n++});count.textContent=n+' selected record'+(n===1?'':'s')});
const back=$('#video-backdrop'),player=$('#video-player');let restoreFocus=null;
function closeVideo(){if(back.hidden)return;back.hidden=true;player.replaceChildren();document.body.style.overflow='';if(restoreFocus)restoreFocus.focus()}
$$('[data-video]').forEach(button=>button.addEventListener('click',()=>{restoreFocus=button;const id=button.dataset.video;if(!['bQlM9_mwnsM','vhvtOVsnYLg'].includes(id))return;back.hidden=false;document.body.style.overflow='hidden';const iframe=document.createElement('iframe');iframe.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1';iframe.title='Research demonstration video';iframe.allow='autoplay; encrypted-media; picture-in-picture; web-share';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';player.append(iframe);$('#video-close').focus()}));
$('#video-close').addEventListener('click',closeVideo);back.addEventListener('click',event=>{if(event.target===back)closeVideo()});document.addEventListener('keydown',event=>{if(event.key==='Escape')closeVideo()});
})();
