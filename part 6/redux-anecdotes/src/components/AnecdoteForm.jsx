import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addAnecdote } from "../reducers/anecdoteReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content))
    dispatch(setNotification(`You've created an anecdote!`, 10))
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
      <br/>
    </>
  );
};

export default AnecdoteForm;
