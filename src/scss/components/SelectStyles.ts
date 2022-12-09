export const selectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderRadius: "16px",
        borderColor: state.isFocused ? "#91919F" : "#F1F1FA",
        borderWidth: "2px",
        boxShadow: "none",
        minHeight: "50px",
    }),
    indicatorSeparator: (baseStyles, state) => ({
        display: "none",
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        color: "#91919F",
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        borderRadius: "16px",
        overflow: "hidden",
    }),
};