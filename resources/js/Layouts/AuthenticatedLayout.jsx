import Reminder from "@/Components/Reminder/Reminder";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { usePage } from "@inertiajs/react";
import {
    Card,
    Typography
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import logoLetter from "../../../public/image/app/Logo-letter.png";

export default function Authenticated({ user, header, children }) {
    const [openNav, setOpenNav] = useState(true);
    const [open, setOpen] = useState(false);
    const { reminders } = usePage().props;
    const toggleOpen = () => setOpen((cur) => !cur);

    const collapseRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            collapseRef.current &&
            !collapseRef.current.contains(event.target)
        ) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="min-h-screen bg-background w-full relative font-roboto">
            <Sidebar openNav={openNav} setOpenNav={setOpenNav} />

            <div
                className={`w-full transition-all duration-500 z-10 ${
                    openNav ? "md:pl-[280px] " : " md:pl-[80px]"
                }`}
            >
                <main className="container flex justify-end w-full mx-auto xl:ml-auto ">
                    <div
                        className={`w-full p-1 transition-width duration-500 px-4  ${
                            openNav
                                ? "container-open-nav"
                                : "container delay-200"
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
                            <Reminder
                                collapseRef={collapseRef}
                                open={open}
                                toggleOpen={toggleOpen}
                                reminders={reminders}
                                Card={Card}
                                Typography={Typography}
                            />
                        </div>

                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
