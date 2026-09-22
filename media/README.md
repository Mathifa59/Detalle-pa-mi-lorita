# Aquí van tus fotos 🌼

Esta carpeta ya contiene las siete fotos que compartiste, copiadas sin modificar
los originales de Descargas. Cada una corresponde a una flor, en el orden de tus adjuntos.

| Flor | Foto |
| --- | --- |
| 1 | `foto1-beso.jpg` |
| 2 | `foto2.jpg` |
| 3 | `foto3.jpg` |
| 4 | `foto4.jpg` |
| 5 | `foto5.jpg` |
| 6 | `foto6.jpg` |
| 7 | `foto7.jpg` |

## Fotos

- Usa JPG, PNG o WebP. Se recomienda un tamaño de 1200 px y menos de 1 MB.
- La tarjeta se adapta a la proporción de la foto y la muestra completa, sin recortar caras.
- Si cambias la extensión (por ejemplo, `foto1.webp`), cambia también la ruta en `script.js`.
- Las fotos de iPhone en HEIC deben convertirse a JPG antes de usarlas.

## Cambiar títulos y mensajes

Abre `script.js`. El array `const flores = [...]` es lo primero del archivo.
Cada objeto tiene esta forma:

```js
{
  titulo: "Nuestra primera aventura",
  foto: "media/foto1-beso.jpg",
  descripcionFoto: "Los dos frente al mar", // Texto alternativo accesible, opcional.
  mensaje: "Mi Lorita, contigo cada día tiene algo bonito.\nY quiero seguir coleccionando momentos a tu lado."
}
```

- Para agregar una flor, copia un objeto completo, sepáralo del anterior con una coma
  y cambia su ruta y texto. Para quitar una, borra su objeto completo.
- El ramo se adapta a la cantidad. La composición principal tiene siete flores;
  se recomiendan de 3 a 9, y hasta 12 para conservar buenos tamaños en el celular.
- El orden del array determina el número de cada recuerdo.
- `titulo` y `descripcionFoto` son opcionales.
- Usa `foto: ""` si todavía no tienes esa foto: se mantiene una tarjeta decorativa.
- Los mensajes son texto plano: no necesitan HTML. Usa `\n` para un salto de línea.
- Algunas frases usan el apodo «mi Lorita»; puedes editarlo junto con cualquier mensaje.
- Usa nombres simples, sin espacios ni tildes. Respeta las minúsculas: `foto1.jpg`
  y `Foto1.JPG` pueden ser archivos distintos en el hosting.
- No cambies el nombre de la carpeta `media` sin actualizar las rutas.

Los archivos se publican como parte del sitio estático. No se envían a ningún servicio
externo desde la página.

## La cita sorpresa

Después de abrir cinco flores diferentes y cerrar la quinta tarjeta, aparece la invitación
del jueves. Se muestra una sola vez mientras la página siga abierta. Repetir una flor no
adelanta el contador y el aviso no tapa el mensaje que se está leyendo.

Edita `const sorpresa` justo debajo del array `flores` en `script.js` para cambiar las
frases o `floresRestantes: 2`. No hay que programar una fecha: es parte del regalo,
no una notificación del calendario.
