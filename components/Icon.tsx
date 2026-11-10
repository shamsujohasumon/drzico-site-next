// One inline SVG icon set (same drawings as the original site). Usage: <Icon name="phone" />
import icons from "@/content/icons.json";

const P = (icons as { P: Record<string, string> }).P;

export function Icon({ name, cls = "", label }: { name: string; cls?: string; label?: string }) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const, focusable: "false" as const };
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" {...a11y} dangerouslySetInnerHTML={{ __html: P[name] }} />
  );
}
