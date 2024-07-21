import classNames from "classnames";
import React, { useRef, useState } from "react";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue" | "type" | "onBlur" | "onSubmit"
> & {
  value: number | undefined;
  onSubmit: (newValue: number | undefined) => void;
};

const NumberInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { checked, value, onSubmit, className, ...restProps } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const isEscapePressed = useRef<boolean>(false);
    const [editedValue, setEditedValue] = useState<number>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isFinite(event.currentTarget.valueAsNumber)) {
        setEditedValue(event.currentTarget.valueAsNumber);
        return;
      }
      setEditedValue(undefined);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        isEscapePressed.current = true;
        inputRef.current?.blur();
      }

      if (event.key === "Enter") {
        inputRef.current?.blur();
      }
    };

    const handleBlur = () => {
      if (isEscapePressed.current) {
        setEditedValue(undefined);
      } else {
        onSubmit(editedValue);
        setEditedValue(undefined);
      }
      isEscapePressed.current = false;
    };

    return (
      <input
        {...restProps}
        value={editedValue ?? value}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        ref={ref}
        style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
        className={classNames(
          className,
          "h-10 px-2 bg-sky-50 focus:outline-none placeholder:text-gray-500 rounded border border-gray-500 hover:shadow-hover disabled:text-gray-500 focus:enabled:border-sky-500 focus:border-2"
        )}
        type="number"
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
export { NumberInput };
