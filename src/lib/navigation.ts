export function getActiveSection(
  sections: { id: string; top: number }[],
  activationLine: number,
) {
  return sections.reduce(
    (active, section) => (section.top <= activationLine ? section.id : active),
    sections[0]?.id ?? null,
  );
}
