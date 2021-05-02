import React from "react";

export default function Footer() {
  return (
    <div className="h-24 w-full flex justify-center items-center">
      <div>
        Made with Create-React-App by{" "}
        <a
          href="https://github.com/Redskinsjo?tab=repositories"
          className="hover:underline no-underline"
        >
          Jonathan Carnos
        </a>
      </div>
    </div>
  );
}
