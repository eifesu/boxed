import {atom, selector} from 'recoil'

export interface Meal {
    id: string;
    price: number;
    photoURL: string;
    name: string;
    maxTime: number;
    minTime: number;
  }

export const mealsAtom = atom({
    key: 'Meals',
    default: [] as Meal[]
})

export const mealFilterAtom = atom({
    key: 'MealFilter',
    default: "price",
})

export const filteredMealsList = selector({
    key: 'OrderedMealsList',
    get: ({get}) => {
        const meals = get(mealsAtom);
        let arr = [...meals];
        const filter = get(mealFilterAtom);

        switch(filter) {
            default:
            case "price":
                return arr.sort((a,b) => a.price - b.price)
                break;
            case "time":
                return arr.sort((a,b) => a.minTime - b.minTime);
                break;
        }
    }
})
