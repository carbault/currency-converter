import React from "react";

const ChevronIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGAttributes<SVGSVGElement>
>((props, ref) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.5"
      {...props}
      ref={ref}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
});

ChevronIcon.displayName = "ChevronIcon";
export { ChevronIcon };
