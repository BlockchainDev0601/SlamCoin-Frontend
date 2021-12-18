import React from "react";
import { useState, useEffect } from "react";
import CustomCalendar from "../components/CustomCalendar";
import CountrySelect from 'react-bootstrap-country-select';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSetting } from '../actions/projectSetting';
import ChangePasswordModal from "../components/ChangePasswordModal";

function Setting(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay);
    const [calendarShow, setCalendarShow] = useState(false);
    const [birthdate, setBirthDate] = useState("");
    const [value, setValue] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState()
    const [sideBarShow, setSideBarShow] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const onClickCalendarShow = () => {
        setCalendarShow(!calendarShow);
    }

    const onSetDate = (date) => {
        console.log(date);
        setBirthDate(date);
        setCalendarShow(false);
    }
    const [showCopied, setShowCopied] = useState(false);
    const onClickCopyBtn = (text) => {
        setShowCopied(true);
    }

    const onClickSideBarShow = () => {
        setSideBarShow(!sideBarShow);
    }

    const onSetDayStatus = () => {
        let tempDay = isDay;
        setIsDay(!tempDay);
        props.setSetting(!tempDay);
    }

    const onSetShowChangePasswordModal = () => {
        setShowChangePasswordModal(!showChangePasswordModal);
    }

    useEffect(() => {
        if (showCopied == true) {
            const timer = setInterval(() => {
                setShowCopied(false);
                clearInterval(timer);
            }, 5000);
        }
    }, [showCopied]);
    return (
        <div className={!isDay ? "NightMode" : ""}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />
            <div className="content SettingComponent">
                <SideBar page="Setting" showCopied={showCopied} sideBarShow={sideBarShow} isDay={isDay} onSetDayStatus={onSetDayStatus} />
                <div className="main-content ">
                    <div className="automargin_content">
                        <p className="title">Settings</p>
                        <div className="setting_content">
                            <div className="Setting_1">
                                <div className="avatar_tab">
                                    <div className="avatar">
                                        <img src="./image/setting/gallery.svg" />
                                    </div>
                                    <div className="switch_tab">
                                        <div className="profile_email">2FA (Email)</div>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="changepwdBtn" onClick={onSetShowChangePasswordModal}>Change Password</div>
                                </div>
                                <div className="profile_info">
                                    <div className="profile_input">
                                        <div className="input_label">Enter First/Last Name</div>
                                        <div className="input_text">
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="profile_input profile_input1 profile_birth">
                                        <div className="input_label">Date of Birth</div>
                                        <div className="input_text">
                                            <input type="text" placeholder="MM/DD/YYYY" value={birthdate} />
                                            <img src="./image/setting/calendar.png" onClick={onClickCalendarShow} />
                                        </div>
                                        {calendarShow ? <CustomCalendar onSetDate={onSetDate} /> : ""}
                                    </div>
                                    <div className="profile_input">
                                        <div className="input_label">Enter Your Place</div>
                                        <div className="input_text">
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="profile_input">
                                        <div className="input_label">Your Email</div>
                                        <div className="input_text">
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="profile_input">
                                        <div className="input_label">Slamchat Username</div>
                                        <div className="input_text">
                                            <input type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Setting_2">
                                <div className="profile_input">
                                    <div className="input_label">Telegram Username</div>
                                    <div className="input_text">
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="profile_input gender">
                                    <div className="input_label">Select Gender</div>
                                    <div className="input_text">
                                        <select>
                                            <option selected>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="profile_input country">
                                    <div className="input_label">Select Country</div>
                                    <div className="input_text">
                                        <CountrySelect
                                            value={value}
                                            onChange={setValue}
                                            placeholder="Select.."
                                        />
                                    </div>
                                </div>
                                <div className="profile_input profile_flag">
                                    <div className="input_label">Your Phone</div>
                                    <div className="input_text">
                                        <PhoneInput
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChange={setPhoneNumber}
                                        />
                                    </div>
                                </div>
                                <div className="profile_link">
                                    <div className="link_title">
                                        <div className="link_title_label">Affiliate link</div>
                                        <div className="link_title_comment">You can earn 3%</div>
                                    </div>
                                    <div className="link">
                                        <div className="link_label">
                                            https://wallet.slamcoin.io/register/1832
                                        </div>
                                        <CopyToClipboard text="https://wallet.slamcoin.io/register/1832">
                                            <img src="../image/icon_copy.svg" className="icon_copy" alt="" onClick={() => onClickCopyBtn("https://wallet.slamcoin.io/register/1832")} />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="btnDiv">
                                    <div className="settingSaveBtn">Save</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChangePasswordModal isShow = {showChangePasswordModal} hideModal = {onSetShowChangePasswordModal} isDay = {isDay}/>
        </div>
    );
}

Setting.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
});

export default connect(mapStateToProps, { setSetting })(
    Setting
);