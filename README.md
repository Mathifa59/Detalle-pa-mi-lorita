# Un ramo para ti 🌼

Un regalo interactivo hecho con HTML, CSS y JavaScript puro. Sin instalación,
compilación, backend, base de datos, cookies, analytics ni llamadas a servicios externos.

## Archivos

```text
index.html       Página y estructura de las tarjetas.
styles.css       Colores, responsive y animaciones.
script.js        Array de recuerdos al inicio + comportamiento del ramo.
media/
  README.md      Instrucciones para agregar tus fotos.
```

## Personalizar y abrir

1. Copia tus fotos en `media/`, siguiendo [las instrucciones](media/README.md).
2. Edita `const flores` al inicio de `script.js`: cada objeto crea una flor.
3. Abre `index.html` en tu navegador. No requiere servidor local.

Las siete fotos ya están incorporadas con frases personalizadas y editables; algunas
usan el apodo «mi Lorita». Los títulos de la página y la
dedicatoria general están en `index.html`. Los colores están al comienzo de `styles.css`.

En escritorio, deja el puntero un instante sobre una flor o haz clic. En celular,
tócala. Se abren los pétalos y aparece su foto y su frase. Vuelve con el botón de cerrar,
«Volver al ramo», Escape o tocando fuera de la tarjeta.
También puedes recorrer las flores con Tab y abrirlas con Enter o Espacio.

Al descubrir cinco flores diferentes y volver al ramo, aparece una invitación a una
cita sorpresa el jueves. Se muestra una vez por visita y permite continuar con las dos
flores restantes. El texto y el número de flores pendientes se editan en `const sorpresa`,
debajo del array de recuerdos. Al recargar la página, el recorrido vuelve a empezar.

Se respeta la preferencia de movimiento reducido del dispositivo. Las fotos
se cargan cuando los necesitas. El progreso de los recuerdos se conserva solo mientras
la página está abierta; no se guarda información en el navegador.

## Desplegar como sitio estático

### Netlify

Puedes subir la carpeta completa mediante la opción de despliegue manual de Netlify
(con `index.html` en la raíz de la carpeta). Si conectas un repositorio, deja el comando
de build vacío y usa la raíz `.` como directorio de publicación.

### Vercel

Importa el repositorio y selecciona **Other** como framework. Usa la raíz del proyecto,
deja el comando de build vacío y utiliza `.` como directorio de salida si te pide uno.
No se necesitan paquetes ni variables de entorno. También es un proyecto estático
compatible con la CLI de Vercel.

Referencias oficiales: [sitios sin build en Vercel](https://vercel.com/docs/builds/configure-a-build#skip-build-step)
y [despliegues manuales en Netlify](https://docs.netlify.com/deploy/create-deploys/).

En ambos casos, vuelve a desplegar después de cambiar tus archivos o mensajes.
No necesitas configuración de rutas: solo existe `index.html`.

## Compatibilidad y diseño

- Navegadores actuales con soporte de `<dialog>` (Chrome, Edge, Firefox y Safari).
- Una sola pantalla principal en tamaños habituales de móvil y escritorio.
- En ventanas muy pequeñas o con texto ampliado se permite desplazamiento para
  mantener todo accesible; las tarjetas también admiten textos largos.
- Hasta 12 flores recomendadas para mantener áreas cómodas al tocarlas en el celular.
- Todo el dibujo es vectorial y los pétalos se animan individualmente; no hay imágenes
  decorativas que debas descargar ni fuentes remotas.

El sitio está listo para alojarse, pero no incluye un despliegue público automático.
