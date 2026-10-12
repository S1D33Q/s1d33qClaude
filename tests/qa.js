// Development-only fixture injected by the local QA server, never packaged.
const qaResults=[];
function assert(name,value){qaResults.push({name,pass:!!value});}
function ticks(n){for(let i=0;i<n;i++)update(1/60)}
function fixture(r,x=0){reset();state='playing';player.row=r;player.x=x;score=r;ensureRows();cat.position.set(x,0,-r);}
const testMode=new URLSearchParams(location.search).get('qa');
if(testMode==='tests'){
 options.sound=false;options.mode='journey';
 fixture(0);move(0,1);ticks(12);assert('Forward hop lands on exactly one row',player.row===1&&score===1&&!hop);
 move(1,0);ticks(12);assert('Sideways hop does not add distance',player.x===1&&score===1);
 move(0,-1);ticks(12);assert('Backward hop preserves furthest distance',player.row===0&&score===1);
 move(0,-1);assert('Cannot retreat before start',!hop);
 fixture(0);rows.get(1).obstacles.push(0);move(0,1);assert('Blocked destination rejects hop',!hop&&player.row===0);
 fixture(0);move(0,1);move(0,1);ticks(24);assert('Single buffered hop executes',player.row===2&&score===2);
 fixture(5);rows.get(5).movers[0].x=0;ticks(1);assert('Car overlap triggers explicit traffic failure',state==='dying'&&player.reason==='car');
 fixture(12);rows.get(12).movers.forEach((v,i)=>v.x=i?8+i*2:0);const initial=player.x;ticks(12);assert('Cat rides river log without dying',state==='playing'&&Math.abs(player.x-initial)>.03);
 fixture(12);rows.get(12).movers.forEach((v,i)=>v.x=4+i*2);ticks(1);assert('Missing river platform triggers splash',state==='dying'&&player.reason==='water');
 fixture(14);ticks(30);assert('Timber bridge is safe over water',state==='playing');
 fixture(17);time=8.8-rows.get(17).offset;ticks(1);assert('Train body triggers railway failure',state==='dying'&&player.reason==='train');
 fixture(18);ticks(1);assert('Fish collected once on contact',fish===1);ticks(20);assert('Collected fish cannot be claimed twice',fish===1);
 fixture(0);score=165;activeTime=200;let previous=solar,continuous=true;for(let i=0;i<1500;i++){update(1/60);if(solar<previous||solar-previous>.01)continuous=false;previous=solar}lighting();assert('Solar transition is continuous and monotonic',continuous);assert('Late progress activates night and collar light',night>.95&&collarLight.intensity>2.5);
 fixture(179);move(0,1);ticks(12);assert('180th journey hop reaches home and ends run',state==='won'&&score===180);if($('#modal').open)$('#modal').close();
 options.mode='endless';fixture(179);move(0,1);ticks(12);assert('Endless does not end at journey goal',state!=='won'&&rowType(180)!=='home');
 fixture(400);assert('Generated row lifecycle stays bounded',rows.size<=38);assert('Distant old rows are removed',!rows.has(0));
 reset();assert('Restart restores day, score, fish and player',score===0&&fish===0&&solar===0&&player.row===0&&hop===null);
 options.mode='journey';
 for(let kind=0;kind<4;kind++)for(const dir of [-1,1]){const v=vehicle(kind,'#dba467',dir),c=v.cabin;const ok=v.glassBounds.length>0&&v.glassBounds.every(b=>Math.abs(b.x-c.x)+b.w/2<=c.w/2+.011&&Math.abs(b.y-c.y)+b.h/2<=c.h/2&&Math.abs(b.z)+b.d/2<=c.d/2+.011);assert('Vehicle '+kind+' direction '+dir+' glass stays within cabin faces',ok);v.mesh.traverse(o=>{if(o.isMesh&&o.geometry!==boxGeometry&&o.geometry!==glowGeometry)o.geometry.dispose()})}
 reset();assert('Cat is precisely 60 percent scale',cat.scale.x===.6&&cat.scale.y===.6&&cat.scale.z===.6);
 state='playing';runStartedAt=performance.now()-12345;assert('Timer uses real active elapsed seconds',elapsedTime()>=12.345&&elapsedTime()<12.5);pause();const stopped=elapsedTime();assert('Pausing freezes the elapsed timer',state==='paused'&&runStartedAt===null&&Math.abs(stopped-12.345)<.2);pause();assert('Resuming preserves time and restarts clock',state==='playing'&&runStartedAt!==null&&elapsedTime()>=stopped);
 const savedRecords=getRecords();storage.set('journey-records',[]);stopClock();state='won';runElapsed=45.6;saveRecord();runElapsed=34.5;saveRecord();runElapsed=55.6;saveRecord();assert('Leaderboard sorts completed journeys by fastest time',getRecords()[0].seconds===34.5&&getRecords()[2].seconds===55.6);assert('Recorded times retain tenths of a second',formatTime(65.6)==='01:05.6');storage.set('journey-records',savedRecords);
 menu();const report=document.createElement('pre');report.id='qa-report';report.style='position:fixed;inset:80px 20px auto;background:#fff;padding:20px;z-index:50;font:13px monospace;max-height:75vh;overflow:auto';report.textContent=qaResults.map(r=>(r.pass?'PASS':'FAIL')+' '+r.name).join('\n');document.body.append(report);
}else if(testMode==='vehicles'){
 start();for(const row of rows.values())disposeRow(row);rows.clear();cat.visible=false;motes.visible=false;window.catGlow.visible=false;state='paused';player.row=1;camRow=4;
 for(let kind=0;kind<4;kind++)for(const dir of [-1,1]){const v=vehicle(kind,['#dba467','#81aaa6','#dc8770','#d7bc76'][kind],dir);v.mesh.position.set(dir*3.3,0,1-kind*3);scene.add(v.mesh);const stage=new THREE.Group();box(stage,dir*3.3,-.18,1-kind*3,3,.36,1.5,'#c5d1b2');bake(stage);scene.add(stage)}
 $('#hud').hidden=true;$('#touch').hidden=true;renderCamera(1);lighting();renderer.render(scene,camera);
}else if(['night','dusk','river','rail','arrival'].includes(testMode)){
 start();const r={night:162,dusk:90,river:12,rail:16,arrival:178}[testMode];player.row=r;player.x=0;score=r;ensureRows();camRow=r+3;solar=testMode==='dusk'?.55:testMode==='night'||testMode==='arrival'?1:0;activeTime=solar*200;state='paused';cat.position.set(0,0,-r);player.angle=0;updateHUD();renderCamera(1);lighting();renderer.render(scene,camera);
}else if(testMode==='performance'){
 start();state='paused';const el=document.createElement('pre');el.id='qa-report';el.style='position:fixed;bottom:10px;left:10px;background:white;z-index:30;padding:10px';document.body.append(el);const ms=performance.now();for(let i=0;i<30;i++){renderCamera(1/60);lighting();renderer.render(scene,camera)}el.textContent=JSON.stringify({meanCpuSubmissionMs:(performance.now()-ms)/30,calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries});
}
