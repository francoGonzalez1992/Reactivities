import React from "react";
import { Duck } from "./demo";

interface Props {
  duck: Duck;
}

export default function DuckItem({ duck }: Props) {
  return (
    <div>
      <div>
        <span>{duck.name}</span>
        <br />
        <button onClick={() => duck.makeSound(duck.name + " quack")}>
          Make sound
        </button>
      </div>
    </div>
  );
}
 