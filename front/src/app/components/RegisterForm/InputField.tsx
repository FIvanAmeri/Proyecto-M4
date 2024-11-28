import React, { ChangeEvent, FocusEvent } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string;
  error: string;
  touched: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  placeholder,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-center">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`bg-tertiary border text-gray-900 text-sm rounded-lg block w-80 p-2.5 mx-auto hover:bg-customHover ${
          touched && error
            ? "border-red-500"
            : touched && !error
            ? "border-black"
            : "border-black"
        }`}
      />
      {touched && error && (
        <p
          className={`text-red-500 text-sm mt-2 ${
            name === "name" ? "text-center" : "text-center"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
