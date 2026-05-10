# @ravishranjan/cart

A **lightweight, native frontend cart system** with optional **React hooks**.

- Works in **any JavaScript framework** — Vanilla JS, React, Vue, Svelte, etc.
- Includes **React hooks** and `<CartProvider>` for easy React integration.
- Uses **localStorage** or **sessionStorage** for persistence.
- Works both via **npm install** and **CDN** — no backend required.

---

## Installation

### Option 1 — NPM

```bash
npm install @ravishranjan/cart
```

### Option 2 — CDN (no install)

Use directly in your webpage:

```html
<script src="https://cdn.jsdelivr.net/npm/@ravishranjan/cart/dist/cart.min.js"></script>
```

---

## Cart item type

```ts
interface CartItem {
	id: string | number;
	name: string;
	price?: number;
	quantity?: number;
	category?: string;
	[key: string]: any;
}
```

---

## Usage Examples

### **Basic JavaScript (no framework)**

```html
<script src="https://cdn.jsdelivr.net/npm/@ravishranjan/cart/dist/cart.min.js"></script>
<script>
	const cart = new Cart({ storage: "localStorage" });

	cart.addItem({ id: 1, name: "Apple", price: 30, quantity: 2 });
	cart.addItem({ id: 2, name: "Orange", price: 25 });

	cart.removeItem(2);

	console.log("Total price:", cart.getTotal());
	console.log(cart.getItems());

	cart.clear();
</script>
```

---

### **Node or Framework Projects (NPM install)**

```js
import Cart from "@ravishranjan/cart";

const cart = new Cart({ storage: "localStorage" });

cart.addItem({ id: 101, name: "Book", price: 199 });
cart.addItem({ id: 102, name: "Pen", price: 49, quantity: 2 });

console.log(cart.getItems());
console.log("Total Price:", cart.getTotal());
```

**Available methods:**
| Method | Description | Example |
|---------|--------------|----------|
| `addItem(item)` | Adds an item object | `cart.addItem({ id: 1, name: 'Apple', quantity: 2 })` |
| `removeItem(id)` | Removes an item by id | `cart.removeItem(1)` |
| `getItems()` | Returns all items | `cart.getItems()` |
| `getItems(category)` | Returns items by given catefory | `cart.getItems("<category>")` |
| `getTotal()` | Sum of all item prices × qty | `cart.getTotal()` |
| `clear()` | Clears the entire cart | `cart.clear()` |

---

### **React Usage (with hooks + context)**

#### Setup the Provider

```tsx
import React from "react";
import { CartProvider } from "@ravishranjan/cart/react";

import App from "./App";

export default function Root() {
	return (
		<CartProvider storage="localStorage">
			<App />
		</CartProvider>
	);
}
```

#### Use the Hook

```tsx
import { useCart } from "@ravishranjan/cart/react";

export default function Shop() {
	const { items, addItem, removeItem, getTotal, clear } = useCart();

	return (
		<div>
			<button
				onClick={() => addItem({ id: 1, name: "Apple", price: 30 })}
			>
				Add Apple
			</button>
			<button onClick={() => clear()}>Clear Cart</button>

			<ul>
				{items.map((item) => (
					<li key={item.id}>
						{item.name} - ₹{item.price}
						<button onClick={() => removeItem(item.id)}>X</button>
					</li>
				))}
			</ul>

			<h3>Total: ₹{getTotal()}</h3>
		</div>
	);
}
```

---

## Storage Options

| Option             | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `"localStorage"`   | Persists cart across browser sessions (via localStorage) |
| `"sessionStorage"` | Clears cart when the tab is closed (via sessionStorage)  |

Usage:

```js
const cart = new Cart({ storage: "sessionStorage" });
```

or in React:

```tsx
<CartProvider storage="sessionStorage">
	<App />
</CartProvider>
```

---

## CDN Quick Demo

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Cart Demo</title>
	</head>
	<body>
		<script src="https://cdn.jsdelivr.net/npm/@ravishranjan/cart/dist/cart.min.js"></script>
		<script>
			const cart = new Cart();
			cart.addItem({ id: 1, name: "Coffee", price: 120 });
			console.log(cart.getTotal()); // 120
		</script>
	</body>
</html>
```

---

## API Summary

| API            | Type            | Description                     |
| -------------- | --------------- | ------------------------------- |
| `Cart`         | Class           | Core cart logic                 |
| `CartProvider` | React Component | Context provider for cart state |
| `useCart()`    | React Hook      | Access cart in React components |

---

## License

ISC © [Ravish Ranjan](https://npmjs.com/~ravishranjan)
