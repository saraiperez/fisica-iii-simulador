const app = document.getElementById("app");
const navButtons = [...document.querySelectorAll(".nav-link")];
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

/* Menú hamburguesa para dispositivos móviles */
function toggleSidebar(){
  sidebar.classList.toggle("active");
  sidebarOverlay.classList.toggle("active");
}

if(menuToggle && sidebarOverlay){
  menuToggle.addEventListener("click", toggleSidebar);
  sidebarOverlay.addEventListener("click", toggleSidebar);
}

const theoryKirchhoff = `
<div class="theory-card">
<h2>Fundamento teórico: Leyes de Kirchhoff</h2>
<h3>1. Conceptos fundamentales</h3>
<p><b>Nodo:</b> punto donde se unen dos o más elementos eléctricos. <b>Malla:</b> trayectoria cerrada de conducción. La corriente se mide en amperios (A), el voltaje en voltios (V) y la resistencia en ohmios (Ω).</p>
<h3>2. Primera ley: Ley de Corriente de Kirchhoff (LCK)</h3>
<p>Se basa en la conservación de la carga eléctrica. La suma algebraica de las corrientes en un nodo es cero. La corriente que entra al nodo es igual a la corriente que sale.</p><div class="formula">Σ I = 0</div>
<h3>3. Segunda ley: Ley de Voltaje de Kirchhoff (LVK)</h3>
<p>Se basa en la conservación de la energía. La suma algebraica de las diferencias de potencial alrededor de una malla cerrada es cero.</p><div class="formula">Σ V = 0</div>
<h3>4. Ley de Ohm y potencia</h3><div class="formula">V = I · R</div> <div class="formula">P = V · I</div>
<h3>5. Procedimiento de análisis</h3>
<ol><li>Identificar los elementos, nodos y mallas.</li><li>Asignar sentidos de corriente.</li><li>Aplicar la ley de nodos y la ley de mallas.</li><li>Resolver las ecuaciones y comprobar los resultados.</li></ol>
<h3>Alcance de esta actividad</h3><p>Se estudia un circuito paralelo de tres ramas alimentado por una fuente ideal. Se calculan las corrientes de cada rama mediante la ley de Ohm y se comprueba la LCK. Es una propuesta computacional independiente.</p>
</div>`;

const theoryMagnet = `
<div class="theory-card">
<h2>Fundamento teórico: Magnetismo y Campo Magnético.</h2>
<h3>1. Concepto y Propiedades</h3>
<p>El magnetismo está asociado al movimiento de cargas eléctricas. Para una carga en movimiento dentro de un campo magnético, la fuerza magnética experimentada se define mediante la expresión vectorial:</p>
<div class="formula">F B = q · (v × B)</div>
<h3>2. Magnitud de la Fuerza Magnética</h3>
<p>La magnitud de la fuerza se calcula considerando el ángulo θ entre los vectores de velocidad y campo magnético:</p>
<div class="formula">FB = |q| · v · B · sen(θ)</div>
<h3>3. Casos particulares analizados.</h3>
<ul>
  <li><b>θ = 0° o 180°:</b> La velocidad es paralela al campo; la fuerza magnética es <b>cero</b>.</li>
  <li><b>θ = 90°:</b> La velocidad es perpendicular al campo; la fuerza magnética alcanza su valor <b>máximo</b> (FB = |q| · v · B).</li>
  <li><b>Cargas negativas:</b> La dirección de la fuerza se invierte respecto a la regla de la mano derecha.</li>
</ul>
</div>`;

function heading(title, subtitle){return `<div class="page-heading"><h1>${title}</h1><p>${subtitle}</p></div>`}

function setView(view){
  navButtons.forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  ({inicio, kirchhoff, magnetismo, quiz, acerca}[view] || inicio)();
  window.scrollTo({top:0,behavior:"smooth"});
  if(sidebar.classList.contains("active")){
    toggleSidebar();
  }
}

navButtons.forEach(b=>b.addEventListener("click",()=>setView(b.dataset.view)));
document.querySelector(".brand").addEventListener("click",e=>{e.preventDefault();setView("inicio")});

