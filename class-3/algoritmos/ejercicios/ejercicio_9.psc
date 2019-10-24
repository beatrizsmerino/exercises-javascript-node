Algoritmo ejercicios_9
	
	//	Dise–a un algoritmo introducido un numero y pasarlo a nœmero romanos.
	//		Esperamos que el nœmero sea menor de 50
	
	Escribir "Escribe un numero:"
	Leer numero
	
	Mientras numero>50 Hacer
		Escribir "El numero debe ser menor de 50."
		Escribir "Escribe un numero:"
		Leer numero
	Fin Mientras
	
	Si numero > 1 o numero>50 Entonces
		Segun numero Hacer
			1:
				numeroRomano = "I"
			2:
				numeroRomano = "II"
			3:
				numeroRomano = "III"
			4:
				numeroRomano = "IV"
			5:
				numeroRomano = "VII"
			6:
				numeroRomano = "VI"
			7:
				numeroRomano = "VII"
			8:
				numeroRomano = "VIII"
			9:
				numeroRomano = "IX"
			10:
				numeroRomano = "X"
			De Otro Modo:
				numeroRomano = ""
		Fin Segun
		
		Escribir numeroRomano
	Fin Si
	
FinAlgoritmo
