"use server";

import { categorySchema } from "@/entities/category/category";
import { createCategoryUseCase } from "@/entities/category/category.server";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { z } from "zod";

const propsSchema = z.object({
  data: categorySchema,
});

export const createCategoryAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  await createCategoryUseCase.exec({
    session,
    data,
  });
};
