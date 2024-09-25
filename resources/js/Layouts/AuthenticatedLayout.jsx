import Sidebar from "@/Components/Sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import logoLetter from "../../../public/image/app/Logo-letter.png";
import { FaBell } from "react-icons/fa";
import {
    Button,
    Card,
    CardBody,
    Collapse,
    Typography,
} from "@material-tailwind/react";
import ReminderCards from "@/Components/Reminder/ReminderCards";
import { usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Authenticated({ user, header, children }) {
    const [openNav, setOpenNav] = useState(false);
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
                        className={`w-full py-4 transition-width duration-500 px-4  ${
                            openNav
                                ? "container-open-nav "
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
                            <div
                                ref={collapseRef}
                                className="bg-white p-3 rounded-md text-primary relative"
                            >
                                <div
                                    onClick={toggleOpen}
                                    className="bg-none cursor-pointer"
                                >
                                    <FaBell size={24} />
                                </div>
                                <div className="absolute z-50 mt-1 text-primary right-0 bottom-0 translate-y-[100%]">
                                    <AnimatePresence>
                                        {open && (
                                            <motion.div
                                                initial={{ y: -50, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -50, opacity: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                <Card className="my-2 mx-auto h-[400px] w-[320px] border-2 border-primary rounded-md text-primary">
                                                    <div className="px-4 pt-2">
                                                        <Typography className="header-5 border-b border-primary pb-1">
                                                            Notifications
                                                        </Typography>
                                                    </div>

                                                    <div className="overflow-y-scroll overflow-x-hidden custom-scrollbar flex flex-col">
                                                        {reminders?.map(
                                                            (reminder) => (
                                                                <ReminderCards
                                                                    key={
                                                                        reminder.id
                                                                    }
                                                                    reminder={
                                                                        reminder
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
