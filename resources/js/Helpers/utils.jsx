import CustomShowAlertModal from "@/Components/Modal/CustomFunctionAlertModal";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ModalContent = ({
    title,
    headerColor,
    content,
    onClose,
    maxWidth,
    showButton,
}) => {
    return (
        <CustomShowAlertModal
            title={title}
            headerColor={headerColor}
            content={content}
            maxWidth={maxWidth}
            showButton={showButton}
            onClose={onClose}
        />
    );
};

export const showSuccessModal = (
    title,
    content,
    onClose = () => {},
    maxWidth,
    showButton = true,
    outsideClick = false
) => {
    MySwal.fire({
        position: "center",
        html: (
            <div>
                <ModalContent
                    title={title}
                    headerColor={"blue"}
                    content={content}
                    maxWidth={maxWidth}
                    showButton={showButton}
                    onClose={() => {
                        MySwal.close();
                        onClose();
                    }}
                    exit={() => {
                        MySwal.close();
                    }}
                />
            </div>
        ),
        showDenyButton: false,
        showCancelButton: false,
        showConfirmButton: false,
     
        allowOutsideClick: outsideClick,
    });
};

export const showErrorModal = (
    title,
    content,

    onClose = () => {},
    maxWidth,
    showButton = true,
    outsideClick = false
) => {
    MySwal.fire({
        position: "center",
        html: (
            <div>
                <ModalContent
                    title={title}
                    headerColor={"red"}
                    content={content}
                    maxWidth={maxWidth}
                    showButton={showButton}
                    onClose={() => {
                        onClose();
                        MySwal.close();
                    }}
                    exit={() => {
                        MySwal.close();
                    }}
                />
            </div>
        ),
        showDenyButton: false,
        showCancelButton: false,
        showConfirmButton: false,
     
        allowOutsideClick: outsideClick,
    });
};
