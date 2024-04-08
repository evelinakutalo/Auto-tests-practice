import { test, expect } from "@playwright/test";
import path from "path";

test("Check image uploaded successfully", async ({ request }) => {
  const file = path.resolve("./dog-image.jpeg");
  
  const response = await request.post(
    `https://petstore.swagger.io/v2/pet/1/uploadImage`,
    {
      headers: {
        accept: "application/json",
      },
      multipart: {
        'file': {
          'name': 'file',
          'file': file,
        },
      },
    }
  );
  
  expect(response.status()).toBe(200);
});

test("Check new pet created", async ({ request }) => {
  const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: 5,
      category: {
        id: 1,
        name: "doggy",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    },
  });
  expect(response.status()).toBe(200);
});

test("check pet updated", async ({ request }) => {
  const response = await request.put(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: 5,
      category: {
        id: 1,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    },
  });
  expect(response.status()).toBe(200);
});

test("check I can find pet by status", async ({ request }) => {
  const response = await request.get(
    `https://petstore.swagger.io/v2/pet/findByStatus?status=available`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  expect(response.status()).toBe(200);
});

test("get pet by ID", async ({ request }) => {
  const response = await request.get(`https://petstore.swagger.io/v2/pet/1`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  expect(response.status()).toBe(200);
});

test("Update pet with form data", async ({ request }) => {
  const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: 1,
      name: "Lucky",
      status: "available",
    },
  });
  expect(response.status()).toBe(200);
});

test("check pet can be deleted", async ({ request }) => {
  const response = await request.delete(
    `https://petstore.swagger.io/v2/pet/5`,
    {
      headers: {
        accept: "application/json",
        api_key: "123",
      },
    }
  );
  expect(response.status()).toBe(200);
});
