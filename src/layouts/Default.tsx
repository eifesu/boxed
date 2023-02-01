import BottomBar from "@/components/BottomBar";
import Navbar from "@/components/Navbar";
import { Order, ordersAtom } from "@/data/ordersAtom";
import { updateAtom } from "@/data/updateAtom";
import { db } from "@/util/firestore";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import * as React from "react";
import { useRecoilState } from "recoil";

interface IDefaultProps {}

const Default: React.FunctionComponent<any> = ({ children }) => {
	const [update, setUpdate] = useRecoilState(updateAtom);
	React.useEffect(() => {
		const q = query(collection(db, "orders"));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			console.log("Connected to order database");
			snapshot.docChanges().forEach((change) => {
				if (change.type === "modified") {
					setUpdate(true);
				}
			});
		});
		return unsubscribe;
	}, []);

	return (
		<>
			<main className="h-100 flex flex-col transition-[1s]">
				<Navbar />
				{children}
				<BottomBar />
			</main>
			;
		</>
	);
};

export default Default;
