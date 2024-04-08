import { test, expect } from "@playwright/test";

test("Create list of users with given input array (list)", async ({
  request,
}) => {
  const data = [
    {
      id: 1,
      username: "doggy",
      firstName: "string",
      lastName: "string",
      email: "string",
      password: "string",
      phone: "string",
      userStatus: 0,
    },
  ];

  const response = await request.post(
    `https://petstore.swagger.io/v2/user/createWithList`,
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

test("Get user by user name", async ({ request }) => {
  const response = await request.get(
    `https://petstore.swagger.io/v2/user/string`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  expect(response.status()).toBe(200);
});

test("Updated user", async ({ request }) => {
  const data = {
    id: 0,
    username: "string",
    firstName: "string",
    lastName: "string",
    email: "string",
    password: "string",
    phone: "string",
    userStatus: 0,
  };

  const response = await request.put(
    `https://petstore.swagger.io/v2/user/string`,
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

test("Delete user", async ({ request }) => {
  const response = await request.delete(
    `https://petstore.swagger.io/v2/user/string`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  expect(response.status()).toBe(200);
});

test("Log user into the system", async ({ request }) => {
  const response = await request.get(
    `https://petstore.swagger.io/v2/user/login?username=string&password=string`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  expect(response.status()).toBe(200);
});

test("Logs out current user out of the system", async ({ request }) => {
  const response = await request.get(
    `https://petstore.swagger.io/v2/user/logout?username=string&password=string`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  expect(response.status()).toBe(200);
});

test("Create list of users with given input array", async ({ request }) => {
  const data = [
    {
      id: 1,
      username: "doggy",
      firstName: "string",
      lastName: "string",
      email: "string",
      password: "string",
      phone: "string",
      userStatus: 0,
    },
  ];

  const response = await request.post(
    `https://petstore.swagger.io/v2/user/createWithArray`,
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

test("Create new user", async ({ request }) => {
    const data = 
      {
        id: 1,
        username: "doggy",
        firstName: "string",
        lastName: "string",
        email: "string",
        password: "string",
        phone: "string",
        userStatus: 0,
      };
  
    const response = await request.post(
      `https://petstore.swagger.io/v2/user`,
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
