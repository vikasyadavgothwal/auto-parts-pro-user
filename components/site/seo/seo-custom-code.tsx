"use client";

import { useEffect } from "react";
import type { PublicContentSeo } from "@/lib/public-content";

type SeoCustomCodeProps = {
  seo?: PublicContentSeo;
};

const appendCustomCode = (target: HTMLElement, code: string) => {
  const template = document.createElement("template");
  template.innerHTML = code;
  const appendedNodes: ChildNode[] = [];

  template.content.childNodes.forEach((node) => {
    if (node.nodeName.toLowerCase() === "script") {
      const sourceScript = node as HTMLScriptElement;
      const script = document.createElement("script");

      Array.from(sourceScript.attributes).forEach((attribute) => {
        script.setAttribute(attribute.name, attribute.value);
      });
      script.text = sourceScript.text;
      target.appendChild(script);
      appendedNodes.push(script);
      return;
    }

    const clonedNode = document.importNode(node, true);
    target.appendChild(clonedNode);
    appendedNodes.push(clonedNode);
  });

  return () => {
    appendedNodes.forEach((node) => {
      node.parentNode?.removeChild(node);
    });
  };
};

export function SeoCustomCode({ seo }: SeoCustomCodeProps) {
  const headCode = seo?.customHeadCode?.trim() ?? "";
  const bodyCode = seo?.customBodyCode?.trim() ?? "";

  useEffect(() => {
    const cleanupHead = headCode
      ? appendCustomCode(document.head, headCode)
      : undefined;
    const cleanupBody = bodyCode
      ? appendCustomCode(document.body, bodyCode)
      : undefined;

    return () => {
      cleanupHead?.();
      cleanupBody?.();
    };
  }, [headCode, bodyCode]);

  return null;
}
