import React, { useState } from "react";

export default function ListHeader({
    isCompleted = false,
    isOpen,
    handleOpen,
}) {
    const [state, setState] = useState({
        checked: isCompleted,
    });

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        setState((prevState) => ({
            ...prevState,
            checked: isChecked,
        }));
    };

    return (
        <div className="flex flex-row items-center gap-x-1 mb-3">
            <div className="w-[5%]">
                <input
                    type="checkbox"
                    className="h-3 w-3 border-primary-dark checked:bg-transparent checked:text-primary checked:bg-red-500 checked:-top-5"
                    checked={state.checked}
                    onChange={handleChange}
                />
            </div>
            <div
                className={`w-[62%] text-primary-dark text-xs font-bold ${
                    isCompleted && "text-primary-grey line-through"
                }`}
            >
                Close off Case #012920 - RODRIGUES, Amiguel
            </div>
            <div
                className={`w-[13%] text-indicator-red text-[10px] ${
                    isCompleted && "text-primary-grey"
                }`}
            >
                2 Days Left
            </div>
            <div
                className={`w-[13%] text-primary-dark text-[10px] ${
                    isCompleted && "text-primary-grey"
                }`}
            >
                12/06/2024
            </div>
            <div
                className={`w-[3.5%] text-primary-dark transform  flex justify-center transition-all ${
                    !isOpen && "transition-all rotate-180"
                }`}
                onClick={handleOpen}
            >
                <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.175 7.08749L5 3.27083L8.825 7.08749L10 5.91249L5 0.912495L-1.02722e-07 5.91249L1.175 7.08749Z"
                        fill="#4F4F4F"
                    />
                </svg>
            </div>
            <div className="w-[3.5%] pt-1 text-primary-dark">
                <svg
                    width="14"
                    height="4"
                    viewBox="0 0 14 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63908e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35465e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35465e-07Z"
                        fill="#828282"
                    />
                </svg>
            </div>
        </div>
    );
}