function inicio(){
 app.innerHTML=`
 ${heading("Te damos la bienvenida","Aprende experimentando con simulaciones interactivas.")}
 <section class="hero"><span class="eyebrow">APRENDE · EXPERIMENTA · COMPRUEBA</span><h2>La física cobra sentido cuando puedes experimentar.</h2><p>Modifica variables, observa los resultados y verifica los principios físicos paso a paso. Este entorno reúne teoría, ejemplos y simulaciones interactivas.</p></section>
 <h3 class="section-label">SELECCIONA UN MÓDULO</h3>
 <div class="module-grid">
 <article class="module-card"><span class="module-number">01</span><h3>LEYES DE KIRCHHOFF</h3><p>Aplica la LCK y la LVK para analizar corrientes, voltajes y resistencia equivalente en un circuito paralelo de tres ramas.</p><button class="primary-btn" onclick="setView('kirchhoff')">ABRIR PRÁCTICA →</button></article>
 <article class="module-card"><span class="module-number" style="color:var(--teal)">02</span><h3>MAGNETISMO</h3><p>Calcula la magnitud y dirección de la fuerza magnética sobre una carga móvil aplicando el producto cruz.</p><button class="primary-btn teal" onclick="setView('magnetismo')">ABRIR PRÁCTICA →</button></article>
 <article class="module-card"><span class="module-number" style="color:var(--orange)">03</span><h3>AUTOEVALUACIÓN</h3><p>Responde preguntas de los temas estudiados y recibe una calificación automática.</p><button class="primary-btn orange" onclick="setView('quiz')">COMENZAR →</button></article>
 </div>
 <div class="notice"><strong>PROPÓSITO DEL PROYECTO</strong><p>Comprender y aplicar los principios de circuitos y electromagnetismo mediante modelos matemáticos y simulaciones interactivas como apoyo al análisis teórico de la clase.</p></div>`;
}

function tabs(theory, sim, example){
 return `<div class="tabs"><button class="tab-btn active" data-tab="theory">Marco teórico</button><button class="tab-btn" data-tab="sim">Simulador</button><button class="tab-btn" data-tab="example">Ejemplo resuelto</button></div>
 <div class="tab-panel active" id="theory">${theory}</div><div class="tab-panel" id="sim">${sim}</div><div class="tab-panel" id="example">${example}</div>`;
}

function activateTabs(){
 document.querySelectorAll(".tab-btn").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".tab-btn").forEach(x=>x.classList.toggle("active",x===btn));
  document.querySelectorAll(".tab-panel").forEach(x=>x.classList.toggle("active",x.id===btn.dataset.tab));
 }));
}

function circuitSVG(v,rs){
 return `<svg viewBox="0 0 760 310" role="img" aria-label="Diagrama de circuito paralelo con tres resistencias">
 <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#159a83"/></marker></defs>
 <g stroke="#20364f" stroke-width="4" fill="none" stroke-linecap="round">
 <path d="M100 65 H680 M100 245 H680 M100 65 V125 M100 185 V245"/>
 <path d="M88 125 H112 M93 185 H107" stroke="#e78a45" stroke-width="5"/>
 ${[260,440,620].map(x=>`<path d="M${x} 65 V112 M${x} 198 V245"/>`).join("")}
 </g>
 <g fill="#fff" stroke="#168aad" stroke-width="3">${[260,440,620].map(x=>`<rect x="${x-39}" y="112" width="78" height="86" rx="8"/>`).join("")}</g>
 <g fill="#18324b" font-family="DM Sans" font-size="17" font-weight="700" text-anchor="middle">
 ${rs.map((r,i)=>`<text x="${[260,440,620][i]}" y="148">R${i+1}</text><text x="${[260,440,620][i]}" y="174" font-size="14">${r} Ω</text>`).join("")}
 <text x="48" y="161">${v} V</text><text x="390" y="39" font-size="14">Nodo superior</text><text x="390" y="282" font-size="14">Nodo inferior</text></g>
 <g stroke="#159a83" stroke-width="3" marker-end="url(#arr)">${[260,440,620].map(x=>`<path d="M${x} 205 V230"/>`).join("")}</g></svg>`;
}

