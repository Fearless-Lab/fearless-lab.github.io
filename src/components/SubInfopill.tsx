import type { ReactNode } from "react";

const SubInfopill = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-8">
      <h2
        className="text-sm md:text-lg text-gray-300 leading-relaxed"
        style={{ whiteSpace: "pre-line" }}
      >
        {children}
      </h2>
    </div>
  );
};
export default SubInfopill;
