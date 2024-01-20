import { useState, useEffect, RefObject } from "react";

function useIsFocused(elementRef: RefObject<HTMLElement>): boolean {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    element.addEventListener("focus", handleFocus, true);
    element.addEventListener("blur", handleBlur, true);

    return () => {
      if (!element) return;
      element.removeEventListener("focus", handleFocus, true);
      element.removeEventListener("blur", handleBlur, true);
    };
  }, [elementRef]);

  return isFocused;
}

export { useIsFocused };
