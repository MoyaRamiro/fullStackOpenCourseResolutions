import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Anecdotes = () => {

  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient();

  const updatedNoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    updatedNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({type: "ADD", payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(()=>{
        dispatch({type: "REM"})
    }, 5000)
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      {anecdotes.length === 0 ? (
        <div>No anecdotes available</div>
      ) : (
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Anecdotes