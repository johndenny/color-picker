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
        <div
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
                <Image
                  alt="copied"
                  src="./check-circle-fill.svg"
                  width={24}
                  height={24}
                ></Image>
              </div>
            )}
          </div>
          <h1 className={styles.header}>{color.hexadecimal}</h1>
        </div>
      ))}
    </>
  );
}
