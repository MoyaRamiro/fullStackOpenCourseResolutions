import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      dispatch({
        type: "ADD",
        payload: error.response?.data?.error || "An error occurred",
      });
      setTimeout(() => {
        dispatch({ type: "REM" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });

    if (content.length < 5) {
      dispatch({
        type: "ADD",
        payload: "too short anecdote, must have length 5 or more",
      });
      setTimeout(() => {
        dispatch({ type: "REM" });
      }, 5000);
    } else {
      dispatch({ type: "ADD", payload: "A new anecdote added" });
      setTimeout(() => {
        dispatch({ type: "REM" });
      }, 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
