import React from "react";

export default function InputText({
  label,
  type,
  errorMessage,
  register,
  defaultValue,
}) {
  return (
    <div className="my-3 w-full">
      <label htmlFor={label} className="capitalize">
        {label}
      </label>
      <input
        defaultValue={defaultValue || ""}
        className="p-3 block rounded-md w-full bg-slate-50 focus:outline-blue-600 border-2"
        placeholder={"enter your " + label}
        type={type}
        id={label}
        {...register}
      />
      {errorMessage && (
        <p className="text-red-500 capitalize">{errorMessage}!</p>
      )}
    </div>
  );
}
