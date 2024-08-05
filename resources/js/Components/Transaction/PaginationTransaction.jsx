import React from "react";
import { Button } from "reactstrap";
import {
    MdKeyboardDoubleArrowRight,
    MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

const PaginationTransaction = ({ pageLength, setPagination, pagination }) => {
    console.log(pageLength - 2 <= pagination, "iosduhfjisdiohfsdisdifho")
    console.log(pageLength - 2 <= pagination, "iosduhfjisdiohfsdisdifho")
    const getPages = () => {
        const pages = [];
        const showPage = 1;
        const startPage =
            pagination === pageLength - 1
                ? Math.max(1, pagination - showPage)
                : pageLength  === pagination
                ? Math.max(1, pagination - showPage -1)
                : Math.max(1, pagination - showPage);
        const endPage =
            pagination === 1
                ? Math.min(pageLength, pagination + showPage + 1)
                : pagination === pageLength
                ? Math.min(pageLength, pagination + showPage )
                : Math.min(pageLength, pagination + showPage);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex items-center gap-2 mt-6 bg-white rounded-full p-1">
            {Math.max(1, pagination) > 2 && (
                <MdKeyboardDoubleArrowLeft size={20} onClick={() => setPagination(1)}/>
            )}
            {pages.map((page, index) => (
                <Button
                    key={index}
                    className={`   rounded-full sub-body-14 h-8 w-8 md:w-10 md:h-10 flex justify-center items-center transition-all duration-300 text-primary ${
                        pagination === page
                            ? "text-white bg-primary"
                            : "bg-whitet text-primary "
                    }`}
                    onClick={() =>
                        typeof page === "number" && setPagination(page)
                    }
                >
                    {page}
                </Button>
            ))}
            {pagination < pageLength - 1 && (
                <MdKeyboardDoubleArrowRight size={20} onClick={() => setPagination(pageLength)}/>
            )}
        </div>
    );
};

export default PaginationTransaction;
