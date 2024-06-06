import { Input } from "@/components/ui/input";
import { toggleDetail } from "@/redux/actions/actionMenuSlice";
import { differenceInDays, format, parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ActionMenu = (menuPosition) => {
    console.log("menu", menuPosition);
    return (
        <div
            className="flex flex-col z-20 w-20 bg-white border rounded"
            style={{
                position: "absolute",
                left: `385px`,
                top: `50px`,
            }}
        >
            <div>
                <button className="bg-white w-full rounded-none hover:bg-primary-light text-xs text-indicator-red py-0 h-7">
                    Delete
                </button>
            </div>
        </div>
    );
};

const ListHeader = ({
    id,
    name,
    date,
    isCompleted = false,
    isOpen,
    handleOpen,
}) => {
    const dispatch = useDispatch();
    const containerRef = useRef(null);
    const actionMenu = useSelector((state) => state.actionMenu.detail);
    const currentDate = new Date();
    const formattedDate = date !== "" ? format(date, "dd/MM/yyyy") : "";
    const diffrentDate =
        date !== "" ? differenceInDays(parseISO(date), currentDate) : "";

    const [state, setState] = useState({
        open: false,
        checked: isCompleted,
        menuPosition: {
            x: 0,
            y: 0,
        },
    });

    const handleState = (key, value) => {
        setState((prevState) => {
            return {
                ...prevState,
                [key]: value,
            };
        });
    };

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        setState((prevState) => ({
            ...prevState,
            checked: isChecked,
        }));
    };

    const selectedMessage = (id, event) => {
        event.stopPropagation();
        const containerRect = containerRef.current.getBoundingClientRect();
        handleState("menuPosition", {
            x: event.clientX - containerRect.left,
            y: event.clientY - containerRect.top,
        });
        handleState("open", true);
        dispatch(toggleDetail({ key: "task", id: id }));
    };

    useEffect(() => {
        console.log("opened : ", state.open);
    }, [state.open]);

    return (
        <div
            className="flex flex-row items-center gap-x-1 mb-3"
            ref={containerRef}
        >
            {actionMenu.task === id && (
                <ActionMenu menuPosition={state.menuPosition} />
            )}
            <div className="w-[5%]">
                <input
                    type="checkbox"
                    className="h-3 w-3 border-primary-dark checked:bg-transparent checked:text-primary checked:bg-red-500 checked:-top-5"
                    checked={state.checked}
                    onChange={handleChange}
                />
            </div>
            <div
                className={`w-[62%] text-primary-dark text-xs font-bold line-clamp-2 ${
                    isCompleted && "text-primary-grey line-through"
                }`}
                title={name}
            >
                {name == "" ? (
                    <Input
                        placeholder="Type Task Title"
                        className="text-xs font-normal"
                    />
                ) : (
                    name
                )}
            </div>
            <div
                className={`w-[13%] text-indicator-red text-[10px] ${
                    isCompleted && "text-primary-grey"
                }`}
            >
                {date !== "" ? `${diffrentDate} Days Left` : ""}
            </div>
            <div
                className={`w-[13%] text-primary-dark text-[10px] ${
                    isCompleted && "text-primary-grey"
                }`}
            >
                {date !== "" ? formattedDate : ""}
            </div>
            <div
                className={`w-[3.5%] text-primary-dark transform  flex justify-center transition-all ${
                    !isOpen && "transition-all rotate-180"
                }`}
                onClick={handleOpen}
            >
                <svg
                    width="12"
                    height="10"
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
            <div
                className="w-[3.5%] pt-1 text-primary-dark"
                onClick={(e) => selectedMessage(id, e)}
            >
                <svg
                    width="12"
                    height="5"
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
};

export default ListHeader;
