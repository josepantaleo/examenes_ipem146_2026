const theory = [
 {q:"¿Qué significa que JavaScript sea un lenguaje interpretado y dónde puede ejecutarse?",a:["El entorno de ejecución procesa y ejecuta el código; puede ejecutarse en navegadores y en Node.js.","Solo puede ejecutarse dentro de un archivo HTML.","Necesita convertirse siempre en código máquina antes de ejecutarse."],c:0,e:"El motor del navegador o un entorno como Node.js procesa y ejecuta JavaScript."},
 {q:"¿Qué es el alcance (scope) de una variable?",a:["La cantidad de veces que se puede modificar.","La zona del programa desde la que se puede acceder a una variable.","El tipo de dato que almacena."],c:1,e:"let y const tienen alcance de bloque; var tiene alcance de función."},
 {q:"¿Qué diferencia hay entre == y ===?",a:["No existe diferencia.","== compara solo tipos y === convierte valores.","== permite conversiones de tipo; === compara valor y tipo sin conversión."],c:2,e:"Se recomienda === para evitar conversiones inesperadas."},
 {q:"¿Qué es NaN y cuándo puede aparecer?",a:["Un valor especial que indica que una operación no produjo un número válido.","Una variable que siempre vale cero.","Un método para redondear números."],c:0,e:"NaN significa Not a Number."},
 {q:"¿Qué diferencia existe entre una función tradicional y una función flecha?",a:["La función flecha no puede recibir parámetros.","Ambas reutilizan código; la flecha tiene sintaxis breve y toma this del contexto que la rodea.","La tradicional siempre devuelve texto."],c:1,e:"La función tradicional tiene su propio comportamiento de this; la flecha lo toma del contexto exterior."},
 {q:"¿Qué es un método de un objeto?",a:["Una propiedad que siempre contiene un número.","Un array dentro de otro array.","Una función guardada como propiedad de un objeto."],c:2,e:"Un método permite que el objeto realice una acción."},
 {q:"¿Qué diferencia hay entre map(), filter() y find()?",a:["map transforma cada elemento; filter selecciona los que cumplen una condición; find devuelve el primero que cumple.","Los tres modifican el array original.","find devuelve siempre un array."],c:0,e:"find devuelve el primer elemento que cumple o undefined si no encuentra ninguno."},
 {q:"¿Qué es JSON y para qué se utiliza?",a:["Un lenguaje para diseñar páginas.","Un formato de texto para representar e intercambiar datos estructurados.","Un método exclusivo para crear funciones."],c:1,e:"JSON.stringify() convierte un valor a texto JSON y JSON.parse() convierte el texto en un valor."},
 {q:"¿Qué diferencia hay entre value e innerText en el DOM?",a:["Ambos sirven únicamente para imágenes.","value modifica estilos y innerText modifica clases.","value accede al valor de controles de formulario; innerText al texto visible de un elemento."],c:2,e:"value se usa en input o textarea; innerText en el texto visible de un elemento HTML."},
 {q:"¿Qué es una promesa y para qué sirven async y await?",a:["Una promesa representa un resultado futuro asíncrono; async declara una función asíncrona y await espera su resultado.","Una promesa es una variable global.","async y await sirven únicamente para cambiar estilos."],c:0,e:"Una promesa puede resolverse o rechazarse; async/await facilita trabajar con ella."}
];
const interpretation = [
 {q:"¿Qué estructura de datos utiliza productos?",a:["Un objeto con cuatro propiedades.","Un array que contiene cuatro objetos.","Una cadena de texto."],c:1,e:"Cada objeto representa un producto y contiene nombre, precio y stock."},
 {q:"¿Cuántos objetos hay en el array?",a:["3","5","4"],c:2,e:"El array contiene cuatro productos."},
 {q:"¿Qué condición aplica filter()?",a:["Selecciona los productos cuyo stock sea mayor que cero.","Selecciona los productos con precio mayor que  cero.","Selecciona solo la mochila."],c:0,e:"La lapicera queda afuera porque tiene stock igual a cero."},
 {q:"¿Qué contiene nombres?",a:['["Cuaderno", "Lapicera", "Mochila", "Regla"]','["Cuaderno", "Mochila", "Regla"]','["Mochila"]'],c:1,e:"map() obtiene el nombre de cada producto disponible."},
 {q:"¿Qué devuelve find() en este ejemplo?",a:["El primer producto del array.","Un array con todos los productos.","El objeto de la mochila: nombre Mochila, precio 18000 y stock 2."],c:2,e:"find() devuelve el primer objeto que cumple la condición."},
 {q:"¿Qué muestra productos.length?",a:["4","3","2"],c:0,e:"El array original tiene cuatro elementos; filter() no lo modifica."}
];
let answers = {};
let graded = false;
function renderQuestions(items, target, prefix) {
 const root=document.getElementById(target);
 root.innerHTML=items.map((item,i)=>`<article class="question" id="${prefix}-${i}">
  <h3><span class="q-number">${i+1}.</span>${item.q}</h3>
  <div class="options">${item.a.map((option,j)=>`<label class="option"><input type="radio" name="${prefix}-${i}" value="${j}"><span>${option}</span></label>`).join("")}</div>
  <p class="feedback" aria-live="polite"></p>
 </article>`).join("");
 root.querySelectorAll("input").forEach(input=>input.addEventListener("change",()=>{
   answers[input.name]=Number(input.value); graded=false; updateProgress();
   document.getElementById("gradeMessage").textContent="";
 }));
}
function allItems(){return [...theory.map((x,i)=>({...x,id:`t-${i}`})),...interpretation.map((x,i)=>({...x,id:`i-${i}`}))]}
function updateProgress(){
 const total=theory.length+interpretation.length, done=Object.keys(answers).length;
 document.getElementById("progressText").textContent=`${done} de ${total}`;
 document.getElementById("progressBar").style.width=`${done/total*100}%`;
}
function grade(){
 let score=0;
 allItems().forEach(item=>{
  const selected=answers[item.id];
  const card=document.getElementById(item.id);
  const feedback=card.querySelector(".feedback");
  card.querySelectorAll(".option").forEach((label,j)=>{
    label.classList.remove("correct","incorrect");
    if(j===item.c) label.classList.add("correct");
    if(selected===j && selected!==item.c) label.classList.add("incorrect");
  });
  if(selected===item.c){score++;feedback.textContent="¡Correcto! "+item.e;feedback.className="feedback good";}
  else {feedback.textContent=(selected===undefined?"Sin responder. ":"Respuesta incorrecta. ")+item.e;feedback.className="feedback bad";}
 });
 document.getElementById("score").innerHTML=`${score}<small> / 16</small>`;
 document.getElementById("scoreText").textContent="Puntaje de las partes A y B.";
 const msg=document.getElementById("gradeMessage");
 const percent=score/16*100;
 msg.textContent=percent>=60?"¡Buen trabajo! Alcanzaste el 60% o más de respuestas correctas.": "Seguí practicando y volvé a intentarlo. El objetivo de referencia es alcanzar el 60%.";
 msg.className="grade-message "+(percent>=60?"pass":"fail");
 graded=true;
}
document.querySelectorAll(".tab").forEach(button=>button.addEventListener("click",()=>{
 document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b===button));
 document.querySelectorAll(".section").forEach(s=>s.classList.toggle("active",s.id===button.dataset.target));
}));
document.querySelectorAll(".solution-btn").forEach(button=>button.addEventListener("click",()=>{
 const solution=document.getElementById(button.dataset.solution);
 solution.classList.toggle("hidden");
 button.textContent=solution.classList.contains("hidden")?"Ver solución del modelo":"Ocultar solución";
}));
document.getElementById("gradeBtn").addEventListener("click",grade);
document.getElementById("resetBtn").addEventListener("click",()=>{
 answers={};graded=false;
 document.querySelectorAll('input[type="radio"]').forEach(x=>x.checked=false);
 document.querySelectorAll(".feedback").forEach(x=>{x.textContent="";x.className="feedback";});
 document.querySelectorAll(".option").forEach(x=>x.classList.remove("correct","incorrect"));
 document.querySelectorAll("textarea").forEach(x=>x.value="");
 document.querySelectorAll(".solution").forEach(x=>x.classList.add("hidden"));
 document.querySelectorAll(".solution-btn").forEach(x=>x.textContent="Ver solución del modelo");
 document.getElementById("score").innerHTML='—<small> / 16</small>';
 document.getElementById("scoreText").textContent="Respondé las preguntas de las partes A y B para calcular tu resultado.";
 document.getElementById("gradeMessage").textContent="";
 updateProgress();
});
renderQuestions(theory,"theoryQuestions","t");
renderQuestions(interpretation,"interpretQuestions","i");
updateProgress();
