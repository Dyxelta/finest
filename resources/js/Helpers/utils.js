import SuccessNotification from "@/Components/AlertNotification";
import Swal from 'sweetalert2'

export const showSuccessNotification = (title, msg, onConfirm = () => {}) => {
    return Swal.fire({
      position: "center",
      html: (
        <SuccessNotification
          onClose={() => {
            Swal.close();
            onConfirm();
          }}
          onConfirm={() => {
            Swal.close();
            onConfirm();
          }}
          title={title}
          description={msg}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };