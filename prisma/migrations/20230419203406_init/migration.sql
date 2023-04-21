-- CreateTable
CREATE TABLE "Color" (
    "hexadecimal" INTEGER NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("hexadecimal")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CollectionToColor" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_hexadecimal_key" ON "Color"("hexadecimal");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToColor_AB_unique" ON "_CollectionToColor"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToColor_B_index" ON "_CollectionToColor"("B");

-- AddForeignKey
ALTER TABLE "_CollectionToColor" ADD CONSTRAINT "_CollectionToColor_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToColor" ADD CONSTRAINT "_CollectionToColor_B_fkey" FOREIGN KEY ("B") REFERENCES "Color"("hexadecimal") ON DELETE CASCADE ON UPDATE CASCADE;
