import { Color } from "@prisma/client";
import styles from "../../../app/page.module.css";
import color_styles from "./color_input.module.css";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { ColorEdit } from "..";

type Props = {
  color: ColorEdit;
  deleteColor: (id: string) => void;
  changeHandler: (e: FormEvent<HTMLInputElement>, id: string) => void;
};

export default function ColorInput({
  color,
  deleteColor,
  changeHandler,
}: Props) {
  return (
    <div className={styles.card}>
      <label
        className={color_styles.label}
        style={{ background: `${color.hexadecimal}` }}
      >
        <input
          className={color_styles.input}
          type="color"
          value={color.hexadecimal}
          onChange={(e) => changeHandler(e, color.id)}
        />
      </label>
      <div className={color_styles.delete_wrapper}>
        <h1 className={color_styles.header}>{color.hexadecimal}</h1>
        <button onClick={() => deleteColor(color.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#ff3232"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
