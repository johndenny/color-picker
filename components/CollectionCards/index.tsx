"useclient";

import Link from "next/link";
import styles from "../../app/page.module.css";
import { Collection, Color } from "@prisma/client";

export default function CollectionCards({
  collections,
}: {
  collections: (Collection & {
    colors: Color[];
  })[];
}) {
  function getGradientStyles(colors: string[]) {
    return colors.length > 1
      ? {
          background: `linear-gradient(to right, ${colors.join(",")})`,
        }
      : { background: colors[0] };
  }

  return (
    <div className={styles.wrapper}>
      <Link href={`/new/edit`} className={styles.card}>
        <div className={styles.inner_card_add}>+</div>
        <h2 className={`${styles.header} ${styles.center}`}>Add Collection</h2>
      </Link>
      {collections.map((collection) => {
        const all_hexadecimals = collection.colors.map(
            (color) => color.hexadecimal
          ),
          mid = Math.floor(all_hexadecimals.length / 2),
          top_colors = all_hexadecimals.slice(0, mid),
          bottom_colors = all_hexadecimals.slice(mid);
        return (
          <Link
            href={`/${collection.id}`}
            className={styles.card}
            key={collection.id}
          >
            <div
              className={styles.inner_card}
              style={getGradientStyles(top_colors)}
            >
              {bottom_colors.length > 0 && (
                <div
                  className={styles.inner_card_mask}
                  style={getGradientStyles(bottom_colors)}
                ></div>
              )}
            </div>
            <h1 className={styles.header}>{collection.title}</h1>
          </Link>
        );
      })}
    </div>
  );
}
