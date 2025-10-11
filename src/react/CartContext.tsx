import { createContext, useEffect, useState } from "react";

import { Cart, type CartItem } from "../core/cart";

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const cartInstance = new Cart();
    const [items, setItems] = useState<CartItem[]>(cartInstance.getItems());

    const sync = () => setItems(cartInstance.getItems());

    const api = {
        cart: items,
        addItem: (item: CartItem) => {
            cartInstance.addItem(item);
            sync();
        },
        removeItem: (id: string | number) => {
            cartInstance.removeItem(id);
            sync();
        },
        getItems: (category?: string) => {
            cartInstance.getItems(category);
        },
        clear: () => {
            cartInstance.clear();
            sync();
        },
        total: cartInstance.getTotal(),
    };

    useEffect(() => {
        const handleSync = () => sync();
        window.addEventListener("storage", handleSync);
        return () => window.removeEventListener("storage", handleSync);
    }, []);

    return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
};