import classNames from "classnames";
import React from "react";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue" | "type"
> & {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
};

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { checked, value, onChange, className, ...restProps } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.currentTarget.value);
    };

    return (
      <input
        {...restProps}
        value={value}
        onChange={handleChange}
        ref={ref}
        className={classNames(
          className,
          "h-8 p-2 bg-sky-50 focus:outline-none placeholder:text-gray-500 rounded border border-gray-500 hover:shadow-hover focus:border-sky-500 focus:border-2"
        )}
        type="text"
      />
    );
  }
);

TextInput.displayName = "TextInput";
export { TextInput };
