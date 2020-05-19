# CLASE 49. Nodejs: Modularización y Librerías Core

-   [Teoría](https://github.com/beatrizsmerino/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed4/blob/master/teoria/clase49.md)

-   [Recursos](https://github.com/beatrizsmerino/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed4/blob/master/recursos/clase49.md)

-   [Ejercicios](https://github.com/beatrizsmerino/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed4/blob/master/teoria/clase49.md#ejercicios)
    -   [ ] 1 - Crea las rutas básicas para tener una página web clásica (¿Quienes somos? | ¿Donde Estamos? | ¿Que hacemos? | Contacto... etc...)
    -   [ ] 2 - Realiza un script ejecutable que nos muestre la información de los terremotos acontecidos en la última hora.
		-	Recursos:
			- [Fuente de datos](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
			- [Ejemplo llamada JSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson).
		- Requisitos:
			- Debemos utilizar párametros cuando se ejecute para definir la magnitud de los terremotos que queremos.
			- Si no se detecta el parámetro... la aplicación debe cerrarse.
			- Si el parametro es incorrecto también.
			- Ajustaremos la petición http en función del parámetro.