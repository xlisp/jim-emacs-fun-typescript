# Here are some examples to illustrate the key differences between **JavaScript** and **TypeScript**:

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

### Summary:
These examples show how TypeScript adds type annotations, interfaces, access modifiers, and other OOP features that JavaScript lacks. This helps catch errors early during development, improving code maintainability and scalability, especially in large projects.

