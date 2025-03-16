"use client";

import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState } from "react";

interface faqItemProps {
  question: string;
  answer: string;
  id: number;
}

function FaqItem({ question, answer, id }: faqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem
      value={String(id)}
      className={` border duration-200 ${
        isOpen ? "border-primary-200" : "border-neutral-300"
      } rounded-lg p-6 py-2 max-sm:p-3 max-sm:py-0`}
    >
      <AccordionTrigger
        className=" [&>svg]:size-8 max-sm:[&>svg]:size-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className=" flex items-center gap-2">
          <HiOutlineQuestionMarkCircle className="size-8 max-sm:size-6 text-primary-500" />
          <p className=" text-h5_SB_desktop max-sm:text-p2_SB_desktop text-neutral-800 text-right">
            {question}
          </p>
        </div>
      </AccordionTrigger>
      <AccordionContent className=" text-neutral-500 text-lg leading-[2.125rem] max-sm:text-[0.87813rem] font-medium">
        <p className=" max-sm:leading-[130%]">{answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
}

export default FaqItem;
