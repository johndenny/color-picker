"use client";

import { Color } from "@prisma/client";
import styles from "../../app/page.module.css";
import color_styles from "./color_card.module.css";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ColorCards({ colors }: { colors: Color[] }) {
  const [copiedId, setCopiedId] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function copyHexadecimal(hexadecimal: string, id: string) {
    if (timer.current) clearTimeout(timer.current);
    navigator.clipboard.writeText(hexadecimal.slice(1));
    setCopiedId(id);
    timer.current = setTimeout(() => setCopiedId(""), 3000);
  }
  return (
    <>
      {colors.map((color) => (
        <button
          key={color.id}
          className={styles.card}
          onClick={() => copyHexadecimal(color.hexadecimal, color.id)}
        >
          {copiedId === color.id && <div className={color_styles.screen}></div>}
          <div
            className={color_styles.color}
            style={{ backgroundColor: `${color.hexadecimal}` }}
          >
            {copiedId === color.id && (
              <div className={color_styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="grey"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
              </div>
            )}
          </div>
          <h1 className={styles.header}>{color.hexadecimal}</h1>
        </button>
      ))}
    </>
  );
}
