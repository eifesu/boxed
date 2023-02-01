import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";
import {
	BsSearch,
	BsCashStack,
	BsClockFill,
	BsFillTrash2Fill,
	BsFillPlusCircleFill,
	BsPencilSquare,
} from "react-icons/bs";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { app, db } from "@/util/firestore";
import { cartAtom, Meal } from "@/data/cartAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { mealFilterAtom, filteredMealsList, mealsAtom } from "@/data/mealsAtom";
import { Order, ordersAtom } from "@/data/ordersAtom";
import { ThreeDots } from "react-loader-spinner";
import { loadingAtom } from "@/data/loadingAtom";
import { useRouter } from "next/router";
interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
	const router = useRouter();

	const [search, setSearch] = useState("");

	const [loading, setLoading] = useRecoilState(loadingAtom);
	const [filter, setFilter] = useRecoilState(mealFilterAtom);
	const [meals, setMeals] = useRecoilState(mealsAtom);
	const [orders, setOrders] = useRecoilState(ordersAtom);

	const list = useRecoilValue(filteredMealsList);

	function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	async function handleDeleteMeal(id: string) {
		setLoading(true);
		await deleteDoc(doc(db, "meals", id)).then((response) => {
			setLoading(false);
			setMeals((prev) => prev.filter((meal) => meal.id !== id));
		});
	}

	// Fetching data
	useEffect(() => {
		async function fetchMeals() {
			let arr: Meal[] = [];
			const querySnapshot = await getDocs(collection(db, "meals"));
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				const id = doc.id;
				const meal = { ...data, id };
				arr.push(meal as Meal);
			});
			setMeals(arr);
		}

		async function fetchOrders() {
			let arr: Order[] = [];
			const querySnapshot = await getDocs(collection(db, "orders"));
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				const id = doc.id;
				const order = { ...data, id };
				arr.push(order as Order);
			});
			setOrders(arr);
		}

		fetchMeals();
		fetchOrders();
	}, []);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex flex-1 flex-col items-center justify-start gap-6 overflow-y-scroll py-5 px-6 text-white">
				{/* Search Bar */}
				<div className="flex min-h-[3rem] w-full items-center gap-4 rounded-md border  border-gray bg-black px-4 text-gray">
					<BsSearch className="text-sm text-gray" />
					<input
						className="flex-1 text-sm font-bold text-white placeholder:text-gray"
						placeholder="Search..."
						onChange={handleChangeSearch}
						value={search}></input>
				</div>

				{/* Add to menu */}
				<button
					className={`flex min-h-[2.5rem] w-full items-center justify-center gap-3 rounded-md bg-primary text-xs font-bold text-white`}
					onClick={() => router.push("edit")}>
					<p>Add to Menu</p>
					<BsFillPlusCircleFill className="" />
				</button>

				{/*  Rendering */}
				{list.map((meal) => (
					<div
						key={meal.id}
						className="flex h-40 w-full rounded-xl border border-gray bg-black">
						<div
							style={{ backgroundImage: `url(${meal.photoURL})` }}
							className={` h-full w-[50%] rounded-tl-xl rounded-bl-xl bg-cover bg-center`}></div>
						<div className="flex w-[50%] flex-col items-center justify-center gap-2 p-4 text-start text-xs font-bold">
							<p className="text-sm font-bold">{meal.name}</p>
							<p className="flex items-center gap-1 font-semibold">
								<BsClockFill className=" text-xs text-primary" />
								{`${meal.minTime}-${meal.maxTime} min.`}
							</p>
							<p className="flex items-center  gap-1 font-semibold">
								<BsCashStack className=" text-xs text-primary" />
								{`${meal.price} XOF`}
							</p>
							<div className="flex w-full justify-between gap-2 ">
								<button
									onClick={() =>
										router.push(
											{
												pathname: "/edit",
												query: { id: meal.id },
											},
											"/edit"
										)
									}
									className={`flex  h-10 flex-1 items-center justify-center gap-2 rounded-md bg-primary text-xs font-bold text-white transition-[1s]`}>
									<p>Edit</p>
									<BsPencilSquare className="text-[10px]" />
								</button>
								<button
									onClick={() => handleDeleteMeal(meal.id)}
									className={`flex  h-10 w-10 items-center justify-center gap-2 rounded-md bg-red text-xs font-bold text-white transition-[1s]`}>
									{!loading ? (
										<>
											<BsFillTrash2Fill className="text-xs" />
										</>
									) : (
										<ThreeDots height={4} color="black" />
									)}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default App;
