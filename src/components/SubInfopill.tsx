import type { ReactNode } from "react";

const SubInfopill = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-8">
      <p
        className="text-sm md:text-xl text-gray-300 leading-relaxed"
        style={{ whiteSpace: "pre-line" }}
      >
        {children}
      </p>
    </div>
  );
};
export default SubInfopill;
