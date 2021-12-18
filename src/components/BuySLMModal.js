import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';
import SendConfirmModal from './SendConfirmModal';

export default function BuySLMModal(props) {
    const [ethSelected, setEthSelected] = useState(true);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [showConfirmSendModal, setShowConfirmSendModal] = useState(false)

    const onEthSelect = () => {
        setEthSelected(true);
    }

    const onBNBSelect = () => {
        setEthSelected(false);
    }

    const isFloat = (n) => {
        return Number(n) == n && n % 1 != 0;
    }

    const isInt = (n) => {
        return Number(n) == n && n % 1 == 0;
    }

    const onChangeTokenAmount = (e) => {
        console.log(Number(e.target.value) === e.target.value) ;
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || isFloat(e.target.value) || isInt(e.target.value)) {
            setTokenAmount(e.target.value)
        }
    }

    const onSetShowConfirmModal = () => {
        setShowConfirmSendModal(!showConfirmSendModal)
    }

    return (
        <div>
            <Modal show={props.isShow} onHide={props.hideModal} className={"buyModal " + (!props.isDay ? "NightModal" : "")}>
                <div className="modal_header ">
                    <div className="title">
                        Buy $SLM Token
                    </div>
                    <div className="close">
                        <i className="fas fa-times" onClick={props.hideModal}></i>
                    </div>
                </div>
                <div className="modal_content">
                    <div className="warning">
                        <img src="./image/danger.svg" />
                        <div className="warning_text">Processing the transaction will take up to 5~10 minutes. Please wait until $SLM is adding on your balance after you make transaction.</div>
                    </div>

                    <div className="buyTokenBtn">
                        <div className={"ethBtn " + (ethSelected ? "active" : "")} onClick={onEthSelect}>ETH</div>
                        <div className={"bnbBtn " + (!ethSelected ? "active" : "")} onClick={onBNBSelect}>BNB</div>
                    </div>

                    <div className="wallet_info">
                        <img src="./image/empty-wallet.svg" />
                        <div className="wallet_balance">0.000000(max)</div>
                    </div>

                    <div className="inputBalance">
                        <input type="text" placeholder="Please enter the amount" value={tokenAmount} onChange={onChangeTokenAmount} />
                    </div>

                    <div className="buyBtn" onClick={() => {props.hideModal(); onSetShowConfirmModal();}}>Buy</div>
                </div>
            </Modal>
            <SendConfirmModal isShow={showConfirmSendModal} hideModal={onSetShowConfirmModal} isDay={props.isDay} text={"Do you want to buy " + (ethSelected ? "ETH" : "BNB") + "?"}/>
        </div>
    );
}