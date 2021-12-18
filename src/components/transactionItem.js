import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
export default function TransactionItem(props) {
    const item_status = {
        "completed": "Completed",
        "inprogress": "In progress",
        "rejected": "Rejected"
    };

    const item_type = {
        "SLM": "icon_slm_big.png",
        "BNB": "icon_bnb_big.png",
        "ETH": "icon_eth_big.png"
    }
    return (
        <div>
            <div className="transactionItem">
                <div className="itemHeader">
                    <img src={"../image/" + item_type[props.tokenType]} alt="" />
                    <div className="tokenName">{props.tokenName}</div>
                    <div className={"itemStatus " + props.status}>{item_status[props.status]}</div>
                </div>
                <div className="itemContent">
                    <div className="itemDate">{props.itemDate}</div>
                    <div className="itemNetwork">
                        <div className="itemNetworkContent">
                            <div className="itemNetworkTitle">Network</div>
                            <div className="itemNetwork">{props.itemNetwork}</div>
                        </div>
                        <div className="itemAddressContent">
                            <div className="itemAddressTitle">Address</div>
                            <div className="itemAddress">{props.itemAddress}</div>
                            <CopyToClipboard text={props.itemAddress}>
                                <img src="../image/icon_copy.svg" alt="" className="icon_copy" onClick={() => props.onClickCopyBtn(props.itemAddress)} />
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className="itemWallet">
                        <div className="itemDepositWallet">
                            <div className="walletTitle">Deposit Wallet</div>
                            <div className="depositWallet">{props.depositWallet}</div>
                        </div>
                        <div className="itemTxIDContent">
                            <div className="itemTxIDTitle">TxID</div>
                            <div className="itemTxID">{props.itemTxID}</div>
                            <CopyToClipboard text={props.itemTxID}>
                                <img src="../image/icon_copy.svg" alt="" className="icon_copy" onClick={() => props.onClickCopyBtn(props.itemTxID)} />
                            </CopyToClipboard>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
}