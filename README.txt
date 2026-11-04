COLOQUIO MODELO DE JAVASCRIPT - IPEM 146

ESTRUCTURA
- Parte A: 20 preguntas teóricas.
- Parte B: 20 preguntas de interpretación de código.
- Parte C: 5 ejercicios de corrección de código escritos por el estudiante.
- Identificación obligatoria: nombre, apellido y curso.

CALIFICACIÓN
- Partes A y B: 40 puntos de corrección automática.
- Parte C: 5 ejercicios, hasta 10 puntos cada uno, corregidos por IA.
- Total: 90 puntos. Aprobación: 70% (equivale a nota 7/10).
- La IA entrega puntaje, observaciones, fortalezas y aspectos para mejorar. La nota final se calcula así: (puntos A+B + puntos C) / 90 × 100. El 70% exacto equivale a 7/10 y aprueba.

REQUISITO PARA LA IA Y CONTRASEÑA DOCENTE
Este proyecto ya incluye un servidor Node.js que conecta con OpenAI. No se debe poner la API key en app.js ni en ningún archivo público.
1. Instalar Node.js 20 o superior.
2. Abrir una terminal en la carpeta del proyecto y ejecutar: npm install
3. Copiar .env.example a .env.
4. En .env configurar OPENAI_API_KEY con una clave privada de API de OpenAI.
5. Configurar OPENAI_MODEL (por defecto gpt-6-astra).
6. Configurar TEACHER_DELETE_PASSWORD con la contraseña docente acordada.
7. Ejecutar: npm start
8. Abrir http://localhost:3000

Para publicar en internet, desplegar esta carpeta en un servicio que ejecute Node.js y configurar allí las variables de entorno. GitHub Pages por sí solo no ejecuta server.js ni protege claves secretas.

BOTÓN DOCENTE
El botón solicita la contraseña y la valida en el servidor. Si es correcta, elimina el intento de este navegador (localStorage) y recarga la página. La acción borra el intento finalizado y el borrador guardados en este navegador; no borra copias guardadas en otros dispositivos.

ALMACENAMIENTO Y PRIVACIDAD
El avance parcial se guarda automáticamente como borrador en el navegador. Al finalizar, el intento queda bloqueado en ese navegador. No se envía a una base de datos ni existe un panel central para que el docente consulte todos los alumnos. Para eso se debe agregar autenticación y persistencia con Firebase/Firestore o una base de datos del servidor.

RESTRICCIÓN DE PORTAPAPELES
En los campos de código se bloquean copiar, cortar, pegar, menú contextual, arrastrar y soltar y atajos habituales. Es una barrera de interfaz, no una protección infalible.

CORRECCIÓN CON IA
La IA puede cometer errores. El docente debe revisar especialmente calificaciones limítrofes o respuestas alternativas. Se envían al servidor los datos de identificación y el código escrito para realizar la corrección.
