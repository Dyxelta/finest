import React from "react";
import { Button } from "reactstrap";

const PaginationTransaction = ({ pageLength, setPagination, pagination }) => {
    const getPages = () => {
        const pages = [];
        const showPage = 1;
        const startPage = Math.max(2, pagination - showPage);
        const endPage = Math.min(pageLength - 1, pagination + showPage);

        pages.push(1);

        if (startPage > 2) {
            pages.push("..."); 
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < pageLength - 1) {
            pages.push("...");
        }

        if (pageLength > 1) {
            pages.push(pageLength);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex items-center gap-2 mt-6 bg-white rounded-full p-1">
            {pages.map((page, index) => (
                <Button
                    key={index}
                    className={` ${page !== "..." && 'border-primary border'} ${page !== "..." && pagination !== page && 'hover:bg-light-grey'} rounded-full sub-body-14 h-8 w-8 md:w-10 md:h-10 flex justify-center items-center transition-all duration-300 text-primary ${
                        pagination === page
                            ? "text-white bg-primary"
                            : "bg-whitet text-primary "
                    }`}
                    onClick={() => typeof page === "number" && setPagination(page)}
                    disabled={page === "..."}
                >
                    {page}
                </Button>
            ))}
        </div>
    );
};

export default PaginationTransaction;

