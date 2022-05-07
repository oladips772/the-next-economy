/** @format */
import { deleteEntrepreneur } from "../Redux/Actions/EntrepreneurAction";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function DeleteModal({ onClick, close, image, name }) {

  return (
    <div className="modal_container">
      <div className="modal_content">
        <div className="flex_div2">
          <img
            src={image}
            alt=""
            className="h-[150px] w-[150px] rounded-full mb-2 object-contain border border-gray-400"
          />
          <p className="font-semibold">{name}</p>
        </div>
        <div className="row_div">
          <p className="close_btn" onClick={close}>CANCEL</p>
          <p className="delete_btn" onClick={onClick}>DELETE</p>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
