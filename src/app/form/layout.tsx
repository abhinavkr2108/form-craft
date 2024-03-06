import React from "react";

export default function FormLayout(props: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex flex-col justify-between items-center pt-8 gap-4 h-screen">
      {props.children}
    </div>
  );
}
