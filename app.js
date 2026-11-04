/*
 * EXAMEN DE JAVASCRIPT - IPEM 146 / Formación Profesional Web
 * Basado en los contenidos del curso:
 * https://josepantaleo.github.io/formacionprofesionalweb/
 *
 * Requiere en el HTML los IDs:
 * theoryQuestions, interpretQuestions, progressText, progressBar,
 * gradeBtn, resetBtn (opcional), score, scoreText, gradeMessage.
 * Mantiene también las pestañas .tab y .section y los botones
 * .solution-btn existentes, si están presentes.
 *
 * IMPORTANTE: el intento único con localStorage se aplica a este navegador
 * y dispositivo. Para impedir que se borre el intento desde otro navegador,
 * incógnito o limpiando los datos, la validación debe realizarse en servidor.
 */

(() => {
  "use strict";

  // Cambiar la versión de la clave cuando el docente publique un examen nuevo.
  const EXAM_KEY = "ipem146_js_examen_intento_unico_v3";
  const DRAFT_KEY = `${EXAM_KEY}_borrador`;
  const HISTORY_KEY = "ipem146_js_examen_historial_v1";
  const LAYOUT_KEY = `${EXAM_KEY}_orden`;
  const PASS_PERCENT = 70;
  const TEACHER_PASSWORD = "fRANCISCOP6$";

  const theory = [
    {
      q: "¿Cuál es la función principal de JavaScript en una página web?",
      a: [
        "Definir únicamente la estructura del contenido.",
        "Agregar comportamiento e interactividad a la página.",
        "Reemplazar obligatoriamente a HTML y CSS."
      ], c: 1,
      e: "JavaScript permite responder a acciones del usuario, validar formularios y modificar el contenido dinámicamente."
    },
    {
      q: "¿Qué diferencia existe entre let y const?",
      a: [
        "let permite reasignar su valor; const no permite reasignar la variable.",
        "const se utiliza solamente para números.",
        "No existe ninguna diferencia."
      ], c: 0,
      e: "let se utiliza cuando el valor debe cambiar. const se utiliza cuando no se va a reasignar."
    },
    {
      q: "¿Qué devuelve typeof cuando se consulta una variable que contiene el texto \"Hola\"?",
      a: ["number", "boolean", "string"], c: 2,
      e: "typeof permite consultar el tipo de dato. Los textos pertenecen al tipo string."
    },
    {
      q: "¿Qué representa el valor undefined?",
      a: [
        "Una variable o propiedad que todavía no tiene un valor asignado.",
        "Un texto vacío escrito entre comillas.",
        "Un valor que siempre representa cero."
      ], c: 0,
      e: "undefined suele aparecer cuando una variable fue declarada pero todavía no recibió un valor."
    },
    {
      q: "¿Qué resultado produce el operador %?",
      a: ["La división exacta.", "El resto de una división.", "La potencia de un número."], c: 1,
      e: "El operador módulo (%) devuelve el resto. Por ejemplo, 10 % 3 devuelve 1."
    },
    {
      q: "¿Qué diferencia hay entre == y ===?",
      a: [
        "=== compara valor y tipo; == puede realizar conversiones de tipo.",
        "== compara el tipo y === solamente el valor.",
        "Los dos operadores son exclusivos para números."
      ], c: 0,
      e: "Se recomienda === para evitar conversiones automáticas inesperadas."
    },
    {
      q: "¿Para qué se utiliza una estructura if / else?",
      a: [
        "Para repetir un bloque una cantidad fija de veces.",
        "Para declarar un array.",
        "Para ejecutar instrucciones según se cumpla o no una condición."
      ], c: 2,
      e: "if ejecuta un bloque cuando la condición es verdadera y else permite indicar qué hacer en caso contrario."
    },
    {
      q: "En una función, ¿qué es un parámetro?",
      a: [
        "El resultado que siempre muestra console.log.",
        "Una variable definida en la función para recibir información.",
        "El nombre del archivo HTML."
      ], c: 1,
      e: "Los parámetros se escriben en la definición de la función; los argumentos son los valores enviados al llamarla."
    },
    {
      q: "¿Qué función cumple return?",
      a: [
        "Devuelve un resultado desde una función.",
        "Reinicia el navegador.",
        "Repite automáticamente la función."
      ], c: 0,
      e: "return entrega un valor al lugar desde donde se llamó la función y finaliza su ejecución."
    },
    {
      q: "¿Qué es un array?",
      a: [
        "Una condición lógica.",
        "Una función que no recibe parámetros.",
        "Una estructura que almacena varios elementos ordenados."
      ], c: 2,
      e: "Un array permite guardar varios elementos y acceder a ellos mediante índices que comienzan en cero."
    },
    {
      q: "¿Qué método agrega un elemento al final de un array?",
      a: ["pop()", "push()", "shift()"], c: 1,
      e: "push() agrega al final; pop() elimina el último; shift() elimina el primero."
    },
    {
      q: "¿Qué diferencia existe entre for y while?",
      a: [
        "for suele utilizarse cuando se conoce la cantidad de repeticiones; while repite mientras una condición sea verdadera.",
        "while solamente recorre textos.",
        "for no permite utilizar contadores."
      ], c: 0,
      e: "Ambos permiten repetir instrucciones. La elección depende del problema y de la condición de repetición."
    },
    {
      q: "¿Qué hace break dentro de un bucle?",
      a: ["Salta solamente la vuelta actual.", "Duplica el contador.", "Detiene el bucle."], c: 2,
      e: "break interrumpe completamente el bucle. continue, en cambio, salta a la siguiente vuelta."
    },
    {
      q: "¿Qué es un objeto en JavaScript?",
      a: [
        "Una lista que solo admite números.",
        "Una estructura que organiza información mediante propiedades y valores.",
        "Un bucle que se ejecuta indefinidamente."
      ], c: 1,
      e: "Un objeto representa una entidad mediante propiedades, por ejemplo nombre, edad y curso."
    },
    {
      q: "¿Qué método crea un nuevo array transformando cada elemento?",
      a: ["map()", "find()", "includes()"], c: 0,
      e: "map() transforma cada elemento y devuelve un nuevo array."
    },
    {
      q: "¿Qué método selecciona todos los elementos que cumplen una condición?",
      a: ["find()", "filter()", "indexOf()"], c: 1,
      e: "filter() devuelve un nuevo array con todos los elementos que cumplen la condición."
    },
    {
      q: "¿Qué devuelve find() cuando encuentra un elemento?",
      a: [
        "Siempre devuelve todos los elementos.",
        "Devuelve la cantidad total del array.",
        "Devuelve el primer elemento que cumple la condición."
      ], c: 2,
      e: "find() devuelve el primer elemento coincidente o undefined si no encuentra ninguno."
    },
    {
      q: "¿Para qué se utiliza reduce()?",
      a: [
        "Para convertir un array en un único resultado acumulado.",
        "Para eliminar siempre el primer elemento.",
        "Para cambiar el color de un elemento HTML."
      ], c: 0,
      e: "reduce() permite obtener resultados como sumas, promedios, contadores u objetos de estadísticas."
    },
    {
      q: "¿Qué propiedad indica la cantidad de caracteres de un string?",
      a: ["size", "length", "count()"], c: 1,
      e: "La propiedad length indica la longitud de un texto o la cantidad de elementos de un array."
    },
    {
      q: "¿Qué significa el alcance (scope) de una variable?",
      a: [
        "La cantidad de caracteres que contiene.",
        "El número de veces que se ejecuta una función.",
        "La zona del programa desde la que se puede acceder a esa variable."
      ], c: 2,
      e: "El scope determina dónde está disponible una variable. let y const tienen alcance de bloque."
    },
    {
      q: "¿Qué permite hacer el DOM?",
      a: [
        "Acceder y modificar elementos y contenido de una página HTML.",
        "Crear una base de datos SQL automáticamente.",
        "Reemplazar el sistema operativo."
      ], c: 0,
      e: "El DOM representa el documento HTML y permite acceder a sus elementos desde JavaScript."
    },
    {
      q: "¿Para qué se utiliza addEventListener()?",
      a: [
        "Para ordenar numéricamente un array.",
        "Para escuchar y responder a eventos, como un clic.",
        "Para convertir un objeto en JSON."
      ], c: 1,
      e: "addEventListener() registra una función que se ejecuta cuando ocurre el evento indicado."
    },
    {
      q: "¿Qué propiedad se utiliza habitualmente para leer el contenido de un input?",
      a: ["innerText", "className", "value"], c: 2,
      e: "value permite obtener o modificar el valor ingresado en controles de formulario."
    },
    {
      q: "¿Para qué sirve localStorage?",
      a: [
        "Para guardar datos en el navegador que permanecen después de cerrar la página.",
        "Para ejecutar código en el servidor.",
        "Para enviar correos electrónicos automáticamente."
      ], c: 0,
      e: "localStorage guarda pares clave-valor en el navegador y los conserva entre sesiones."
    },
    {
      q: "¿Qué diferencia hay entre JSON.stringify() y JSON.parse()?",
      a: [
        "Ambos eliminan propiedades de un objeto.",
        "stringify convierte un valor en texto JSON y parse convierte texto JSON en un valor.",
        "parse convierte cualquier texto en una función."
      ], c: 1,
      e: "stringify serializa datos; parse interpreta un texto JSON."
    },
    {
      q: "¿Qué es una promesa (Promise)?",
      a: [
        "Una variable que no puede cambiar.",
        "Un método exclusivo para arrays.",
        "Un objeto que representa el resultado futuro de una operación asíncrona."
      ], c: 2,
      e: "Una promesa puede estar pendiente, cumplida o rechazada. Se utiliza en operaciones asíncronas."
    },
    {
      q: "¿Para qué se utiliza try / catch?",
      a: [
        "Para manejar errores que pueden producirse durante la ejecución de un bloque.",
        "Para declarar variables constantes.",
        "Para recorrer un array de principio a fin."
      ], c: 0,
      e: "try contiene el código que se intenta ejecutar y catch permite tratar una excepción."
    }
  ];

  const interpretation = [
    {
      q: "¿Qué muestra este código?\n\nlet ciudad = \"Villa Dolores\";\nconsole.log(ciudad);",
      a: ["undefined", "Villa Dolores", "ciudad"], c: 1,
      e: "console.log() muestra el valor almacenado en la variable ciudad."
    },
    {
      q: "¿Cuál es el resultado?\n\nconst edad = 17;\nconsole.log(edad >= 18);",
      a: ["true", "false", "17"], c: 1,
      e: "17 no es mayor ni igual que 18; la comparación devuelve false."
    },
    {
      q: "¿Qué muestra el siguiente código?\n\nlet total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total += i;\n}\nconsole.log(total);",
      a: ["6", "3", "123"], c: 0,
      e: "El acumulador suma 1 + 2 + 3 y el resultado final es 6."
    },
    {
      q: "¿Qué números muestra este bucle?\n\nfor (let i = 2; i <= 6; i += 2) {\n  console.log(i);\n}",
      a: ["2, 3, 4, 5, 6", "2, 4, 6", "0, 2, 4, 6"], c: 1,
      e: "El contador comienza en 2 y aumenta de dos en dos hasta llegar a 6."
    },
    {
      q: "¿Qué imprime el código?\n\nlet numero = 5;\nif (numero % 2 === 0) {\n  console.log(\"Par\");\n} else {\n  console.log(\"Impar\");\n}",
      a: ["Par", "5", "Impar"], c: 2,
      e: "5 % 2 devuelve 1. Como no es cero, se ejecuta el bloque else."
    },
    {
      q: "¿Qué valor devuelve la función?\n\nfunction sumar(a, b) {\n  return a + b;\n}\nconsole.log(sumar(4, 6));",
      a: ["10", "46", "undefined"], c: 0,
      e: "La función recibe 4 y 6 y devuelve su suma: 10."
    },
    {
      q: "¿Qué muestra el código?\n\nconst frutas = [\"Manzana\", \"Pera\", \"Uva\"];\nconsole.log(frutas[1]);",
      a: ["Manzana", "Pera", "Uva"], c: 1,
      e: "Los índices comienzan en cero: frutas[1] corresponde al segundo elemento."
    },
    {
      q: "¿Cuál es el resultado después de ejecutar push()?\n\nconst numeros = [2, 4];\nnumeros.push(6);\nconsole.log(numeros.length);",
      a: ["2", "6", "3"], c: 2,
      e: "push() agrega el 6 al final. El array queda con tres elementos."
    },
    {
      q: "¿Qué muestra este código?\n\nconst nombres = [\"Ana\", \"Luis\", \"Sofía\"];\nfor (const nombre of nombres) {\n  console.log(nombre);\n}",
      a: ["Los tres nombres, uno por vuelta.", "Solamente Ana.", "La cantidad 3."], c: 0,
      e: "for...of recorre directamente los valores del array."
    },
    {
      q: "¿Qué números se muestran?\n\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  console.log(i);\n}",
      a: ["1, 2, 3, 4, 5", "1, 2, 4, 5", "3"], c: 1,
      e: "continue salta la vuelta en la que i vale 3 y el bucle continúa."
    },
    {
      q: "¿Qué valor se muestra?\n\nconst alumno = { nombre: \"Lucía\", nota: 9 };\nconsole.log(alumno.nota);",
      a: ["Lucía", "nombre", "9"], c: 2,
      e: "La notación con punto permite acceder a la propiedad nota del objeto."
    },
    {
      q: "¿Qué contiene el array resultado?\n\nconst numeros = [2, 3, 4];\nconst resultado = numeros.map(n => n * 2);",
      a: ["[4, 6, 8]", "[2, 3, 4]", "[2, 6, 4]"], c: 0,
      e: "map() multiplica cada elemento por dos y devuelve [4, 6, 8]."
    },
    {
      q: "¿Qué devuelve filter()?\n\nconst edades = [12, 18, 15, 21];\nconst mayores = edades.filter(edad => edad >= 18);",
      a: ["[12, 15]", "[18, 21]", "21"], c: 1,
      e: "filter() conserva todos los valores que cumplen edad >= 18: 18 y 21."
    },
    {
      q: "¿Qué valor devuelve find()?\n\nconst numeros = [3, 7, 12, 20];\nconst encontrado = numeros.find(n => n > 10);",
      a: ["[12, 20]", "3", "12"], c: 2,
      e: "find() devuelve el primer elemento que cumple la condición: 12."
    },
    {
      q: "¿Cuál es el resultado?\n\nconst notas = [6, 8, 10];\nconst suma = notas.reduce((total, nota) => total + nota, 0);\nconsole.log(suma);",
      a: ["24", "10", "3"], c: 0,
      e: "reduce() acumula los valores: 6 + 8 + 10 = 24."
    },
    {
      q: "¿Qué muestra este código?\n\nconst texto = \"Programacion Web\";\nconsole.log(texto.length);",
      a: ["15", "16", "Programacion"], c: 1,
      e: "El texto tiene 16 caracteres, contando también el espacio."
    },
    {
      q: "¿Qué devuelve esta expresión?\n\nconst nombre = \"  ana  \";\nconsole.log(nombre.trim());",
      a: ["ana", "  ana  ", "ANA"], c: 0,
      e: "trim() elimina los espacios en blanco del principio y del final."
    },
    {
      q: "¿Qué sucede al ejecutar este código?\n\nconst boton = document.querySelector(\"#enviar\");\nboton.addEventListener(\"click\", () => {\n  console.log(\"Enviado\");\n});",
      a: ["Muestra Enviado inmediatamente al cargar.", "Cambia el texto del botón.", "Muestra Enviado cuando se hace clic en el botón."], c: 2,
      e: "addEventListener registra una función que se ejecuta cuando ocurre el evento click."
    },
    {
      q: "¿Qué valor obtiene dato?\n\nconst campo = { value: \"IPEM 146\" };\nconst dato = campo.value;\nconsole.log(dato);",
      a: ["value", "IPEM 146", "undefined"], c: 1,
      e: "La propiedad value contiene el valor ingresado o asignado al control."
    },
    {
      q: "¿Qué muestra este código?\n\nconst usuario = { nombre: \"Ana\" };\nconst texto = JSON.stringify(usuario);\nconsole.log(typeof texto);",
      a: ["string", "object", "boolean"], c: 0,
      e: "JSON.stringify() convierte el objeto en texto JSON; por eso typeof devuelve string."
    },
    {
      q: "¿Qué valor se recupera?\n\nconst datos = JSON.parse('{\"curso\":\"6A\"}');\nconsole.log(datos.curso);",
      a: ["{curso: 6A}", "undefined", "6A"], c: 2,
      e: "JSON.parse() interpreta el texto JSON y permite acceder a la propiedad curso."
    },
    {
      q: "¿Qué hace este código?\n\nlocalStorage.setItem(\"nombre\", \"María\");\nconst dato = localStorage.getItem(\"nombre\");",
      a: ["Guarda y luego recupera el texto María.", "Elimina todos los datos.", "Crea una variable global llamada María."], c: 0,
      e: "setItem() guarda un dato y getItem() lo recupera usando la misma clave."
    },
    {
      q: "¿Qué ocurre si JSON.parse() recibe un texto JSON inválido y no se maneja el error?",
      a: ["Devuelve siempre null.", "Se produce una excepción durante la ejecución.", "Corrige automáticamente el texto."], c: 1,
      e: "JSON.parse() puede lanzar SyntaxError cuando el texto no tiene formato JSON válido."
    }
  ];

  // La evaluación utiliza exactamente 20 preguntas por sección.
  theory.length = 20;
  interpretation.length = 20;

  const allItems = () => [
    ...theory.map((item, i) => ({ ...item, id: `t-${i}` })),
    ...interpretation.map((item, i) => ({ ...item, id: `i-${i}` }))
  ];

  let answers = {};
  let codeAnswers = {};
  let examLocked = false;
  let isGrading = false;
  let examLayout = null;

  const $ = id => document.getElementById(id);
  const totalQuestions = theory.length + interpretation.length;

  function shuffled(values) {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function makeExamLayout() {
    const options = {};
    [...theory.map((_, i) => `t-${i}`), ...interpretation.map((_, i) => `i-${i}`)].forEach(id => {
      const item = id.startsWith('t-') ? theory[Number(id.slice(2))] : interpretation[Number(id.slice(2))];
      options[id] = shuffled(item.a.map((_, i) => i));
    });
    return {
      theory: shuffled(theory.map((_, i) => i)),
      interpretation: shuffled(interpretation.map((_, i) => i)),
      options
    };
  }

  function loadExamLayout() {
    try {
      const attempt = JSON.parse(localStorage.getItem(EXAM_KEY) || 'null');
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
      examLayout = attempt?.layout || draft?.layout || JSON.parse(localStorage.getItem(LAYOUT_KEY) || 'null');
    } catch { examLayout = null; }
    if (!examLayout || !Array.isArray(examLayout.theory) || !Array.isArray(examLayout.interpretation) || !examLayout.options) {
      examLayout = makeExamLayout();
      try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(examLayout)); } catch {}
    }
  }

  function getHistory() {
    try {
      const data = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    } catch { return []; }
  }

  function saveHistory(attempt) {
    const history = getHistory();
    const id = attempt.id || `${attempt.date || Date.now()}_${(attempt.student?.lastName || 'estudiante').toLowerCase()}`;
    attempt.id = id;
    const index = history.findIndex(item => item.id === id);
    if (index >= 0) history[index] = attempt;
    else history.push(attempt);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); }
    catch (error) { console.warn('No se pudo guardar el historial docente:', error); }
  }

  function performanceLabel(score) {
    if (score >= 9) return 'Destacado';
    if (score >= 7) return 'Aprobado';
    if (score >= 6) return 'Próximo a aprobar';
    if (score >= 4) return 'En proceso';
    return 'Desempeño bajo';
  }

  function formatScore(value) {
    return Number(value || 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calculateQuestionStats(history) {
    const items = allItems();
    return items.map((item, index) => {
      const answered = history.filter(attempt => Number.isInteger(attempt.answers?.[item.id]));
      const errors = answered.filter(attempt => attempt.answers[item.id] !== item.c).length;
      return { label: `${index < 20 ? 'A' : 'B'}${index < 20 ? index + 1 : index - 19}`, errors, total: answered.length, rate: answered.length ? errors / answered.length * 100 : 0 };
    }).sort((a, b) => b.rate - a.rate);
  }

  function calculateABPoints(savedAnswers) {
    const items = allItems();
    let points = 0;
    items.forEach((item, index) => {
      if (savedAnswers?.[item.id] === item.c) points += index < theory.length ? 0.1 : 0.2;
    });
    return Number(points.toFixed(2));
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function renderQuestions(items, target, prefix) {
    const root = $(target);
    if (!root) return;
    const order = prefix === 't' ? examLayout.theory : examLayout.interpretation;
    root.innerHTML = order.map(originalIndex => {
      const item = items[originalIndex];
      const id = `${prefix}-${originalIndex}`;
      const optionOrder = examLayout.options[id] || item.a.map((_, i) => i);
      return `
      <article class="question" id="${id}">
        <h3><span class="q-number">${order.indexOf(originalIndex) + 1}.</span> ${escapeHTML(item.q.split("\n\n")[0])}</h3>
        ${item.q.includes("\n\n") ? `<pre class="question-code"><code>${escapeHTML(item.q.split("\n\n").slice(1).join("\n\n"))}</code></pre>` : ""}
        <div class="options">
          ${optionOrder.map(originalOption => `
            <label class="option">
              <input type="radio" name="${id}" value="${originalOption}">
              <span>${escapeHTML(item.a[originalOption]).replace(/\n/g, "<br>")}</span>
            </label>
          `).join("")}
        </div>
        <p class="feedback" aria-live="polite"></p>
      </article>`;
    }).join("");

    root.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener("change", () => {
        if (examLocked) { input.checked = false; return; }
        answers[input.name] = Number(input.value);
        updateProgress();
        saveDraft();
        const message = $("gradeMessage");
        if (message) message.textContent = "";
      });
    });
  }

  function updateProgress() {
    const answeredQuestions = Math.min(totalQuestions, Object.keys(answers).filter(id => /^(t|i)-\d+$/.test(id)).length);
    const answeredExercises = Array.from(document.querySelectorAll(".code-answer"))
      .filter(field => field.value.trim().length > 0).length;
    const totalActivities = totalQuestions + 5;
    const completed = answeredQuestions + answeredExercises;
    if ($("progressText")) $("progressText").textContent = `${completed} de ${totalActivities}`;
    if ($("progressBar")) $("progressBar").style.width = `${completed / totalActivities * 100}%`;
  }

  function initCodeEditors() {
    document.querySelectorAll(".code-answer").forEach((field, index) => {
      field.addEventListener("input", () => {
        codeAnswers[field.id] = field.value;
        updateProgress();
        saveDraft();
      });

      // Impide las acciones habituales de portapapeles dentro de los editores.
      ["paste", "copy", "cut", "drop", "contextmenu"].forEach(eventName => {
        field.addEventListener(eventName, event => event.preventDefault());
      });
      field.addEventListener("keydown", event => {
        const key = event.key.toLowerCase();
        const shortcut = (event.ctrlKey || event.metaKey) && ["v", "c", "x"].includes(key);
        const shiftInsert = event.shiftKey && key === "insert";
        if (shortcut || shiftInsert) {
          event.preventDefault();
        }
      });
    });
  }

  function restoreCodeAnswers(saved = {}) {
    document.querySelectorAll(".code-answer").forEach(field => {
      field.value = typeof saved[field.id] === "string" ? saved[field.id] : "";
      field.disabled = true;
    });
    codeAnswers = { ...saved };
  }

  function renderStudentSummary(savedAnswers, attempt = {}) {
    const root = $("studentSummary");
    if (!root) return;
    const items = allItems();
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    const rows = items.map((item, index) => {
      const selected = savedAnswers?.[item.id];
      const isAnswered = Number.isInteger(selected) && selected >= 0 && selected < item.a.length;
      const isCorrect = isAnswered && selected === item.c;
      if (isCorrect) correct++;
      else if (isAnswered) incorrect++;
      else unanswered++;
      const section = index < 20 ? "Parte A · Teoría" : "Parte B · Interpretación";
      const number = (index < 20 ? examLayout.theory : examLayout.interpretation).indexOf(index < 20 ? index : index - 20) + 1;
      const statusClass = isCorrect ? "student-correct" : isAnswered ? "student-incorrect" : "student-unanswered";
      const status = isCorrect ? "✓ CORRECTA" : isAnswered ? "✕ INCORRECTA" : "— SIN RESPONDER";
      return `<article class="student-summary-item ${statusClass}">
        <div class="student-summary-top"><strong>${section} · Pregunta ${number}</strong><span>${status}</span></div>
        <p><strong>Tu respuesta:</strong> ${isAnswered ? escapeHTML(item.a[selected]) : "No respondiste esta pregunta."}</p>
        ${!isCorrect ? `<p><strong>Respuesta correcta:</strong> ${escapeHTML(item.a[item.c])}</p>` : ""}
        ${item.e ? `<small>${escapeHTML(item.e)}</small>` : ""}
      </article>`;
    }).join("");
    const theoryCorrect = items.slice(0, 20).filter(item => savedAnswers?.[item.id] === item.c).length;
    const interpretationCorrect = items.slice(20).filter(item => savedAnswers?.[item.id] === item.c).length;
    const abPoints = calculateABPoints(savedAnswers);
    root.innerHTML = `<h3>Resumen de tus respuestas · Partes A y B</h3>
      <div class="student-summary-counts">
        <div class="student-count count-correct"><strong>${correct}</strong><span>Correctas</span></div>
        <div class="student-count count-incorrect"><strong>${incorrect}</strong><span>Incorrectas</span></div>
        <div class="student-count count-unanswered"><strong>${unanswered}</strong><span>Sin responder</span></div>
      </div>
      <p class="student-summary-score">Puntaje automático: <strong>${formatScore(abPoints)} / 6 puntos</strong>. Teoría: ${theoryCorrect}/20 (${formatScore(theoryCorrect * 0.1)}/2). Interpretación: ${interpretationCorrect}/20 (${formatScore(interpretationCorrect * 0.2)}/4). ${Number.isFinite(attempt.teacherScore) ? `Código: ${formatScore(Object.values(attempt.teacherCodeScores || {}).reduce((sum, value) => sum + Number(value || 0), 0))}/4. <strong>Nota final: ${formatScore(attempt.teacherScore)}/10 · ${attempt.teacherScore >= 7 ? 'APROBADO' : 'NO APROBADO'}.</strong>` : 'La parte C (código) queda pendiente de evaluación docente.'}</p>
      <p class="learning-tip"><strong>Para mejorar:</strong> si tuviste errores en teoría, repasá conceptos y definiciones; si tuviste errores en interpretación, practicá la lectura paso a paso de fragmentos de código. La devolución docente completará el diagnóstico de la parte práctica.</p>
      <details class="student-summary-details" open><summary>Ver detalle de las 40 preguntas</summary><div class="student-summary-list">${rows}</div></details>`;
  }

  function showCorrection(savedAnswers, savedScore = null, savedDate = null, attempt = {}) {
    // Al entregar, se muestra al estudiante el resumen de A y B con aciertos y errores.
    renderStudentSummary(savedAnswers, attempt);
    allItems().forEach(item => {
      const selected = savedAnswers[item.id];
      const card = $(item.id);
      if (!card) return;
      card.querySelectorAll('input[type="radio"]').forEach((radio, index) => {
        radio.disabled = true;
        radio.checked = selected === index;
      });
      const feedback = card.querySelector(".feedback");
      if (feedback) feedback.textContent = "Respuesta entregada. Pendiente de revisión docente.";
    });

    const student = attempt.student || {};
    const identity = [student.name, student.lastName, student.course].filter(Boolean).join(" · ");
    if (Number.isFinite(attempt.teacherScore)) {
      if ($("score")) $("score").innerHTML = `${Number(attempt.teacherScore).toLocaleString("es-AR", { maximumFractionDigits: 2 })}<small> / 10</small>`;
      if ($("scoreText")) $("scoreText").textContent = `${identity ? identity + " | " : ""}Nota docente: ${Number(attempt.teacherGradeOutOfTen || 0).toFixed(2).replace(".", ",")}/10 · ${performanceLabel(Number(attempt.teacherGradeOutOfTen || 0))}. Calificación guardada.`;
      if ($("gradeMessage")) {
        const approved = attempt.teacherScore >= 7;
        $("gradeMessage").textContent = approved ? "Evaluación aprobada según el criterio del 70% (7/10)." : "Evaluación no aprobada. El mínimo es 70% (7/10).";
        $("gradeMessage").className = `grade-message ${approved ? "pass" : "fail"}`;
      }
    } else {
      if ($("score")) $("score").innerHTML = `Pendiente<small> / 10</small>`;
      if ($("scoreText")) $("scoreText").textContent = `${identity ? identity + " | " : ""}Entrega registrada. La calificación será asignada por el docente.`;
      if ($("gradeMessage")) {
        $("gradeMessage").textContent = "Examen entregado. El docente debe abrir la evaluación para consultar la clave y calificar los ejercicios.";
        $("gradeMessage").className = "grade-message";
      }
    }
    ["studentName", "studentLastName", "studentCourse"].forEach(id => { if ($(id)) $(id).disabled = true; });
    document.querySelectorAll(".code-answer").forEach(field => { field.disabled = true; });
    const button = $("gradeBtn");
    if (button) { button.disabled = true; button.textContent = "EXAMEN ENTREGADO"; }
    if ($("teacherReviewBtn")) $("teacherReviewBtn").hidden = false;
    if ($("resetBtn")) { $("resetBtn").disabled = true; $("resetBtn").hidden = true; }
    examLocked = true;
    updateProgress();
  }

  function modelAnswers() {
    return [
      `const precio = Number("1500");\nconst cantidad = 3;\nconst total = precio * cantidad;\n\nif (total === 4500) {\n  console.log("Total correcto");\n}`,
      `function calcularDescuento(precio, porcentaje) {\n  const descuento = precio * (porcentaje / 100);\n  return precio - descuento;\n}\n\nconsole.log(calcularDescuento(10000, 20)); // 8000`,
      `const notas = [4, 8, 6, 3, 10];\n\nfor (let i = 0; i < notas.length; i++) {\n  if (notas[i] >= 6) {\n    console.log(notas[i]);\n  }\n}`,
      `const alumno = {\n  nombre: "Lucía",\n  nota: 9\n};\n\nconsole.log(alumno.nombre);\nconsole.log(alumno.nota);`,
      `const respuesta = '{"ubicacion":"IPEM 146","temperatura":21}';\n\ntry {\n  const datos = JSON.parse(respuesta);\n  console.log(datos.temperatura);\n} catch (error) {\n  console.log(error.message);\n}`
    ];
  }

  function renderTeacherReview(attempt) {
    const root = $("teacherReview");
    if (!root) return;
    const items = allItems();
    const correct = items.filter(item => attempt.answers?.[item.id] === item.c).length;
    const codeAnswersNow = attempt.codeAnswers || {};
    const savedCodeScores = attempt.teacherCodeScores || {};
    const keys = items.map((item, index) => {
      const selected = attempt.answers?.[item.id];
      const isAnswered = Number.isInteger(selected) && selected >= 0 && selected < item.a.length;
      const isCorrect = isAnswered && selected === item.c;
      const statusClass = isCorrect ? "answer-correct" : isAnswered ? "answer-incorrect" : "answer-unanswered";
      const statusText = isCorrect ? "✓ CORRECTA" : isAnswered ? "✕ INCORRECTA" : "— SIN RESPONDER";
      const section = index < 20 ? "Parte A" : "Parte B";
      const number = (index < 20 ? examLayout.theory : examLayout.interpretation).indexOf(index < 20 ? index : index - 20) + 1;
      const studentText = isAnswered ? item.a[selected] : "Sin responder";
      const optionsMarkup = item.a.map((option, optionIndex) => {
        const optionClass = optionIndex === item.c
          ? "review-option review-option-correct"
          : (isAnswered && optionIndex === selected ? "review-option review-option-incorrect" : "review-option");
        const marker = optionIndex === item.c ? "✓ Correcta" : (isAnswered && optionIndex === selected ? "✕ Elegida" : "");
        return `<li class="${optionClass}"><span>${escapeHTML(option)}</span>${marker ? `<strong>${marker}</strong>` : ""}</li>`;
      }).join("");
      return `<li class="teacher-answer ${statusClass}">
        <div class="teacher-answer-top"><strong>${section} · Pregunta ${number}</strong><span class="answer-status">${statusText}</span></div>
        <p><strong>Respuesta del estudiante:</strong> ${escapeHTML(studentText)}</p>
        <p><strong>Respuesta correcta:</strong> ${escapeHTML(item.a[item.c])}</p>
        <ul class="review-options-list">${optionsMarkup}</ul>
        <small>${escapeHTML(item.e || "")}</small>
      </li>`;
    }).join("");
    const abScore = calculateABPoints(attempt.answers);
    const exercises = modelAnswers().map((model, index) => `
      <article class="ai-result">
        <h4>Ejercicio ${index + 1} · Código corregido de referencia</h4>
        <p class="reference-note">Este es un modelo de solución. El docente puede aceptar otras formas de resolver correctamente el ejercicio.</p>
        <pre class="reference-code"><code>${escapeHTML(model)}</code></pre>
        <p><strong>Código entregado por el estudiante:</strong></p>
        <pre><code>${escapeHTML(codeAnswersNow[`answer${index + 1}`] || "Sin responder")}</code></pre>
        <label>Calificación del docente (0 a 0,80)
          <input class="teacher-code-score" data-index="${index + 1}" type="number" min="0" max="0.8" step="0.01" value="${Number.isFinite(Number(savedCodeScores[`answer${index + 1}`])) ? Number(savedCodeScores[`answer${index + 1}`]) : 0}">
        </label>
      </article>`).join("");
    root.innerHTML = `<h3>Evaluación docente · ${correct}/40 respuestas correctas · A y B: ${abScore.toFixed(2).replace(".", ",")}/6 puntos</h3>
      <p>Las respuestas correctas aparecen en verde y las incorrectas en rojo. En cada pregunta se muestra la respuesta elegida, la respuesta correcta y una explicación.</p>
      <details open><summary>Corrección de respuestas · Partes A y B</summary><ol class="teacher-answer-list">${keys}</ol></details>
      <h3>Parte C · Corrección de código</h3>
      <p>Teoría: 0,10 por respuesta correcta (máximo 2 puntos). Interpretación: 0,20 por respuesta correcta (máximo 4 puntos). Asigná de 0 a 0,80 puntos a cada ejercicio de código (máximo 4 puntos). Total: 10 puntos.</p>${exercises}
      <button id="saveTeacherGrade" class="primary" type="button">Guardar calificación docente</button>
      <p id="teacherGradeStatus" aria-live="polite"></p>`;
    $("saveTeacherGrade")?.addEventListener("click", () => {
      const scores = {};
      let valid = true;
      root.querySelectorAll(".teacher-code-score").forEach(input => {
        const value = Number(input.value);
        if (!Number.isFinite(value) || value < 0 || value > 0.8) valid = false;
        scores[`answer${input.dataset.index}`] = value;
      });
      if (!valid) {
        $("teacherGradeStatus").textContent = "Ingresá un puntaje entre 0 y 0,80 en cada ejercicio.";
        return;
      }
      const codeScore = Object.values(scores).reduce((sum, value) => sum + value, 0);
      const total = Number((abScore + codeScore).toFixed(2));
      const percent = total * 10;
      const gradeOutOfTen = total;
      attempt.teacherCodeScores = scores;
      attempt.teacherScore = total;
      attempt.teacherGradeOutOfTen = Number(gradeOutOfTen.toFixed(2));
      attempt.teacherGradedAt = new Date().toISOString();
      let isActiveAttempt = false;
      try {
        const activeAttempt = JSON.parse(localStorage.getItem(EXAM_KEY) || "null");
        isActiveAttempt = activeAttempt?.id === attempt.id;
        if (isActiveAttempt) localStorage.setItem(EXAM_KEY, JSON.stringify(attempt));
        saveHistory(attempt);
      } catch (error) {
        $("teacherGradeStatus").textContent = "No se pudo guardar la nota en este navegador.";
        return;
      }
      if (isActiveAttempt) {
        renderStudentSummary(attempt.answers, attempt);
        if ($("score")) $("score").innerHTML = `${total.toLocaleString("es-AR", { maximumFractionDigits: 2 })}<small> / 10</small>`;
        if ($("scoreText")) $("scoreText").textContent = `Nota docente: ${gradeOutOfTen.toFixed(2).replace(".", ",")}/10 · ${percent.toFixed(0)}% · ${performanceLabel(gradeOutOfTen)} · Teoría e interpretación: ${abScore.toFixed(2).replace(".", ",")}/6 (${correct}/40 correctas) · Código: ${codeScore.toFixed(2).replace(".", ",")}/4.`;
        if ($("gradeMessage")) {
          $("gradeMessage").textContent = percent >= PASS_PERCENT ? "Evaluación aprobada según el criterio del 70% (7/10)." : "Evaluación no aprobada. El mínimo es 70% (7/10).";
          $("gradeMessage").className = `grade-message ${percent >= PASS_PERCENT ? "pass" : "fail"}`;
        }
      }
      $("teacherGradeStatus").textContent = "Calificación docente guardada en el historial de este navegador.";
      renderTeacherDashboard();
    });
  }

  function renderTeacherDashboard() {
    let root = $('teacherDashboard');
    if (!root) {
      root = document.createElement('section');
      root.id = 'teacherDashboard';
      root.className = 'teacher-dashboard panel';
      root.innerHTML = '<div class="dashboard-heading"><div><span class="eyebrow">ADMINISTRACIÓN</span><h2>Panel de resultados</h2><p>Historial de entregas registradas en este navegador y dispositivo. Para reunir resultados de distintos dispositivos se necesita una base de datos compartida.</p></div><div class="dashboard-actions"><button id="exportExcelBtn" class="secondary" type="button">Exportar Excel (CSV)</button><button id="printReportBtn" class="primary" type="button">Imprimir / Guardar PDF</button></div></div><div class="dashboard-filters"><label>Filtrar por curso<input id="courseFilter" type="search" placeholder="Ej.: 5° A"></label><label>Buscar estudiante<input id="studentFilter" type="search" placeholder="Nombre o apellido"></label></div><div id="dashboardStats" class="dashboard-stats"></div><div id="dashboardTableWrap"></div><div id="questionAnalytics"></div>';
      $('teacherReview')?.after(root);
    }
    const history = getHistory().sort((a, b) => new Date(b.date) - new Date(a.date));
    const graded = history.filter(item => Number.isFinite(item.teacherScore));
    const average = graded.length ? graded.reduce((sum, item) => sum + Number(item.teacherScore), 0) / graded.length : 0;
    const passed = graded.filter(item => Number(item.teacherScore) >= 7).length;
    $('dashboardStats').innerHTML = `
      <div class="dashboard-stat"><strong>${history.length}</strong><span>Entregas registradas</span></div>
      <div class="dashboard-stat"><strong>${graded.length}</strong><span>Calificadas</span></div>
      <div class="dashboard-stat"><strong>${graded.length ? formatScore(average) : '—'}</strong><span>Promedio real / 10</span></div>
      <div class="dashboard-stat"><strong>${graded.length ? Math.round(passed / graded.length * 100) + '%' : '—'}</strong><span>Aprobación entre calificadas</span></div>`;

    const renderTable = () => {
      const course = $('courseFilter').value.trim().toLowerCase();
      const student = $('studentFilter').value.trim().toLowerCase();
      const filtered = history.filter(item => `${item.student?.course || ''}`.toLowerCase().includes(course) && `${item.student?.name || ''} ${item.student?.lastName || ''}`.toLowerCase().includes(student));
      $('dashboardTableWrap').innerHTML = filtered.length ? `<div class="table-scroll"><table class="results-table"><thead><tr><th>Estudiante</th><th>Curso</th><th>Fecha</th><th>Nota / 10</th><th>Estado</th><th>Informe</th></tr></thead><tbody>${filtered.map(item => {
        const studentName = `${item.student?.lastName || ''}, ${item.student?.name || ''}`.replace(/^, |, $/g, '');
        const grade = Number.isFinite(item.teacherScore) ? formatScore(item.teacherScore) : 'Pendiente';
        const state = Number.isFinite(item.teacherScore) ? (item.teacherScore >= 7 ? 'Aprobado' : 'No aprobado') : 'Sin corregir';
        return `<tr><td>${escapeHTML(studentName || 'Sin datos')}</td><td>${escapeHTML(item.student?.course || '—')}</td><td>${escapeHTML(new Date(item.date).toLocaleDateString('es-AR'))}</td><td>${grade}</td><td>${state}</td><td><button type="button" class="small-action" data-report-id="${escapeHTML(item.id || '')}">Informe</button> <button type="button" class="small-action" data-review-id="${escapeHTML(item.id || '')}">Revisar</button></td></tr>`;
      }).join('')}</tbody></table></div>` : '<p class="empty-dashboard">No hay entregas que coincidan con los filtros.</p>';
      $('dashboardTableWrap').querySelectorAll('[data-report-id]').forEach(button => button.addEventListener('click', () => {
        const item = getHistory().find(record => record.id === button.dataset.reportId);
        if (item) showIndividualReport(item);
      }));
      $('dashboardTableWrap').querySelectorAll('[data-review-id]').forEach(button => button.addEventListener('click', () => {
        const item = getHistory().find(record => record.id === button.dataset.reviewId);
        if (item) { renderTeacherReview(item); $('teacherReview')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }));
    };
    renderTable();
    $('courseFilter').oninput = renderTable;
    $('studentFilter').oninput = renderTable;

    const stats = calculateQuestionStats(history);
    $('questionAnalytics').innerHTML = `<h3>Preguntas con más errores</h3><p class="muted">Porcentaje calculado sobre las entregas que respondieron cada pregunta.</p><div class="analytics-list">${stats.slice(0, 8).map(item => `<div class="analytics-row"><strong>${item.label}</strong><div class="analytics-track"><span style="width:${item.rate}%"></span></div><span>${item.total ? Math.round(item.rate) + '%' : 'Sin datos'} (${item.errors}/${item.total})</span></div>`).join('')}</div>`;

    $('exportExcelBtn').onclick = () => exportHistoryCSV(getHistory());
    $('printReportBtn').onclick = () => printDashboard(getHistory());
  }

  function showIndividualReport(attempt) {
    const student = attempt.student || {};
    const score = Number.isFinite(attempt.teacherScore) ? Number(attempt.teacherScore) : null;
    const ab = calculateABPoints(attempt.answers || {});
    const code = Object.values(attempt.teacherCodeScores || {}).reduce((sum, value) => sum + Number(value || 0), 0);
    const correct = allItems().filter(item => attempt.answers?.[item.id] === item.c).length;
    const theoryScore = Number((allItems().slice(0, 20).filter(item => attempt.answers?.[item.id] === item.c).length * 0.1).toFixed(2));
    const interpretationScore = Number((allItems().slice(20).filter(item => attempt.answers?.[item.id] === item.c).length * 0.2).toFixed(2));
    const codeBreakdown = [1, 2, 3, 4, 5].map(index => `Ej. ${index}: ${formatScore(attempt.teacherCodeScores?.[`answer${index}`] || 0)}/0,80`).join(' · ');
    const html = `<div class="individual-report"><h3>Informe individual</h3><p><strong>Estudiante:</strong> ${escapeHTML(student.name || '')} ${escapeHTML(student.lastName || '')}</p><p><strong>Curso:</strong> ${escapeHTML(student.course || '—')}</p><p><strong>Fecha:</strong> ${escapeHTML(new Date(attempt.date).toLocaleString('es-AR'))}</p><div class="report-score">${score === null ? 'Pendiente de calificación' : `${formatScore(score)} / 10 · ${score >= 7 ? 'Aprobado' : 'No aprobado'} · ${performanceLabel(score)}`}</div><p>Parte A – Teoría: ${formatScore(theoryScore)}/2. Parte B – Interpretación: ${formatScore(interpretationScore)}/4. Parte C – Código: ${formatScore(code)}/4.</p><p><strong>Detalle de código:</strong> ${codeBreakdown}</p><p><strong>Respuestas correctas:</strong> ${correct}/40.</p><p><strong>Diagnóstico:</strong> ${correct < 20 ? 'Necesita reforzar conceptos básicos y lectura de código.' : correct < 32 ? 'Buen avance; conviene practicar los temas donde hubo errores.' : 'Buen dominio de teoría e interpretación; reforzar la resolución práctica si corresponde.'}</p><div class="report-actions"><button class="secondary" type="button" id="printIndividualReport">Imprimir / Guardar PDF</button><button class="secondary" type="button" id="closeIndividualReport">Cerrar informe</button></div></div>`;
    const existing = $('individualReport');
    if (existing) existing.remove();
    const wrapper = document.createElement('div');
    wrapper.id = 'individualReport';
    wrapper.className = 'individual-report-overlay';
    wrapper.innerHTML = html;
    document.body.append(wrapper);
    $('closeIndividualReport').onclick = () => wrapper.remove();
    $('printIndividualReport').onclick = () => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) { alert('Permití las ventanas emergentes para generar el informe PDF.'); return; }
      const reportContent = wrapper.querySelector('.individual-report').innerHTML;
      printWindow.onload = () => printWindow.print();
      printWindow.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Informe individual IPEM 146</title><style>body{font:14px Arial;padding:28px;color:#172033;line-height:1.5}h3{font-size:22px}.report-score{padding:12px;background:#f0f7ff;border-radius:8px;font-weight:bold}.report-actions{display:none}</style></head><body>${reportContent}</body></html>`);
      printWindow.document.close();
    };
  }

  function csvCell(value) { return `"${String(value ?? '').replace(/"/g, '""')}"`; }
  function exportHistoryCSV(history) {
    const header = ['Apellido', 'Nombre', 'Curso', 'Fecha', 'Teoria / 2', 'Interpretacion / 4', 'Codigo / 4', 'Nota / 10', 'Estado'];
    const rows = history.map(item => {
      const ab = calculateABPoints(item.answers || {});
      const code = Object.values(item.teacherCodeScores || {}).reduce((sum, value) => sum + Number(value || 0), 0);
      const grade = Number.isFinite(item.teacherScore) ? item.teacherScore : '';
      return [item.student?.lastName, item.student?.name, item.student?.course, new Date(item.date).toLocaleString('es-AR'), calculateABPoints(Object.fromEntries(allItems().slice(0, 20).map(q => [q.id, item.answers?.[q.id]]))), ab - calculateABPoints(Object.fromEntries(allItems().slice(0, 20).map(q => [q.id, item.answers?.[q.id]]))), code, grade, grade === '' ? 'Pendiente' : grade >= 7 ? 'Aprobado' : 'No aprobado'].map(csvCell).join(';');
    });
    const blob = new Blob(['\ufeff' + [header.map(csvCell).join(';'), ...rows].join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = 'informe_ipem146_resultados.csv'; link.click(); URL.revokeObjectURL(url);
  }

  function printDashboard(history) {
    const rows = history.map(item => {
      const ab = calculateABPoints(item.answers || {});
      const code = Object.values(item.teacherCodeScores || {}).reduce((sum, value) => sum + Number(value || 0), 0);
      const score = Number.isFinite(item.teacherScore) ? formatScore(item.teacherScore) : 'Pendiente';
      return `<tr><td>${escapeHTML(item.student?.lastName || '')}, ${escapeHTML(item.student?.name || '')}</td><td>${escapeHTML(item.student?.course || '')}</td><td>${new Date(item.date).toLocaleDateString('es-AR')}</td><td>${formatScore(ab)}</td><td>${formatScore(code)}</td><td>${score}</td><td>${Number.isFinite(item.teacherScore) ? (item.teacherScore >= 7 ? 'Aprobado' : 'No aprobado') : 'Pendiente'}</td></tr>`;
    }).join('');
    const win = window.open('', '_blank');
    if (!win) { alert('El navegador bloqueó la ventana. Permití las ventanas emergentes para imprimir o guardar el PDF.'); return; }
    win.onload = () => win.print();
    win.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Informe IPEM 146</title><style>body{font:14px Arial;padding:24px;color:#172033}h1{font-size:22px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #bbb;padding:8px;text-align:left}th{background:#edf2f7}@media print{button{display:none}}</style></head><body><h1>IPEM 146 · Informe de resultados</h1><p>Fecha de emisión: ${new Date().toLocaleString('es-AR')}</p><table><thead><tr><th>Estudiante</th><th>Curso</th><th>Fecha</th><th>A+B / 6</th><th>C / 4</th><th>Nota / 10</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table><p>Escala: 0–3,99 desempeño bajo · 4–5,99 en proceso · 6–6,99 próximo a aprobar · 7–8,99 aprobado · 9–10 destacado.</p></body></html>`);
    win.document.close();
  }

  function requestTeacherPassword(title) {
    const dialog = $("teacherPasswordDialog");
    const input = $("teacherPasswordInput");
    const heading = $("teacherPasswordTitle");
    const form = $("teacherPasswordForm");
    if (!dialog || !input || !form) return Promise.resolve(null);
    heading.textContent = title;
    input.value = "";
    dialog.showModal();
    input.focus();
    return new Promise(resolve => {
      const cleanup = () => {
        form.removeEventListener("submit", onSubmit);
        dialog.removeEventListener("cancel", onCancel);
        dialog.removeEventListener("close", onClose);
        input.value = "";
      };
      const onSubmit = event => {
        event.preventDefault();
        const value = input.value;
        cleanup();
        dialog.close();
        resolve(value);
      };
      const onCancel = () => { cleanup(); resolve(null); };
      const onClose = () => { cleanup(); resolve(null); };
      form.addEventListener("submit", onSubmit);
      dialog.addEventListener("cancel", onCancel, { once: true });
      dialog.addEventListener("close", onClose, { once: true });
    });
  }

  async function openTeacherDashboard() {
    const password = await requestTeacherPassword("Contraseña docente para abrir el panel de resultados");
    if (password === null) return;
    if (password !== TEACHER_PASSWORD) {
      window.alert("Contraseña incorrecta. No se abrió el panel docente.");
      return;
    }
    renderTeacherDashboard();
    $("teacherDashboard")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function openTeacherReview() {
    const attempt = (() => { try { return JSON.parse(localStorage.getItem(EXAM_KEY) || "null"); } catch { return null; } })();
    if (!attempt) {
      window.alert("Todavía no hay un examen entregado para revisar.");
      return;
    }
    const password = await requestTeacherPassword("Contraseña docente para abrir la clave y evaluar");
    if (password === null) return;
    // Funciona también en GitHub Pages: no depende de una API Node.js.
    // Es una barrera básica de interfaz, no autenticación segura.
    if (password !== TEACHER_PASSWORD) {
      window.alert("Contraseña incorrecta. No se abrió la evaluación docente.");
      return;
    }
    renderTeacherReview(attempt);
    renderTeacherDashboard();
    if ($("teacherReview")) $("teacherReview").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function grade() {
    if (examLocked || isGrading) return;
    const student = {
      name: $("studentName")?.value.trim() || "",
      lastName: $("studentLastName")?.value.trim() || "",
      course: $("studentCourse")?.value.trim() || ""
    };
    if (!student.name || !student.lastName || !student.course) {
      window.alert("Completá nombre, apellido y curso antes de finalizar.");
      $("studentName")?.focus();
      return;
    }
    const unanswered = totalQuestions - Object.keys(answers).length;
    const emptyExercises = Array.from(document.querySelectorAll(".code-answer")).filter(field => !field.value.trim()).length;
    const confirmText = unanswered > 0 || emptyExercises > 0
      ? `Tenés ${unanswered} pregunta(s) y ${emptyExercises} ejercicio(s) de código sin completar. ¿Querés entregar igualmente? El docente revisará el examen.`
      : "¿Confirmás la entrega? El examen quedará bloqueado hasta la revisión docente.";
    if (!window.confirm(confirmText)) return;
    const button = $("gradeBtn");
    if (button) { button.disabled = true; button.textContent = "REGISTRANDO ENTREGA…"; }
    const codeAnswersNow = Object.fromEntries(Array.from(document.querySelectorAll(".code-answer"), field => [field.id, field.value]));
    const attempt = {
      student, answers: { ...answers }, codeAnswers: codeAnswersNow,
      date: new Date().toISOString(), version: 8, teacherCodeScores: {}, layout: examLayout,
      id: `${Date.now()}_${student.lastName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    };
    try {
      localStorage.setItem(EXAM_KEY, JSON.stringify(attempt));
      saveHistory(attempt);
      localStorage.removeItem(DRAFT_KEY);
      showCorrection(attempt.answers, null, attempt.date, attempt);
    } catch (error) {
      console.error("No se pudo guardar la entrega:", error);
      if (button) { button.disabled = false; button.textContent = "Volver a entregar"; }
      if ($("gradeMessage")) $("gradeMessage").textContent = "No se pudo guardar la entrega en este navegador. No cierres la página e informá al docente.";
    }
  }

  async function deleteSavedAttempt() {
    // Contraseña solicitada para evitar reinicios accidentales desde la interfaz.
    // En GitHub Pages esta validación es del lado del navegador, no una protección segura.
    const password = await requestTeacherPassword("Ingresá la contraseña docente para eliminar los datos");
    if (password === null) return;
    if (password !== TEACHER_PASSWORD) {
      window.alert("Contraseña incorrecta. No se eliminaron los datos del examen.");
      const status = $("deleteStatus");
      if (status) status.textContent = "Contraseña incorrecta. El examen sigue guardado.";
      return;
    }

    const confirmed = window.confirm(
      "¿Querés borrar el examen entregado y el borrador guardado en ESTE navegador?\n\n" +
      "Al confirmar, se limpiarán los datos y podrás ingresar nuevamente nombre, apellido, curso y respuestas."
    );
    if (!confirmed) return;

    const status = $("deleteStatus");
    const button = $("deleteSavedBtn");
    try {
      // Este examen guarda los intentos en el navegador. No se consulta una API
      // porque GitHub Pages no ejecuta server.js y esa llamada impedía reiniciar.
      const keysToRemove = Object.keys(localStorage).filter(key =>
        key === EXAM_KEY || key === DRAFT_KEY || key.startsWith("ipem146_js_examen_intento_unico")
      );
      keysToRemove.forEach(key => localStorage.removeItem(key));
      localStorage.removeItem(LAYOUT_KEY);
      examLayout = makeExamLayout();
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(examLayout));

      answers = {};
      codeAnswers = {};
      renderQuestions(theory, "theoryQuestions", "t");
      renderQuestions(interpretation, "interpretQuestions", "i");
      examLocked = false;
      isGrading = false;

      document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
        input.disabled = false;
      });
      ["studentName", "studentLastName", "studentCourse"].forEach(id => {
        const field = $(id);
        if (field) {
          field.value = "";
          field.disabled = false;
        }
      });
      document.querySelectorAll(".code-answer").forEach(field => {
        field.value = "";
        field.disabled = false;
      });
      document.querySelectorAll(".feedback").forEach(feedback => { feedback.textContent = ""; });

      if ($("score")) $("score").innerHTML = `—<small> / 10</small>`;
      if ($("scoreText")) $("scoreText").textContent =
        "Respondé las 40 preguntas y completá los 5 ejercicios. La nota es sobre 10 puntos: teoría 2, interpretación 4 y código 4. Se aprueba con 7/10 (70%).";
      if ($("gradeMessage")) {
        $("gradeMessage").textContent = "Nuevo intento habilitado. Ingresá nuevamente tus datos y comenzá la evaluación.";
        $("gradeMessage").className = "grade-message";
      }
      if ($("teacherReview")) $("teacherReview").innerHTML = "";
      if ($("teacherReviewBtn")) $("teacherReviewBtn").hidden = true;
      if ($("gradeBtn")) {
        $("gradeBtn").disabled = false;
        $("gradeBtn").textContent = "Finalizar y corregir";
      }
      if (button) {
        button.disabled = false;
        button.textContent = "Eliminar intento activo y habilitar nuevo";
      }
      updateProgress();
      if (status) status.textContent =
        "Datos eliminados. Ya podés ingresar nuevamente nombre, apellido y curso y realizar otro examen.";
      $("studentName")?.focus();
    } catch (error) {
      console.error("No se pudieron eliminar los datos del examen:", error);
      if (status) status.textContent =
        "El navegador no permitió borrar los datos. Revisá que no esté bloqueado el almacenamiento del sitio.";
      if (button) button.disabled = false;
    }
  }

  function saveDraft() {
    if (examLocked) return;
    const student = {
      name: $("studentName")?.value.trim() || "",
      lastName: $("studentLastName")?.value.trim() || "",
      course: $("studentCourse")?.value.trim() || ""
    };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        student,
        answers: { ...answers },
        codeAnswers: Object.fromEntries(Array.from(document.querySelectorAll(".code-answer"), field => [field.id, field.value])),
        layout: examLayout,
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.warn("No se pudo guardar el avance local:", error);
    }
  }

  function restoreDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return false;
      const draft = JSON.parse(raw);
      if (!draft || typeof draft !== "object") return false;
      const student = draft.student || {};
      if ($("studentName")) $("studentName").value = student.name || "";
      if ($("studentLastName")) $("studentLastName").value = student.lastName || "";
      if ($("studentCourse")) $("studentCourse").value = student.course || "";
      answers = draft.answers && typeof draft.answers === "object" ? draft.answers : {};
      Object.entries(answers).forEach(([id, selected]) => {
        const option = document.querySelector(`input[name="${id}"][value="${selected}"]`);
        if (option) option.checked = true;
      });
      codeAnswers = draft.codeAnswers && typeof draft.codeAnswers === "object" ? draft.codeAnswers : {};
      document.querySelectorAll(".code-answer").forEach(field => {
        field.value = typeof codeAnswers[field.id] === "string" ? codeAnswers[field.id] : "";
      });
      updateProgress();
      if ($("gradeMessage")) $("gradeMessage").textContent = "Se recuperó tu avance guardado en este dispositivo. Podés continuar.";
      return true;
    } catch (error) {
      console.warn("No se pudo recuperar el borrador:", error);
      return false;
    }
  }

  function restoreAttempt() {
    let raw;
    try {
      raw = localStorage.getItem(EXAM_KEY);
    } catch (error) {
      console.error("No se pudo acceder al almacenamiento:", error);
      if ($("gradeMessage")) $("gradeMessage").textContent = "El navegador no permite acceder al almacenamiento. No se puede garantizar el registro del intento.";
      if ($("gradeBtn")) $("gradeBtn").disabled = true;
      return true;
    }
    if (!raw) return false;

    try {
      const attempt = JSON.parse(raw);
      if (!attempt || !attempt.answers || typeof attempt.answers !== "object") {
        throw new Error("Registro de intento inválido");
      }
      // Los intentos de versiones anteriores a la escala sobre 10 se conservan,
      // pero su calificación se recalcula con la escala actual.
      if (Number(attempt.version || 0) < 7) {
        delete attempt.teacherScore;
        delete attempt.teacherGradeOutOfTen;
        delete attempt.teacherGradedAt;
        attempt.teacherCodeScores = {};
        attempt.version = 8;
        try { localStorage.setItem(EXAM_KEY, JSON.stringify(attempt)); } catch (error) {
          console.warn("No se pudo actualizar la versión de la evaluación:", error);
        }
      }
      answers = attempt.answers;
      if (!attempt.id) attempt.id = `${attempt.date || Date.now()}_${(attempt.student?.lastName || "estudiante").toLowerCase()}`;
      if (!attempt.layout) attempt.layout = examLayout;
      saveHistory(attempt);
      try { localStorage.setItem(EXAM_KEY, JSON.stringify(attempt)); } catch {}
      if (attempt.student) {
        if ($("studentName")) $("studentName").value = attempt.student.name || "";
        if ($("studentLastName")) $("studentLastName").value = attempt.student.lastName || "";
        if ($("studentCourse")) $("studentCourse").value = attempt.student.course || "";
      }
      restoreCodeAnswers(attempt.codeAnswers || {});
      showCorrection(attempt.answers, attempt.score, attempt.date, attempt);
      const message = $("gradeMessage");
      if (message) {
        message.textContent += " Este examen ya fue realizado en este navegador y dispositivo.";
      }
      return true;
    } catch (error) {
      console.error("No se pudo recuperar el intento guardado:", error);
      // Ante un registro existente pero ilegible, se bloquea por seguridad.
      examLocked = true;
      if ($("gradeBtn")) {
        $("gradeBtn").disabled = true;
        $("gradeBtn").textContent = "EXAMEN BLOQUEADO";
      }
      if ($("gradeMessage")) {
        $("gradeMessage").textContent = "Existe un intento registrado, pero no se pudo leer. Comunicarse con el docente.";
      }
      document.querySelectorAll('input[type="radio"]').forEach(input => input.disabled = true);
      return true;
    }
  }

  function initTabs() {
    document.querySelectorAll(".tab").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(tab => tab.classList.toggle("active", tab === button));
        document.querySelectorAll(".section").forEach(section => {
          section.classList.toggle("active", section.id === button.dataset.target);
        });
      });
    });
  }

  function initSolutions() {
    document.querySelectorAll(".solution-btn").forEach(button => {
      button.addEventListener("click", () => {
        const solution = $(button.dataset.solution);
        if (!solution || !examLocked) return;
        solution.classList.toggle("hidden");
        button.textContent = solution.classList.contains("hidden")
          ? "Ver solución del modelo"
          : "Ocultar solución";
      });
    });
    // En un examen no se muestran soluciones modelo.
    document.querySelectorAll(".solution").forEach(solution => solution.classList.add("hidden"));
    document.querySelectorAll(".solution-btn").forEach(button => button.hidden = true);
  }

  function init() {
    loadExamLayout();
    renderQuestions(theory, "theoryQuestions", "t");
    renderQuestions(interpretation, "interpretQuestions", "i");
    initTabs();
    initSolutions();
    initCodeEditors();
    updateProgress();

    if ($("gradeBtn")) $("gradeBtn").addEventListener("click", grade);
    if ($("teacherReviewBtn")) $("teacherReviewBtn").addEventListener("click", openTeacherReview);
    ["studentName", "studentLastName", "studentCourse"].forEach(id => {
      if ($(id)) $(id).addEventListener("input", saveDraft);
    });
    if ($("deleteSavedBtn")) $("deleteSavedBtn").addEventListener("click", deleteSavedAttempt);
    if ($("teacherDashboardBtn")) $("teacherDashboardBtn").addEventListener("click", openTeacherDashboard);

    // No existe reinicio para el estudiante. El docente debe publicar una nueva versión.
    if ($("resetBtn")) {
      $("resetBtn").disabled = true;
      $("resetBtn").hidden = true;
      $("resetBtn").title = "El examen es de intento único.";
    }

    if (!restoreAttempt()) {
      restoreDraft();
      examLocked = false;
      if ($("score")) $("score").innerHTML = `—<small> / 10</small>`;
      if ($("scoreText")) $("scoreText").textContent = `Respondé las 40 preguntas y completá los 5 ejercicios. La nota es sobre 10 puntos: teoría 2, interpretación 4 y código 4. Se aprueba con 7/10 (70%).`;
      if ($("gradeMessage")) $("gradeMessage").textContent = "Completá tus datos personales. Al entregar, el docente podrá consultar la clave y evaluar tus respuestas.";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
