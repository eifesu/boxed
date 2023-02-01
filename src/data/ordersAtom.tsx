import {atom, selector} from 'recoil'
import { Meal } from './cartAtom'


export interface Order {
    id: string,
        meals: Meal[],
        city: string,
        address: string,
        method: string,
        status: string,
        message: string,
      }


export const ordersAtom = atom({
    key: 'Orders',
    default: [] as Order[]
})

export const orderFilterAtom = atom({
    key: 'OrderFilter',
    default: "all",
})

export const filteredOrdersList = selector({
    key: 'OrderedOrdersList',
    get: ({get}) => {
        const orders = get(ordersAtom);
        let arr = [...orders];
        const filter = get(orderFilterAtom);

        switch(filter) {
            default:
            case "all":
                return arr
                break;
            case "pending":
                return arr.filter(item => item.status == "Pending" || item.status == "Accepted")
                break;
        }
    }
})
