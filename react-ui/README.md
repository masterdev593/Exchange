# Idea International exchange:

## Resultado técnico deseado:

* El frontend seria una landing page, y uno de los botones llevaría a una app hecha en React. El landing seria en HTML5 para ganar el SEO y por que no necesita estados.
* El app seria un formulario dinámico  donde arriba sale el valor de cambio de las monedas a seleccionar (alimentado por un api),  luego dos columnas abajo donde el usuario selecciona en la primera columna (llamada de envío) su moneda, el valor del envió , método de pago (una lista desplegable) y su dirección de correo, luego en la segunda columna (de recibir) el método de recibir el dinero (de una lista de posibles métodos),  el país de destino (de una lista desplegable de países posibles, basado en lo anterior) . Luego un botón de enviar y un mensaje de nos pondremos en contacto.

* Un backend donde usando MailJet y email-templates mandamos la información del app a nuestro email para  ser procesada.
Un sistema de automatización de correos, al principio puede hacerse  manual.

## Resultado General deseado:
Un sistema donde el usuario de cierto país manda en una moneda cierto valor, y mediante nuestro sistema el dinero llega a otro país con otra divisa mediante otros métodos. Por ejemplo enviar $100 de PayPal a Venezuela y que el destinatario reciba en Bolivares por Recarga electrónica u otro medio.

## Oportunidad de negocio:
Hace poco me pagaron  un trabajo por PayPal. mi cuenta es de usuario, por lo que no me dejaba retirar de mi tarjeta. Abrí una cuenta Negocio, pero en Colombia debo usar una cuenta de banco tipo Pyme, y me pide  muchos requisitos, no puedo sacarla. Luego intente en muchas parte y no pude mover mi dinero a otro lado. Tuve que comprar algo en eBay para recuperar mi dinero.

En Venezuela y otros lados hay restricciones o impuestos muy prohibitivos. Ademas para la mayoría no hay acceso a tarjetas de crédito internacionales.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## App setup

The `package.json` defines a proxy which allow handling request to the express server without configuring CORS.
