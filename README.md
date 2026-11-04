# Coloquio modelo de JavaScript — IPEM 146

Aplicación web de práctica con 20 preguntas teóricas, 20 preguntas de interpretación y 5 ejercicios de corrección de código. **No utiliza inteligencia artificial.** El docente consulta la clave de respuestas y asigna manualmente la calificación de los ejercicios escritos.

> **Importante:** es un modelo de práctica, no el examen real.

## Características

- Identificación del estudiante: nombre, apellido y curso.
- Guardado automático del avance en el navegador.
- Al pulsar **Finalizar y corregir**, el estudiante ve un resumen de las 40 preguntas: correctas en verde, incorrectas en rojo y sin responder en gris; en las incorrectas se indica la opción correcta.
- Acceso docente protegido por contraseña para consultar las respuestas correctas y las respuestas entregadas.
- Cinco respuestas modelo orientativas para los ejercicios de código; se aceptan soluciones equivalentes.
- Calificación manual de cada ejercicio de código (0 a 10 puntos).
- Puntaje máximo: 100 puntos; partes A y B: 50 puntos (1,25 por respuesta correcta); parte C: 50 puntos (10 por ejercicio). Aprobación: 70 puntos (equivale a 7/10).
- Botón docente para eliminar el intento y el borrador guardados en este navegador.

## Ejecutar localmente

1. Instalá Node.js 20 o superior.
2. Abrí una terminal dentro de la carpeta del proyecto.
3. Ejecutá `npm install`.
4. Copiá `.env.example` como `.env` y configurá `TEACHER_DELETE_PASSWORD` con una contraseña segura.
5. Ejecutá `npm start`.
6. Abrí http://localhost:3000.

Para revisar la sintaxis: `npm run check`.

## Evaluación docente
El botón **“Eliminar datos guardados y habilitar nuevo intento”** solicita confirmación y contraseña docente. Si la autorización es válida, elimina el intento y los borradores de versiones anteriores de este examen guardados en ese navegador y recarga la página. Esto permite volver a comenzar en ese mismo dispositivo. No elimina registros de otros navegadores ni crea un registro central.

**Importante:** la validación de la contraseña se realiza en `server.js`. Por eso esta función requiere que el proyecto esté publicado en un alojamiento que ejecute Node.js y tenga configurada la variable `TEACHER_DELETE_PASSWORD`. En GitHub Pages, que solo sirve archivos estáticos, la ruta `/api/teacher/authorize-delete` no existe y el botón no puede autorizar el borrado.


1. El estudiante completa sus datos, responde y pulsa **Finalizar y corregir** (el botón registra la entrega; no corrige).
2. El docente pulsa **Abrir evaluación docente** e ingresa la contraseña configurada en el servidor.
3. Se muestra la clave de las 40 preguntas, la respuesta seleccionada por el estudiante y las soluciones modelo de los cinco ejercicios.
4. El docente asigna entre 0 y 10 puntos a cada ejercicio y pulsa **Guardar calificación docente**.
5. El sistema calcula el resultado sobre 100 puntos: 50 de las partes A y B (1,25 por respuesta correcta) y 50 de código. Se aprueba con 70 puntos (7/10).

Las soluciones de código son orientativas; el docente debe aceptar otras soluciones válidas que cumplan la consigna.

## Publicar en GitHub

Subí `index.html`, `styles.css`, `app.js`, `server.js`, `package.json`, `.env.example`, `.gitignore` y este README. **Nunca subas `.env`, contraseñas ni secretos.**

GitHub Pages solo aloja archivos estáticos y no ejecuta `server.js`. Para que funcionen la autorización docente y el borrado protegido, desplegá la aplicación en un servicio que ejecute Node.js.

## Almacenamiento y límites

Los borradores, entregas y calificaciones se guardan en `localStorage` del navegador y dispositivo utilizados. No existe una base de datos central ni un panel que reúna automáticamente las entregas de todos los estudiantes. Para una evaluación institucional con consulta desde distintos dispositivos se necesita agregar autenticación y almacenamiento en servidor o Firebase/Firestore.

El bloqueo de copiar, cortar y pegar es una barrera de interfaz, no una protección infalible.

## Estructura

```text
index.html
styles.css
app.js
server.js
package.json
.env.example
.gitignore
README.md
```


### Habilitar un nuevo intento

El botón **Eliminar datos guardados y habilitar nuevo intento** solicita confirmación y borra el intento y el borrador almacenados en el navegador actual. Luego habilita los campos para volver a ingresar los datos del estudiante y responder el examen. Este reinicio es local: no borra registros guardados en otros dispositivos o sistemas externos.
