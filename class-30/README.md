# CLASE 30. Router Frontend + templates

-   [Teoría](https://github.com/beatrizsmerino/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed4/blob/master/teoria/clase30.md)

-   [Recursos](https://github.com/beatrizsmerino/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed4/blob/master/recursos/clase30.md)

-   [Ejercicios](https://github.com/beatrizsmerino/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed4/blob/master/teoria/clase30.md#ejercicios)
    -   [x] 1 - Implementa un sistema de rutas con llamadas Ajax y plantillas partiendo de la API de AireMAD.
        -   Al menos creas tres rutas `/`, `/estacion`, `/estacion/:id`.
        -   La ruta `/estacion` y `/estacion/:id` deben resolverse haciendo una llamada Ajax `http://airemad.com/api/v1/station/:id` y pintar sus resultados haciendo uso de plantillas.
        -   La url debe de poder compartise, permitiendo acceder a ese estado de la aplicación.
        -   Debes generar un contexto común en la app (nav, footer, etc...). Solo parte del contenido es diámico.
        -   Debes gestionar los errores 404 y similares...
        -   Igual es interesante preocuparnos de los posibles ataques XSS: [Npm | dompurify](https://www.npmjs.com/package/dompurify), [Npm | XSS](https://www.npmjs.com/package/xss).
        -   Puedes usar una librería si te ayuda, como [navigo](https://github.com/krasimir/navigo).
