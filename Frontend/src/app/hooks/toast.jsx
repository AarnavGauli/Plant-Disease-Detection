import { useState } from "react";

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState(null);

  const toast = ({ title, description }) => {
    setToastMessage({ title, description });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Toast disappears after 3 seconds
  };

  return { toast, toastMessage };
};
