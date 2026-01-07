import katex from "katex";

export function renderKatex(text: string) {
  if (!text) return "";

  // Replace all $...$ blocks with rendered KaTeX
  return text.replace(/\$(.+?)\$/g, (_, expr) => {
    try {
      return katex.renderToString(expr, {
        throwOnError: false,
        displayMode: false,
      });
    } catch {
      return expr;
    }
  });
}
