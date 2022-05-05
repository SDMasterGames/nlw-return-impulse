import { useState } from "react";
import { Widget } from "./components/Widget";

interface ButtonProps {
  label?: string;
}

function Button({ label }: ButtonProps) {
  return <button>{label ?? "Default"}</button>;
}

function App() {
  return (
    <>
      <Widget />
    </>
  );
}

export default App;
