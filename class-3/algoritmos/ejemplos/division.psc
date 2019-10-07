Algoritmo division
	Escribir "Intoduzca n1 y n2"
	Leer n1
	
	Repetir
		Leer n2
		si n2 == 0 Entonces
			Escribir "El divisor no puede ser 0. Introduce otro numero"
		FinSi
	Hasta Que n2 != 0
	
	Escribir "Resultado ", (n1/n2)
FinAlgoritmo