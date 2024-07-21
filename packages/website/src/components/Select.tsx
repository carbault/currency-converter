import * as Popover from "@radix-ui/react-popover";
import React, { useMemo, useState } from "react";
import { Button } from "./Button";
import { ChevronIcon } from "./ChevronIcon";
import { TextInput } from "./TextInput";

export function Select<T extends React.Key>(props: {
  value: T | undefined;
  onChange: (newValue: T | undefined) => void;
  items: { value: T; label: string }[];
  children: React.ReactNode;
  className?: string;
}) {
  const { children, value, onChange, items, className } = props;

  const [search, setSearch] = useState<string>();

  const handleSelectValue = (newValue: T) => () => {
    onChange(newValue === value ? undefined : newValue);
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
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button className={className}>
          {children}
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
        <div className="flex flex-col overflow-y-auto">
          {filteredItems.map(({ value, label }, index) => (
            <div
              key={index}
              onClick={handleSelectValue(value)}
              className="flex flex-1 py-1 rounded hover:bg-sky-100 px-2 cursor-pointer"
            >
              {label}
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
