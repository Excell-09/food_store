import React from "react";

export default function InputTextArea({ label, type, errorMessage, register }) {
  return (
    <div className="my-3 w-full">
      <label htmlFor={label} className="capitalize">
        {label}
      </label>
      <textarea
        className="p-3 block rounded-md w-full bg-slate-50 focus:outline-blue-600 min-h-[220px] border-2"
        placeholder={"enter your " + label}
        type={type}
        id={label}
        {...register}
      />
      {errorMessage && <p className="text-red-500 capitalize">{errorMessage}!</p>}
    </div>
  );
}
