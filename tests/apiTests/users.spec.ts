import { expect, test } from "@playwright/test";

test("Get all users", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody["page"]).toBe(2);
  expect(responseBody["per_page"]).toBe(6);
  expect(responseBody["total"]).toBe(12);
  expect(responseBody["total_pages"]).toBe(2);

  expect(responseBody["data"]).toContainEqual(
    expect.objectContaining({
      id: 7,
      email: "michael.lawson@reqres.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    })
  );
});

test("Get single user", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody["data"]).toEqual(
    expect.objectContaining({
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    })
  );
});

test("Single user not found", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/23");
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(404);

  const responseBody = await response.json();

  if (Object.keys(responseBody).length !== 0) {
    expect(responseBody["data"]).toEqual({});
  }
});

test("List <resourse>", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/unknown");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody["page"]).toBe(1);
  expect(responseBody["per_page"]).toBe(6);
  expect(responseBody["total"]).toBe(12);
  expect(responseBody["total_pages"]).toBe(2);

  expect(responseBody["data"]).toContainEqual(
    expect.objectContaining({
      id: 1,
      name: "cerulean",
      year: 2000,
      color: "#98B2D1",
      pantone_value: "15-4020",
    })
  );
});

test("Single <resourse>", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/unknown/2");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody["data"]).toEqual(
    expect.objectContaining({
      id: 2,
      name: "fuchsia rose",
      year: 2001,
      color: "#C74375",
      pantone_value: "17-2031",
    })
  );
});

test("Single <resourse> not found", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/unknown/23");
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(404);

  const responseBody = await response.json();

  if (Object.keys(responseBody).length !== 0) {
    expect(responseBody["data"]).toEqual({});
  }
});

test("Create new user", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users", {
    data: {
      name: "morpheus",
      job: "leader",
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("name", "morpheus");
  expect(responseBody).toHaveProperty("job", "leader");
  expect(responseBody["id"]).toBeDefined;
  expect(responseBody["createdAt"]).toBeDefined;
});

test("Update user information with PUT request", async ({ request }) => {
  const response = await request.put("https://reqres.in/api/users/2", {
    data: {
      name: "morpheus",
      job: "zion resident",
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("name", "morpheus");
  expect(responseBody).toHaveProperty("job", "zion resident");
  expect(responseBody["createdAt"]).toBeDefined;
});

test("Update user information with PATCH request", async ({ request }) => {
  const response = await request.patch("https://reqres.in/api/users/2", {
    data: {
      name: "testname",
      job: "zion resident",
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("name", "testname");
  expect(responseBody).toHaveProperty("job", "zion resident");
  expect(responseBody["createdAt"]).toBeDefined;
});

test("Delete user", async ({ request }) => {
  const response = await request.delete("https://reqres.in/api/users/2");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(204);
});

test("Register - successful", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/register", {
    data: {
      email: "eve.holt@reqres.in",
      password: "pistol",
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("id", 4);
  expect(responseBody).toHaveProperty("token", "QpwL5tke4Pnpja7X4");
});

test("Register - unsuccessful", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/register", {
    data: {
      email: "sydney@fife",
    },
  });
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(400);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("error", "Missing password");
});

test("Login - successful", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/login", {
    data: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("token", "QpwL5tke4Pnpja7X4");
});

test("Login - unsuccessful", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/login", {
    data: {
      email: "peter@klaven",
    },
  });
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(400);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("error", "Missing password");
});

test("Delayed response", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?delay=3");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody["page"]).toBe(1);
  expect(responseBody["per_page"]).toBe(6);
  expect(responseBody["total"]).toBe(12);
  expect(responseBody["total_pages"]).toBe(2);

  expect(responseBody["data"]).toContainEqual(
    expect.objectContaining({
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    })
  );
});
