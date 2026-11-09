# Una disculpa entre estrellas — versión corregida

Sitio estático en HTML/CSS/JavaScript, con **10 partes** de una carta y un fondo animado de estrellas, luna y mariposas. Listo para publicar en GitHub Pages o abrir sin conexión.

## Archivos

- `index.html`: página principal. **Es el archivo que debes abrir en tu navegador.**
- `styles.css`: diseño y animaciones.
- `script.js`: las diez partes de la carta y la navegación.
- `.nojekyll`: archivo opcional útil en GitHub Pages.
- `textos_de_la_carta.txt`: copia íntegra de los mensajes para leerlos y revisarlos.

**Importante:** sube `index.html`, `styles.css` y `script.js` **juntos a la misma carpeta**. Si solo abres o subes `index.html`, perderás el diseño y las animaciones. No hace falta ejecutar ni instalar nada.

## Probar en tu computadora

Extrae todo el ZIP a una carpeta. Haz doble clic en `index.html`. Usa el botón «Abrir carta», haz clic sobre la tarjeta o usa las flechas izquierda/derecha del teclado. El botón «Anterior» permite regresar y los puntos permiten saltar entre partes.

## Subir a GitHub Pages

1. Crea un repositorio nuevo, por ejemplo `carta-entre-estrellas`.
2. Sube **los archivos extraídos** a la raíz del repositorio (que `index.html` aparezca directamente y no dentro de una subcarpeta).
3. En **Settings → Pages**, selecciona **Deploy from a branch**, después la rama **main** y la carpeta **/(root)**; guarda.
4. La página estará en una dirección como `https://TU-USUARIO.github.io/carta-entre-estrellas/` cuando GitHub complete la publicación.

El sitio no necesita conexión con servidores externos para las animaciones o fuentes.

## Editar textos

Modifica el arreglo `const pages = [...]` al inicio de `script.js`. Cada entrada corresponde a una pantalla y tiene `label`, `title`, `body`. Para editar sin complicarte, usa el archivo `textos_de_la_carta.txt` como referencia y copia lo que quieras al `body` correspondiente.

## Privacidad

No contiene analítica, confirmaciones de lectura, formularios, imágenes remotas, cookies, solicitudes a servicios externos ni código de seguimiento. GitHub, como proveedor de alojamiento, sí puede registrar datos técnicos habituales de las conexiones. Publicar en GitHub Pages puede hacer la carta accesible a cualquiera que tenga la dirección.
