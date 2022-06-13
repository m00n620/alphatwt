-- CreateTable
CREATE TABLE "AlphaTwt" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "signer" TEXT NOT NULL,
    "lock" TEXT NOT NULL,
    "network" INTEGER NOT NULL,

    CONSTRAINT "AlphaTwt_pkey" PRIMARY KEY ("id")
);
