import { getStorage } from "./storage";

export interface CartItem {
	id: string | number;
	name: string;
	price?: number;
	quantity?: number;
	category?: string;
	[key: string]: any;
}

export class Cart {
	private storage: Storage;
	private key: string;

	constructor({
		storage = "localStorage",
		key = "cart",
	}: { storage?: "localStorage" | "sessionStorage"; key?: string } = {}) {
		this.storage = getStorage(storage);
		this.key = key;
	}

	private getCart(): CartItem[] {
		const data = this.storage.getItem(this.key);
		return data ? JSON.parse(data) : [];
	}

	private save(cart: CartItem[]) {
		this.storage.setItem(this.key, JSON.stringify(cart));
	}

	addItem(newItem: CartItem) {
		const cart = this.getCart();
		const exists = cart.find((item) => item.id === newItem.id);
		if (exists)
			exists.quantity = (exists.quantity || 1) + (newItem.quantity || 1);
		else cart.push({ ...newItem, quantity: newItem.quantity || 1 });
		this.save(cart);
	}

	removeItem(id: string | number) {
		this.save(this.getCart().filter((item) => item.id !== id));
	}

	clear() {
		this.save([]);
	}

	getItems(category?: string) {
		const items = this.getCart();
		return category
			? items.filter((item) => item.category === category)
			: items;
	}

	getTotal(category?: string) {
		let items = this.getCart();
		if (category) {
			items = items.filter((item) => item.category === category);
		}
		return items.reduce(
			(sum, item) => sum + (item.price || 0) * (item.quantity || 1),
			0
		);
	}
}
