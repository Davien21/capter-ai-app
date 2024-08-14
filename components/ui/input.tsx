import * as React from "react";

import { cn } from "../../utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isShowingPassword, setisShowingPassword] = React.useState(false);

    const handlePasswordVisibility = (e: React.MouseEvent) => {
      setisShowingPassword(!isShowingPassword);
      e.preventDefault();
    };

    return (
      <div className="flex items-center relative">
        <input
          type={!isShowingPassword ? type : "text"}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
          style={type === "password" ? { paddingRight: "28px" } : {}}
        />
        {type === "password" && (
          <>
            <button
              className="absolute right-[5px] h-full px-[5px]"
              onClick={handlePasswordVisibility}
            >
              {isShowingPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          </>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
