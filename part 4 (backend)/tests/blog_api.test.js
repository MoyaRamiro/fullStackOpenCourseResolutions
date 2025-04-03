const app = require("../app");
const Blog = require("../models/blog");
const helper = require("../utils/list_helper");
const supertest = require("supertest");
const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let newBlog = new Blog(blog);
    await newBlog.save();
  }
});

describe("api tests", () => {
  test.skip("get method", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, 2);
  });

  test.skip("of the property _id as id", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const allHaveId = response.body.every((blog) => "id" in blog);
    assert.ok(allHaveId);
  });

  test.skip("post method", async () => {
    const newBlog = {
      title: "ciloe",
      author: "charles chaplin",
      url: "asad",
      likes: 5,
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const updatedBlogs = await helper.blogsInDb();

    assert.strictEqual(updatedBlogs.length, helper.initialBlogs.length + 1);

    assert.strictEqual(response.body.title, newBlog.title);
    assert.strictEqual(response.body.author, newBlog.author);
    assert.strictEqual(response.body.url, newBlog.url);
    assert.strictEqual(response.body.likes, newBlog.likes);
  });

  test.skip("likes default 0", async () => {
    const newBlog = {
      title: "ciloe",
      author: "charles chaplin",
      url: "asad",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test.skip("of title or url are missing, 400 bad request", async () => {
    const invalidBlog = {
      author: "charles chaplin",
      likes: 5,
    };

    const response = await api
      .post("/api/blogs")
      .send(invalidBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.status, 400);
  });

  test.skip("delete method", async () => {
    const blogs = await helper.blogsInDb();

    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    const titlesAfterDelete = blogsAfterDelete.map((b) => b.title);
    assert.ok(!titlesAfterDelete.includes(blogToDelete.title))

    assert.strictEqual(blogsAfterDelete.length, helper.initialBlogs.length - 1);
  });

  test.skip("put method", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];

    const newBlog = {
      title: "gsdfgewr",
      author: "5555",
      url: "asad",
      likes: 5,
    };


    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(204)

    const blogsAfterUpdate = await helper.blogsInDb()

    assert.notDeepStrictEqual(blogsAfterUpdate[0], blogToUpdate)
  })

  test.skip("update likes of a blog correctly", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];

    const newBlog = {
      title: "gsdfgewr",
      author: "5555",
      url: "asad",
      likes: 70,
    };


    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(204)

    const blogsAfterUpdate = await helper.blogsInDb()

    assert.notStrictEqual(blogsAfterUpdate[0].likes, blogs[0].likes)
  })
  
});
