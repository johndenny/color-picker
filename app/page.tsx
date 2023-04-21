import Link from "next/link";
import styles from "./page.module.css";
import { db } from "@/lib/prisma";

async function getCollections() {
  const collections = await db.collection.findMany({
    orderBy: {
      editedAt: "desc",
    },
    include: {
      colors: true,
    },
  });
  return collections;
}

export default async function Home() {
  const collections = await getCollections();
  return (
    <>
      <nav>
        <h1>
          <Link href="/">Collections</Link>
        </h1>
      </nav>
      <div className={styles.wrapper}>
        <Link href={`/new/edit`} className={styles.card}>
          <div className={styles.inner_card_add}>+</div>
          <h2 className={`${styles.header} ${styles.center}`}>
            Add Collection
          </h2>
        </Link>
        {collections.map((collection) => {
          const all_hexadecimals = collection.colors.map(
            (color) => color.hexadecimal
          );
          const background_style =
            all_hexadecimals.length > 1
              ? { background: `linear-gradient(${all_hexadecimals.join(",")})` }
              : { background: all_hexadecimals[0] };
          return (
            <Link
              href={`/${collection.id}`}
              className={styles.card}
              key={collection.id}
            >
              <div className={styles.inner_card} style={background_style}></div>
              <h1 className={styles.header}>{collection.title}</h1>
            </Link>
          );
        })}
      </div>
    </>
  );
}
