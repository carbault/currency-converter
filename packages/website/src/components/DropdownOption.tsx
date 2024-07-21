import classNames from "classnames";
import React from "react";

export function DropdownOption(props: {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
}) {
  const { children, isSelected, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex flex-1 items-center gap-2 py-1 rounded hover:bg-sky-100 px-2 cursor-pointer",
        isSelected && "bg-sky-100"
      )}
    >
      {children}
    </div>
  );
}
