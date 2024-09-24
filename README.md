# jim-emacs-fun-typescript

* differences between **JavaScript** and **TypeScript**:

### 1. **Type Annotations**

**JavaScript:**
```javascript
function add(a, b) {
  return a + b;
}

console.log(add(5, 3));    // 8
console.log(add(5, "3"));  // "53" (no type safety, concatenates as string)
```

**TypeScript:**
```typescript
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 3));    // 8
console.log(add(5, "3"));  // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

### 2. **Static Typing and Error Checking**

**JavaScript:**
```javascript
let message = "Hello!";
message = 10;  // No error, type can change at runtime
console.log(message);  // Output: 10
```

**TypeScript:**
```typescript
let message: string = "Hello!";
// message = 10;  // Error: Type '10' is not assignable to type 'string'
console.log(message);
```

### 3. **Interfaces (TypeScript Only)**

**JavaScript:**
JavaScript doesn’t have interfaces. You rely on objects directly:
```javascript
const user = {
  name: "Alice",
  age: 25
};

function greet(user) {
  console.log(`Hello, ${user.name}`);
}

greet(user);  // Hello, Alice
```

**TypeScript:**
TypeScript provides interfaces to define the structure of an object:
```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice",
  age: 25
};

function greet(user: User): void {
  console.log(`Hello, ${user.name}`);
}

greet(user);  // Hello, Alice
```

### 4. **Classes and Access Modifiers**

**JavaScript (ES6+):**
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const person = new Person("Bob");
person.greet();  // Hello, my name is Bob
```

**TypeScript:**
TypeScript enhances class functionality with access modifiers like `public`, `private`, and `protected`:
```typescript
class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const person = new Person("Bob");
// console.log(person.name);  // Error: 'name' is private and only accessible within class 'Person'
person.greet();  // Hello, my name is Bob
```

### 5. **Union Types (TypeScript Only)**

**TypeScript** allows you to specify multiple types for a variable using union types:
```typescript
function printId(id: number | string): void {
  console.log(`Your ID is: ${id}`);
}

printId(101);      // Your ID is: 101
printId("A123");   // Your ID is: A123
// printId(true);  // Error: Argument of type 'boolean' is not assignable to parameter of type 'number | string'
```

### 6. **Compilation**

**JavaScript:** JavaScript is interpreted by the browser or Node.js and runs directly without needing compilation.

**TypeScript:** TypeScript must be compiled to JavaScript using the TypeScript compiler (`tsc`):
```bash
tsc myfile.ts
```
The compiled JavaScript file can then be executed by a browser or Node.js.

### 7. **Generics (TypeScript Only)**

TypeScript allows you to write reusable, type-safe code using generics.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<number>(5));    // 5
console.log(identity<string>("abc")); // abc
```

### 8. **Default Parameters**

Both JavaScript and TypeScript support default parameters, but TypeScript will catch errors earlier when types don’t match.

**JavaScript:**
```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

console.log(greet());      // Hello, Guest!
console.log(greet("John")); // Hello, John!
console.log(greet(42));     // Hello, 42! (No type checking)
```

**TypeScript:**
```typescript
function greet(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}

console.log(greet());        // Hello, Guest!
console.log(greet("John"));  // Hello, John!
// console.log(greet(42));   // Error: Argument of type 'number' is not assignable to parameter of type 'string'
```

### 9. **Destructuring with Types**

TypeScript provides better clarity when using destructuring with type annotations.

**JavaScript:**
```javascript
const user = { name: "Alice", age: 25 };

const { name, age } = user;
console.log(name, age);  // Alice 25
```

**TypeScript:**
```typescript
interface User {
  name: string;
  age: number;
}

const user: User = { name: "Alice", age: 25 };

const { name, age }: User = user;
console.log(name, age);  // Alice 25
```

### 10. **Function Overloading (TypeScript Only)**

JavaScript doesn't support function overloading directly, but TypeScript allows you to define multiple function signatures for different input types.

**JavaScript:**
```javascript
function combine(a, b) {
  return a + b;
}

console.log(combine(5, 3));     // 8
console.log(combine("5", "3")); // 53
```

**TypeScript:**
```typescript
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: any, b: any): any {
  return a + b;
}

console.log(combine(5, 3));       // 8
console.log(combine("5", "3"));   // 53
// console.log(combine(5, "3"));  // Error: No matching overload function
```

### 11. **Enums (TypeScript Only)**

Enums are not available in JavaScript natively but are a powerful feature in TypeScript.

**JavaScript:** (No direct enum support)
```javascript
const Colors = {
  Red: "Red",
  Green: "Green",
  Blue: "Blue",
};

console.log(Colors.Red);  // Red
```

**TypeScript:**
```typescript
enum Colors {
  Red,
  Green,
  Blue
}

let color: Colors = Colors.Green;
console.log(color);  // 1 (index of Green)
```

### 12. **Tuples (TypeScript Only)**

In JavaScript, arrays can hold any combination of elements, whereas TypeScript introduces tuples for arrays with fixed types and lengths.

**JavaScript:**
```javascript
let user = ["Alice", 25];  // No type safety
```

**TypeScript:**
```typescript
let user: [string, number];
user = ["Alice", 25];      // Valid
// user = [25, "Alice"];   // Error: Type 'number' is not assignable to type 'string'
```

### 13. **Asynchronous Programming with Type Inference**

Both languages support asynchronous programming, but TypeScript can enforce types, especially with `Promise`.

**JavaScript:**
```javascript
async function fetchData() {
  return "data";
}

fetchData().then((data) => console.log(data));  // "data"
```

**TypeScript:**
```typescript
async function fetchData(): Promise<string> {
  return "data";
}

fetchData().then((data) => console.log(data));  // TypeScript ensures the data type is string
```

### 14. **Optional Chaining and Nullish Coalescing**

These features are available in both JavaScript and TypeScript, but TypeScript enforces type safety.

**JavaScript:**
```javascript
const user = {
  name: "John",
  address: {
    street: "123 Main St"
  }
};

console.log(user?.address?.street);  // 123 Main St
console.log(user?.phone?.number);    // undefined (no error)
```

**TypeScript:**
```typescript
interface Address {
  street?: string;
}

interface User {
  name: string;
  address?: Address;
}

const user: User = {
  name: "John",
  address: { street: "123 Main St" }
};

console.log(user?.address?.street);  // 123 Main St
console.log(user?.phone?.number);    // Error: Property 'phone' does not exist on type 'User'
```

### 15. **Declaration Merging (TypeScript Only)**

TypeScript allows declaration merging, a powerful feature for combining types or interfaces.

**TypeScript:**
```typescript
interface Person {
  name: string;
}

interface Person {
  age: number;
}

const person: Person = {
  name: "Alice",
  age: 30
};

console.log(person);  // { name: 'Alice', age: 30 }
```

