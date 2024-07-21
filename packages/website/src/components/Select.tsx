import * as Popover from "@radix-ui/react-popover";
import React, { useMemo, useState } from "react";
import { Button } from "./Button";
import { ChevronIcon } from "./ChevronIcon";
import { DropdownOption } from "./DropdownOption";
import { Spinner } from "./Spinner";
import { TextInput } from "./TextInput";

export function Select<T extends React.Key>(props: {
  value: T | undefined;
  onChange: (newValue: T | undefined) => void;
  items: { value: T; label: string }[];
  text: string;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}) {
  const { children, value, onChange, text, items, className, isLoading } =
    props;

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string>();

  const handleSelectValue = (newValue: T) => () => {
    onChange(newValue === value ? undefined : newValue);
    setIsOpen(false);
  };

  const filteredItems = useMemo(
    () =>
      search
        ? items.filter((item) =>
            item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        : items,
    [search, items]
  );

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button className={className}>
          {text}
          <ChevronIcon className="ml-auto min-w-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        className="my-1 max-h-[min(var(--radix-popover-content-available-height),300px)] rounded border shadow-md flex flex-col gap-2 bg-white border-gray-100 p-2 overflow-hidden"
      >
        <TextInput
          value={search}
          onChange={setSearch}
          placeholder="Search..."
        />

        <div className="flex flex-col overflow-y-auto min-h-20">
          {isLoading ? (
            <Spinner className="m-auto" />
          ) : (
            <>
              {children}
              {filteredItems.map((item, index) => (
                <DropdownOption
                  key={index}
                  onClick={handleSelectValue(item.value)}
                  isSelected={item.value === value}
                >
                  {item.label}
                </DropdownOption>
              ))}
            </>
          )}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