function kirchhoff(){
 const sim=`<div class="sim-layout"><div class="panel"><h3>CONFIGURA EL CIRCUITO</h3>
 <label class="field"><span>Voltaje de fuente (V)</span><input id="kv" type="number" min="0.001" step="any" value="12"></label>
 <label class="field"><span>Resistencia R1 (Ω)</span><input id="kr1" type="number" min="0.001" step="any" value="100"></label>
 <label class="field"><span>Resistencia R2 (Ω)</span><input id="kr2" type="number" min="0.001" step="any" value="200"></label>
 <label class="field"><span>Resistencia R3 (Ω)</span><input id="kr3" type="number" min="0.001" step="any" value="300"></label>
 <button class="primary-btn" id="runK">CALCULAR Y GRAFICAR</button></div>
 <div><div class="result-card"><h3>RESULTADOS DE LA SIMULACIÓN</h3><div id="kresults" class="result-lines"><div class="empty-state">Introduce los valores y ejecuta la simulación.</div></div><p id="kexplain" class="explanation"></p></div>
 <div class="panel visual-panel" id="circuit">${circuitSVG(12,[100,200,300])}</div></div></div>`;
 const example=`<div class="theory-card"><h2>Ejemplo resuelto</h2><div class="example-box"><h3>Datos</h3><p>Fuente de 12 V; R1 = 100 Ω, R2 = 200 Ω y R3 = 300 Ω.</p><h3>1. Corrientes por rama</h3><p>I1 = 12/100 = 0.12 A</p><p>I2 = 12/200 = 0.06 A</p><p>I3 = 12/300 = 0.04 A</p><h3>2. Ley de corrientes</h3><p>It = 0.12 + 0.06 + 0.04 = 0.22 A</p><h3>3. Resistencia equivalente</h3><p>Req = V/It = 12/0.22 ≈ 54.55 Ω</p><h3>4. Potencia total</h3><p>P = V·It = 12·0.22 = 2.64 W</p><p><b>Conclusión:</b> la corriente total que llega al nodo se distribuye entre las tres ramas.</p></div></div>`;
 app.innerHTML=heading("Práctica 1 : Leyes de Kirchhoff","Actividad original: distribución de corriente en un circuito paralelo de tres ramas.")+tabs(theoryKirchhoff,sim,example);
 activateTabs();
 document.getElementById("runK").addEventListener("click",()=>{
  const v=Number(document.getElementById("kv").value),rs=[1,2,3].map(i=>Number(document.getElementById("kr"+i).value));
  if(!Number.isFinite(v)||v<=0||rs.some(x=>!Number.isFinite(x)||x<=0)){alert("La fuente y todas las resistencias deben ser mayores que cero.");return}
  const currents=rs.map(r=>v/r),total=currents.reduce((a,b)=>a+b,0),req=v/total,power=v*total;
  const metrics=[...currents.map((x,i)=>[`Corriente I${i+1}`,`${x.toFixed(5)} A`]),["Corriente total",`${total.toFixed(5)} A`],["Resistencia equivalente",`${req.toFixed(4)} Ω`],["Potencia total",`${power.toFixed(5)} W`]];
  document.getElementById("kresults").innerHTML=metrics.map(([a,b])=>`<div class="metric"><small>${a}</small><strong>${b}</strong></div>`).join("");
  document.getElementById("kexplain").textContent=`Comprobación LCK: I1 + I2 + I3 = ${total.toFixed(5)} A. La suma de corrientes de las ramas coincide con la corriente total.`;
  document.getElementById("circuit").innerHTML=circuitSVG(v,rs);
 });
}

