import { Handler, Hono } from "hono";
import { prisma } from "../utils/db.utils";

const router = new Hono();

/**
 * Return lots of customers, in production, should paginate results
 */
const getCustomers: Handler = async (c) => {
  const customers = await prisma.customer.findMany({
    //    take: size
    //    skip: offset
  });
  return c.json(customers);
};

const getCustomerPurchaseHistory: Handler = (c) => {
  const id = c.req.param("id");
  const customer = prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      purchases: true,
    },
  });

  return c.json(customer);
};

router.get("/", getCustomers);
router.get("/:id/purchases", getCustomerPurchaseHistory);

export { router };
