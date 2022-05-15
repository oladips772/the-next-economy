/** @format */
import React from "react";

function PrintModal({ closePrint }) {
  return (
    <div className="print_modal_container">
      <p className="print_close" onClick={closePrint}>
        X
      </p>
      <p className="print_close2" onClick={() => window.print()}>
        PRINT
      </p>
      <div className="print_modal_content p-5 ml-[30px] mr-[30px]">
        <img
          src="http://res.cloudinary.com/dsbhrtd0o/image/upload/v1652046114/uploads/njshs0qezq7wib25csj2.jpg"
          className="w-[150px] h-[150px] rounded-full border border-gray-400 object-contain mb-4 ml-[560px]"
        />
        <div className="flex items-center my-6 mt-[30px]">
          <p className="font-semibold mr-6">Name:</p>
          <span className="border-b border-gray-500 w-[100%]">kola hammed</span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Email:</p>
          <span className="border-b border-gray-500 w-[100%]">
            kola@gmail.com
          </span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-8">Phone:</p>
          <span className="border-b border-gray-500 w-[100%]">09038580066</span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-8">Year:</p>
          <span className="border-b border-gray-500 w-[100%]">2022</span>
        </div>{" "}
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Linkedin:</p>
          <span className="border-b border-gray-500 w-[100%]">
            kola_linkedin
          </span>
        </div>{" "}
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Facebook:</p>
          <span className="border-b border-gray-500 w-[100%]">
            kola_facebook
          </span>
        </div>{" "}
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Status:</p>
          <span className="border-b border-gray-500 w-[100%]">
            Not Registered
          </span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Bussines:</p>
          <span className="border-b border-gray-500 w-[100%]">Legal Tech</span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Bio:</p>
          <span className="border-b border-gray-500 w-[100%]">
            hammed hammed
          </span>
        </div>
      </div>
    </div>
  );
}

export default PrintModal;
