/** @format */
import React from "react";

function PrintModal({
  closePrint,
  name,
  image,
  email,
  phone,
  cohort,
  remarks,
  linkedin,
  facebook,
  status,
  balance,
}) {
  return (
    <div className="print_modal_container">
      <img
        src="http://blackinnovationsafrica.com/wp-content/uploads/2020/02/logo.png"
        alt=""
        className="h-[120px] w-[120px] object-contain ml-[30px]"
      />
      <h3 className="ml-6 font-semibold mt-6">DEVELOPER PROFILE</h3>
      <p className="print_close" onClick={closePrint}>
        X
      </p>
      <p className="print_close2" onClick={() => window.print()}>
        PRINT
      </p>
      <div className="print_modal_content p-5 ml-[30px] mr-[30px]">
        <img
          src={image}
          alt={name}
          className="w-[150px] h-[150px] rounded-full border border-gray-400 object-contain mb-4 ml-[560px]"
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
        {balance && (
          <div className="flex items-center my-6">
            <p className="font-semibold mr-6">Balance:</p>
            <span className="border-b border-gray-500 w-[100%]">
              NGN {balance},000
            </span>
          </div>
        )}
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Cohort:</p>
          <span className="border-b border-gray-500 w-[100%]">{cohort}</span>
        </div>
        <div className="flex items-center my-6">
          <p className="font-semibold mr-6">Remarks:</p>
          <span className="border-b border-gray-500 w-[100%]">{remarks}</span>
        </div>
      </div>
    </div>
  );
}

export default PrintModal;
