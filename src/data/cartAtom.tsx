import { atom, selector } from "recoil";

export interface Meal {
	id: string;
	price: number;
	photoURL: string;
	name: string;
	maxTime: number;
	minTime: number;
}

export const cartAtom = atom({
	key: "Cart",
	default: [] as Meal[],
});

export const cartAmount = selector({
	key: "CartAmount",
	get: ({ get }) => {
		const cart = get(cartAtom);
		return cart.length;
	},
});

export const cartTotal = selector({
	key: "CartTotal",
	get: ({ get }) => {
		const cart = get(cartAtom);
		return cart.reduce(
			(accumulator: number, current: Meal) => accumulator + current.price,
			0
		);
	},
});
