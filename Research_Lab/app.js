(() => {
  'use strict';
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const meta = {
    referee: {
      num: '001', title: 'Beihang Referee', topic: 'Agentic AI · Scientific Integrity',
      desc: 'An inspectable example of multi-perspective research review. Select a synthetic excerpt and see pre-authored evidence-oriented findings.',
      status: 'Scripted sample review', evidence: 'Research system referenced; this web demo runs no language model.',
      question: 'Can machine-assisted manuscript review make methodological weaknesses easier to identify and trace?',
      limitations: 'Sample findings are authored in advance and are not evidence of recall, precision, review quality, or agent performance.',
      repo: 'https://github.com/neekeesh03/beihang-referee'
    },
    visgen: {
      num: '002', title: 'VisGen', topic: 'Computer Graphics · Evaluation',
      desc: 'An executable HTML Canvas playground with programmatic checks for particle creation, bounds, pause, and reset behavior.',
      status: 'Live browser computation', evidence: 'The small canvas program is a newly authored educational demonstration, not the full VisGen benchmark.',
      question: 'Can behavioral requirements be checked through observable interaction rather than screenshots alone?',
      limitations: 'This tests one simple synthetic animation; passing its checks does not establish the published system’s benchmark results.'
    },
    autolabel: {
      num: '003', title: 'AutoLabel', topic: 'Medical AI · Human-in-the-loop',
      desc: 'A synthetic image and editable segmentation mask. Correct errors with a brush and watch pixel-level Dice and IoU change.',
      status: 'Interactive synthetic example', evidence: 'Synthetic image, synthetic ground truth, manually constructed initial mask; no diagnostic data or trained inference.',
      question: 'How do human corrections alter overlap-based segmentation measurements?',
      limitations: 'This demonstrates mask metrics and annotation interaction only, not real CT/MRI segmentation performance or clinical safety.'
    },
    federated: {
      num: '004', title: 'Federated AI', topic: 'Privacy · Distributed Learning',
      desc: 'Train a two-feature logistic-regression model across synthetic clients using FedAvg or simplified FedProx local updates.',
      status: 'Live toy numerical simulation', evidence: 'Actual calculations run in JavaScript on deterministically generated synthetic data.',
      question: 'How can distribution shift and label poisoning affect federated training in a small model?',
      limitations: 'A toy classifier is not a security benchmark. This does not implement differential privacy, secure aggregation, or a validated threat model.'
    },
    autoresearch: {
      num: '005', title: 'AutoResearch', topic: 'Autonomous Agents · Research Automation',
      desc: 'A proposed research trace explorer for idea discovery, retrieval, experiment execution, and reproducibility audits.',
      status: 'Design preview only', evidence: 'This webpage shows a schematic workflow; it does not execute an agent or replay a captured run.',
      question: 'What should remain inspectable when a research pipeline makes autonomous decisions?',
      limitations: 'The workflow is illustrative and should not be mistaken for a completed autonomous research result.'
    },
    ctt: {
      num: '006', title: 'Brain Dynamics', topic: 'EEG · Cognitive Neuroscience',
      desc: 'A proposed public-EEG workbench for event alignment, signal exploration, and reproducible time-window analysis.',
      status: 'Design preview only', evidence: 'This page includes no EEG recording, model fit, or physiological inference.',
      question: 'Can task-timing hypotheses be subjected to reproducible tests using openly available EEG datasets?',
      limitations: 'No claim about CAP, Primode, or CTT is validated by this preview. Event timing alone is not physiological corroboration.'
    }
  };
  const backdrop = $('#dialog-backdrop');
  const closeButton = $('#dialog-close');
  let active = null, cleanup = null, previousFocus = null;

  const filters = $$('.filter');
  const search = $('#project-search');
  function applyFilters(){
    const activeFilter = $('.filter.is-active')?.dataset.filter || 'all';
    const query = search.value.toLocaleLowerCase().trim();
    let count = 0;
    $$('.project-card').forEach(card => {
      const categories = card.dataset.category.split(' ');
      const words = card.dataset.search;
      const show = (activeFilter === 'all' || categories.includes(activeFilter)) && words.includes(query);
      card.hidden = !show;
      count += show ? 1 : 0;
    });
    $('#empty-results').hidden = count !== 0;
  }
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => { item.classList.remove('is-active'); item.setAttribute('aria-pressed', 'false'); });
    button.classList.add('is-active'); button.setAttribute('aria-pressed', 'true'); applyFilters();
  }));
  search.addEventListener('input', applyFilters);
  $('#clear-filters').addEventListener('click',()=>{search.value='';filters[0].click();});
  $('#nav-toggle').addEventListener('click',()=>{
    const nav = $('#primary-nav'), open = nav.classList.toggle('is-open');
    $('#nav-toggle').setAttribute('aria-expanded', String(open));
    $('#nav-toggle').setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  $$('.primary-nav a').forEach(a=>a.addEventListener('click',()=>{
    $('#primary-nav').classList.remove('is-open'); $('#nav-toggle').setAttribute('aria-expanded','false');
  }));

  function asideHTML(info) {
    return `<span class="side-num">PROJECT / ${info.num}</span><h2 id="dialog-title">${info.title}</h2>
      <p>${info.desc}</p><div class="aside-line"></div>
      <div class="side-label">Research domain</div><div class="aside-meta"><span>${info.topic}</span></div>
      <div class="aside-line"></div><div class="side-label">Demonstration status</div><div class="aside-meta"><span>${info.status}</span></div>
      <div class="aside-line"></div><div class="side-label">Core question</div><p>${info.question}</p>
      ${info.repo ? `<div class="aside-links"><a href="${info.repo}" target="_blank" rel="noopener noreferrer">Research repository ↗</a></div>` : ''}
      <p class="side-note">No published experimental claims are established by the website demonstration itself.</p>`;
  }
  function wrapLab(info, content, label = 'DEMONSTRATION') {
    return `<div class="workspace-header"><div><span class="side-label">RESEARCH WORKSPACE / ${info.num}</span><h3>${info.title} workbench</h3><p>Explore a transparent research interaction.</p></div><span class="workspace-tag">${label}</span></div>
      ${content}<div class="evidence-box"><h4>Evidence &amp; limitations</h4>
      <div class="evidence-grid"><div class="evidence-mini"><span>WHAT ACTUALLY RUNS</span><strong>${info.evidence}</strong></div><div class="evidence-mini"><span>BOUNDARY OF INTERPRETATION</span><strong>${info.limitations}</strong></div></div></div>`;
  }
  const scenarios = {
    medical: {
      title: 'Single-center classifier',
      text: 'We trained a medical-image classifier on 220 scans collected at one hospital and report 97% accuracy. We randomly split the scans into training and testing sets. Our model generalizes to clinical use.',
      positives: [{role:'Scientific writing',label:'STRENGTH',txt:'The statement identifies sample size and an explicit claimed outcome.'}],
      issues: [
        {role:'Methodology reviewer',label:'MAJOR CONCERN',txt:'The unit of randomization is unclear. Multiple scans from the same patient could enter both partitions and inflate performance.'},
        {role:'Evidence reviewer',label:'MAJOR CONCERN',txt:'Single-center accuracy cannot establish external clinical generalization. An independent cohort and confidence intervals are needed.'},
        {role:'Reproducibility reviewer',label:'REPORTING GAP',txt:'Class counts, preprocessing, patient-level grouping, threshold selection, and specificity/sensitivity are unspecified.'}
      ]
    },
    privacy: {
      title: 'Privacy-preserving training',
      text: 'Our federated training method guarantees complete privacy because raw records remain inside each institution. The proposed algorithm also outperforms all existing methods.',
      positives: [{role:'System-design reviewer',label:'STRENGTH',txt:'The example states that raw records are not centrally pooled.'}],
      issues: [
        {role:'Security reviewer',label:'MAJOR CONCERN',txt:'No raw-data transfer does not imply complete privacy. Gradients, updates, or auxiliary outputs may leak information.'},
        {role:'Evidence reviewer',label:'MAJOR CONCERN',txt:'Outperforms all existing methods is not falsifiable without a defined comparator set, evaluation metrics, and datasets.'},
        {role:'Reproducibility reviewer',label:'REPORTING GAP',txt:'Threat model, client sampling, aggregation, attack tests, and implementation details must be reported.'}
      ]
    },
    careful: {
      title: 'Carefully scoped claim',
      text: 'On one held-out synthetic dataset, our baseline achieved 83% accuracy (95% bootstrap CI: 79–87%). We use a fixed split and release the evaluation script. We do not infer clinical utility from this experiment.',
      positives: [
        {role:'Methodology reviewer',label:'STRENGTH',txt:'The claim is limited to a held-out synthetic dataset and avoids generalizing to clinical use.'},
        {role:'Evidence reviewer',label:'STRENGTH',txt:'Point estimate and interval are both reported, though the interval method still needs checking.'}
      ],
      issues: [{role:'Reproducibility reviewer',label:'FOLLOW-UP',txt:'Specify the number of bootstrap draws, interval construction, split provenance, and exact code version. Verify that the synthetic data represent the intended research question.'}]
    }
  };
  function refereeHTML(){
    return `<div class="workspace-panel">
      <label class="lab-label" for="review-scenario">CHOOSE A SYNTHETIC RESEARCH EXCERPT</label>
      <select class="lab-select" id="review-scenario"><option value="medical">Medical AI: single-center validation</option><option value="privacy">Federated AI: privacy claims</option><option value="careful">Qualified synthetic benchmark report</option></select>
      <blockquote class="sample-quote" id="review-quote"></blockquote>
      <p class="lab-hint">All examples and feedback are pre-authored. This workbench shows how inspectable review findings could be organized; it does not run Beihang Referee agents.</p>
      <div class="lab-actions"><button class="lab-btn" id="run-review">Inspect example <span aria-hidden="true">→</span></button><button class="lab-btn secondary" id="export-review" disabled>Export review JSON ↓</button></div>
    </div><div class="workspace-panel"><span class="lab-label">INSPECTABLE FINDINGS</span><div id="review-results" class="empty-lab">Select “Inspect example” to reveal the scripted reviewer perspectives.</div></div>`;
  }
  function initReferee(){
    const select = $('#review-scenario', backdrop), quote = $('#review-quote', backdrop), results = $('#review-results',backdrop), exportBtn = $('#export-review',backdrop);
    let last = null;
    function reset(){quote.textContent = scenarios[select.value].text;results.className = 'empty-lab';results.textContent = 'Select “Inspect example” to reveal the scripted reviewer perspectives.';exportBtn.disabled = true;last=null;}
    select.addEventListener('change',reset); reset();
    $('#run-review',backdrop).addEventListener('click',()=>{
      last = scenarios[select.value];
      results.className = '';
      results.innerHTML = `<div class="status-strip"><span>REVIEW PERSPECTIVES <b>${last.positives.length + last.issues.length}</b></span><span>STATUS <b>SCRIPTED EXAMPLE</b></span></div>${[...last.positives,...last.issues].map(f=>`<div class="finding ${f.label==='STRENGTH'?'praise':'issue'}"><div class="finding-top"><b>${f.role}</b><em>${f.label}</em></div><p>${f.txt}</p></div>`).join('')}`;
      exportBtn.disabled=false;
    });
    exportBtn.addEventListener('click',()=>{if(!last)return;downloadText('sample-review-'+select.value+'.json',JSON.stringify({status:'SCRIPTED_SAMPLE_NOT_AI_OUTPUT',title:last.title,excerpt:last.text,findings:[...last.positives,...last.issues]},null,2),'application/json');});
  }
  function visgenHTML(){return `<div class="workspace-panel"><span class="lab-label">LIVE CANVAS / BEHAVIOR UNDER TEST</span>
    <div class="canvas-frame"><canvas id="visgen-canvas" width="720" height="328" aria-label="Interactive particle canvas; click to create new particles"></canvas></div>
    <div class="canvas-toolbar"><button class="lab-btn" id="particle-add">+ Add particle</button><button class="lab-btn secondary" id="particle-pause">Pause</button><button class="lab-btn ghost" id="particle-reset">Reset</button><div class="range-field"><label for="particle-speed">Simulation speed <output id="particle-speed-output">1.0×</output></label><input id="particle-speed" type="range" min="0.5" max="3" step="0.5" value="1"></div></div>
    <div class="status-strip"><span>PARTICLES <b id="particle-count">0</b></span><span>STATE <b id="particle-state">RUNNING</b></span><span>INTERACTION <b>CLICK CANVAS TO ADD</b></span></div>
  </div><div class="workspace-panel"><div class="workspace-header"><div><span class="lab-label">AUTOMATED REQUIREMENT CHECKS</span><p>Run tests against the current JavaScript canvas model.</p></div><button class="lab-btn secondary" id="test-visgen">Run checks ↗</button></div><div id="visgen-tests" class="empty-lab">No tests run yet.</div></div>`}
  function initVisgen(){
    const canvas=$('#visgen-canvas',backdrop),ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
    let particles=[],paused=false,spd=1,raf=0,last=0;
    const rand=(()=>{let seed=4812;return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}})();
    function count(){$('#particle-count',backdrop).textContent=String(particles.length);$('#particle-state',backdrop).textContent=paused?'PAUSED':'RUNNING';}
    function add(x=40+rand()*(W-80),y=40+rand()*(H-80)){
      const r=6+rand()*7;particles.push({x:Math.min(W-r,Math.max(r,x)),y:Math.min(H-r,Math.max(r,y)),vx:(rand()-.5)*3.4 || 1,vy:(rand()-.5)*3.4 || -1,r,col:['#bbef89','#93d6e2','#f4bd9f'][particles.length%3]});count();
    }
    function step(dt){if(paused)return;for(const p of particles){p.x+=p.vx*dt*spd;p.y+=p.vy*dt*spd;if(p.x<p.r){p.x=p.r;p.vx=Math.abs(p.vx)}if(p.x>W-p.r){p.x=W-p.r;p.vx=-Math.abs(p.vx)}if(p.y<p.r){p.y=p.r;p.vy=Math.abs(p.vy)}if(p.y>H-p.r){p.y=H-p.r;p.vy=-Math.abs(p.vy)}}}
    function draw(){ctx.clearRect(0,0,W,H);ctx.fillStyle='#09181e';ctx.fillRect(0,0,W,H);ctx.lineWidth=1;ctx.strokeStyle='#284144';for(let x=0;x<W;x+=34){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=0;y<H;y+=34){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r+6,0,Math.PI*2);ctx.fillStyle=p.col+'19';ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.col;ctx.fill();});ctx.font='12px monospace';ctx.fillStyle='#78958e';ctx.fillText('CANVAS / X: '+W+'  Y: '+H,16,22);}
    function loop(t){if(!active||active!=='visgen')return;const dt=Math.min(2.1,(t-last)/16.667 || 1);last=t;step(dt);draw();raf=requestAnimationFrame(loop)}
    for(let i=0;i<6;i++)add();draw();raf=requestAnimationFrame(loop);
    $('#particle-add',backdrop).addEventListener('click',()=>add());
    canvas.addEventListener('click',e=>{const rect=canvas.getBoundingClientRect();add((e.clientX-rect.left)*W/rect.width,(e.clientY-rect.top)*H/rect.height)});
    $('#particle-pause',backdrop).addEventListener('click',e=>{paused=!paused;e.currentTarget.textContent=paused?'Resume':'Pause';count()});
    $('#particle-reset',backdrop).addEventListener('click',()=>{particles=[];count();draw();$('#visgen-tests',backdrop).textContent='No tests run since reset.';$('#visgen-tests',backdrop).className='empty-lab'});
    $('#particle-speed',backdrop).addEventListener('input',e=>{spd=Number(e.target.value);$('#particle-speed-output',backdrop).textContent=spd.toFixed(1)+'×'});
    $('#test-visgen',backdrop).addEventListener('click',()=>{
      const original=particles.map(p=>({...p})),wasPaused=paused;
      const initial=particles.length;add();const addPass=particles.length===initial+1;particles=original.map(p=>({...p}));
      let safe=particles.every(p=>p.x>=p.r&&p.x<=W-p.r&&p.y>=p.r&&p.y<=H-p.r);
      if(!particles.length){add();safe=particles.every(p=>p.x>=p.r&&p.x<=W-p.r);particles=[];}
      paused=true;const before=JSON.stringify(particles);step(4);const pausePass=before===JSON.stringify(particles);paused=wasPaused;
      const snapshot=particles;particles=[];const resetPass=particles.length===0;particles=snapshot;count();
      const checks=[['Add particle increases count',addPass],['Current particles stay inside canvas',safe],['Paused simulation does not move particles',pausePass],['Reset clears the particle array',resetPass]];
      const result=$('#visgen-tests',backdrop);result.className='';result.innerHTML=checks.map(([t,ok])=>`<div class="finding"><div class="finding-top"><b>${t}</b><em class="${ok?'result-pass':'result-fail'}">${ok?'PASS':'FAIL'}</em></div></div>`).join('')+`<p class="lab-hint">${checks.filter(x=>x[1]).length}/${checks.length} live model assertions passed. This is not an external benchmark suite.</p>`;
    });
    return()=>cancelAnimationFrame(raf);
  }
  function autolabelHTML(){return `<div class="notice">Synthetic image demonstration. This is not MRI/CT data, an AI-generated segmentation, or a diagnostic tool.</div><div class="workspace-panel" style="margin-top:16px"><div class="mask-grid"><div><span class="lab-label">SYNTHETIC IMAGE</span><div class="canvas-frame"><canvas id="scan-src" width="210" height="210" aria-label="Grayscale generated image" role="img"></canvas></div></div><div><span class="lab-label">EDITABLE PREDICTED MASK</span><div class="canvas-frame"><canvas id="scan-mask" width="210" height="210" aria-label="Editable simulated segmentation mask; pointer interactions paint or erase" title="Drag to paint or erase the mask"></canvas></div></div></div><div class="metric-row"><div class="metric"><b id="metric-dice">—</b><span>DICE COEFFICIENT</span></div><div class="metric"><b id="metric-iou">—</b><span>INTERSECTION / UNION</span></div><div class="metric"><b id="metric-edits">0</b><span>PIXELS EDITED</span></div></div><div class="canvas-toolbar"><button class="lab-btn" id="mask-paint">Paint mask</button><button class="lab-btn secondary" id="mask-erase">Erase mask</button><button class="lab-btn ghost" id="mask-reset">Reset mask</button><div class="range-field"><label for="mask-brush">Brush size <output id="mask-brush-out">8 px</output></label><input type="range" min="3" max="22" value="8" id="mask-brush"></div></div><div class="lab-actions"><label class="lab-hint"><input type="checkbox" id="mask-truth"> Show ground-truth outline (orange)</label><button class="lab-btn ghost" id="mask-export">Export corrected mask PNG ↓</button></div><p class="lab-hint">Green is your editable mask. Drag to alter it. Dice and IoU compare against a synthetic hidden reference mask.</p></div>`}
  function initAutoLabel(){
    const N=210,S=N*N,src=$('#scan-src',backdrop),dst=$('#scan-mask',backdrop),srcCtx=src.getContext('2d'),dstCtx=dst.getContext('2d');
    const sourceData=srcCtx.createImageData(N,N),truth=new Uint8Array(S),initial=new Uint8Array(S);let mask=new Uint8Array(S),brush=8,tool='paint',pointerDown=false,showTruth=false,edits=0;
    let seed=71;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
    for(let y=0;y<N;y++)for(let x=0;x<N;x++){
      const i=y*N+x, j=4*i, cx=x-105,cy=y-106,inside=(cx/82)**2+(cy/92)**2<1;
      const a=Math.sin(x*.16+y*.07)*10+Math.sin(x*.06-y*.23)*12+(random()-.5)*18;
      const edge=((cx/87)**2+(cy/97)**2<1)&&!inside;
      const val=inside?Math.round(93+a+17*Math.cos(Math.sqrt(cx*cx+cy*cy)*.2)):edge?147:16+random()*9;
      sourceData.data[j]=val;sourceData.data[j+1]=val+3;sourceData.data[j+2]=val+7;sourceData.data[j+3]=255;
      const irregular=Math.sin((x+y)*.13)*3 + Math.cos(y*.17)*2;
      truth[i]=((x-128)/(27+irregular))**2+((y-115)/(21+irregular))**2<=1?1:0;
      initial[i]=((x-119)/26)**2+((y-109)/21)**2<=1?1:0;
    }
    srcCtx.putImageData(sourceData,0,0);mask=initial.slice();
    function redraw(){
      const img=new ImageData(new Uint8ClampedArray(sourceData.data),N,N);
      for(let y=0;y<N;y++)for(let x=0;x<N;x++){
        const i=y*N+x,j=i*4;
        if(mask[i]){img.data[j]=Math.floor(img.data[j]*.55+110);img.data[j+1]=Math.floor(img.data[j+1]*.42+132);img.data[j+2]=Math.floor(img.data[j+2]*.64+72)}
        if(showTruth&&truth[i]&&(x===0||y===0||x===N-1||y===N-1||!truth[i-1]||!truth[i+1]||!truth[i-N]||!truth[i+N])){img.data[j]=249;img.data[j+1]=168;img.data[j+2]=78}
      }
      dstCtx.putImageData(img,0,0);
      let nmask=0,ntruth=0,inter=0,union=0;
      for(let i=0;i<S;i++){if(mask[i])nmask++;if(truth[i])ntruth++;if(mask[i]&&truth[i])inter++;if(mask[i]||truth[i])union++;}
      $('#metric-dice',backdrop).textContent=(2*inter/(nmask+ntruth||1)).toFixed(3);
      $('#metric-iou',backdrop).textContent=(inter/(union||1)).toFixed(3);
      $('#metric-edits',backdrop).textContent=String(edits);
    }
    function paint(e){const r=dst.getBoundingClientRect(),x=Math.floor((e.clientX-r.left)*N/r.width),y=Math.floor((e.clientY-r.top)*N/r.height),b2=brush*brush;
      for(let iy=Math.max(0,y-brush);iy<=Math.min(N-1,y+brush);iy++)for(let ix=Math.max(0,x-brush);ix<=Math.min(N-1,x+brush);ix++)if((ix-x)**2+(iy-y)**2<=b2){const id=iy*N+ix,value=tool==='paint'?1:0;if(mask[id]!==value){mask[id]=value;edits++}}redraw();
    }
    dst.addEventListener('pointerdown',e=>{pointerDown=true;dst.setPointerCapture(e.pointerId);paint(e)});
    dst.addEventListener('pointermove',e=>{if(pointerDown)paint(e)});
    dst.addEventListener('pointerup',()=>{pointerDown=false});dst.addEventListener('pointercancel',()=>{pointerDown=false});
    $('#mask-paint',backdrop).addEventListener('click',()=>{tool='paint';$('#mask-paint',backdrop).className='lab-btn';$('#mask-erase',backdrop).className='lab-btn secondary'});
    $('#mask-erase',backdrop).addEventListener('click',()=>{tool='erase';$('#mask-erase',backdrop).className='lab-btn';$('#mask-paint',backdrop).className='lab-btn secondary'});
    $('#mask-reset',backdrop).addEventListener('click',()=>{mask=initial.slice();edits=0;redraw()});
    $('#mask-brush',backdrop).addEventListener('input',e=>{brush=Number(e.target.value);$('#mask-brush-out',backdrop).textContent=brush+' px'});
    $('#mask-truth',backdrop).addEventListener('change',e=>{showTruth=e.target.checked;redraw()});
    $('#mask-export',backdrop).addEventListener('click',()=>{const c=document.createElement('canvas');c.width=N;c.height=N;const x=c.getContext('2d'),im=x.createImageData(N,N);for(let i=0;i<S;i++){const v=mask[i]?255:0;im.data[4*i]=v;im.data[4*i+1]=v;im.data[4*i+2]=v;im.data[4*i+3]=255;}x.putImageData(im,0,0);const link=document.createElement('a');link.href=c.toDataURL('image/png');link.download='synthetic-corrected-mask.png';link.click()});
    redraw();
  }
  function federatedHTML(){return `<div class="workspace-panel"><span class="lab-label">CONFIGURE TOY FEDERATED TRAINING</span><div class="lab-fieldset">
      <label>Number of institutions <output id="f-client-out">5</output><input id="f-clients" type="range" min="3" max="8" value="5"></label>
      <label>Distribution shift <select id="f-hetero"><option value="0.15">Low</option><option value="0.70" selected>Medium</option><option value="1.20">High</option></select></label>
      <label>Label-poisoning clients <output id="f-attack-out">0</output><input id="f-attack" type="range" min="0" max="2" value="0"></label>
      <label>Local update rule<select id="f-method"><option value="fedavg">FedAvg</option><option value="fedprox">FedProx (simplified)</option></select></label>
      <label>Global rounds <output id="f-rounds-out">20</output><input id="f-rounds" type="range" min="10" max="30" step="5" value="20"></label>
    </div><div class="lab-actions"><button class="lab-btn" id="f-run">Run experiment ↗</button><button class="lab-btn secondary" id="f-compare">Compare both algorithms</button></div>
    <p class="lab-hint">A deterministic, two-feature synthetic classification task. Training runs locally in the browser; no external service or personal data.</p></div>
    <div class="workspace-panel"><span class="lab-label">VALIDATION ACCURACY / ACTUAL COMPUTATION</span><div class="lab-chart" id="f-chart"><div class="empty-lab">Select “Run experiment” to calculate and plot a result.</div></div><div class="chart-legend"><span><i class="key"></i> FedAvg</span><span><i class="key alt"></i> FedProx</span></div>
    <div class="metric-row"><div class="metric"><b id="f-accuracy">—</b><span>FINAL ACCURACY</span></div><div class="metric"><b id="f-clients-num">—</b><span>CLIENTS</span></div><div class="metric"><b id="f-point-count">—</b><span>TRAINING SAMPLES</span></div></div><div class="status-strip" id="f-status">No simulation executed.</div></div>`}
  function initFederated(){
    const fields=[['f-clients','f-client-out'],['f-attack','f-attack-out'],['f-rounds','f-rounds-out']];
    fields.forEach(([id,out])=>$('#'+id,backdrop).addEventListener('input',e=>{$('#'+out,backdrop).textContent=e.target.value;}));
    function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
    const sigmoid=z=>1/(1+Math.exp(-Math.max(-30,Math.min(30,z))));
    function settings(){return{clients:Number($('#f-clients',backdrop).value),attack:Number($('#f-attack',backdrop).value),hetero:Number($('#f-hetero',backdrop).value),rounds:Number($('#f-rounds',backdrop).value),method:$('#f-method',backdrop).value}}
    function dataset(s){
      const r=rng(82319);const clients=[];for(let k=0;k<s.clients;k++){const data=[];let shift=(k-(s.clients-1)/2)*s.hetero/s.clients*2;for(let i=0;i<64;i++){
        const x=(r()*2-1)*1.35+shift,y=(r()*2-1)*1.35+shift*.5;
        let label=(x+.42*y-.1+(r()-.5)*.5>0)?1:0;
        if(k<s.attack&&r()<.75)label=1-label;
        data.push([x,y,label]);}clients.push(data);}
      const test=[];for(let i=0;i<600;i++){const x=(r()*2-1)*1.5,y=(r()*2-1)*1.5;test.push([x,y,x+.42*y-.1+(r()-.5)*.5>0?1:0]);}
      return {clients,test};
    }
    function train(s,method){
      const ds=dataset(s);let w=[.02,-.01,0];const accuracy=()=>ds.test.reduce((sum,[x,y,label])=>sum+((sigmoid(w[0]*x+w[1]*y+w[2])>=.5?1:0)===label?1:0),0)/ds.test.length;
      const series=[accuracy()];for(let round=0;round<s.rounds;round++){
        let accumulated=[0,0,0];for(const client of ds.clients){const local=w.slice();for(let epoch=0;epoch<3;epoch++)for(const [x,y,label] of client){let pred=sigmoid(local[0]*x+local[1]*y+local[2]);const err=pred-label,features=[x,y,1];for(let d=0;d<3;d++){const prox=method==='fedprox'?.27*(local[d]-w[d]):0;local[d]-=.065*(err*features[d]+prox);}}
          for(let d=0;d<3;d++)accumulated[d]+=local[d]/s.clients;
        }
        w=accumulated;series.push(accuracy());
      }
      return {series,total:ds.clients.reduce((a,c)=>a+c.length,0)};
    }
    function plot(lines,rounds){const W=700,H=205,L=52,R=20,T=15,B=29;
      const x=i=>L+i/rounds*(W-L-R),y=p=>T+(1-p)*(H-T-B);let svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Validation accuracy across federated training rounds"><rect x="0" y="0" width="${W}" height="${H}" fill="#09191d"/>`;
      for(let i=0;i<=4;i++){const val=i/4,yy=y(val);svg+=`<line x1="${L}" y1="${yy}" x2="${W-R}" y2="${yy}" stroke="#27453d" stroke-dasharray="4 5"/><text x="${L-11}" y="${yy+4}" fill="#8aa69a" text-anchor="end" font-size="12">${Math.round(val*100)}%</text>`}
      for(let i=0;i<=4;i++){const xval=Math.round(rounds*i/4);svg+=`<text x="${x(xval)}" y="${H-5}" fill="#8aa69a" text-anchor="middle" font-size="12">${xval}</text>`}
      for(const [method,s] of Object.entries(lines)){const col=method==='fedavg'?'#bbef89':'#93b9e8',points=s.series.map((p,i)=>`${x(i).toFixed(2)},${y(p).toFixed(2)}`).join(' ');svg+=`<polyline points="${points}" fill="none" stroke="${col}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`;const n=s.series.length-1;svg+=`<circle cx="${x(n)}" cy="${y(s.series[n])}" r="5" fill="${col}"/>`;}
      return svg+'</svg>';
    }
    function execute(compare){const s=settings();const lines=compare?{fedavg:train(s,'fedavg'),fedprox:train(s,'fedprox')}:{[s.method]:train(s,s.method)};
      $('#f-chart',backdrop).innerHTML=plot(lines,s.rounds);const chosen=lines[s.method]||lines.fedavg;
      $('#f-accuracy',backdrop).textContent=(chosen.series.at(-1)*100).toFixed(1)+'%';$('#f-clients-num',backdrop).textContent=s.clients;$('#f-point-count',backdrop).textContent=chosen.total;
      $('#f-status',backdrop).textContent=`Executed ${s.rounds} rounds · ${s.attack} poisoned client(s) · ${compare?'method comparison':s.method} · reproducible seed 82319. No privacy guarantees.`;
    }
    $('#f-run',backdrop).addEventListener('click',()=>execute(false));$('#f-compare',backdrop).addEventListener('click',()=>execute(true));
  }
  function conceptHTML(id){
    if(id==='autoresearch')return `<div class="notice">Design concept—not a live autonomous agent or an actual execution trace.</div>
      <div class="workspace-panel" style="margin-top:16px"><span class="lab-label">PROPOSED AUDITABLE WORKFLOW</span><ol class="trace-list"><li><span>01</span><div><b>Hypothesis and novelty screen</b><p>Record the question, excluded prior approaches, and claimed novelty.</p></div></li><li><span>02</span><div><b>Evidence retrieval</b><p>Attach source identifiers, retrieval timestamps, and support/contradiction links.</p></div></li><li><span>03</span><div><b>Reproducible experiment</b><p>Capture code version, environment, dataset provenance, and test seeds.</p></div></li><li><span>04</span><div><b>Independent verification</b><p>Compare outputs against controls, negative findings, and alternative explanations.</p></div></li><li><span>05</span><div><b>Research artifact publication</b><p>Publish a traceable report only when the supporting evidence is inspectable.</p></div></li></ol><p class="lab-hint">A future integration should display authenticated, versioned execution records rather than hard-coded success stories.</p></div>`;
    return `<div class="notice">Design concept—not a real EEG recording or confirmation of any cognitive theory.</div><div class="workspace-panel" style="margin-top:16px"><span class="lab-label">PROPOSED EEG EXPLORER</span><div class="lab-chart"><svg viewBox="0 0 700 205" role="img" aria-label="Illustrative synthetic sinusoidal traces, not recorded EEG"><g stroke="#244c48" stroke-width="1"><path d="M0 45H700M0 100H700M0 155H700M50 0V205M150 0V205M250 0V205M350 0V205M450 0V205M550 0V205M650 0V205"/></g><path id="ctt-wave-1" stroke="#bbef89" stroke-width="2" fill="none"/><path id="ctt-wave-2" stroke="#96bfdc" stroke-width="1.5" fill="none"/></svg></div><div class="chart-legend"><span><i class="key"></i> illustrative waveform 1</span><span><i class="key alt"></i> illustrative waveform 2</span></div><p class="lab-hint">A real implementation would load public BIDS metadata and event-aligned EEG with documented filtering, artifact rejection, statistical baselines, and controlled hypotheses.</p><ul class="trace-list"><li><span>01</span><div><b>Event alignment</b><p>Explicit triggers, timestamps, and trial exclusions.</p></div></li><li><span>02</span><div><b>Signal provenance</b><p>Dataset ID, subject/session, electrode montage, and preprocessing version.</p></div></li><li><span>03</span><div><b>Hypothesis tests</b><p>Preregistered features, uncertainty, confound checks, and negative controls.</p></div></li></ul></div>`;
  }
  function initConcept(id){if(id==='ctt'){
    const wave=(base,k)=>Array.from({length:701},(_,i)=>`${i},${(base+Math.sin(i*.07+k)*11+Math.sin(i*.22+k)*7+Math.sin(i*.41+k)*3).toFixed(2)}`).join(' ');
    $('#ctt-wave-1',backdrop).setAttribute('d','M'+wave(86,0).replaceAll(' ',' L'));
    $('#ctt-wave-2',backdrop).setAttribute('d','M'+wave(135,1.8).replaceAll(' ',' L'));
  }}
  function downloadText(filename,content,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
  function openProject(id){
    const info=meta[id];if(!info)return;
    if(active===id)return;
    if(cleanup)cleanup();cleanup=null;
    previousFocus = previousFocus || document.activeElement;
    active=id;
    $('#dialog-aside').innerHTML=asideHTML(info);
    const content=id==='referee'?refereeHTML():id==='visgen'?visgenHTML():id==='autolabel'?autolabelHTML():id==='federated'?federatedHTML():conceptHTML(id);
    const label=id==='referee'?'SCRIPTED REVIEW':id==='visgen'?'LIVE CANVAS':id==='autolabel'?'SYNTHETIC MASK':id==='federated'?'TOY TRAINING':'DESIGN PREVIEW';
    $('#dialog-main').innerHTML=wrapLab(info,content,label);
    backdrop.hidden=false;document.body.classList.add('modal-open');
    $('#lab-dialog').scrollTop=0;$('#dialog-aside').scrollTop=0;
    if(id==='referee')initReferee();else if(id==='visgen')cleanup=initVisgen();else if(id==='autolabel')initAutoLabel();else if(id==='federated')initFederated();else initConcept(id);
    closeButton.focus();
  }
  function hideDialog(){if(!active)return;active=null;if(cleanup){cleanup();cleanup=null}backdrop.hidden=true;document.body.classList.remove('modal-open');if(previousFocus&&previousFocus.isConnected)previousFocus.focus();previousFocus=null}
  function route(){const match=decodeURI(location.hash).match(/^#\/project\/(referee|visgen|autolabel|federated|autoresearch|ctt)$/);if(match){openProject(match[1]);}else hideDialog();}
  $$('.project-card').forEach(button=>button.addEventListener('click',()=>{const hash='#/project/'+button.dataset.open;if(location.hash===hash)openProject(button.dataset.open);else location.hash=hash;}));
  closeButton.addEventListener('click',()=>{location.hash='#projects';hideDialog()});
  backdrop.addEventListener('click',e=>{if(e.target===backdrop){location.hash='#projects';hideDialog()}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active){location.hash='#projects';hideDialog()}if(e.key==='Tab'&&active){const focusable=$$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex="0"]',$('#lab-dialog'));const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
  window.addEventListener('hashchange',route);route();
})();
