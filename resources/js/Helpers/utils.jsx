import CustomShowAlertModal from "@/Components/Modal/CustomFunctionAlertModal";
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
    success="",
    showCancel=false,
    exit
}) => {
    return (
        <CustomShowAlertModal
            title={title}
            headerColor={headerColor}
            content={content}
            maxWidth={maxWidth}
            showButton={showButton}
            onClose={onClose}
            success={success}
            showCancel={showCancel}
            exit={exit}
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
                    success={true}
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
    outsideClick = false,
    showCancel=false
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
                    success={false}
                    exit={() => {
                        MySwal.close();
                    }}
                    showCancel={showCancel}
                />
            </div>
        ),
        showDenyButton: false,
        showCancelButton: false,
        showConfirmButton: false,
     
        allowOutsideClick: outsideClick,
    });
};
