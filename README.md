# Coloquio modelo de JavaScript — IPEM 146

Aplicación web de práctica con 20 preguntas teóricas, 20 preguntas de interpretación y 5 ejercicios de corrección de código asistidos por IA.

> **Importante:** es un modelo de práctica, no el examen real.

## Características

- Identificación del estudiante: nombre, apellido y curso.
- Guardado automático del avance en el navegador.
- Corrección automática de las 40 preguntas de opción múltiple.
- Corrección asistida por IA de 5 ejercicios escritos, hasta 10 puntos cada uno.
- Puntaje máximo: 90 puntos.
- Aprobación: 70 % (equivale a 7/10).
- Botón docente para borrar el intento y el borrador guardados en el navegador actual.

## Requisitos

- Node.js 20 o superior.
- Una clave de API de OpenAI habilitada para el modelo configurado.

## Ejecutar localmente

1. Descargá o cloná este repositorio.
2. Abrí una terminal dentro de la carpeta del proyecto.
3. Instalá las dependencias:

   ```bash
   npm install
   ```

4. Copiá `.env.example` con el nombre `.env`.
5. Editá `.env` y completá:
   - `OPENAI_API_KEY`: clave privada de API.
   - `OPENAI_MODEL`: identificador de modelo disponible en tu cuenta.
   - `TEACHER_DELETE_PASSWORD`: contraseña docente nueva y segura.
   - `PORT`: puerto local (por defecto 3000).

6. Iniciá la aplicación:

   ```bash
   npm start
   ```

7. Abrí [http://localhost:3000](http://localhost:3000).

Para revisar la sintaxis de JavaScript:

```bash
npm run check
```

## Publicar en GitHub

1. Creá un repositorio nuevo en GitHub.
2. Subí `index.html`, `styles.css`, `app.js`, `server.js`, `package.json`, `package-lock.json` (si existe), `.env.example`, `.gitignore` y este README.
3. **No subas `.env`, claves API ni contraseñas.**
4. Configurá los secretos y variables de entorno en el servicio donde alojes la aplicación.

## Importante: GitHub Pages no alcanza

Esta aplicación necesita `server.js` para comunicarse con OpenAI y validar la contraseña docente. GitHub Pages solo publica archivos estáticos: **no ejecuta Node.js**. Por eso, para que la corrección con IA funcione en Internet, desplegá el proyecto en un hosting que ejecute Node.js y configurá allí las variables de entorno.

Si se publica únicamente en GitHub Pages, la página podrá cargar, pero `/api/grade-code` y `/api/teacher/authorize-delete` no estarán disponibles.

## Almacenamiento y privacidad

El avance y el intento final se guardan en `localStorage` del navegador y dispositivo utilizados. No hay base de datos central ni panel para consultar los resultados de todos los estudiantes. Borrar los datos del navegador, usar otro dispositivo o abrir una ventana privada puede evitar la restricción de intento único. Para un control real por estudiante se necesita autenticación y almacenamiento en servidor o Firebase/Firestore.

El servidor recibe nombre, apellido, curso y respuestas de código para solicitar la corrección. Informá a los estudiantes sobre este tratamiento antes de usar la aplicación.

## Seguridad y límites

- La clave de OpenAI y la contraseña docente deben permanecer en variables de entorno del servidor.
- El botón docente borra solamente el intento y borrador del navegador actual; no elimina registros de otros dispositivos.
- El bloqueo de copiar, cortar y pegar es una barrera de interfaz, no una protección infalible.
- La IA puede equivocarse. El docente debe revisar especialmente respuestas alternativas y notas cercanas al 70 %.
- Configurá límites y monitoreo en el proveedor de hosting para controlar el consumo de la API.

## Estructura

```text
.
├── index.html
├── styles.css
├── app.js
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```
