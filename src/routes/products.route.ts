import { Handler, Hono } from "hono";
import { prisma } from "../utils/db.utils";

const router = new Hono();

const getProducts: Handler = async (c) => {
  const products = await prisma.product.findMany();
  return c.json(products);
};

const getProductById: Handler = async (c) => {
  const id = c.req.param("id");

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) return c.json({ error: "Product not found" }, 404);

  return c.json(product);
};

const getProductPurchaseHistory: Handler = (c) => {
  const id = c.req.param("id");
  const product = prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      // @ts-ignore
      purchase: true,
    },
  });

  return c.json(product);
};

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/:id/purchases", getProductPurchaseHistory);

export { router };
