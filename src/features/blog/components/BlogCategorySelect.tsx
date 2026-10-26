"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";

export default function BlogCategorySelect({ categories, defaultValue = "" }: { categories: string[]; defaultValue?: string }) {
  const [category, setCategory] = useState(defaultValue);
  return <div className="blog-category-field">
    <input type="hidden" name="category" value={category} />
    <DropdownMenu.Root dir="rtl" modal={false}>
      <DropdownMenu.Trigger type="button" className="blog-category-trigger" aria-label={`دسته‌بندی: ${category || "همه موضوع‌ها"}`}><span>{category || "همه موضوع‌ها"}</span><ChevronDown size={16} aria-hidden="true" /></DropdownMenu.Trigger>
      <DropdownMenu.Portal><DropdownMenu.Content className="blog-category-menu" sideOffset={8} align="start" collisionPadding={16} hideWhenDetached loop>
        <DropdownMenu.RadioGroup value={category} onValueChange={setCategory} aria-label="موضوع مقاله">
          <DropdownMenu.RadioItem value="" className="blog-category-option"><span>همه موضوع‌ها</span><DropdownMenu.ItemIndicator><Check size={16} aria-hidden="true" /></DropdownMenu.ItemIndicator></DropdownMenu.RadioItem>
          {categories.map(value => <DropdownMenu.RadioItem key={value} value={value} className="blog-category-option"><span>{value}</span><DropdownMenu.ItemIndicator><Check size={16} aria-hidden="true" /></DropdownMenu.ItemIndicator></DropdownMenu.RadioItem>)}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content></DropdownMenu.Portal>
    </DropdownMenu.Root>
  </div>;
}
