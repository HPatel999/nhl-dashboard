// ToolTip.jsx
import React, { useState } from "react";

export default function StatWithTooltip({ label, value, tooltip, textColor = "black" }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex flex-col gap-1" style={{ color: textColor }}>
      <div className="flex items-center gap-1">
        <span className="text-sm opacity-90">{label}</span>

        <span
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="cursor-pointer text-xs opacity-70"
        >
          ⓘ
        </span>
      </div>

      <span className="text-lg font-semibold">{value}</span>

      {show && (
        <div className="absolute left-0 top-6 z-50 w-52 p-2 rounded-lg bg-black text-white text-xs shadow-lg">
          {tooltip}
        </div>
      )}
    </div>
  );
}
