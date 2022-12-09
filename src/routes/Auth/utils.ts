import React from "react";

export const onChange = (event: React.ChangeEvent<HTMLInputElement>, setState) => {
    if (!event.target.name) return;

    const name = event.target.name;
    setState((prevData: any) => {
        return {
            ...prevData,
            [name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value,
        };
    });
};