function magnetismo(){
 const sim=`<div class="sim-layout"><div class="panel"><h3>PARÁMETROS DE LA PARTÍCULA</h3>
 <label class="field"><span>Carga q (C)</span><input id="mq" type="number" step="any" value="0.000002"></label>
 <label class="field"><span>Rapidez v (m/s)</span><input id="mv" type="number" min="0" step="any" value="30000"></label>
 <label class="field"><span>Campo B (T)</span><input id="mb" type="number" min="0" step="any" value="0.5"></label>
 <label class="field"><span>Ángulo θ (grados)</span><input id="ma" type="number" min="0" max="180" step="any" value="90"></label>
 <button class="primary-btn teal" id="runM">CALCULAR Y VER GRÁFICA</button></div>
 <div><div class="result-card"><h3>RESULTADO DE LA FUERZA MAGNÉTICA</h3><div id="mresults" class="result-lines"><div class="empty-state">Modifica los datos y calcula la fuerza.</div></div><p id="mexp" class="explanation"></p></div>
 <div class="panel"><h3>FUERZA SEGÚN EL ÁNGULO</h3><div class="chart-wrap"><canvas id="forceChart"></canvas></div></div></div></div>`;
 const example=`<div class="theory-card"><h2>Ejemplo resuelto</h2><div class="example-box"><h3>Datos</h3><p>q = 1.6×10⁻¹⁹ C; v = 2.5×10⁵ m/s; B = 1.0 T; θ = 55°.</p><h3>1. Componente del ángulo</h3><p>Ángulo complementario o directo aplicado a la fórmula: sen(55°) ≈ 0.8191 o según componente de clase sen(35°) ≈ 0.5735)</p><h3>2. Sustitución en fórmula</h3><p>FB = |q| · v · B · sen(θ)</p><p>FB = (1.6×10⁻¹⁹ C) · (2.5×10⁵ m/s) · (1.0 T) · sen(55°)</p><h3>3. Cálculo de la fuerza magnética</h3><p>FB ≈ 3.28×10⁻¹⁴ N o 2.29×10⁻¹⁴ N según orientación en plano xz.</p><h3>4. Fuerza máxima teórica</h3><p>Fmax = |q| · v · B = 4.00×10⁻¹⁴ N</p><p><b>Conclusión:</b> la fuerza magnética sobre una carga en movimiento depende directamente de su velocidad, la intensidad del campo y el seno del ángulo de incidencia, alcanzando su valor máximo a 90° y anulándose por completo cuando el movimiento es paralelo al campo magnético (0° o 180°).</p></div></div>`;
 
 app.innerHTML=heading("Práctica 2 : Magnetismo y Campo Magnético","Fuerza magnética sobre una carga en movimiento.")+tabs(theoryMagnet,sim,example);
 activateTabs();
 document.getElementById("runM").addEventListener("click",()=>{
  const q=Number(document.getElementById("mq").value),v=Number(document.getElementById("mv").value),b=Number(document.getElementById("mb").value),a=Number(document.getElementById("ma").value);
  if(![q,v,b,a].every(Number.isFinite)||v<0||b<0||a<0||a>180){alert("Verifica los datos: rapidez y campo no negativos; ángulo entre 0° y 180°.");return}
  const force=Math.abs(q)*v*b*Math.abs(Math.sin(a*Math.PI/180)),max=Math.abs(q)*v*b;
  document.getElementById("mresults").innerHTML=`<div class="metric"><small>Fuerza magnética</small><strong>${force.toExponential(5)} N</strong></div><div class="metric"><small>Fuerza máxima</small><strong>${max.toExponential(5)} N</strong></div>`;
  document.getElementById("mexp").textContent=`FB = |q|·v·B·sen(θ). ${a===0||a===180?"La velocidad es paralela al campo: la fuerza es cero.":a===90?"La velocidad es perpendicular al campo: la fuerza es máxima.":"El ángulo determina la fracción de la fuerza máxima."} ${q<0?"La carga negativa invierte la dirección respecto a la regla de la mano derecha.":"Para carga positiva, la dirección se determina con la regla de la mano derecha."}`;
  drawForceChart(q,v,b,a);
 });
}

function drawForceChart(q,v,b,angle){
 const canvas=document.getElementById("forceChart");if(!canvas)return;
 const rect=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
 canvas.width=Math.max(300,rect.width*dpr);canvas.height=Math.max(180,rect.height*dpr);
 const ctx=canvas.getContext("2d");ctx.scale(dpr,dpr);
 const w=canvas.width/dpr,h=canvas.height/dpr,pad=40;
 const max=Math.abs(q)*v*b||1;
 
 ctx.clearRect(0,0,w,h);
 ctx.strokeStyle="#e2e8f0";
 ctx.lineWidth=1;
 for(let i=0;i<=4;i++){
  let y=pad+(h-2*pad)*(i/4);
  ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-15,y);ctx.stroke();
 }

 ctx.font="9px DM Sans";
 ctx.fillStyle="#63788e";
 ctx.textAlign="center";
 
 for(let deg=0; deg<=180; deg+=15){
  let x=pad+(w-pad-20)*(deg/180);
  ctx.beginPath();
  ctx.strokeStyle=(deg===0 || deg===90 || deg===180)?"#cbd5e1":"#f1f5f9";
  ctx.moveTo(x,pad);
  ctx.lineTo(x,h-pad);
  ctx.stroke();
  
  if(deg % 30 === 0){
    ctx.fillText(deg + "°", x, h-12);
  }
 }

 ctx.strokeStyle="#168aad";
 ctx.lineWidth=3;
 ctx.beginPath();
 for(let deg=0;deg<=180;deg++){
  let x=pad+(w-pad-20)*(deg/180),f=Math.abs(q)*v*b*Math.sin(deg*Math.PI/180),y=h-pad-(h-2*pad)*(f/max);
  if(deg===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
 }
 ctx.stroke();
 let curX=pad+(w-pad-20)*(angle/180),curF=Math.abs(q)*v*b*Math.sin(angle*Math.PI/180),curY=h-pad-(h-2*pad)*(curF/max);
 ctx.fillStyle="#e78a45";ctx.beginPath();ctx.arc(curX,curY,6,0,Math.PI*2);ctx.fill();
 ctx.textAlign="left";
 ctx.fillText("F",12,pad-5);
 ctx.textAlign="center";
 ctx.fillText("Ángulo θ",w/2,h-2);
}

