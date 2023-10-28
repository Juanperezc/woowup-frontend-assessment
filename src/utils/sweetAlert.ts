import Swal from "sweetalert2";

const sweetAlert = {
  success: (title: string, text?: string) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "success",
    });
  },

  error: (title: string, text?: string) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "error",
    });
  },

  warning: (title: string, text?: string) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
    });
  },

  info: (title: string, text?: string) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "info",
    });
  },

  question: (title: string, text?: string) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "question",
    });
  },

  loading: (title: string, text?: string) => {
    Swal.fire({
      title: title,
      html: text,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  },

  close: () => {
    Swal.close();
  },
};

export default sweetAlert;
