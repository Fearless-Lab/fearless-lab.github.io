import type { ReactNode } from "react";

const Infopill = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pb-6">
      <h1 className="text-xl md:text-3xl font-bold leading-tight">
        {children}
      </h1>
    </div>
  );
};
export default Infopill;
