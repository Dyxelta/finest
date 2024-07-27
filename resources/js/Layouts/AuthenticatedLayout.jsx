import Sidebar from "@/Components/Sidebar/Sidebar";
import { useState } from "react";
import logoLetter from "../../../public/image/app/Logo-letter.png";
import { FaBell } from "react-icons/fa";

export default function Authenticated({ user, header, children }) {
    const [openNav, setOpenNav] = useState(false);
    
    return (
        <div className="min-h-screen bg-background w-full relative font-roboto">
            <Sidebar openNav={openNav} setOpenNav={setOpenNav} />

            <div className={`w-full transition-all duration-500 z-10 ${
                            openNav ? "md:pl-[280px] " : " md:pl-[80px]"
                        }`}>
                <main className="container flex justify-end w-full mx-auto xl:ml-auto ">
                    <div
                        className={`w-full py-4 transition-width duration-500 px-4  ${
                            openNav ? "container-open-nav " : "container delay-200"
                        }`}
                    >
                        <div className="w-full flex justify-between items-center px-2 mb-3 pl-[40px] md:pl-[20px]">
                            <div>
                                <img
                                    src={logoLetter}
                                    alt="Logo"
                                    className="h-[30px] md:h-[35px]"
                                />
                            </div>
                            <div className="bg-white p-3 rounded-md text-primary">
                                <FaBell size={24} />
                            </div>
                        </div>

                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
