import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';

export default function ChangePasswordModal(props) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [showError, setShowError] = useState(false);

    const onSetShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    }

    const onSetShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }

    const onSetShowConfirmNewPassword = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    }

    const onChangeCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    }

    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const onChangeConfirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value);
    }

    const onNewPasswordBlur = () => {

    }

    const onConfirmNewPasswordBlur = () => {
        if(confirmNewPassword != newPassword) {
            setShowError(true);
        }else{
            setShowError(false);
        }
    }

    return (
        <div>
            <Modal show={props.isShow} onHide={props.hideModal} className={"changePasswordModal " + (!props.isDay ? "NightModal" : "")}>
                <div className="modal_header ">
                    <div className="title">
                        Change Password
                    </div>
                    <div className="close">
                        <i className="fas fa-times" onClick={props.hideModal}></i>
                    </div>
                </div>
                <div className="modal_content">
                    <div className="inputGroup">
                        <div className="inputLabel">Enter Current Password</div>
                        <div className="input">
                            <input type={showCurrentPassword ? "text" : "password"} placeholder="Current Password" value = {currentPassword} onChange = {onChangeCurrentPassword}/>
                            <img src="./image/setting/eye.svg" onClick = {onSetShowCurrentPassword}/>
                        </div>
                    </div>
                    <div className="inputGroup">
                        <div className="inputLabel">Enter New Password</div>
                        <div className="input">
                            <input type={showNewPassword ? "text" : "password"} placeholder="At least 8 characters" value = {newPassword} onBlur = {onNewPasswordBlur} onChange = {onChangeNewPassword}/>
                            <img src="./image/setting/eye.svg" onClick = {onSetShowNewPassword}/>
                        </div>
                        
                    </div>
                    <div className="inputGroup">
                        <div className="inputLabel">Confirm New Password</div>
                        <div className="input">
                            <input type={showConfirmNewPassword ? "text" : "password"} placeholder="At least 8 characters" value = {confirmNewPassword} onBlur = {onConfirmNewPasswordBlur} onChange = {onChangeConfirmNewPassword}/>
                            <img src="./image/setting/eye.svg" onClick = {onSetShowConfirmNewPassword}/>
                        </div>
                        {showError ? <div className="errText">Password must be same.</div> : ""}
                    </div>
                    <div className="confirmBtn" onClick={props.hideModal}>Confirm</div>
                </div>
            </Modal>
        </div>
    );
}