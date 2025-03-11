import { useState } from "react";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiOutlineChevronDown } from "react-icons/hi";

const colorsArr = [
  {
    value: "red",
    label: "قرمز",
  },
  {
    value: "blue",
    label: "آبی",
  },
];

function EditColors({ colors }: { colors: string[] }) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([...colors]);

  const toggleSelection = (currentValue: string) => {
    setSelectedValues((prev) =>
      prev.includes(currentValue)
        ? prev.filter((val) => val !== currentValue)
        : [...prev, currentValue]
    );
  };

  return (
    <div className=" w-full">
      <p className="text-neutral-700 text-p3_M_desktop  mb-2"> رنگ ها</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            id="combo"
            aria-expanded={open}
            className={`w-full justify-between h-12 rounded-lg border hover:border-primary-500 focus:outline-none focus:border-primary-500 bg-neutral-50 text-neutral-600 duration-300 ${
              open && "border-primary-500"
            }`}
          >
            {selectedValues.length > 0
              ? selectedValues
                  .map((val) => colorsArr.find((f) => f.value === val)?.label)
                  .join(", ")
              : "رنگ ها را انتخاب کنید"}

            <HiOutlineChevronDown
              className=" text-neutral-400"
              style={{ width: "24px", height: "24px" }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            {/* <CommandInput placeholder="جستجوی ..." /> */}
            <CommandList>
              <CommandEmpty>رنگی یافت نشد</CommandEmpty>
              <CommandGroup>
                {colorsArr.map((color) => (
                  <CommandItem
                    key={color.value}
                    value={color.value}
                    onSelect={() => toggleSelection(color.value)}
                  >
                    {color.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedValues.includes(color.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedValues.map((el, index) => (
        <input key={index} name="colors" defaultValue={el} className="hidden" />
      ))}
    </div>
  );
}

export default EditColors;
