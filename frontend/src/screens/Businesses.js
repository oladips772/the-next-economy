/** @format */
import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Businesses() {
  const loading = false;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [whatsAppChannel, setWhatsAppChannel] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");

  return (
    <div>
      <Sidebar />
      <div></div>
    </div>
  );
}

export default Businesses;
