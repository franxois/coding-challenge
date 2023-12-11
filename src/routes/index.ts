import { Hono } from "hono";

import { router as productsRouter } from "./products.route";
import { router as customersRouter } from "./customers.route";
import { router as purchasesRouter } from "./purchases/index";
import { router as syncRouter } from "./sync.route";

const router = new Hono();

router.route("/products", productsRouter);
router.route("/customers", customersRouter);
router.route("/purchases", purchasesRouter);
router.route("/sync", syncRouter);

export { router };
