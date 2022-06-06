/** @format */
import React from "react";

function PrintModal({
  closePrint,
  name,
  image,
  email,
  phone,
  year,
  bussiness,
  bio,
  linkedin,
  facebook,
  status,
}) {
  return (
    <div className="print_modal_container">
      <img
        src="http://blackinnovationsafrica.com/wp-content/uploads/2020/02/logo.png"
        alt=""
        className="h-[120px] w-[120px] object-contain ml-[30px]"
      />
      <h3 className="ml-6 font-semibold mt-6">ENTREPRENEUR PROFILE</h3>
      <p className="print_close" onClick={closePrint}>
        X
      </p>
      <p className="print_close2" onClick={() => window.print()}>
        PRINT
      </p>
      <div className="print_modal_content p-5 ml-[30px] mr-[30px]">
        <img
          src={image}
          alt={`${name}`}
          className="w-[150px] h-[150px] rounded-full border border-gray-400 object-contain mb-4 ml-[640px]"
        />
        <div className="flex items-center my-6 mt-[30px]">
          <p className="font-semibold mr-6">Name:</p>
          <span className="border-b border-gray-500 w-[100%]">{name}</span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Email:</p>
          <span className="border-b border-gray-500 w-[100%]">{email}</span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-8">Phone:</p>
          <span className="border-b border-gray-500 w-[100%]">{phone}</span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-8">Year:</p>
          <span className="border-b border-gray-500 w-[100%]">{year}</span>
        </div>{" "}
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Linkedin:</p>
          <span className="border-b border-gray-500 w-[100%]">{linkedin}</span>
        </div>{" "}
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Facebook:</p>
          <span className="border-b border-gray-500 w-[100%]">{facebook}</span>
        </div>{" "}
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Status:</p>
          <span className="border-b border-gray-500 w-[100%]">{status}</span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Bussines:</p>
          <span className="border-b border-gray-500 w-[100%]">{bussiness}</span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Bio:</p>
          <span className="border-b border-gray-500 w-[100%]">{bio}</span>
        </div>
      </div>
    </div>
  );
}

export default PrintModal;
