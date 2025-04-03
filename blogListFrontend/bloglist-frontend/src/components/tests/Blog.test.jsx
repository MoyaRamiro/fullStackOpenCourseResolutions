import { render, screen } from "@testing-library/react";
import Blog from "../Blog";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";
import blogsService from "../../services/blogs";
import CreateBlogs from "../CreateBlogs";

describe("<Blog />", () => {
  const blog = {
    author: "Maradona",
    id: 3,
    likes: 5,
    title: "La mano de Dios",
    url: "marado.com",
    user: {
      id: 1,
      name: "carlos guevara",
      username: "carlos",
    },
  };

  let container;

  beforeEach(() => {
    container = render(
      <Blog blog={blog}/>
    ).container;
  });

  test("blog cant display url by default", () => {
    const element = screen.getByText("La mano de Dios Maradona");
    expect(element).toBeDefined();

    const secondElement = screen.queryByText("marado.com");
    expect(secondElement).toBeNull();
  });

  test("blog can display the url when the button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);


    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  });

  test("The like button has been clicked twice", async () => {
    const user = userEvent.setup();
    const mockUpdate = vi.fn();
    blogsService.update = mockUpdate;

    const buttonView = screen.getByText("view");
    await user.click(buttonView);

    const buttonLike = screen.getByText("like");
    await user.click(buttonLike);
    await user.click(buttonLike);

    expect(mockUpdate).toHaveBeenCalledTimes(2);
  });

  test("CreateBlogs updates parent state and calls onSubmit", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<CreateBlogs createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await user.type(inputs[0], 'La mano de Dios')
    await user.type(inputs[1], 'Maradona')
    await user.type(inputs[2], 'marado.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('La mano de Dios')
    expect(createBlog.mock.calls[0][0].author).toBe('Maradona')
    expect(createBlog.mock.calls[0][0].url).toBe('marado.com')
  })
});
