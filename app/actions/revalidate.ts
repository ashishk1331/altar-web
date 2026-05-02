"use server";

import { revalidatePath } from "next/cache";
import type { Id } from "@/convex/_generated/dataModel";

export async function revalidatePoem(poemId: Id<"poems">) {
	revalidatePath(`/poem/${poemId}`);
}

export async function revalidateAuthor(authorId: Id<"users">) {
	revalidatePath(`/author/${authorId}`);
}
