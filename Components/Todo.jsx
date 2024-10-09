import React from "react";

const Todo = ({ data, index, deleteTodo, mongoID, updateTodo }) => {
  return (
    <>
      <tr className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
          {index}
        </th>
        <td className={`px-6 py-4 ${data.isCompleted ? "line-through" : ""}`}>
          {data.title}
        </td>
        <td className={`px-6 py-4 ${data.isCompleted ? "line-through" : ""}`}>
          {data.description}
        </td>
        <td className="px-6 py-4">
          {data.isCompleted ? "Completed" : "Pending"}
        </td>
        <td className="px-6 py-4 flex gap-1">
          <button
            onClick={() => deleteTodo(mongoID)}
            className="px-4 py-1 text-[15px] bg-red-600 text-white rounded-sm  hover:bg-red-700 transition-all"
          >
            Delete
          </button>
          {data.isCompleted ? (
            ""
          ) : (
            <button
              onClick={() => updateTodo(mongoID)}
              className="px-4 py-1 text-[15px] bg-green-600 text-white rounded-sm  transition-all hover:bg-green-700 "
            >
              Done
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default Todo;
