import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const upsertCollection = await db.collection.upsert({
    where: {
      id: body.id,
    },
    update: {
      title: body.title,
      editedAt: new Date().toUTCString(),
    },
    create: {
      title: body.title,
      editedAt: new Date().toUTCString(),
    },
  });
  for (const color of body.edited_colors) {
    await db.color.upsert({
      where: {
        id: color.id,
      },
      update: {
        hexadecimal: color.hexadecimal,
      },
      create: {
        collectionId: upsertCollection.id,
        createdAt: new Date().toUTCString(),
        hexadecimal: color.hexadecimal,
      },
    });
  }
  await db.color.deleteMany({
    where: {
      id: {
        in: body.deleted_colors,
      },
    },
  });
  return NextResponse.json(upsertCollection);
}
