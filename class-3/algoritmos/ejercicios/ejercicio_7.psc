Algoritmo ejercicio_7
	
	//	Dise–a un algoritmo que aplique al precio de un producto un descuento cuando se den las siguientes caracteristicas.
	//		
	//	Se aplica un 25% cuando:
	//		Estamos en los meses de invierno
	//		Y no es viernes o fin de semana.
	
	Escribir "Introduce el mes (numeros del 1 al 12)."
	Leer month
	
	Segun month Hacer
		1:
			monthName = "Enero"
		2:
			monthName = "Febrero"
		3:
			monthName = "Marzo"
		4:
			monthName = "Abril"
		5:
			monthName = "Mayo"
		6:
			monthName = "Junio"
		7:
			monthName = "Julio"
		8:
			monthName = "Agosto"
		9:
			monthName = "Septiembre"
		10:
			monthName = "Ocutubre"
		11:
			monthName = "Noviembre"
		12:
			monthName = "Diciembre"
		De Otro Modo:
			monthName = "Introduce un nœmero del 1 al 12"
	Fin Segun
	
	Escribir "Es ", monthName
	
	Si month>= 11 o month<=2 Entonces
		Escribir "Estamos en invierno y tienes un descuento."
		
		Escribir "Introduce el dia de la semana (numeros del 1 al 7)."
		Leer day
		
		Si day>=1 o day<=7 Entonces
			
			Segun day Hacer
				1:
					dayName = "Lunes"
				2:
					dayName = "Martes"
				3:
					dayName = "Miercoles"
				4:
					dayName = "Jueves"
				5:
					dayName = "Viernes"
				6:
					dayName = "S‡bado"
				7:
					dayName = "Domingo"
				De Otro Modo:
					dayName = "Introduce un nœmero del 1 al 7"
			Fin Segun
			
			Escribir "Es ", dayName
			
			Si day=7 o day=8
				Escribir "Es temporada de invierno y finde semana. ÁConsigue tu descuento del 25% ya!"
				
				Escribir "Introduce el precio (Û)."
				Leer price
				
				Escribir "Precio final con el descuento del 25% es de ", (price*25)/100, "Û"
			SiNo
				Escribir "Solo los fines de semana hay descuentos."
			FinSi
		FinSi
	SiNo
		Escribir "No es temporada de invierno. No hay descuentos."
	FinSi
		
FinAlgoritmo