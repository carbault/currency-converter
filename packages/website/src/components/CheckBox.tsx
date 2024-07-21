import React from "react";

const CheckBox = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>((props, ref) => {
  const { checked, className, ...restProps } = props;

  return (
    <input
      {...restProps}
      checked={checked}
      ref={ref}
      className="h-4 w-4 checked:accent-sky-400"
      type="checkbox"
    />
  );
});

CheckBox.displayName = "CheckBox";
export { CheckBox };
