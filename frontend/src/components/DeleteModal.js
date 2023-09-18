/** @format */

function DeleteModal({ onClick, close, image, name, text }) {
  return (
    <div className="modal_container">
      <div className="modal_content">
        <div className="flex_div2">
          <h2>{text} ?</h2>
          <img
            src={image}
            alt=""
            className="h-[130px] w-[130px] rounded-full mb-2 object-contain border border-gray-400"
          />
          <p className="font-semibold">{name}</p>
        </div>
        <div className="row_div">
          <p className="close_btn" onClick={close}>
            CANCEL
          </p>
          <p className="delete_btn" onClick={onClick}>
            DELETE
          </p>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
