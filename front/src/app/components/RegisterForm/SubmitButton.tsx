import React from "react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isFormValid: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isFormValid,
}) => {
  return (
    <button
      type="submit"
      disabled={!isFormValid || isSubmitting}
      className={`text-white mb-4  ${
        !isFormValid || isSubmitting
          ? "bg-purple-300"
          : "bg-blue-700 hover:bg-blue-800"
      } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center sm:w-[10rem] mx-auto bg-blue-500 shadow-lg`}
    >
      {isSubmitting ? "Registrando..." : "Registrarse"}
    </button>
  );
};

export default SubmitButton;
