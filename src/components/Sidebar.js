import React from 'react';
import { Link } from 'react-router-dom';
export default function SideBar(props) {
    return (
        <div>
            <div className={"sidebar " + (props.sideBarShow ? "mobileSidebar" : "")}>
                <div className="chevron-sidebar">
                    <img src="./image/chevron-sidebar.svg" alt="" className="chevron-icon" />
                </div>


                <div className="apply-btn">
                    <button className="button-apply-filled"> Connect Wallet </button>
                </div>
                <ul className="sidebar-nav">
                    <li className={"sidebar-nav-list-item " + (props.page == "Dashboard" ? "active" : "")}><Link to="/"><img src={"./image/dashboard" + (!props.isDay ? "_night" : "") + (props.page == "Dashboard" ? "_selected" : "") + ".svg"} alt="Dashboard icon"
                        className="list-icon" /><span className="list-text ">Dashboard</span></Link></li>
                    <li className={"sidebar-nav-list-item " + (props.page == "Transaction" ? "active" : "")}><Link to="/Transaction"><img src={"./image/money-send" + (!props.isDay ? "_night" : "") + (props.page == "Transaction" ? "_selected" : "") + ".svg"} alt="transaction icon"
                        className="list-icon" /><span className="list-text">Transaction</span></Link></li>
                    <li className={"sidebar-nav-list-item " + (props.page == "Affiliation" ? "active" : "")}><Link to="/Affiliation"><img src={"./image/people" + (!props.isDay ? "_night" : "") + (props.page == "Affiliation" ? "_selected" : "") + ".svg"} alt="Affiliation"
                        className="list-icon" /><span className="list-text">Affiliation</span></Link></li>
                    <li className="sidebar-nav-list-item"><Link to="/Stacking"><img src={"./image/buy-crypto" + (!props.isDay ? "_night" : "") + ".svg"} alt="Stacking"
                        className="list-icon" /><span className="list-text">Stacking</span></Link></li>
                    <li className="sidebar-nav-list-item"><Link to="/NFTMarket"><img src={"./image/shopping-cart" + (!props.isDay ? "_night" : "") + ".svg"} alt="NFT Market"
                        className="list-icon" /><span className="list-text">NFT Market</span></Link></li>
                    <div className="widgetLine"></div>
                    <li className="sidebar-nav-list-item">
                        <div className="switch_tab">
                            <img src={"./image/moon" + (!props.isDay ? "_selected" : "") + ".svg"} />
                            <label className="switch">
                                <input type="checkbox" onChange={props.onSetDayStatus} checked={props.isDay ? true : false} />
                                <span className="slider round"></span>
                            </label>
                            <img src={"./image/sun" + (props.isDay ? "_selected" : "") + ".svg"} />
                        </div>
                    </li>
                    <li className={"sidebar-nav-list-item " + (props.page == "Setting" ? "active" : "")}><Link to="/Setting"><img src={"./image/setting-2" + (!props.isDay ? "_night" : "") + (props.page == "Setting" ? "_selected" : "") + ".svg"} alt="Settig "
                        className="list-icon" /><span className="list-text">Setting</span></Link></li>
                    <li className="sidebar-nav-list-item"><Link to="/Logout"><img src={"./image/logout-2" + (!props.isDay ? "_night" : "") + ".svg"} alt="logout-button"
                        className="list-icon" /><span className="list-text">Logout</span></Link></li>
                    <li className="sidebar-nav-list-item phoneNumber">79004885423</li>
                    <li className="sidebar-nav-list-item email">213melnikov@gmail.com</li>
                    <li className="sidebar-nav-list-item sidebar-nav-list-item-affiliation"><Link to="/AffiliationWebsite"><img src={"./image/link-2" + (!props.isDay ? "_night" : "") + ".svg"} alt="Affiliate link"
                        className="list-icon" /><span className="list-text">Affiliation link for website</span></Link></li>
                    <li className="sidebar-nav-list-item sidebar-nav-list-item-wallet"><Link to="/AffiliationWallet"><img src={"./image/link-2" + (!props.isDay ? "_night" : "") + ".svg"} alt="Affiliate link wallet"
                        className="list-icon" /><span className="list-text">Affiliation link for wallet</span></Link></li>

                </ul>

            </div>
            {props.showCopied ? <div class="sc-1u1vgpp-0 cVGhIP">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="14px" width="14px" viewBox="0 0 24 24" class="sc-16r8icm-0 cfMRaw cmc-icon">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.7557 9.65493C17.1174 9.23758 17.0723 8.60602 16.6549 8.24431C16.2376 7.8826 15.606 7.92771 15.2443 8.34507L10.8 13.4731L8.75569 11.1143C8.39398 10.6969 7.76242 10.6518 7.34507 11.0135C6.92771 11.3752 6.8826 12.0068 7.24431 12.4242L10.0443 15.6549C10.2343 15.8741 10.51 16 10.8 16C11.09 16 11.3657 15.8741 11.5557 15.6549L16.7557 9.65493Z"></path>
                </svg>
                <span>Copied!</span>
            </div> : ""}
        </div>
    );
}