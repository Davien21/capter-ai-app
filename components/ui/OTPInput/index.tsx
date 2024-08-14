import React, {
  useState,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  useEffect,
} from "react";
import styles from "./otp-input.module.scss";
import { IComponentState } from "interfaces";

interface OtpInputProps {
  length?: number;
  state: IComponentState;
  allowOnlyNumbers?: boolean;
  label?: string;
  otp: string;
  onOtpChange: (value: string) => void;
}

const OtpInput = ({
  otp,
  length = 4,
  state = "loading",
  allowOnlyNumbers = false,
  label = "Enter your OTP",
  onOtpChange,
}: OtpInputProps) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (otpRefs.current.length !== length) {
    otpRefs.current = Array(length).fill(null);
  }

  const handleInput = (index: number, value: string) => {
    if (allowOnlyNumbers && !/^\d+$/.test(value)) return;
    if (value.length > 1) value = value[value.length - 1];

    setOtpValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      if (newValues[index]) moveFocusForward(index);
      return newValues;
    });
  };

  const onKeyUp = (index: number, event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") moveFocusBackward(index);
    else if (event.key === "ArrowRight") moveFocusForward(index);
    else if (event.key === "Backspace" || event.key === "Delete")
      handleBackspaceOrDelete(index);
  };

  useEffect(() => {
    onOtpChange(otpValues.join(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValues]);

  const handleBackspaceOrDelete = (index: number) => {
    setOtpValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = "";
      if (prevValues[index] === "") moveFocusBackward(index);
      onOtpChange(newValues.join(""));
      return newValues;
    });
  };

  const moveFocusForward = (index: number) => {
    const nextInput = otpRefs.current[index + 1];
    if (index < length - 1) {
      nextInput?.focus();
      const valueLength = nextInput?.value.length || 0;
      nextInput?.setSelectionRange(0, valueLength);
    }
  };

  const moveFocusBackward = (index: number) => {
    if (index > 0) {
      const prevInput = otpRefs.current[index - 1];
      prevInput?.focus();
      prevInput?.setSelectionRange(0, prevInput.value.length);
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    let pastedText = clipboardData.getData("text");

    if (allowOnlyNumbers) pastedText = pastedText.replace(/\D+/g, "");

    let lastFilledIndex = -1;
    for (let i = 0; i < length && i < pastedText.length; i++) {
      handleInput(i, pastedText[i]);
      lastFilledIndex = i;
    }

    if (lastFilledIndex >= 0) {
      const lastFilledInput = otpRefs.current[lastFilledIndex];
      lastFilledInput?.focus();
    }
  };

  const handleClick = (index: number) => {
    const input = otpRefs.current[index];
    input?.setSelectionRange(0, input.value.length);
  };

  let containerClass = `${styles["container"]} ${styles[state]} `;

  const wrapperClass = `grid gap-x-3 sm:gap-x-4 grid-cols-4 place-items-center`;

  return (
    <div>
      <div className={containerClass} role="group" aria-label={label}>
        <div className={wrapperClass}>
          {Array.from({ length }).map((_, index) => {
            return (
              <input
                className="col-span-1"
                type="tel"
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                value={otpValues[index]}
                onChange={(e) => handleInput(index, e.target.value)}
                onClick={(e) => handleClick(index)}
                onKeyDown={(e) => onKeyUp(index, e)}
                onPaste={onPaste}
                aria-label={`${label} ${index + 1}`}
                disabled={state === "loading"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { OtpInput };
