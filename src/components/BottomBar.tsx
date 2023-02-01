import Image from "next/image";
import { useRouter } from "next/router";
import { BsFillBasketFill, BsDoorOpenFill } from "react-icons/bs";
import { MdFastfood } from "react-icons/md";
import { FaReceipt } from "react-icons/fa";
import * as React from "react";
import { updateAtom } from "@/data/updateAtom";
import { useRecoilState } from "recoil";

interface IBottomBarProps {}

const BottomBar: React.FunctionComponent<any> = (props) => {
	const [update, setUpdate] = useRecoilState(updateAtom);
	const router = useRouter();
	return (
		<>
			{router.pathname !== "/" && (
				<div className="flex h-20 items-center justify-around border-t border-t-gray bg-black">
					{(router.pathname == "/home" ||
						router.pathname == "/orders" ||
						router.pathname == "/purchase") && (
						<>
							<button onClick={() => router.push("/home")}>
								<MdFastfood
									className={`text-2xl text-gray active:text-white ${
										router.pathname == "/home"
											? "text-primary"
											: "text-gray"
									}`}
								/>
							</button>
							<button
								onClick={() => {
									router.push("/orders");
									if (update) setUpdate(false);
								}}>
								<FaReceipt
									className={`text-2xl text-gray active:text-white ${
										router.pathname == "/orders"
											? "text-primary"
											: "text-gray"
									}`}
								>
                  
                </FaReceipt>
								{update && (
									<div className="relative bottom-1 left-4 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"></div>
								)}
							</button>
						</>
					)}

					{(router.pathname == "/meals" ||
						router.pathname == "/validation" ||
						router.pathname == "/edit") && (
						<>
							<button
								onClick={() => {
									router.push("/meals");
								}}>
								<MdFastfood
									className={`text-2xl text-gray active:text-white ${
										router.pathname == "/meals"
											? "text-primary"
											: "text-gray"
									}`}
								/>
							</button>
							<button
								onClick={() => {
									router.push("/validation");
								}}>
								<FaReceipt
									className={`text-2xl text-gray active:text-white ${
										router.pathname == "/validation"
											? "text-primary"
											: "text-gray"
									}`}
								/>
							</button>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default BottomBar;
