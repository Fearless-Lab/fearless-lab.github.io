import type { ReactNode } from "react";

const Infopill = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pb-6">
      <p className="text-xl md:text-3xl font-bold leading-tight">{children}</p>
    </div>
  );
};
export default Infopill;
