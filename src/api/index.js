// TIP: MAKE SURE to include "Content-Type" header with the value of "application/json"
// also don't forget that the body should contain JSON-formatted data

const BASE_URL = "http://localhost:3000";

export const todoAPI = {
  fetchAll: () => fetch(`${BASE_URL}/todos`).then((res) => res.json()),
  updateOne: async ({ id, todo }) => {
    // TODO: return a fetch call to an appropriate API route to update todo
    // URL: /todos/{id} -- the id here is the id value of the todo item to be updated
    // HINT: to update an existing record you need to use PATCH method
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };
    const res = await fetch(`${BASE_URL}/todos/${id}`, options);
    return await res.json();
  },
  createOne: async (todo) => {
    // TODO: return a fetch call to an appropriate API route to create todo
    // URL: /todos
    // HINT: to create a new todo item is to use POST method
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };
    const res = await fetch(`${BASE_URL}/todos`, options);
    return await res.json();
  },
  deleteOne: async (id) => {
    // TODO: return a fetch call to an appropriate API route to delete todo
    // URL: /todos/{id} -- the id here is the id value of the todo item to be deleted
    // HINT: to delete a todo item use DELETE method
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${BASE_URL}/todos/${id}`, options);
    return await res.json();
  },
};
