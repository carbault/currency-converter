import classNames from "classnames";
import React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { className, ...divProps } = props;

  return (
    <button
      className={classNames(
        "rounded flex overflow-hidden h-10 text-nowrap bg-sky-400 text-white hover:bg-sky-500 hover:shadow-sm text-ellipsis whitespace-nowrap p-2 cursor-pointer data-[state=open]:bg-sky-500 flex-nowrap gap-2 items-center",
        className
      )}
      {...divProps}
      ref={ref}
    />
  );
});

Button.displayName = "Button";
export { Button };
