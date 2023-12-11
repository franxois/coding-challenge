import { Handler, Hono } from "hono";
import { ofetch } from "ofetch";
import { prisma } from "../utils/db.utils";

const syncProducts: Handler = async (c) => {
  // call to 3rd party service
  const updatedProducts = await ofetch("https://tidy-chicken-75.deno.dev");

  console.log(updatedProducts);

  const result = await prisma.product.updateMany({
    data: updatedProducts,
  });
  return c.json(result);
};

const router = new Hono();

router.post("/", syncProducts);

export { router };
