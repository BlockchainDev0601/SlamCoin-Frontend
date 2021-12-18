import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { validate, res } from 'react-email-validator'
import { useHistory, useParams } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Header from '../components/Header'
import StakeModal from '../components/StakeModal'
import HistoryChart from '../components/historyChart'
import QRCode from '../components/QRcode'
import TransactionItem from '../components/transactionItem'
import BuySLMModal from '../components/BuySLMModal'

import SideBar from '../components/Sidebar'
import StakeComingModal from '../components/StakeComingModal'
import SendConfirmModal from '../components/SendConfirmModal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSetting } from '../actions/projectSetting'

function Dashboard(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay)
    const [modalShow, setModalShow] = useState(false)
    const [stakeComingShow, setStakeComingShow] = useState(false)
    const [qrShow, setQrShow] = useState(false)
    const [buyslmModalShow, setBuySLMModalShow] = useState(false)
    const [buyCoinFlg, setBuyCoinFlg] = useState(false)
    const [buyCoinBNB, setBuyCoinBNB] = useState(true)
    const [showCopied, setShowCopied] = useState(false)
    const [sideBarShow, setSideBarShow] = useState(false)
    const [showSendPad, setShowSendPad] = useState(false)
    const [showReceivePad, setShowReceivePad] = useState(false)
    const [showConfirmSendDialog, setShowConfirmSendDialog] = useState(false)
    const [showConfirmSendModal, setShowConfirmSendModal] = useState(false)
    const [sendToken, setSendToken] = useState("BNB")

    const [tokenAmount, setTokenAmount] = useState(0);
    const [walletAmount, setWalletAmount] = useState(0);
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

    const onChangeWalletAmount = (e) => {
        console.log(Number(e.target.value) === e.target.value) ;
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || isFloat(e.target.value) || isInt(e.target.value)) {
            setWalletAmount(e.target.value)
        }
    }

    const onClickbuyCoin = () => {
        setBuyCoinFlg(!buyCoinFlg)
    }

    const onClickbuyCoinBNB = () => {
        setBuyCoinBNB(true)
        setBuyCoinFlg(false)
    }

    const onClickbuyCoinETH = () => {
        setBuyCoinBNB(false)
        setBuyCoinFlg(false)
    }

    const onClickStake = () => {
        setModalShow(true)
    }

    const onClickStakeComing = () => {
        setStakeComingShow(true)
    }

    const onClickBuySLM = () => {
        setBuySLMModalShow(true)
    }

    const onClickConfirm = () => {
        setModalShow(false)
    }

    const onClickConfirmComing = () => {
        setStakeComingShow(false)
    }

    const onClickBuy = () => {
        setBuySLMModalShow(false)
    }

    const handleQrShow = () => {
        setQrShow(true)
    }

    const changeQrCode = () => {
        setQrShow(false)
    }

    const clickBalanceItem = () => {
        //alert()
    }

    const onClickCopyBtn = (text) => {
        setShowCopied(true)
    }

    const onClickSideBarShow = () => {
        setSideBarShow(!sideBarShow)
    }

    const onSetDayStatus = () => {
        let tempDay = isDay
        setIsDay(!tempDay)
        props.setSetting(!tempDay)
    }

    const onSetShowSendPad = () => {
        setShowSendPad(!showSendPad)
        setShowReceivePad(false)
    }

    const onSetShowReceivePad = () => {
        setShowReceivePad(!showReceivePad)
        setShowSendPad(false)
    }

    const onSetShowConfirmDialog = () => {
        setShowConfirmSendDialog(!showConfirmSendDialog)
    }

    const onSetShowConfirmModal = () => {
        setShowConfirmSendModal(!showConfirmSendModal)
    }

    const onSetSendToken = (token) => {
        setSendToken(token);
    }

    useEffect(() => {
        if (showCopied == true) {
            const timer = setInterval(() => {
                setShowCopied(false)
                clearInterval(timer)
            }, 5000)
        }
    }, [showCopied])

    return (
        <div className={!isDay ? "NightMode" : ""}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />
            <div className="content dashboardComponent">
                <SideBar page="Dashboard" showCopied={showCopied} sideBarShow={sideBarShow} isDay={isDay} onSetDayStatus={onSetDayStatus} />
                <div className="main-content ">
                    <div className="automargin_content">
                        <div className="panel_left">
                            <div className="myWallet">
                                <p className="title">My Wallet</p>
                                <div className="panels">
                                    <div className="panel-balance">
                                        <p className="panel-title">Your Balance</p>
                                        <p className="panel-description">Here you can check your balance in USD. Here you can check your
                                            balance in
                                            USD.</p>
                                        <div className="panel-actions panel-left">
                                            <div className="panel-values">
                                                <p className="panel-value">$5,678.45</p>
                                                <p className="panel-value-small">+12.5%</p>
                                            </div>
                                            <button className="button panel-action" onClick={onClickBuySLM}>Top Up</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-buy">
                                <div className={"dropdown_selection " + (!(showSendPad || showReceivePad) ? "noSelect" : "")}>
                                    <p className="panel-title-small">Buy</p>
                                    <div className="dropdown">
                                        <img src={"./image/icon_" + sendToken + ".png"} alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">{sendToken}</p>
                                        <div className="bnbDetail">{sendToken} (Bep-20) $0.00</div>
                                    </div>
                                    <div className="send-recv-btn">
                                        <button className="button-blue" onClick={onSetShowSendPad}> Send </button>
                                        <button className="button-blue-filled right" onClick={onSetShowReceivePad}> Recieve </button>
                                    </div>
                                </div>
                                <div className={"dropdown-panel " + (!buyCoinFlg ? "hidden" : "")}>
                                    <div className="dropdown_bnb" onClick={onClickbuyCoinBNB}>
                                        <img src="./image/icon_BNB.png" alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">BNB</p>
                                    </div>
                                    <div className="dropdown_eth" onClick={onClickbuyCoinETH}>
                                        <img src="./image/icon_eth_big.png" alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">ETH</p>
                                    </div>
                                </div>
                                {showReceivePad ? <div className="qrpad">
                                    <img src="./image/qr_small.png" onClick={handleQrShow} />
                                    <div className="walletAddress">
                                        <div className="title">Address</div>
                                        <div className="address">0x111aed06e421465442e...</div>
                                        <CopyToClipboard text="0x111aed06e421465442e">
                                            <img src="../image/icon_copy.svg" alt="" className="icon_copy" onClick={() => onClickCopyBtn("0x111aed06e421465442e")} />
                                        </CopyToClipboard>
                                    </div>
                                    {
                                        qrShow ?
                                            <QRCode changeQrCode={changeQrCode} onClickCopyBtn={onClickCopyBtn} /> : <></>
                                    }
                                </div>
                                    : ""}
                                {showSendPad ? <div className="sendPad">
                                    <div className="amount">Amount</div>
                                    <input type="text" className="amountText" value={tokenAmount} onChange={onChangeTokenAmount}/>
                                    <div className="amountMax">0.000000 (max)</div>
                                    <div className="wallet">Wallet</div>
                                    <input type="text" className="walletText" value={walletAmount} onChange={onChangeWalletAmount}/>
                                    <div className="networkFee">Network fee: ~ 0.00042000</div>
                                    <div className="send-recv-btn">
                                        <button className="button-blue btn_close" onClick={onSetShowSendPad}> Close </button>
                                        <button className="button-blue-filled right btn_send" onClick={onSetShowConfirmModal}> Send </button>
                                    </div>
                                </div> : ""}
                            </div>

                            <div className="balance-history">
                                <div className="panel-header">
                                    <p className="title">Token Sale</p>
                                    {/* <select className="select_type">
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select> */}
                                    {/* <div className="select-box">
                                <div className="select-box__current" tabIndex="1">
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="0" value="1" name="Ben"
                                            defaultChecked="checked" />
                                        <p className="select-box__input-text">Weekly</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="1" value="2" name="Ben" />
                                        <p className="select-box__input-text">Monthly</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="2" value="3" name="Ben" />
                                        <p className="select-box__input-text">Yearly</p>
                                    </div>
                                    <i className="select-box__icon fas fa-chevron-down"></i>
                                </div>
                                <ul className="select-box__list">
                                    <li>
                                        <label className="select-box__option" htmlFor="0"
                                            aria-hidden="aria-hidden">Weekly</label>
                                    </li>
                                    <li>
                                        <label className="select-box__option" htmlFor="1"
                                            aria-hidden="aria-hidden">Monthly</label>
                                    </li>
                                    <li>
                                        <label className="select-box__option" htmlFor="2"
                                            aria-hidden="aria-hidden">Yearly</label>
                                    </li>
                                </ul>
                            </div> */}
                                </div>
                                <div className="panel-content">
                                    <HistoryChart />
                                    <div className="list-content">
                                        <div className="content-item">
                                            <p className="content-item-text">Token Symbol</p>
                                            <div className="content-item-icon">
                                                <img src="./image/icon_SLM.png" alt="Icon_SlamCoin" />
                                                <p className="name">SSLM</p>
                                            </div>
                                        </div>
                                        <div className="content-item">
                                            <p className="content-item-text">Tokens for Presale</p>
                                            <p className="content-item-text-value">11,000,000</p>
                                        </div>
                                        <div className="content-item">
                                            <p className="content-item-text">Token Presale Price</p>
                                            <p className="content-item-text-value">$0.07</p>
                                        </div>
                                    </div>
                                    <div className="actions">
                                        <button className="button-blue-filled" onClick={onClickBuySLM}>Buy</button>
                                    </div>
                                </div>
                            </div>

                            <div className="wallet-balance">
                                <p className="title">System Wallet Balance</p>
                                <div className="balance-items">
                                    <div className="balance-item" onClick={() => onSetSendToken("SLM")}>
                                        <img src="./image/icon_slm_big.png" alt="" />
                                        <div className="balance-values">
                                            <div className="text">
                                                <p className="symbol">$SLM</p>
                                                <p className="amount">0</p>
                                            </div>
                                            <div className="details">
                                                <p className="symbol">Slamcoin</p>
                                                <p className="amount">$0.00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="balance-item" onClick={() => onSetSendToken("BNB")}>
                                        <img src="./image/icon_bnb_big.png" alt="" />
                                        <div className="balance-values">
                                            <div className="text">
                                                <p className="symbol">BNB</p>
                                                <p className="amount">0</p>
                                            </div>
                                            <div className="details">
                                                <p className="symbol">BNB (Bep-20)</p>
                                                <p className="amount">$0.00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="balance-item" onClick={() => onSetSendToken("ETH")}>
                                        <img src="./image/icon_eth_big.png" alt="" />
                                        <div className="balance-values">
                                            <div className="text">
                                                <p className="symbol">ETH</p>
                                                <p className="amount">0</p>
                                            </div>
                                            <div className="details">
                                                <p className="symbol">Etherium (ERC-20)</p>
                                                <p className="amount">$0.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="defi-staking">
                                <p className="title">Defi Staking</p>

                                <div className="staking-panel">
                                    <table className="staking-table">
                                        <thead>
                                            <tr className="table-header">
                                                <th>Token</th>
                                                <th>Est. APY</th>
                                                <th>Duration (days) </th>
                                                <th>Minimum Locked Amount</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-content">
                                                <td className="column-token">
                                                    <img src="./image/icon_slm_big.png" alt="" />
                                                    $SLM
                                                </td>
                                                <td className="column-APY">
                                                    5%
                                                </td>
                                                <td className="column-duration">
                                                    Flexible Lock
                                                </td>
                                                <td className="column-lockAmount">
                                                    0.001 $SLM
                                                </td>
                                                <td className="column-button">
                                                    <button className="button-blue-filled small" onClick={onClickStake}>Stake
                                                        Now</button>
                                                </td>
                                            </tr>

                                            <tr className="table-content">
                                                <td className="column-token">
                                                    <img src="./image/icon_bnb_big.png" alt="" />
                                                    BNB
                                                </td>
                                                <td className="column-APY">
                                                    5%
                                                </td>
                                                <td className="column-duration">
                                                    Flexible Lock
                                                </td>
                                                <td className="column-lockAmount">
                                                    0.00001 BNB
                                                </td>
                                                <td className="column-button">
                                                    <button className="button-blue-filled small" onClick={onClickStake}>Stake Now</button>
                                                </td>
                                            </tr>

                                            <tr className="table-content">
                                                <td className="column-token">
                                                    <img src="./image/icon_eth_big.png" alt="" />
                                                    ETH
                                                </td>
                                                <td className="column-APY">
                                                    5%
                                                </td>
                                                <td className="column-duration">
                                                    Flexible Lock
                                                </td>
                                                <td className="column-lockAmount">
                                                    0.0001 ETH
                                                </td>
                                                <td className="column-button">
                                                    <button className="button-blue-filled small" onClick={onClickStake}>Stake Now</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="recent-transactions">
                                <p className="title">Recent Transactions</p>
                                <div className="transaction-items">
                                    <TransactionItem status="completed" tokenType="SLM" tokenName="22 $SLM" itemDate="2021-11-18 05:23"
                                        itemNetwork=" BSC" itemAddress="0x111aed06e421465442eq0462x1234e12f2131e364fcv970"
                                        itemTxID="0xeac464...453210" depositWallet="Spot Wallet" onClickCopyBtn={onClickCopyBtn} />
                                </div>
                                <div className="transaction-items">
                                    <TransactionItem status="inprogress" tokenType="BNB" tokenName="0.2 BNB" itemDate="2021-11-18 05:23"
                                        itemNetwork=" BSC" itemAddress="0x111aed06e421465442eq0462x1234e12f2131e364fcv970"
                                        itemTxID="0xeac464...453210" depositWallet="Spot Wallet" onClickCopyBtn={onClickCopyBtn} />
                                </div>
                                <div className="transaction-items">
                                    <TransactionItem status="rejected" tokenType="ETH" tokenName="0.031 ETH"
                                        itemDate="2021-11-18 05:23" itemNetwork=" BSC"
                                        itemAddress="0x111aed06e421465442eq0462x1234e12f2131e364fcv970" itemTxID="0xeac464...453210"
                                        depositWallet="Spot Wallet" onClickCopyBtn={onClickCopyBtn} />
                                </div>
                            </div>

                            <div className="staking-modal">
                                <StakeModal isShow={modalShow} hideModal={onClickConfirm} stakeComingShow={onClickStakeComing} isDay={isDay} />
                            </div>

                            <div className="staking-coming-modal">
                                <StakeComingModal isShow={stakeComingShow} hideModal={onClickConfirmComing} isDay={isDay} />
                            </div>

                            <div className="buyslm-modal">
                                <BuySLMModal isShow={buyslmModalShow} hideModal={onClickBuy} isDay={isDay} />
                            </div>

                            <div className="sendMoneyConfirm-modal">
                                <SendConfirmModal isShow={showConfirmSendModal} hideModal={onSetShowConfirmModal} isDay={isDay} text="Do you want to send money?"/>
                            </div>
                        </div>
                        <div className="panel_right">
                            <div className="panel-buy">
                                <div className={"dropdown_selection " + (!(showSendPad || showReceivePad) ? "noSelect" : "")}>
                                    <p className="panel-title-small">Buy</p>
                                    <div className="dropdown">
                                        <img src={"./image/icon_" + sendToken + ".png"} alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">{sendToken}</p>
                                        <div className="bnbDetail">{sendToken} (Bep-20) $0.00</div>
                                    </div>
                                    <div className="send-recv-btn">
                                        <button className="button-blue" onClick={onSetShowSendPad}> Send </button>
                                        <button className="button-blue-filled right" onClick={onSetShowReceivePad}> Recieve </button>
                                    </div>
                                </div>
                                <div className={"dropdown-panel " + (!buyCoinFlg ? "hidden" : "")}>
                                    <div className="dropdown_bnb" onClick={onClickbuyCoinBNB}>
                                        <img src="./image/icon_BNB.png" alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">BNB</p>
                                    </div>
                                    <div className="dropdown_eth" onClick={onClickbuyCoinETH}>
                                        <img src="./image/icon_eth_big.png" alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">ETH</p>
                                    </div>
                                </div>
                                {showReceivePad ? <div className="qrpad">
                                    <img src="./image/qr_small.png" onClick={handleQrShow} />
                                    <div className="walletAddress">
                                        <div className="title">Address</div>
                                        <div className="address">0x111aed06e421465442e...</div>
                                        <CopyToClipboard text="0x111aed06e421465442e">
                                            <img src="../image/icon_copy.svg" alt="" className="icon_copy" onClick={() => onClickCopyBtn("0x111aed06e421465442e")} />
                                        </CopyToClipboard>
                                    </div>
                                    {
                                        qrShow ?
                                            <QRCode changeQrCode={changeQrCode} onClickCopyBtn={onClickCopyBtn} /> : <></>
                                    }
                                </div>
                                    : ""}
                                {showSendPad ? <div className="sendPad">
                                    <div className="amount">Amount</div>
                                    <input type="text" className="amountText" value={tokenAmount} onChange={onChangeTokenAmount}/>
                                    <div className="amountMax">0.000000 (max)</div>
                                    <div className="wallet">Wallet</div>
                                    <input type="text" className="walletText" value={walletAmount} onChange={onChangeWalletAmount}/>
                                    <div className="networkFee">Network fee: ~ 0.00042000</div>
                                    <div className="send-recv-btn">
                                        <button className="button-blue btn_close" onClick={onSetShowSendPad}> Close </button>
                                        <button className="button-blue-filled right btn_send" onClick={onSetShowConfirmDialog}> Send </button>
                                        {showConfirmSendDialog ? <div className="sendConfirmPad">
                                            <div className="confirmTitle">Do you want to send money?</div>
                                            <div className="confirmBtnGrup">
                                                <div className="Decline" onClick={onSetShowConfirmDialog}>Decline</div>
                                                <div className="Approve" onClick={onSetShowConfirmDialog}>Approve</div>
                                            </div>
                                        </div> : ""}
                                    </div>
                                </div> : ""}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

Dashboard.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
})

export default connect(mapStateToProps, { setSetting })(
    Dashboard
)