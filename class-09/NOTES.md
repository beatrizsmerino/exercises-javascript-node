# Apuntes

## Methods

-   `unshift()` ---> adds to the beginning
-   `shift()` ---> remove the first

-   `push()` ---> adds to the end
-   `pop()` ---> remove the last

-   `splice()` ---> adding/removing

-   `split()` ---> string to array
-   `join()` ---> array to string

-   `slice()` ---> copies elements from an array

#### unshift()

-   Adds new items to the beginning of an array.
-   Returns the new array length.
-   Changes the length of an array.
-   Can only be used for arrays.

```javascript
let array = ["1", "2", "3", "4", "5", "6"];
let unshift = array.unshift("0");
// return -> 7
// array -> ["0", "1", "2", "3", "4", "5", "6"]
```

#### shift()

-   Removes the first item of an array.
-   Return the removed item.
-   Changes the length of the array.
-   Can only be used for arrays.

```javascript
let array = ["1", "2", "3", "4", "5", "6"];
let shift = array.shift();
// return -> "1"
// array -> [ "2", "3", "4", "5", "6"]
```

#### push()

-   Adds new items to the end of an array.
-   Returns the new array length.
-   Changes the length of the array.
-   Can only be used for arrays.

```javascript
let array = ["1", "2", "3", "4", "5", "6"];
let push = array.push("0");
// return -> 7
// array -> ["1", "2", "3", "4", "5", "6", "0"]
```

#### pop()

-   Removes the last element of an array
-   Returns that element.
-   Changes the length of the array.
-   Can only be used for arrays.

```javascript
let array = ["1", "2", "3", "4", "5", "6"];
let pop = array.pop();
// return -> "6"
// array -> ["1", "2", "3", "4", "5"]
```

#### splice()

-   Used for adding/removing elements from array.
-   Returns an array of removed elements.
-   Changes the array.
-   For adding elements: array.splice (index, number of elements, element).
-   For removing elements: array.splice (index, number of elements).
-   Can only be used for arrays.

```javascript
let array = ["1", "2", "3", "4", "5", "6"];
// To add
let splice = array.splice(0, 1, "0");
// return -> ["1"]
// array -> ["0", "2", "3", "4", "5", "6"];
// To remove
let splice = array.splice(0, 2);
// return -> ["1", "2"]
// array -> ["3", "4", "5", "6"];
```

#### split()

-   Divides a string into an array of substrings.
-   Returns the new array.
-   Takes 2 parameters, both are optional: string.split(separator, limit).
-   If an empty string ("") is used as the separator, the string is split between each character.
-   Not change the original string.
-   Can only be used for strings

```javascript
let array = "1,2,3,4,5,6";
let split = array.split(",");
// return -> ["1", "2", "3", "4", "5", "6"]
// array -> "1,2,3,4,5,6";
```

#### join()

-   The elements will be separated by a specified separator. The default separator is comma (,).
-   Returns the array as a string.
-   Not change the original array.

```javascript
let array = [1, 2, 3, 4, 5, 6];
let join = array.join();
// return -> "1,2,3,4,5,6"
// array -> [1, 2, 3, 4, 5, 6];
```

#### slice()

-   Returns the selected elements in an array, as a new array object.
-   Copies elements from an array.
-   Returns them as a new array.
-   Not change the original array.
-   Starts slicing from … until given index: array.slice (from, until).
-   Slice doesn’t include “until” index parameter.
-   Can be used both for arrays and strings.

```javascript
let array = [1, 2, 3, 4, 5, 6];
let slice = array.slice(2);
// return -> [3, 4, 5, 6]
// array -> [1, 2, 3, 4, 5, 6];
```
