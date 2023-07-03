import React from "react";

export default function InputSelect({ label, options, errorMessage, register, eventChange, disabled = false }) {
  return (
    <div className="my-3 w-full">
      <label className="block" htmlFor={label}>
        {label}
      </label>
      <select
        placeholder={"Field Your " + label}
        className="p-3 block rounded-md w-full bg-slate-50 focus:outline-blue-600 border-2 disabled:bg-slate-300"
        {...register}
        id={label}
        disabled={Boolean(disabled)}
        onChange={(e) => eventChange(e.target.value.split(",")[1])}
      >
        {options.map((item) => (
          <option key={item.id} value={item.nama + "," + item.id}>
            {item.nama}
          </option>
        ))}
      </select>
      {errorMessage && <p className="text-red-500 capitalize">{errorMessage}!</p>}
    </div>
  );
}
