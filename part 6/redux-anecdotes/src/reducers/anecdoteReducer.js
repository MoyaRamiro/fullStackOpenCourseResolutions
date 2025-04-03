import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

/*
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const initialState = anecdotesAtStart.map(asObject);
*/

/*
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE_ANECDOTE":
      return state.map((anecdote) =>
        anecdote.id === action.payload.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );

    case "CREATE_ANECDOTE":
      return state.concat(action.payload);
  }

  return state;
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE_ANECDOTE",
    payload: { id },
  };
};

export const addAnecdote = (content) => {
  return {
    type: "CREATE_ANECDOTE",
    payload: asObject(content),
  };
};
*/

const anecdoteSlicer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setAnecdotes, appendAnecdote } = anecdoteSlicer.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    let anecdotes = await anecdotesService.getAll();
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)

    const updatedAnecdote = await anecdotesService.edit(id, anecdote.votes+1)

    anecdotes = anecdotes.map(anecdote => 
      anecdote.id === id ? {...anecdote, ...updatedAnecdote} : anecdote
    )

    dispatch(setAnecdotes(anecdotes))
  };
};

export default anecdoteSlicer.reducer;
