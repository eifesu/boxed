import { cartAtom } from "@/data/cartAtom";
import { useRouter } from "next/router";
import * as React from "react";
import { BsFillBasketFill, BsDoorOpenFill, BsHouseFill } from "react-icons/bs";
import {AiTwotoneHome} from 'react-icons/ai'
import {useRecoilState} from 'recoil'
interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartAtom);
  return (
    <>
      {/* Left Content */}
      {router.pathname === "/" && (
        <nav className="text-white h-24 bg-black border-b border-b-gray flex justify-around items-center">
          <div className="flex flex-col items-center">
            <p className="font-bold text-xl">Authentication</p>
            <p className="text-xs text-center">
              Login to have access <br /> to our services
            </p>
          </div>
        </nav>
      )}


      {router.pathname !== "/" && (
        <nav className="text-white h-20 bg-black border-b border-b-gray flex justify-between px-8 items-center ">
          <div className="flex items-center gap-2 text-xs">
            <div className="h-10 w-10 rounded-full bg-primary" />
            <div>
              <p className="font-bold">Hello,</p>
              {(router.pathname == "/home" || router.pathname == "/orders" || router.pathname == "/purchase") &&
              <p className=" text-center">Client</p>
              }
              {(router.pathname =="/meals" || router.pathname == "/validation" || router.pathname == "/edit") && 
              <p className=" text-center">Operator</p>
              }
            </div>
          </div>
        
          <div className="flex items-center gap-10">



            {(router.pathname == "/home" || router.pathname == "/orders" || router.pathname == "/purchase") &&
            <button onClick={() => router.push("/purchase")}>
              <BsFillBasketFill 

              className={`text-2xl ${router.pathname === '/purchase' ? 'text-white': 'text-gray'} focus:text-white `} />
              {cart.length > 0 && 
              <div className="w-4 h-4 flex items-center justify-center bg-primary text-white font-bold rounded-full text-[10px] relative left-2 bottom-0">
                {cart.length}
              </div>
              }
            </button>
            }
            <button
                onClick={() => router.push("/")}
            >
              <BsDoorOpenFill className={`text-2xl text-gray focus:text-white `} color="#QE4030" />
            </button>
          </div>
        </nav>
      )}

    </>
  );
};

export default Navbar;
