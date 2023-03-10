import { Meal } from "@/data/cartAtom";
import { loadingAtom } from "@/data/loadingAtom";
import {
	filteredOrdersList,
	Order,
	orderFilterAtom,
	ordersAtom,
} from "@/data/ordersAtom";
import { db } from "@/util/firestore";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";
import { BsCashStack, BsClockFill } from "react-icons/bs";
import { MdCancel, MdLocalShipping } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import { useRecoilState, useRecoilValue } from "recoil";
interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
	const [loading, setLoading] = useRecoilState(loadingAtom);
	const [filter, setFilter] = useRecoilState(orderFilterAtom);
	const [orders, setOrders] = useRecoilState(ordersAtom);
	const list = useRecoilValue(filteredOrdersList);

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

	function handleAcceptOrder(id: string) {
		setLoading(true);
		const docRef = doc(db, "orders", id);
		setDoc(docRef, { status: "Accepted" }, { merge: true }).then(
			(response) => {
				setLoading(false);
				fetchOrders();
			}
		);
	}

	function handleDeclineOrder(id: string) {
		setLoading(true);
		const message = prompt("Enter reason for rejection")?.trim();
		const docRef = doc(db, "orders", id);
		setDoc(docRef, { status: "Rejected", message }, { merge: true }).then(
			(response) => {
				setLoading(false);
				fetchOrders();
			}
		);
	}

	function handleDeliverOrder(id: string) {
		setLoading(true);
		const docRef = doc(db, "orders", id);
		setDoc(docRef, { status: "Delivered" }, { merge: true }).then(
			(response) => {
				setLoading(false);
				fetchOrders();
			}
		);
	}

	useEffect(() => {
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
			<div className="flex max-w-xl flex-1 flex-col items-center justify-start gap-4 overflow-y-scroll p-6 text-white">
				{/* Filters */}
				<div className="flex w-full gap-3">
					<button
						className={`bg-${
							filter === "pending" ? "primary" : "black"
						} h-10 w-32 rounded-md transition-[1s] ${
							filter !== "pending" && "border border-gray"
						} flex items-center justify-center gap-3 text-xs font-bold text-[white]`}
						onClick={() => setFilter("pending")}>
						<BsClockFill className="text-xs" />
						<p>Pending</p>
					</button>
					<button
						className={`bg-${
							filter === "all" ? "primary" : "black"
						} h-10 w-32 transition-[1s] ${
							filter !== "all" && "border border-gray"
						} flex items-center justify-center gap-3 rounded-md text-xs font-bold text-[white]`}
						onClick={() => setFilter("all")}>
						<BsCashStack className="" />
						<p>All orders</p>
					</button>
				</div>

				{/* Render */}
				{list.map((order) => {
					let color = "";
					switch (order.status) {
						case "Accepted":
							color = "text-primary";
							break;
						case "Rejected":
							color = "text-red";
							break;
						case "Delivered":
							color = "text-green-700";
							break;
						default:
							break;
					}
					return (
						<div
							className="flex h-auto w-full flex-col items-center justify-evenly border border-dashed border-gray text-sm font-bold text-white"
							key={order.id}>
							{/* Order ID */}
							<div className="flex w-full items-center justify-between px-4 py-4 text-gray">
								<p>Order id.</p>
								<p>{order.id}</p>
							</div>

							{/* Meal re-render */}
							{order.meals.map((meal) => (
								<div
									key={meal.id}
									className="flex w-full items-center justify-between px-4 py-4">
									<p>{meal.name}</p>
									<div className="flex flex-col gap-1 text-xs font-bold">
										<p className="flex items-center gap-1 font-semibold">
											<BsClockFill className=" text-xs text-primary" />
											{`${meal.minTime}-${meal.maxTime} min.`}
										</p>
										<p className="flex items-center  gap-1 font-semibold">
											<BsCashStack className=" text-xs text-primary" />
											{`${meal.price} XOF`}
										</p>
									</div>
								</div>
							))}

							<div className="flex w-full items-center justify-between px-4 py-4">
								<p>Total</p>
								<p className="text-xs font-semibold">
									{order.meals.reduce(
										(a: number, b: Meal) => a + b.price,
										0
									)}{" "}
									XOF
								</p>
							</div>

							<div className="flex h-auto min-h-[48px] w-full items-center justify-between gap-4 bg-black px-4 py-4 text-end">
								{(order.status === "Rejected" ||
									order.status === "Delivered") && (
									<>
										<p className="">Status</p>
										<div className="flex flex-col items-end gap-1 text-xs font-bold">
											<p
												className={` ${color}
              text-xs font-semibold`}>
												{order.status}
											</p>
											{order.message && (
												<p className="max-w-sm break-words font-semibold text-gray">
													{order.message}
												</p>
											)}
										</div>
									</>
								)}
								{order.status === "Pending" && (
									<>
										<button
											disabled={loading}
											onClick={() =>
												handleAcceptOrder(order.id)
											}
											className="flex h-8 w-full items-center justify-center gap-2 rounded-md bg-primary text-xs text-[white] disabled:border disabled:border-gray disabled:bg-black disabled:text-black">
											{!loading ? (
												<>
													<p>Take</p>
													<BsCashStack className="text-lg" />
												</>
											) : (
												<ThreeDots
													height={8}
													color="black"
												/>
											)}
										</button>

										<button
											disabled={loading}
											onClick={() =>
												handleDeclineOrder(order.id)
											}
											className="flex h-8 w-full items-center justify-center gap-2 rounded-md bg-red text-xs text-[white] disabled:border disabled:border-gray disabled:bg-black disabled:text-black">
											{!loading ? (
												<>
													<p>Decline</p>
													<MdCancel className="text-lg" />
												</>
											) : (
												<ThreeDots
													height={8}
													color="black"
												/>
											)}
										</button>
									</>
								)}
								{order.status === "Accepted" && (
									<>
										<button
											disabled={loading}
											onClick={() =>
												handleDeliverOrder(order.id)
											}
											className="flex h-8 w-full items-center justify-center gap-2 rounded-md bg-green-700 text-xs text-[white] disabled:border disabled:border-gray disabled:bg-black disabled:text-black">
											{!loading ? (
												<>
													<p>Deliver</p>
													<MdLocalShipping className="text-lg" />
												</>
											) : (
												<ThreeDots
													height={8}
													color="black"
												/>
											)}
										</button>

										<button
											disabled={loading}
											onClick={() =>
												handleDeclineOrder(order.id)
											}
											className="flex h-8 w-full items-center justify-center gap-2 rounded-md bg-red text-xs text-[white] disabled:border disabled:border-gray disabled:bg-black disabled:text-black">
											{!loading ? (
												<>
													<p>Cancel</p>
													<MdCancel className="text-lg" />
												</>
											) : (
												<ThreeDots
													height={8}
													color="black"
												/>
											)}
										</button>
									</>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default App;
