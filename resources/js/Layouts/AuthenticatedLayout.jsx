import Sidebar from "@/Components/Sidebar/Sidebar";
import { useState } from "react";

export default function Authenticated({ user, header, children }) {
    const [openNav, setOpenNav] = useState(false);

    return (
        <div className="min-h-screen bg-background w-full">
            <Sidebar openNav={openNav} setOpenNav={setOpenNav} />

            <div className="w-full">
                <main
                    className={`${
                        openNav ? "container-open-nav" : "container"
                    }`}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
