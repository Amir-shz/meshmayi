import { Instagram, Linkedin, Send, MessageCircle } from "lucide-react";
import {
  INSTAGRAM_LINK,
  LINKEDIN_LINK,
  TELEGRAM_LINK,
  WHATSAPP_LINK,
} from "@/utils/utils";

export default function SocialLinks() {
  const links = [
    { label: "اینستاگرام", href: INSTAGRAM_LINK, icon: Instagram },
    { label: "واتساپ", href: WHATSAPP_LINK, icon: MessageCircle },
    { label: "تلگرام", href: TELEGRAM_LINK, icon: Send },
    { label: "لینکدین", href: LINKEDIN_LINK, icon: Linkedin },
  ];
  return (
    <div className="design-socials">
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          <Icon size={20} aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
