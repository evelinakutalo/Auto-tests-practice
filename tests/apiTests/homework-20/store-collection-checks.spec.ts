import { test, expect } from "@playwright/test";

test("Returns pet inventory by status", async ({ request }) => {
  const response = await request.get(
    `https://petstore.swagger.io/v2/store/inventory`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  expect(response.status()).toBe(200);
});

test("Place an order for a pet", async ({ request }) => {
  const data = {
    id: 0,
    petId: 0,
    quantity: 0,
    shipDate: "2024-04-07T21:15:27.838Z",
    status: "placed",
    complete: true,
  };

  const response = await request.post(
    `https://petstore.swagger.io/v2/store/order`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    }
  );

  expect(response.status()).toBe(200);
});

test("Find purchase order by ID", async ({ request }) => {
  const response = await request.get(
    `https://petstore.swagger.io/v2/store/order/9`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  expect(response.status()).toBe(200);
});

test("Delete purchase order by ID", async ({ request }) => {
  const response = await request.delete(
    `https://petstore.swagger.io/v2/store/order/9`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  expect(response.status()).toBe(200);
});
