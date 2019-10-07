Algoritmo ejercicio_7
//	Dise–a un algoritmo que aplique al precio de un producto un descuento cuando se den las siguientes caracteristicas.
//		
//	Se aplica un 25% cuando:
//		Estamos en los meses de invierno
	//		Y no es viernes o fin de semana.
	
	Escribir "Introduce mes (numeros del 1 al 12)"
	Escribir "Introduce dia (numeros del 1 al 7)"
	Escribir "Introduce precio"
	
	Si mes>= 11 o mes<=2 Entonces
		Escribir "Estamos en invierno y tienes descuento"
		Si dia>=1 o dia<=7 Entonces
			Si dia=7 o dia=8
				Escribir "Estamos en findesemana. Consigue tu descuento ya!"
				Escribir "Precio con descuento ", (precio*25)/100
			FinSi
		FinSi
	SiNo
		Escribir "No hay descuentos"
	FinSi
		
	
FinAlgoritmo
