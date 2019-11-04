// https://www.w3resource.com/javascript-exercises/javascript-array-exercise-14.php

// Write a JavaScript program to remove duplicate items from an array (ignore case sensitivity).

var list = ["Mango", "Manzana", "cerezas", "Fresa", "manzana", "Naranjas", "platano", "peras"];

function removeDuplicate(array) {

    // Convertir todo a minusculas
    let arrayLowerCase = function () {
        let arrayFormatted = [];
        for (let index = 0; index < array.length; index++) {
            const element = array[index].toLowerCase();
            // console.log(element);
            arrayFormatted.push(element);
        }
        return arrayFormatted;
    }
    console.log(arrayLowerCase);

    // Buscar repetidos
    for (let indexSelect = 0; indexSelect < arrayLowerCase.length; index++) {
        const elementSelected = arrayLowerCase[indexSelect];

        for (let indexFind = 0; indexFind < array.length; indexFind++) {
            const elementFounded = array[indexFind];
            
            if (elementSelected === elementFounded) {
                console.log(elementSelected, elementFounded);
            }
        }
    }
}

var result = removeDuplicate(list);



//  Array.prototype.unique=function(a){
//      return function()
//      {
//        return this.filter(a)
//      }
//      }(function(a,b,c)
//      {
//        return c.indexOf(a,b+1)<0
//      }
//  );
// var myArr = [ 1, 2, 3, 'foo', 'bar', 'Hello World', 2, 3, 'bar', 1, 4, 5];
// console.log( myArr.unique() ); // ["foo", "Hello World", 2, 3, "bar", 1, 4, 5]