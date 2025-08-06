import Swal from 'sweetalert2'

const SuccessMessage = (title) => {
    const alert = Swal.fire({
        title: title,
        icon: "success",
        iconColor: 'green',
        confirmButtonColor: 'green'
    });
    return alert;
}

export default SuccessMessage