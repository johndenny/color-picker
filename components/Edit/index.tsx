"use client";

import Link from "next/link";
import { Collection, Color } from "@prisma/client";
import styles from "../../app/page.module.css";
import color_styles from "../ColorCards/color_card.module.css";
import edit_styles from "./edit.module.css";
import ColorInput from "./ColorInput";
import { FormEvent, useState, useTransition } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import LoadingSvg from "../LoadingSvg";

export interface ColorEdit extends Color {
  isEdit: boolean;
  isDelete: boolean;
  isNew: boolean;
}

type Props = {
  collection: Collection & {
    colors: Color[];
  };
  colors: ColorEdit[];
};

const inter = Inter({ subsets: ["latin"] });

export default function Edit({ collection, colors }: Props) {
  const router = useRouter();
  const [isSavePending, startSaveTransition] = useTransition();
  const [isSaveFetching, setIsSaveFetching] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isDeleteFetching, setIsDeleteFetching] = useState(false);

  const isSaveMutating = isSaveFetching || isSavePending;
  const isDeleteMutating = isDeleteFetching || isDeletePending;

  const [newId, setNewId] = useState(1);
  const [value, setValue] = useState(collection.title || "");
  const [colorsArray, setColors] = useState(colors);

  async function HandleDelete() {
    setIsDeleteFetching(true);

    await fetch("https://color-picker-topaz.vercel.app/api/delete_collection", {
      method: "PATCH",
      body: JSON.stringify({ id: collection.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsDeleteFetching(false);

    startDeleteTransition(() => {
      router.refresh();
      router.replace("/");
    });
  }

  async function handleSave() {
    setIsSaveFetching(true);

    const edited_colors = [],
      deleted_colors = [];
    for (const obj of colorsArray) {
      if (obj.isEdit)
        edited_colors.push({ id: obj.id, hexadecimal: obj.hexadecimal });
      else if (obj.isDelete) deleted_colors.push(obj.id);
    }

    const result = await fetch(
      "https://color-picker-topaz.vercel.app/api/post_collection",
      {
        method: "POST",
        body: JSON.stringify({
          id: collection.id,
          title: value,
          edited_colors,
          deleted_colors,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { id } = await result.json();
    setIsSaveFetching(false);

    startSaveTransition(() => {
      router.refresh();
      router.replace(`/${id}`);
    });
  }

  function changeHandler(e: FormEvent<HTMLInputElement>, id: string) {
    const index = colorsArray.findIndex((color) => color.id === id);
    if (index > -1) {
      const newArray = [...colorsArray];
      newArray[index].hexadecimal = e.currentTarget.value;
      setColors(newArray);
    }
  }

  function deleteColor(id: string) {
    const index = colorsArray.findIndex((color) => color.id === id);
    let newArray = [...colorsArray];
    if (index > -1) {
      if (colorsArray[index].isNew) newArray.splice(index, 1);
      else newArray[index].isEdit = true;
    }
    setColors(newArray);
  }

  function addColor() {
    const newColor: ColorEdit = {
      createdAt: new Date().toUTCString(),
      collectionId: collection.id,
      hexadecimal: "#000000",
      id: newId.toString(),
      isDelete: false,
      isEdit: true,
      isNew: true,
    };
    setNewId((newId) => newId + 1);
    setColors([newColor].concat(colorsArray));
  }
  return (
    <>
      <nav>
        <h1>
          <Link href="/">Collections</Link>
          {" / "}
          <input
            className={inter.className}
            placeholder="Title"
            type="text"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </h1>
        <div className={edit_styles.buttons}>
          <button onClick={() => router.back()} className={styles.button}>
            Cancel
          </button>
          <button
            onClick={HandleDelete}
            className={`${edit_styles.red} ${styles.button}`}
            disabled={isSaveMutating}
          >
            <span className={isDeleteMutating ? edit_styles.hidden : ""}>
              Delete
            </span>
            {isDeleteMutating && <LoadingSvg color={"darkred"} />}
          </button>
          <button
            onClick={handleSave}
            className={`${edit_styles.green} ${styles.button}`}
            disabled={isDeleteMutating}
          >
            <span className={isSaveMutating ? edit_styles.hidden : ""}>
              Save
            </span>
            {isSaveMutating && <LoadingSvg color={"darkgreen"} />}
          </button>
        </div>
      </nav>
      <div className={styles.wrapper}>
        <button onClick={addColor} className={styles.card}>
          <div className={color_styles.color}>+</div>
          <h2 className={styles.header}>Add Color</h2>
        </button>
        {colorsArray.map((color) => {
          if (!color.isDelete)
            return (
              <ColorInput
                key={color.id}
                color={color}
                deleteColor={deleteColor}
                changeHandler={changeHandler}
              />
            );
        })}
      </div>
    </>
  );
}