const questions=[
 ["¿En qué principio se basa la primera ley de Kirchhoff?",["Conservación de la carga","Conservación de la energía","Gravitación"],0,"La LCK expresa que la carga no se acumula en un nodo."],
 ["¿Qué es una malla?",["Un punto de unión","Una trayectoria cerrada","Una fuente de voltaje"],1,"Una malla es una trayectoria cerrada de conducción."],
 ["¿Qué establece la segunda ley de Kirchhoff?",["ΣI = 0","ΣV = 0 en una malla cerrada","V = I/R"],1,"La LVK establece que la suma algebraica de voltajes en una malla cerrada es cero."],
 ["¿Cuál de estos materiales es ferromagnético?",["Bismuto","Aluminio","Hierro"],2,"El hierro es un material ferromagnético."],
 ["Si el ángulo entre velocidad y campo es 0°, la fuerza magnética es…",["Cero","Máxima","Negativa"],0,"F = |q|vB sen(0°) = 0."]
];

function quiz(){
 app.innerHTML=heading("Autoevaluación","Comprueba lo aprendido y revisa la explicación de cada respuesta.")+
 `<div class="quiz-list">${questions.map((q,i)=>`<article class="panel quiz-question"><h3>${i+1}. ${q[0]}</h3>${q[1].map((o,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}">${o}</label>`).join("")}<div class="feedback" id="fb${i}"></div></article>`).join("")}</div>
 <div style="display:flex; gap:12px; margin-top:16px; flex-wrap:wrap;">
   <button class="primary-btn orange" id="gradeQuiz">CALIFICAR RESPUESTAS</button>
   <button class="primary-btn" id="resetQuiz" style="background:#63788e; display:none;">VOLVER A REALIZAR</button>
 </div>
 <div class="score" id="quizScore"></div>`;

 const gradeBtn = document.getElementById("gradeQuiz");
 const resetBtn = document.getElementById("resetQuiz");

 gradeBtn.addEventListener("click",()=>{
  let score=0,answered=0;
  questions.forEach((q,i)=>{
   const selected=document.querySelector(`input[name="q${i}"]:checked`);
   const fb=document.getElementById(`fb${i}`);
   if(selected) answered++;
   
   const good = selected && Number(selected.value)===q[2];
   if(good) score++;

   if(good){
    fb.style.color = "#159a83";
    fb.textContent = `Correcto. ${q[3]}`;
   } else if(selected){
    fb.style.color = "#d9534f";
    fb.textContent = `Incorrecto. La respuesta correcta era: "${q[1][q[2]]}". ${q[3]}`;
   } else {
    fb.style.color = "#e78a45";
    fb.textContent = `Sin responder. La respuesta correcta era: "${q[1][q[2]]}". ${q[3]}`;
   }
  });
  
  document.getElementById("quizScore").textContent=`Resultado: ${score}/5 · Nota: ${(score*2).toFixed(1)}/10 · Respondidas: ${answered}/5`;
  resetBtn.style.display = "inline-block";
 });

 resetBtn.addEventListener("click",()=>{
  quiz(); 
 });
}

function acerca(){
 app.innerHTML=heading("Acerca del proyecto","Información académica y alcance del simulador.")+`<div class="about-grid"><article class="panel"><h3>OBJETIVO GENERAL</h3><p>Desarrollar un entorno interactivo para reforzar los conceptos de Física III por medio de teoría, modelos matemáticos y simulaciones programadas.</p></article><article class="panel"><h3>TECNOLOGÍAS</h3><p>HTML estructura el contenido, CSS define el diseño visual y JavaScript realiza los cálculos, controles y gráficos interactivos.</p></article><article class="panel"><h3>ORIGINALIDAD</h3><p>Las actividades computacionales propuestas se basan en los conceptos explicados en clase. No pretenden reproducir las prácticas presenciales ni el simulador utilizado durante ellas.</p></article><article class="panel"><h3>ALCANCE Y LIMITACIONES</h3><p>Los modelos son idealizados. Los resultados dependen de los valores ingresados y no sustituyen la medición experimental ni la supervisión docente.</p></article></div>`;
}

inicio();