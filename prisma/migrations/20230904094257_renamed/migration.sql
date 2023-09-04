/*
  Warnings:

  - The values [PENDING,SHIPPED,DELIVERED] on the enum `ORDER_STATUS_ENUM` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN,CUSTOMER] on the enum `USER_ROLE_ENUM` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `constactNo` on the `users` table. All the data in the column will be lost.
  - Added the required column `contactNo` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ORDER_STATUS_ENUM_new" AS ENUM ('pending', 'shipped', 'delivered');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "ORDER_STATUS_ENUM_new" USING ("status"::text::"ORDER_STATUS_ENUM_new");
ALTER TYPE "ORDER_STATUS_ENUM" RENAME TO "ORDER_STATUS_ENUM_old";
ALTER TYPE "ORDER_STATUS_ENUM_new" RENAME TO "ORDER_STATUS_ENUM";
DROP TYPE "ORDER_STATUS_ENUM_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "USER_ROLE_ENUM_new" AS ENUM ('admin', 'customer');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "USER_ROLE_ENUM_new" USING ("role"::text::"USER_ROLE_ENUM_new");
ALTER TYPE "USER_ROLE_ENUM" RENAME TO "USER_ROLE_ENUM_old";
ALTER TYPE "USER_ROLE_ENUM_new" RENAME TO "USER_ROLE_ENUM";
DROP TYPE "USER_ROLE_ENUM_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "constactNo",
ADD COLUMN     "contactNo" TEXT NOT NULL;
