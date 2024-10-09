"use client";
import Todo from "@/Components/Todo";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    console.log(formData);
  };

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api");
      setTodoData(response.data.todos);
      // console.log(response.data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete("/api", {
      params: { mongoID: id },
    });
    toast.success(response.data.message);

    fetchTodos();
  };

  const updateTodo = async (id) => {
    const response = await axios.put(
      "/api",
      {},
      {
        params: {
          mongoID: id,
        },
      }
    );
    toast.success(response.data.message);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API CODE
      const response = await axios.post("/api", formData);
      toast.success(response.data.message);
      setFormData({ title: "", description: "" });
      await fetchTodos();
    } catch (error) {
      toast.error("Failed to Add!");
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form className="flex flex-col items-start gap-2 w-[80%] max-w-[600px] mt-12 px-2 mx-auto">
        <input
          value={formData.title}
          onChange={handleChangeInput}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 w-full border-2"
        />
        <textarea
          value={formData.description}
          onChange={handleChangeInput}
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
        ></textarea>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-orange-600 text-white px-8 py-2 rounded-sm"
        >
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-3 flex mx-auto justify-center mb-5">
        <table className="w-[800px] items-center text-sm text-left rtl:text-right border-2">
          <thead className="text-[14px] uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  mongoID={item._id}
                  key={index}
                  data={item}
                  index={index + 1}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default page;
