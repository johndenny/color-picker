import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const body = await req.json();
  const result = await db.collection.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json(result);
}
