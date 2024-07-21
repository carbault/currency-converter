import classNames from "classnames";
import React from "react";

const Spinner = React.forwardRef<
  SVGSVGElement,
  React.SVGAttributes<SVGSVGElement>
>((props, ref) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      className={classNames(props.className, "animate-spin")}
      ref={ref}
    >
      <g>
        <circle cx="12" cy="2.5" r="1.5" fill="currentColor" opacity="0.14" />
        <circle
          cx="16.75"
          cy="3.77"
          r="1.5"
          fill="currentColor"
          opacity="0.29"
        />
        <circle
          cx="20.23"
          cy="7.25"
          r="1.5"
          fill="currentColor"
          opacity="0.43"
        />
        <circle cx="21.5" cy="12" r="1.5" fill="currentColor" opacity="0.57" />
        <circle
          cx="20.23"
          cy="16.75"
          r="1.5"
          fill="currentColor"
          opacity="0.71"
        />
        <circle
          cx="16.75"
          cy="20.23"
          r="1.5"
          fill="currentColor"
          opacity="0.86"
        />
        <circle cx="12" cy="21.5" r="1.5" fill="currentColor" />
      </g>
    </svg>
  );
});

Spinner.displayName = "Spinner";
export { Spinner };
