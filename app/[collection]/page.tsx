import styles from "../page.module.css";
import Link from "next/link";
import { db } from "@/lib/prisma";
import ColorCards from "@/components/ColorCards";
import { Color } from "@prisma/client";

export interface ColorDateString extends Omit<Color, "createdAt"> {
  createdAt: string;
}

export async function getCollection(id: string) {
  const result = await db.collection.findUnique({
    where: {
      id: id,
    },
    include: {
      colors: true,
    },
  });
  if (result === null) throw new Error("Collection not found.");
  return result;
}

export default async function Collection({
  params,
}: {
  params: { collection: string };
}) {
  const collection = await getCollection(params.collection);
  return (
    <>
      <nav>
        <h1>
          <Link href="/">Collections</Link>
          {" / "}
          <Link href={`/${collection.id}`}>{collection.title}</Link>
        </h1>
        <Link href={`/${collection.id}/edit`} className={styles.button}>
          Edit
        </Link>
      </nav>
      <div className={styles.wrapper}>
        <ColorCards colors={collection.colors} data-superjson />
      </div>
    </>
  );
}
