import { Handler, Hono } from "hono";
import { prisma } from "../../utils/db.utils";
import { CustomerPurchaseProduct } from "../../types";

import { router as statsRouter } from "./stats.route";

const router = new Hono();

const purchaseProduct: Handler = async (c) => {
  const body = (await c.req.json()) as CustomerPurchaseProduct;

  const purchased = await prisma.purchase.create({
    data: {
      productId: body.productId,
      customerId: body.customerId,
    },
  });
  return c.json(purchased);
};

router.post("/", purchaseProduct);
router.route("/stats", statsRouter);

export { router };
