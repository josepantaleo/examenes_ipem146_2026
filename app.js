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
  const EXAM_KEY = "ipem146_js_examen_intento_unico_v1";
  const PASS_PERCENT = 60;

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

  const allItems = () => [
    ...theory.map((item, i) => ({ ...item, id: `t-${i}` })),
    ...interpretation.map((item, i) => ({ ...item, id: `i-${i}` }))
  ];

  let answers = {};
  let examLocked = false;
  let isGrading = false;

  const $ = id => document.getElementById(id);
  const totalQuestions = theory.length + interpretation.length;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function renderQuestions(items, target, prefix) {
    const root = $(target);
    if (!root) return;

    root.innerHTML = items.map((item, i) => `
      <article class="question" id="${prefix}-${i}">
        <h3><span class="q-number">${i + 1}.</span> ${escapeHTML(item.q).replace(/\n/g, "<br>")}</h3>
        ${item.q.includes("\n\n") ? "" : ""}
        <div class="options">
          ${item.a.map((option, j) => `
            <label class="option">
              <input type="radio" name="${prefix}-${i}" value="${j}">
              <span>${escapeHTML(option).replace(/\n/g, "<br>")}</span>
            </label>
          `).join("")}
        </div>
        <p class="feedback" aria-live="polite"></p>
      </article>
    `).join("");

    root.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener("change", () => {
        if (examLocked) {
          input.checked = false;
          return;
        }
        answers[input.name] = Number(input.value);
        updateProgress();
        const message = $("gradeMessage");
        if (message) message.textContent = "";
      });
    });
  }

  function updateProgress() {
    const answered = Object.keys(answers).length;
    if ($("progressText")) $("progressText").textContent = `${answered} de ${totalQuestions}`;
    if ($("progressBar")) $("progressBar").style.width = `${answered / totalQuestions * 100}%`;
  }

  function showCorrection(savedAnswers, savedScore = null, savedDate = null) {
    let score = 0;

    allItems().forEach(item => {
      const selected = savedAnswers[item.id];
      const card = $(item.id);
      if (!card) return;

      const feedback = card.querySelector(".feedback");
      card.querySelectorAll(".option").forEach((label, index) => {
        label.classList.remove("correct", "incorrect");
        const radio = label.querySelector("input");
        if (radio) {
          radio.disabled = true;
          radio.checked = selected === index;
        }
        if (index === item.c) label.classList.add("correct");
        if (selected === index && selected !== item.c) label.classList.add("incorrect");
      });

      if (selected === item.c) {
        score++;
        if (feedback) {
          feedback.textContent = `¡Correcto! ${item.e}`;
          feedback.className = "feedback good";
        }
      } else if (feedback) {
        feedback.textContent = `${selected === undefined ? "Sin responder. " : "Respuesta incorrecta. "}${item.e}`;
        feedback.className = "feedback bad";
      }
    });

    if (savedScore !== null && Number.isFinite(Number(savedScore))) score = Number(savedScore);
    const percent = Math.round(score / totalQuestions * 100);

    if ($("score")) $("score").innerHTML = `${score}<small> / ${totalQuestions}</small>`;
    if ($("scoreText")) {
      $("scoreText").textContent = `Resultado: ${percent}%. ${score} respuestas correctas de ${totalQuestions}.`;
    }
    if ($("gradeMessage")) {
      $("gradeMessage").textContent = percent >= PASS_PERCENT
        ? `Examen aprobado. Alcanzaste el ${PASS_PERCENT}% o más de respuestas correctas.`
        : `Examen no aprobado. El mínimo de referencia es ${PASS_PERCENT}%. El intento quedó registrado y no puede repetirse.`;
      $("gradeMessage").className = `grade-message ${percent >= PASS_PERCENT ? "pass" : "fail"}`;
    }

    const button = $("gradeBtn");
    if (button) {
      button.disabled = true;
      button.textContent = "EXAMEN FINALIZADO";
    }
    const reset = $("resetBtn");
    if (reset) {
      reset.disabled = true;
      reset.hidden = true;
    }

    if (savedDate && $("scoreText")) {
      const date = new Date(savedDate);
      if (!Number.isNaN(date.getTime())) {
        $("scoreText").textContent += ` Fecha: ${date.toLocaleString("es-AR")}.`;
      }
    }

    examLocked = true;
    updateProgress();
  }

  function grade() {
    if (examLocked || isGrading) return;

    const unanswered = totalQuestions - Object.keys(answers).length;
    const confirmText = unanswered > 0
      ? `Tenés ${unanswered} pregunta(s) sin responder. ¿Querés finalizar igualmente? No podrás volver a modificar el examen.`
      : "¿Confirmás la entrega? Una vez finalizado no podrás modificar las respuestas ni volver a rendir.";

    if (!window.confirm(confirmText)) return;

    isGrading = true;
    const score = allItems().reduce((total, item) => {
      return total + (answers[item.id] === item.c ? 1 : 0);
    }, 0);

    const attempt = {
      answers: { ...answers },
      score,
      total: totalQuestions,
      percentage: Math.round(score / totalQuestions * 100),
      date: new Date().toISOString(),
      version: 1
    };

    try {
      // Se guarda antes de mostrar la corrección y bloquear la interfaz.
      localStorage.setItem(EXAM_KEY, JSON.stringify(attempt));
      showCorrection(attempt.answers, attempt.score, attempt.date);
    } catch (error) {
      isGrading = false;
      window.alert("No se pudo guardar el intento en este navegador. Revisá que el almacenamiento esté habilitado y volvé a finalizar.");
      console.error("Error al guardar el examen:", error);
      return;
    }

    isGrading = false;
  }

  function restoreAttempt() {
    const raw = localStorage.getItem(EXAM_KEY);
    if (!raw) return false;

    try {
      const attempt = JSON.parse(raw);
      if (!attempt || !attempt.answers || typeof attempt.answers !== "object") {
        throw new Error("Registro de intento inválido");
      }
      answers = attempt.answers;
      showCorrection(attempt.answers, attempt.score, attempt.date);
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
        if (!solution || examLocked) return;
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
    renderQuestions(theory, "theoryQuestions", "t");
    renderQuestions(interpretation, "interpretQuestions", "i");
    initTabs();
    initSolutions();
    updateProgress();

    if ($("gradeBtn")) $("gradeBtn").addEventListener("click", grade);

    // No existe reinicio para el estudiante. El docente debe publicar una nueva versión.
    if ($("resetBtn")) {
      $("resetBtn").disabled = true;
      $("resetBtn").hidden = true;
      $("resetBtn").title = "El examen es de intento único.";
    }

    if (!restoreAttempt()) {
      examLocked = false;
      if ($("score")) $("score").innerHTML = `—<small> / ${totalQuestions}</small>`;
      if ($("scoreText")) $("scoreText").textContent = `Respondé las ${totalQuestions} preguntas y luego finalizá el examen.`;
      if ($("gradeMessage")) $("gradeMessage").textContent = "Tenés un solo intento. Revisá tus respuestas antes de finalizar.";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
