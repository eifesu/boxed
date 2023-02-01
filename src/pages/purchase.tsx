import { cartAtom, cartTotal } from "@/data/cartAtom";
import Head from "next/head";
import * as React from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	BsClockFill,
	BsCashStack,
	BsTrashFill,
	BsFillPatchCheckFill,
} from "react-icons/bs";
import {
	FaCity,
	FaMapMarker,
	FaCaretSquareDown,
	FaCreditCard,
	FaPhoneSquareAlt,
} from "react-icons/fa";
import { Order } from "@/data/ordersAtom";
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "@/util/firestore";
import { loadingAtom } from "@/data/loadingAtom";
import { FadeLoader } from "react-spinners";
import { Audio, ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
	const router = useRouter();

	const [cart, setCart] = useRecoilState(cartAtom);
	const [loading, setLoading] = useRecoilState(loadingAtom);
	const total = useRecoilValue(cartTotal);

	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [method, setMethod] = useState("");
	const [card, setCard] = useState("");
	const [mobile, setMobile] = useState("");

	function handleChangeForm(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		if (e.target.name === "city") {
			setCity(e.target.value);
		} else if (e.target.name === "address") {
			setAddress(e.target.value);
		} else if (e.target.name === "method") {
			setMethod(e.target.value);
			setMobile("");
			setCard("");
		} else if (e.target.name === "card") {
			setCard(e.target.value);
		} else if (e.target.name === "mobile") {
			setMobile(e.target.value);
		}
	}

	async function handleSubmit(e: any) {
		setLoading(true);

		await addDoc(collection(db, "orders"), {
			meals: cart,
			city,
			address,
			method,
			status: "Pending",
			message: "",
		}).then((response) => {
			router.push("/home");
			setLoading(false);
			setCart([]);
		});
	}
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
				{/* Cart Summary */}
				{cart.map((item) => (
					<div
						key={item.id}
						className=" flex h-20 w-full items-center justify-between rounded-md border border-dashed border-gray p-4 text-xs text-white ">
						<p className="font-bold">{item.name}</p>
						<div className="">
							<p className="flex items-center gap-1 font-semibold">
								<BsClockFill className=" text-xs text-primary" />
								{`${item.minTime}-${item.maxTime} min.`}
							</p>
							<p className="flex items-center  gap-1 font-semibold">
								<BsCashStack className=" text-xs text-primary" />
								{`${item.price} XOF`}
							</p>
						</div>
						<button
							onClick={() =>
								setCart((prevState) =>
									prevState.filter(
										(meal) => item.id !== meal.id
									)
								)
							}
							className="flex h-8 w-8 items-center justify-center rounded-full bg-gray">
							<BsTrashFill className="text-white" />
						</button>
					</div>
				))}

				{/* Total */}

				<div className=" flex h-10 w-full items-center justify-between rounded-md bg-primary p-4 text-sm font-semibold text-white ">
					<p>Total</p>
					<p>{total} XOF</p>
				</div>

				{/* Form */}
				<p className="self-start text-start text-lg font-bold">
					Location
				</p>

				<div className="flex min-h-[40px] w-full items-center gap-4 rounded-md border border-gray bg-black px-4 text-gray">
					<FaCity className="text-sm text-gray" />
					<input
						name="city"
						className="flex-1 text-sm font-semibold text-white placeholder:text-gray"
						placeholder="Enter your city"
						onChange={handleChangeForm}
						value={city}></input>
				</div>

				<div className="flex min-h-[40px] w-full items-center gap-4 rounded-md border border-gray bg-black px-4 text-gray">
					<FaMapMarker className="text-sm text-gray" />
					<input
						name="address"
						className="flex-1 text-sm font-semibold text-white placeholder:text-gray"
						placeholder="Enter your address"
						onChange={handleChangeForm}
						value={address}></input>
				</div>

				{/* Payment method */}
				<p className="self-start text-start text-lg font-bold">
					Payment method
				</p>

				<div className="flex min-h-[40px] w-full items-center gap-4 rounded-md border border-gray bg-black px-4 text-gray">
					<FaCaretSquareDown className="text-sm text-gray" />
					<select
						name="method"
						className="flex-1 text-sm font-semibold text-white placeholder:text-gray"
						onChange={handleChangeForm}
						value={method}>
						<option className="" selected>
							Select a payment method
						</option>
						<option className="" value="card">
							Debit Card
						</option>
						<option value="mobile">Mobile Money</option>
						<option value="delivery">At pickup</option>
					</select>
				</div>

				{method === "card" && (
					<div className="flex min-h-[40px] w-full items-center gap-4 rounded-md border border-gray bg-black px-4 text-gray">
						<FaCreditCard className="text-sm text-gray" />
						<input
							name="card"
							type="number"
							className="flex-1 text-sm font-semibold text-white placeholder:text-gray"
							placeholder="Enter your credit card number"
							onChange={handleChangeForm}
							value={card}></input>
					</div>
				)}

				{method === "mobile" && (
					<div className="flex min-h-[40px] w-full items-center gap-4 rounded-md border border-gray bg-black px-4 text-gray">
						<FaPhoneSquareAlt className="text-sm text-gray" />
						<input
							name="mobile"
							type="tel"
							className="flex-1 text-sm font-semibold text-white placeholder:text-gray"
							placeholder="Enter your phone number"
							onChange={handleChangeForm}
							value={mobile}></input>
					</div>
				)}

				{/* Submit */}
				<button
					onClick={handleSubmit}
					disabled={
						!(
							city.length > 0 &&
							address.length > 0 &&
							(mobile.length > 0 || card.length > 0 || method == "delivery") &&
							cart.length > 0 &&
							!loading
						)
					}
					className={` text-md flex  min-h-[2.5rem] w-full items-center justify-center gap-2 self-end rounded-md bg-primary font-bold text-white transition-[1s] disabled:bg-gray disabled:text-black`}>
					{!loading ? (
						<>
							<p>Order</p>
							<BsFillPatchCheckFill className="text-lg" />
						</>
					) : (
						<ThreeDots height={8} color="black" />
					)}
				</button>
			</div>
		</>
	);
};

export default App;
