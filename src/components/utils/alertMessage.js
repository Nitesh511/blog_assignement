import Swal from 'sweetalert2';

// Success Alert
export const showSuccessAlert = (message) => {
  Swal.fire({
    title: 'Success!',
    text: message,
    icon: 'success',
    confirmButtonText: 'OK'
  });
};

// Error Alert
export const showErrorAlert = (message) => {
  Swal.fire({
    title: 'Error!',
    text: message,
    icon: 'error',
    confirmButtonText: 'Try Again'
  });
};

// Info Alert
export const showInfoAlert = (message) => {
  Swal.fire({
    icon: 'info',
    title: 'Duplicate Records Found',
    text: message,
    confirmButtonText: 'OK'
  });
};