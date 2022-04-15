/** @format */
import React from "react";

function Login() {
  return (
    <div className="bg-black h-[100vh] flex justify-center items-center">
      <div className="">
        <div className="flex flex-col">
          <img
            src="http://blackinnovationsafrica.com/wp-content/uploads/2020/02/logo.png"
            className="object-contain -mt-[200px] h-[55px] mb-4"
            alt=""
          />
          <input
            type="text"
            placeholder="Email"
            className="border-green-300 border-[1px] outline-none p-2 w-[400px] my-2 rounded bg-transparent text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-green-300 border-[1px] outline-none p-2 w-full my-2 rounded bg-transparent text-white"
          />
          <button className="text-white bg-green-600 p-2 rounded text-sm font-bold mt-4">LOGIN</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
