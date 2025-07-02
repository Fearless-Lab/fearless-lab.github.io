import type { ReactNode } from "react";

const SubInfopill = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-md md:text-2xl text-gray-300 leading-relaxed">
        {children}
      </p>
    </div>
  );
};
export default SubInfopill;
