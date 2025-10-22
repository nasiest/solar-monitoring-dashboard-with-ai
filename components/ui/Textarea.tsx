import React, { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";


interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className={`w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className ?? ""}`}
      rows={4}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
