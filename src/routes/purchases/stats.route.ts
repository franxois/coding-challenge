import { Handler, Hono } from "hono";
import { prisma } from "../../utils/db.utils";
import dayjs from "dayjs";

const router = new Hono();

const getProductsPurchasedBetween: Handler = async (c) => {
  const from = c.req.query("from");
  const to = c.req.query("to");

  const fromDate = dayjs(from, "DD-MM-YYYY").toDate();
  const toDate = dayjs(to, "DD-MM-YYYY").toDate();

  console.log(fromDate, toDate);

  const purchasesIn = await prisma.purchase.findMany({
    where: {
      purchasedAt: {
        gte: fromDate,
        lte: toDate,
      },
    },
    orderBy: [{ purchasedAt: "asc" }],
  });
  return c.json(purchasesIn);
};

const getCustomersWithNoPurchasesInPastYear: Handler = async (c) => {
  const customersWithNoPurchasesInPastYear = await prisma.$queryRaw`
    SELECT
        *
    FROM
        Customer
    WHERE
        id NOT in(
            SELECT
                customerId FROM Purchase
            WHERE
                purchasedAt < datetime ('now', '-1 year'))
    `;

  return c.json(customersWithNoPurchasesInPastYear);
};

router.get("/products", getProductsPurchasedBetween);
router.get("/customers", getCustomersWithNoPurchasesInPastYear);

export { router };
