import React from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

export default function Header() {
  return (
    <div className="mx-3 flex items-center justify-between py-4">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
}
