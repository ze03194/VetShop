import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage, selectMessage} from "../../../features/message/messageSlice";

const MessageModal = () => {

    const dispatch = useDispatch();
    const message = useSelector(selectMessage)

    function handleClick() {
        dispatch(clearMessage())
    }

    return (
        <div className="modal fade" id="message-modal" data-bs-backdrop="false" data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="staticBackdropLabel">{message.title}</h5>
                    </div>
                    <span className="text-center fs-5">{message.body}</span>
                    <div className="modal-footer">
                        <button id="confirm-btn" type="button"
                                className="btn btn-dark"
                                data-bs-dismiss="modal"
                                onClick={handleClick}>Confirm
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default MessageModal