"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqItem({
  question,
  answer,
  id,
}: {
  question: string;
  answer: string;
  id: number;
}) {
  return (
    <AccordionItem value={String(id)} className="home-faq-item">
      <AccordionTrigger className="text-right gap-4 hover:no-underline">
        <span className="faq-number" aria-hidden="true">
          {String(id).padStart(2, "0")}
        </span>
        <span className="flex-1">{question}</span>
      </AccordionTrigger>
      <AccordionContent>
        <p>{answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
}
