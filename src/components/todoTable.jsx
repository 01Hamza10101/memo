"use client";
import React from "react";

const TodoCalendarTable = ({ todos }) => {
  const today = new Date().toISOString().split("T")[0];

  const filteredTodos = todos.filter((todo) => {
    const [day, month, year] = todo.date.split("/");
    const todoDateFormatted = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    return todoDateFormatted < today;
  });

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-auto border-collapse border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-3 py-2 text-[10px] sm:text-xs text-gray-300">Date</th>
            <th className="px-3 py-2 text-[10px] sm:text-xs text-gray-300">Title</th>
            <th className="px-3 py-2 text-[10px] sm:text-xs text-gray-300">Completed</th>
            <th className="px-3 py-2 text-[10px] sm:text-xs text-gray-300">Cancelled</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.length > 0 ? (
            filteredTodos
              .sort((a, b) => {
                const [dayA, monthA, yearA] = a.date.split("/");
                const [dayB, monthB, yearB] = b.date.split("/");
                const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
                const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
                return dateA - dateB;
              })
              .map((todo) => (
                <tr key={todo.id} className="text-center">
                  <td className="bg-gray-900 border border-gray-700 px-2 py-2 text-[12px] sm:text-sm">{todo.date}</td>
                  <td className="bg-gray-900 border border-gray-700 px-2 py-2 text-[12px] sm:text-sm">{todo.title}</td>
                  <td className="bg-gray-900 border border-gray-700 px-2 py-2 text-[12px] sm:text-sm">
                    {todo.completed.length > 0 ? (
                      <span className="text-green-500 font-semibold">Yes ({todo.completed.length})</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </td>
                  <td className="bg-gray-900 border border-gray-700 px-2 py-2 text-[12px] sm:text-sm">
                    {todo.Cancel > 0 ? (
                      <span className="text-yellow-400 font-semibold">Yes</span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="4" className="bg-gray-900 px-4 py-4 text-center text-gray-500">
                No past tasks.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoCalendarTable;
