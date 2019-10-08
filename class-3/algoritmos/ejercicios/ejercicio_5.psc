Algoritmo ejercicio_5
	// Diseña un programa que simula cien tiradas de dos dados y contar las veces que entre los dos suman 10.
	
	count<-0
	
	Para i<-0 Hasta 100 Con Paso 1 Hacer
		numDado1 <- azar(6)+1
		numDado2 <- azar(6)+1
		
		Escribir "Dado 1: ", numDado1
		Escribir "Dado 2: ", numDado1
		
		sumDados <- (numDado1 + numDado2)
		
		Si sumDados = 10 Entonces
			count = count+1
		SiNo
			count = count
		Fin Si
	Fin Para
	
	Escribir "Veces: ", count
FinAlgoritmo
