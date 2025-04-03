const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");

    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Carlos Tevez",
        username: "carlos",
        password: "tevez",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "carlos", "tevez");
      const msgCartel = await page.locator(".msgCartel");
      await expect(msgCartel).toContainText("loggin in with Carlos Tevez");
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "juan", "monzon");
      await expect(page.getByText("wrong username or password")).toBeVisible({
        timeout: 5000,
      });
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "carlos", "tevez");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "Pedro", "Pedro Juan", "www.pedro.com");
      await expect(page.getByText("Pedro")).toBeVisible();
    });

    test("a blog can be edited", async ({ page }) => {
      await createBlog(page, "Pedro", "Pedro Juan", "www.pedro.com");
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByText("likes 0")).toBeVisible();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      await createBlog(page, "Pedro", "Pedro Juan", "www.pedro.com");
      await page.getByRole("button", { name: "view" }).click();
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();
      const blogLocator = page.locator(".blog");
      await expect(blogLocator).toHaveCount(0);
    });

    test("only the creator can see the delete button for a blog", async ({
      page,
      request,
    }) => {
      await createBlog(page, "Pedro", "Pedro Juan", "www.pedro.com");
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();
      await page.getByRole("button", { name: "logout" }).click();

      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Lionel Messi",
          username: "lionel",
          password: "messi",
        },
      });

      await loginWith(page, "lionel", "messi");
      await page.getByRole("button", { name: "view" }).click();
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });

    test("blogs sorted by likes", async ({ page }) => {
      await createBlog(page, "Second Blog", "CARLOS", "www.CARLOS.com");
      await createBlog(page, "First Blog", "CARLOS", "www.CARLOS.com");

      const firstBlog = await page.getByText("First Blog");
      const secondBlog = await page.getByText("Second Blog");

      await firstBlog.getByRole("button", { name: "view" }).click();

      for (let i = 0; i < 3; i++) {
        await page.getByRole("button", { name: "like" }).click();
      }

      await firstBlog.getByRole("button", { name: "hide" }).click();

      await secondBlog.getByRole("button", { name: "view" }).click();

      await page.getByRole("button", { name: "like" }).click();

      await secondBlog.getByRole("button", { name: "hide" }).click();

      await createBlog(page, "Blog to reload page and last blog", "CARLOS", "www.CARLOS.com");

      await page.waitForFunction(
        () => document.querySelectorAll(".blogs > div").length === 3,
        { timeout: 5000 } 
      );

      const blogs = await page.locator(".blogs > div")

      const blogsArray = await blogs.allTextContents();

      expect(blogsArray.length).toBe(3);

      expect(blogsArray[0]).toContain("First Blog");
      expect(blogsArray[1]).toContain("Second Blog");
      expect(blogsArray[2]).toContain("Blog to reload page and last blog");

      console.log(blogsArray[0])
      console.log(blogsArray[1])
      console.log(blogsArray[2])

    });
  });
});
