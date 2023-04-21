import Link from "next/link";
import { db } from "@/lib/prisma";
import CollectionCards from "@/components/CollectionCards";

export const dynamic = "force-dynamic";

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
      <CollectionCards collections={collections} />
    </>
  );
}
