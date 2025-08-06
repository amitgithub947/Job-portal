import Swal from 'sweetalert2'

const ErrorMessage = (title) => {
    const alert = Swal.fire({
        title: title,
        icon: "error",
        iconColor: 'red',
        confirmButtonColor: 'red'
    });
    return alert;
}

export default ErrorMessage