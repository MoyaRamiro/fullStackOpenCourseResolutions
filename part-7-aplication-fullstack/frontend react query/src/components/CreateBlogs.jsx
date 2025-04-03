import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createNewBlog } from "../services/blogs";
import PropTypes from "prop-types";

const CreateBlogs = ({ notificationDispatch }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: createNewBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      notificationDispatch({
        type: "ADD",
        payload: {
          msg: `${error.response?.data?.error} ERROR TO CREATE`,
          color: "red",
        },
      });

      setTimeout(
        () => {
          notificationDispatch({
            type: "REM",
          });
        },

        3000
      );
    },
  });

  const handleCreate = (event) => {
    event.preventDefault();

    newBlogMutation.mutate({ title: title, author: author, url: url });

    notificationDispatch({
      type: "ADD",
      payload: {
        msg: `a new blog ${title} by ${author} added`,
        color: "green",
      },
    });

    setTimeout(
      () => {
        notificationDispatch({ type: "REM" });
      },

      3000
    );

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            data-testid="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

CreateBlogs.propTypes = {
  notificationDispatch: PropTypes.func.isRequired,
};

export default CreateBlogs;
