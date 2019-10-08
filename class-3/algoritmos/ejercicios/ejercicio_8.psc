Algoritmo ejercicio_8
	
	// Dise–a un algoritmo para identificar a los clientes autorizados a entrar a nuestro sistema.
	// Caracter’sticas:
	//	La palabra clave es "Fictizia mola mucho"
	//	Solo existen tres intentos
	//	Si se pasan los tres intentos. Se despliega un mensaje informativo.
	
	keyValid <- "Fictizia mola mucho"
	count <- 3
	Escribir "Intentos: ", count
	
	Escribir "Contrase–a:"
	Leer key
	
	Mientras key != keyValid y count>1 Hacer
		count <- count - 1
		Escribir "Intentos: ", count
		
		Escribir "Prueba de nuevo."
		Escribir "Contrase–a:"
		Leer key
	Fin Mientras
	
	Si key == keyValid Entonces
		Escribir "Enorabuena estas autorizado a entrar en nuestro sistema."
	SiNo
		Escribir "Has probado demasiadas veces y se ha bloqueado el acceso. Intentalo mas tarde."
	Fin Si
	
FinAlgoritmo