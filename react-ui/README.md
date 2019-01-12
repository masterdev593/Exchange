## Scripts Disponibles

En el directorio del proyecto, puede ejecutar:

### `npm start`

Ejecuta la aplicación en el modo de desarrollo. <br>
Abra [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

La página se volverá a cargar si realiza ediciones. <br>
También verá los errores de pelusa en la consola.

### `npm run build`

Crea la aplicación para la producción en la carpeta `build`. <br>
Combina correctamente React en modo de producción y optimiza la construcción para el mejor rendimiento.

La construcción se reduce y los nombres de archivo incluyen los hashes. <br>
Su aplicación está lista para ser implementada!

## Configuración de la Aplicación

El `package.json` define un proxy que permite la solicitud de manejo al servidor Express sin configurar CORS.
