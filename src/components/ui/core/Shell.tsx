import { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
  className?: string;
}

const Shell = ({ children, className = "" }: ShellProps) => {
  return (
    // TODO: Add a max-width to the container
    <div className={`container max-w-7xl mx-auto lg:px-8 px-5 ${className}`}>{children}</div>
  );
};

export default Shell;