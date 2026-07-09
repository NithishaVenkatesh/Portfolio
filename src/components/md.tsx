import { Fragment } from "react";

/**
 * Renders a string with **bold** emphasis segments as <strong> elements.
 * The only markdown supported in content strings — anything richer belongs
 * in a component.
 */
export function Md({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index % 2 === 1 ? (
            <strong className="font-medium text-ink">{part}</strong>
          ) : (
            part
          )}
        </Fragment>
      ))}
    </>
  );
}
