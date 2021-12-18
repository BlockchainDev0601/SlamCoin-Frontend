import React, {useEffect, useState, useCallback } from "react";
import QRCode from "qrcode.react";
import axios from 'axios';
import Web3 from 'web3';
// import { useHistory } from 'react-router-dom';
import { Button, Popup, Grid, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useTranslation } from "react-i18next";
import './../translations/i18n';
import {HttpProvider} from 'web3-providers';
import LoadingOverlay from 'react-loading-overlay-ts';

export default function Home({childToParent}) {
  const { t } = useTranslation();
  
  const token  = localStorage.getItem('slamtoken');

  const [isActive, setActive] = useState(false)
  const [overlayText, setOverlayText] = useState('Please wait ...');

  const handleButtonClicked = useCallback(() => {
    setActive(value => !value)
  }, []);
  // const options = {
  //   timeout: 20000,
  //   headers: [
  //       {
  //           name: 'Access-Control-Allow-Origin', value: '*'
  //       },
  //   ]
  // };

  // const httpProviderEth = new Web3.providers.HttpProvider(process.env.REACT_APP_ETH, options);
  // const httpProviderBsc = new Web3.providers.HttpProvider(process.env.REACT_APP_BSC, options);
  
  const web3 = new Web3(process.env.REACT_APP_ETH);
  const web3_bnb = new Web3(process.env.REACT_APP_BSC);
  // console.log(web3.version, "web3 version", web3_bnb.version)
  const [email, setEmail] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0.07);
  const [exchange, setExchange] = useState(false);
  const [exchangeSuccess, setExchangeSuccess] = useState(false);
  const [exchangePending, setExchangePending] = useState(false);
  const [warningTrans, setWarningTrans] = useState(false);
  const [progressbarToggle, setProgressbarToggle] = useState(false);
  const [countdownToggle, setCountdownToggle] = useState(false);
  const [endTimeSeconds, setEndTimeSeconds] = useState(0);
  const [presaleTokenNumber, setPresaleTokenNumber] = useState(0);
  const [soldTokenNumber, setSoldTokenNumber] = useState(0);
  const [presaleEndSec, setPresaleEndSec] = useState(false);
  const [marketCap, setMarketCap] = useState(0);
  const [marketCapOld, setMarketCapOld] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [transferMode, setTransferMode] = useState("swap");
  const [providerError, setProviderError] = useState(false);
  const [providerErrorDialog, setProviderErrorDialog] = useState(false);
  
  let interval;
  let togglePresalePrice = '';
  let limitTokenNumber = 0;
  let limitTokenPrice = 0;
  let maximumExchangeOrg = 0;
  let minimumExchangeOrg = 0;
  let maximumExchangeInc = 0;
  let minimumExchangeInc = 0;

  const [buyingBlock, setBuyingBlock] = useState(true);
  const [maximumExchange, setMaximumExchange] = useState(0);
  const [minimumExchange, setMinimumExchange] = useState(0);
  const [maxMinEnable, setMaxMinEnable] = useState(false);
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);
  
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [bnbBalance, setBnbBalance] = useState(0.00);
  const [ethBalance, setEthBalance] = useState(0.00);
  const [maxBalance, setMaxBalance] = useState(0.00);
  const [maxInput, setMaxInput] = useState("");
  const [maxInputVal, setMaxInputVal] = useState("");
  // const [insertMax, setInsertMax] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [coin, setCoin] = useState('$SLM');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenM, setIsOpenM] = useState(false);
  const [bnbPrice, setBnbPrice] = useState(0.00);
  const [ethPrice, setEthPrice] = useState(0.00);
  const [modalInput, setModalInput] = useState(0.00);
  const [open, setOpen] = React.useState(false);
  const [openBnbOut, setOpenBnbOut] = React.useState(false);
  
  const [minCryptoSend, setMinCryptoSend] = useState(0.00012);
  const [selectCrypto, setSelectCrypto] = useState("BNB");
  const [adminWallet, setAdminWallet] = useState("");
  const [recipientWallet, setRecipientWallet] = useState("");
  const [id, setId] = useState("");
  const [slam, setSlam] = useState(0);
  const [progressAmount, setProgressAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [lastAmount, setLastAmount] = useState(0);
  const [lastDate, setLastDate] = useState('');
  const [progressBNB, setProgressBNB] = useState(0);
  const [progressUSD, setProgressUSD] = useState(0);

  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 90,
    strokeWidth: 5
  };

  const affiliate = () => {
    const el = document.createElement('textarea');
        
    if(id === 379)
      el.value = "https://wallet.slamcoin.io/register/nft";
    else if(id === 161)
      el.value = "https://wallet.slamcoin.io/register/Ar";
    else
      el.value = "https://wallet.slamcoin.io/register/"+id;
    
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div className="timeDemention">{dimension}</div>
      </div>
    );
  };
  
  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + endTimeSeconds; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  // web3 send ETH function
  // async function sendCryptobalances() {
  //   axios.post(process.env.REACT_APP_SLAMBACKEND+'api/eth_slam', {ethAmount:0.01, slamAmount:30, user_id:id})
  //   .then(res=>{console.log("okokokok")});
  // }
  const getGasPrice = async() => {
    let getGasPrice = await web3.eth.getGasPrice(function(e, r) { return r; });
    return getGasPrice;
  }

  async function sendCryptobalance(){
    
    // console.log("========================", modalInput, selectCrypto)
    setIsOpenM(false);
    if(modalInput>0.009){

      if(transferMode == "send") {
        handleClose();
      }else {
        setExchangePending(true);
      }

      if(transferMode == "swap" && maxMinEnable) {
        if(modalInput < minimumExchange) {
          setMinError(true);
          return false;
        }
        else
          setMinError(false);

        if(modalInput > maximumExchange) {
          setMaxError(true);
          return false;
        }
        else        
          setMaxError(false);
      }
      setExchange(false);
    }else{
      setExchange(true);
      return false;
    }

    // setOverlayText(t('TransactionProcessing'));
    // handleButtonClicked();
    // setOpen(false);
    setExchange(false);
    let receiver = transferMode == "swap" ? adminWallet : recipientWallet;
    let txType = transferMode == "swap" ? '' : 'OUT';
    let cryptoPrice = selectCrypto == 'BNB' ? bnbPrice : ethPrice;
    console.log(selectCrypto, "=== crypto")
    // http://3.122.149.23:8080/api/cryptoTx
    const txHandle = await axios.post('/api/cryptoTx', {userId:id, address: address, modalInput:modalInput, selectCrypto:selectCrypto, 
      receiver:receiver, privateKey:privateKey, tokenPrice: tokenPrice, cryptoPrice:cryptoPrice, txType:txType }).then(
      res => {
        if(res.data.status === 'success') {
          let slam_amount = res.data.slam_amount;
          let sentAmount  = res.data.sentAmount;
          const backendUrl = selectCrypto === "BNB" ? 'bnb_slam' : 'eth_slam';
          axios.post(process.env.REACT_APP_SLAMBACKEND+'api/'+backendUrl, {bnbAmount:sentAmount, slamAmount:slam_amount, user_id:id, txmode:transferMode})
          .then(res=>{
            if(res.data.status === 'ok'){
              setExchangeSuccess(true);
              setTransaction(res.data.trans);
              setSlam(Number(slam)+Number(slam_amount));
              if(selectCrypto == "BNB") {
                setBnbBalance(parseFloat(Number(bnbBalance)-Number(modalInput)).toFixed(6));
                setMaxBalance(parseFloat(Number(bnbBalance)-Number(modalInput)).toFixed(6));
              }
              else {
                setEthBalance(parseFloat(Number(ethBalance)-Number(modalInput)).toFixed(6));
                setMaxBalance(parseFloat(Number(ethBalance)-Number(modalInput)).toFixed(6));
              }
              setWarningTrans(false);
              setOpenBnbOut(true);
              
            }
          });
        }
      }
    )
    
    // handleButtonClicked();
    // setOpen(true)
  }

  // const history = useHistory();
  const addresscopy = () => {
    const el = document.createElement('textarea');
    el.value = address;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  const maxcheck = (val) => {
    if(val>maxBalance){
      setModalInput(maxBalance);
    }else{
      setModalInput(val);
    }
  }

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleOpenM = () => {
    setIsOpenM(true);
  }

  const handleCloseM = () => {
    setIsOpenM(false);
  }

  async function getETHBalance(address){
    await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT').then((res) => {
      setEthPrice(res.data.price);
    });

    await web3.eth.getBalance(address, function(error, wei) {
      if(!error) {
        setEthBalance(parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(6));
      }else {
        console.log(error, "eth getBalance get error");
        setProviderError(true);
        setProviderErrorDialog(true);
      }
    });
  }

  async function getBNBBalance(address){
    await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDT').then((res) => {
      setBnbPrice(res.data.price);
    });

    await web3_bnb.eth.getBalance(address, function(error, wei) {
      if(!error) {
        setBnbBalance(parseFloat(web3_bnb.utils.fromWei(wei, 'ether')).toFixed(6));
        setMaxBalance(parseFloat(web3_bnb.utils.fromWei(wei, 'ether')).toFixed(6));
      }else {
        console.log(error, "bnb getBalance get error");
        setProviderError(true)
        setProviderErrorDialog(true);
      }
    });
  }
  
  async function getBNBBalanceBE(address) {
    handleButtonClicked();
    await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/getBnbBalance/'+address).then((res) => {
      setBnbBalance(parseFloat(res.data).toFixed(6));
    });
    handleButtonClicked();
  }

  async function getETHBalanceBE(address) {
    handleButtonClicked();
    await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/getEthBalance/'+address).then((res) => {
      setEthBalance(parseFloat(res.data).toFixed(6));
    });
    handleButtonClicked();
  }
  
  const [coinBalance, setCoinBalance] = useState(0);
  const [coinBalanceUsd, setCoinBalanceUsd] = useState(0);

  const tokenData = async () => {
    await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/token', {token:token})
    .then(res=>{
      if(res.data.status === "ok"){
        const address = res.data.address;
        
        getBNBBalance(address);
        getETHBalance(address);

        childToParent(res.data);
        
        setAddress(res.data.address);
        setPrivateKey(res.data.privateKey);
        setAdminWallet(res.data.admin);
        setId(res.data.id);
        setTransaction(res.data.trans);
        setSlam(res.data.slam);
        
        setCoinBalance(res.data.slam)
        // setCurrency(res.data.currency);
        setLastAmount(res.data.last_amount);
        setLastDate(res.data.last_date);
        setCurrency(res.data.currency);
      }else{
        localStorage.setItem('slamtoken', '');
        localStorage.setItem('isLogin', '');
        window.location.href = '/';
      }
    })
    .catch(error=>{
      // console.log(error, "this is error")
      localStorage.setItem('slamtoken', '');
      localStorage.setItem('isLogin', '');
      window.location.href = '/';
    });
  }

  const manageData = async () => {
    const res = await axios.get(process.env.REACT_APP_SLAMBACKEND+'api/manages', {token:token})
    setEmail(res.data.email)
    setSoldAmount(res.data.soldAmount);
    setPresaleTokenNumber(res.data.presaleTokenNumber)

    if(res.data.currentSoldAmount > res.data.limitTokenNumber && res.data.limitTokenNumber > 0 && res.data.togglePresalePrice == "Yes")
      {
        setTokenPrice(res.data.limitTokenPrice);
        setPresaleTokenNumber(11000000);
      }
    else
      setTokenPrice(res.data.tokenPrice)
    
    if(res.data.presaleEndSec > 0) {
      setEndTimeSeconds(res.data.presaleEndSec)
      setPresaleEndSec(true)
    }else {
      setEndTimeSeconds(res.data.countDownSec)
      setPresaleEndSec(false)
    }
    
    setMarketCap(res.data.marketCap)
    setMarketCapOld(res.data.marketCapOld)
    setMaximumExchange(res.data.maximumExchange)
    setMinimumExchange(res.data.minimumExchange)
    setSoldTokenNumber(res.data.currentSoldAmount);
    
    maximumExchangeOrg = res.data.maximumExchange;
    minimumExchangeOrg = res.data.minimumExchange;
    maximumExchangeInc = res.data.maximumExchangeInc;
    minimumExchangeInc = res.data.minimumExchangeInc;
    
    limitTokenNumber = res.data.limitTokenNumber;
    limitTokenPrice = res.data.limitTokenPrice;
    togglePresalePrice = res.data.togglePresalePrice;
    
    if(res.data.maxMinToggle == "Yes")
      setMaxMinEnable(true);
    else
      setMaxMinEnable(false);
            
    if(res.data.blockBuyToggle == "Yes")
      setBuyingBlock(true);
    else
      setBuyingBlock(false);
    
    if(res.data.progressbarToggle == "Yes")
      setProgressbarToggle(true);
    else 
      setProgressbarToggle(false);

    if(res.data.countdownToggle == "Yes")
      setCountdownToggle(true);
    else 
      setCountdownToggle(false);
  }

  const getCurSoldAmount = () => {
      axios.post(process.env.REACT_APP_SLAMBACKEND+'api/currentSoldTokenAmount')
      .then(
        res=>{
          setSoldTokenNumber(res.data.currentSoldAmount)
          if(res.data.currentSoldAmount > 11000000) {
            clearInterval(interval);
            setSoldTokenNumber(11000000);
            // setBuyingBlock(true);
            // setMinimumExchange(minimumExchangeOrg);
            // setMaximumExchange(maximumExchangeOrg);
          }
          else {
            if(res.data.currentSoldAmount > limitTokenNumber && res.data.limitTokenNumber > 0 && res.data.limitTokenPrice > 0 && res.data.togglePresalePrice == "Yes") {
              setTokenPrice(res.data.limitTokenPrice);
              setMinimumExchange(minimumExchangeInc);
              setMaximumExchange(maximumExchangeInc);
              setPresaleTokenNumber(11000000);
            }
            else {
              setTokenPrice(tokenPrice);
            }
          }
      }
    );
  }

  const [coinImg, setCoinImg] = useState('/image/new-slamcoin.svg');

  const setCardContent = (token, image, coinAmount, amount, minAmount) => {
    setCoin(token);
    setSelectCrypto(token);
    setCoinImg(image);
    setCoinBalance(coinAmount);
    setCoinBalanceUsd(amount);
    setMinCryptoSend(minAmount)
  }
  useEffect(() => {
    if(!web3 || !web3_bnb) {
      setProviderError(true);
      setProviderErrorDialog(true);
    }
    const init = async () => {
      await tokenData();
      await manageData();
      
      interval = setInterval(() => {
        getCurSoldAmount();
      }, 5000);
    }
    init();
    return () => {
      clearInterval(interval);
    }
  },[]);

  return (
    <div>
      <LoadingOverlay
            active={isActive}
            spinner
            text = {overlayText}
            className = "loadingOverlay"
          >
            {/* <div style={{ height: 0 }}>
              <p>Some content or children or something.</p>
              <button onClick={handleButtonClicked}>Toggle active</button>
            </div>
           */}
        <div className="row main">
          <div className="col-lg-9 col-md-12 main-content">
            <p className="content-title">${parseFloat(slam*tokenPrice).toFixed(2)}</p>
            <p className="btc">{slam} $SLM</p>
            <div className="mobile">
              <i className="fa fa-bars" />
            </div>
            <hr />
            <p className="token-sale">{t('TokenSale')}
              <span>
                <Modal
                  className="buy-modal"
                  closeIcon
                  open={open}
                  trigger={<button  className="btn buy-elp">{t('Buy')} $SLM</button>}
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                >
                <div className="modal-content">
                  {/* Modal body */}
                  <div className="modal-body">
                    {buyingBlock ?
                    <div className="text-center">
                        <p>Thank you for your interest!</p>
                        <p>
                          It's Almost Time! 
                          <br />
                        </p>
                        <p>
                            <a href="https://t.me/slamchatnft">https://t.me/slamchatnft</a>
                        </p>
                        <p>
                            <a href="https://twitter.com/slamchatnft">https://twitter.com/slamchatnft</a>
                        </p>
                        <div className="link-div" onClick={affiliate}>
                          <div className="toast affili">
                              <div className="toast-copy affili-copy">
                                  Copied
                              </div>
                          </div>
                          <a className="link-a btn">
                            Affiliation link
                            <span>
                              <img src="https://wallet.slamcoin.io/image/link.svg" className="link-svg" alt=""/>
                            </span>
                          </a>
                        </div>
                    </div>
                    :
                    <div>
                      <h5 className="modal-title">{t('Buy')} $SLM {t('token')}</h5>
                      {maxMinEnable && 
                        <div>
                          {minError && <p className="wallet-warning">{t('Minimum')} {minimumExchange} BNB {t('purchase')}</p>}
                          {maxError && <p className="wallet-warning">{t('Maximum')} {maximumExchange} BNB {t('purchase')}</p>}
                        </div>
                      }
                      {exchange && <h5 className="wallet-warning">{t('TopBalance')} {selectCrypto}</h5>}
                      {exchangePending && <div className="alert alert-info wallet-success">
                        {t('TransactionPending')}
                      </div>}
                      {exchangeSuccess && <div className="alert alert-success wallet-success">
                        {t('TransactionCompleted')}
                      </div>}
                      {warningTrans && <p className="wallet-warning">{t('TransactionAgain')}</p>}
                      <div className="btn-group btn-group-lg">
                        {/* <button type="button" className="btn btn-gray" onClick={e=>{setMaxBalance(0); setSelectCrypto("BTC"); setModalInput(""); setExchange(false); setExchangeSuccess(false); setWarningTrans(false);}}>BTC</button> */}
                        <button type="button" className="btn btn-gray" onClick={e=>{setMaxBalance(ethBalance); setSelectCrypto("ETH"); setModalInput(""); setExchange(false); setExchangeSuccess(false); setWarningTrans(false);}}>ETH</button>
                        <button type="button" className="btn btn-gray active" onClick={e=>{setMaxBalance(bnbBalance); setSelectCrypto("BNB"); setModalInput(""); setExchange(false); setExchangeSuccess(false); setWarningTrans(false);}}>BNB</button>
                      </div>
                      <div className="max" onClick={e=>setModalInput(maxBalance)}>
                        <img src="../image/max.svg" className="max-img" alt=""/>
                        <span className="max-balance">{parseFloat(maxBalance).toFixed(6)} </span><span> (max)</span>
                      </div>
                      <input className="form-control buy-input" type="number" min={0} step={0.000001} value={modalInput} onChange={e=>maxcheck(e.target.value)}/>
                      <div className="exchange">
                        <p>Price: 0.000015636 $SLM</p>
                        <hr />
                        <p>You receive 385 ($SLM)</p>
                      </div>
                      
                      <Popup wide trigger={<Button content={t('Buy')} className="buy-button" onClick={() => {setTransferMode("swap")}} />} on='click' offset={[0, 50]}
                      position='bottom center' style={{borderRadius:'10px'}} open={isOpenM} onOpen={handleOpenM}>
                        <Grid style={{width:'230px'}} >
                          <Grid.Column style={{textAlign:'center', padding:'5px'}} >
                            <h3 className="popover-header" style={{fontSize:'17px'}}>{t('WantExchange')}</h3>
                            <br/>
                            <Button color='red' content={t('No')} style={{padding:'5px', width:'25%', marginRight:'10%'}} onClick={handleCloseM}/>
                            <Button color='green' content={t('Yes')} style={{padding:'5px', width:'25%'}}  onClick={sendCryptobalance}/>
                          </Grid.Column>
                        </Grid>
                      </Popup>
                    </div>
                    }
                    
                  </div>
                </div>
                
                </Modal>
              </span>
            </p>
            
            <div className={progressbarToggle ? "exchange-status" : "exchange-status d-none"}>
             
            {coin == '$SLM' ? <p className="text-center">
                {new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 0,      
                  maximumFractionDigits: 0,
                }).format(presaleTokenNumber)}
                &nbsp;/&nbsp;
                <span className="text-success">
                  {(new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 0,      
                    maximumFractionDigits: 0,
                  }).format(soldAmount? soldAmount : soldTokenNumber))}
                </span> $SLM {t('Sold')}
              </p>
              :
              <p className="text-center">{marketCapOld}&nbsp;/&nbsp;{marketCap} BNB</p>
              }

              <div className="reference-amount">
                <Popup
                  trigger={<div className="exchange-amount" style={{width: (coin === 'BNB') ? marketCapOld*100/marketCap+'%' : soldTokenNumber*100/presaleTokenNumber+'%'}}></div>}

                  content={(coin === 'BNB')?
                  <p className="text-center">$ {parseFloat(bnbPrice*marketCap).toFixed(3)}</p>
                  :
                  <p className="text-center">
                    {new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 0,      
                      maximumFractionDigits: 0,
                    }).format(presaleTokenNumber)} 
                    {progressbarToggle && <span> &nbsp;/&nbsp; <span className="text-success">
                      {(new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,      
                        maximumFractionDigits: 0,
                      }).format(soldAmount? soldAmount : soldTokenNumber))}
                    </span> $SLM {t('Sold')}
                    </span>}
                  </p>
                  }
                  offset={[0, 10]}
                  position='bottom center'
                  style={{fontSize:'10px', borderRadius:'1px'}}
                />
               
                {/* <span className="span-amount" style={{marginTop:((lslam*tokenPrice/progressAmount)>86)?'-20px':''}}>
                  {(currency==='BNB')?progressBNB+'BNB':progressUSD/1000+'K'}
                </span>
                 */}
                
              </div>
            </div>
            
            <div className="table-responsive  custom-table">
              
              <table className="table home-table">
                <tbody className="home-tbody">
                  <tr className="first-tr">
                    <th>{t("TokenSymbol")}</th>
                    <td>$SLM</td>
                  </tr>
                  <tr>
                    <th>{t('TokenPresale')}</th>
                    <td>
                    {new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 0,      
                      maximumFractionDigits: 0,
                    }).format(presaleTokenNumber)}
                     {progressbarToggle && <span>
                       &nbsp;/&nbsp;
                      <span className="text-success">
                      {(new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,      
                        maximumFractionDigits: 0,
                      }).format(soldAmount? soldAmount : soldTokenNumber))}</span>
                      &nbsp;$SLM {t('Sold')}
                      </span>
                     }
                    </td>
                  </tr>
                  <tr>
                    <th>{t('TokenPresalePrice')}</th>
                    <td>$ {tokenPrice.toLocaleString('en-US')}</td>
                  </tr>
                  {maxMinEnable &&
                  <tr>
                    <th>{t('Maximum')} {t('Contribution')}</th>
                    <td>{maximumExchange} BNB</td>
                  </tr>}
                  {maxMinEnable &&
                  <tr>
                    <th>{t('Minimum')} {t('Contribution')}</th>
                    <td>{minimumExchange} BNB</td>
                  </tr>}
                </tbody>
              </table>
            </div>

              {countdownToggle && 
              <div className="text-center">
                {presaleEndSec ?
                  <p>{t('PRESALEENDS')} :</p>
                  :
                  <p>{t('PRESALECOUNTDOWN')} Oct 21, 2021 17:00 BST:</p>
                }
                <div className="countDownArea">
                  <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#536edb"]]}
                    duration={daysDuration}
                    initialRemainingTime={remainingTime}
                  >
                    {({ elapsedTime }) =>
                      renderTime("days", getTimeDays(daysDuration - elapsedTime))
                    }
                  </CountdownCircleTimer>
                  <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#536edb"]]}
                    duration={daySeconds}
                    initialRemainingTime={remainingTime % daySeconds}
                    onComplete={(totalElapsedTime) => [
                      remainingTime - totalElapsedTime > hourSeconds
                    ]}
                  >
                    {({ elapsedTime }) =>
                      renderTime("hours", getTimeHours(daySeconds - elapsedTime))
                    }
                  </CountdownCircleTimer>
                  <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#536edb"]]}
                    duration={hourSeconds}
                    initialRemainingTime={remainingTime % hourSeconds}
                    onComplete={(totalElapsedTime) => [
                      remainingTime - totalElapsedTime > minuteSeconds
                    ]}
                  >
                    {({ elapsedTime }) =>
                      renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
                    }
                  </CountdownCircleTimer>
                  <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#536edb"]]}
                    duration={minuteSeconds}
                    initialRemainingTime={remainingTime % minuteSeconds}
                    onComplete={(totalElapsedTime) => [
                      remainingTime - totalElapsedTime > 0
                    ]}
                  >
                    {({ elapsedTime }) =>
                      renderTime("seconds", getTimeSeconds(elapsedTime))
                    }
                  </CountdownCircleTimer>
                </div>
              </div>
              }
            <br />
            <hr />
            <p className="system-wallet">{t('SystemBalance')}</p>
            <div className="row">
              <div className="col-12 card-mobile">
                <div className="content-card-top">
                  <span className="content-token">{coin}</span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-6 card-row">
                <div className={coin == "$SLM" ? "content-card" : "content-card transparent"} onClick={e=>{setCardContent('$SLM', '/image/new-slamcoin.svg', slam, parseFloat(slam*tokenPrice).toFixed(2), 0)}}>
                  <div className="card-img" id={1}>
                    <img src="/image/new-slamcoin.svg" alt=""/>
                  </div>
                  <p className="card-title">Slamcoin</p>
                  <span className="content-token">$SLM</span>
                  <p className="card-left">{slam}</p>
                  <p className="card-left-other">$ {parseFloat(slam*tokenPrice).toFixed(2)}</p>
                  <div className="graph">
                    <img src="/image/graph.png" alt=""/>
                  </div>
                  <p className="card-detail">{t('BNBRequired')}</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-6 card-row">
                <div className={coin == 'BNB' ? "content-card" : "content-card transparent"} onClick={e=>{setMaxInput(bnbBalance); setMaxInputVal(""); setCardContent('BNB', '/image/bnb.svg', parseFloat(bnbBalance).toFixed(4), parseFloat(bnbBalance*bnbPrice).toFixed(2), 0.001);}}>
                  <div className="card-img" id={2}>
                    <img src="../image/bnb.svg" alt=""/>
                  </div>
                  <p className="card-title">BNB(Bep-20)</p>
                  <span className="content-token">BNB</span>
                  <p className="card-left">{parseFloat(bnbBalance).toFixed(4)}</p>
                  <p className="card-left-other">$ {parseFloat(bnbBalance*bnbPrice).toFixed(2)}</p>
                  <div className="graph">
                    <img src="../image/graph.png" alt=""/>
                  </div>
                  {(bnbBalance == 0 && providerError) &&
                  <div className="text-right">
                    <i className="sync alternate icon" onClick={e => {getBNBBalanceBE(address)}} />
                  </div>}
                </div>
              </div>
              {/* <div className="col-lg-4 col-md-6 col-6 card-row">
                <div className="content-card transparent" onClick={e=>{setCoin('BTC')}}>
                  <div className="card-img" id={3}>
                    <img src="../image/btc.svg" alt=""/>
                  </div>
                  <p className="card-title">Bitcoin</p>
                  <span className="content-token">BTC</span>
                  <p className="card-left">0.0000</p>
                  <p className="card-left-other">$ 0.00</p>
                  <div className="graph">
                    <img src="../image/graph.png" alt=""/>
                  </div>
                  <p className="card-detail">&nbsp;</p>
                </div>
              </div> */}
              <div className="col-lg-4 col-md-6 col-6 card-row">
                <div className={coin == 'ETH' ? "content-card" : "content-card transparent"} onClick={e=>{setMaxInput(ethBalance); setMaxInputVal(""); setCardContent('ETH', '/image/eth.svg', parseFloat(ethBalance).toFixed(4), parseFloat(ethBalance*ethPrice).toFixed(2), 0.00012);}}>
                  <div className="card-img" id={5}>
                    <img src="/image/eth.svg" alt=""/>
                  </div>
                  <p className="card-title">Ethereum(ERC-20)</p>
                  <span className="content-token">ETH</span>
                  <p className="card-left">{parseFloat(ethBalance).toFixed(4)}</p>
                  <p className="card-left-other">$ {parseFloat(ethBalance*ethPrice).toFixed(2)}</p>
                  <div className="graph">
                    <img src="../image/graph.png" alt=""/>
                  </div>
                  {(ethBalance == 0 && providerError) &&
                  <div className="text-right">
                    <i className="sync alternate icon" onClick={e => {getETHBalanceBE(address)}} />
                  </div>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 right-side">
            <div id="change-coin">
              <div className="right-head">
                <img src={coinImg} alt=""/>
              </div>
              <p className="right-head-title">{coinBalance} {coin}</p>
              <p className="right-small-title">$ {(coin == '$SLM' && coinBalanceUsd == 0) ? parseFloat(slam*tokenPrice).toFixed(2) : coinBalanceUsd}</p>
              
              {coin == '$SLMs' &&
                <a className="receive btn send-btn" style={{width:48+'%'}}>
                    <i className="fa fa-arrow-up" />
                    {t('Send')}
                </a>
              }

              <a className="receive btn receive-btn" style={{width:48+'%'}}>
                <i className="fa fa-arrow-down" />
                &nbsp;{t('RECEIVE')}
              </a>
            </div>
            
            <div className="qrcode">
              <div>
                <QRCode
                  value={address}
                  className="qr-img"
                  level={"H"}
                  includeMargin={true}
                />
                <div className="qrcode-walletaddress">
                  <p>{address.slice(0,17)}...</p>
                  <div className="copy-icon-qr copy-icon" onClick={addresscopy}>
                    <p className="copy-qr-wallet" />
                    <p className="copy-again-qr-wallet" />
                    <div className="toast copy1">
                      <div className="toast-copy">
                        {t('Copied')}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              <a className="receive btn close-btn">
                {t('CLOSE')}
              </a>
            </div>
            
            {coin != "$SLM" && 
            <div className="send">
              <input type="number" min={0} step={0.000001} placeholder={t('Amount')} className="form-control send-input" value={modalInput} onChange={e=>{maxcheck(e.target.value)}}/>
              <p style={{color:'#4b94f2', cursor:'pointer', fontSize:'13px'}} onClick={e=>{setMaxInputVal(maxInput)}}>{parseFloat(maxInput).toFixed(5)} (max)</p>
              <p className="send-warning">{t('FormFieldRequired')}</p>
              <input type="text" placeholder={t('Wallet')} className="form-control send-input-wallet" onChange = {(e) => {setRecipientWallet(e.target.value)}} />
              <p className="send-warning-wallet">{t('FormFieldRequired')}</p>
              {/* <p className="fee">Network fee: ~0.00042000</p> */}
              <p><small className="fee">(Network fee will be included)</small></p>
              <a className="btn send-close">
                {t('CLOSE')}
              </a>

              <Popup wide trigger={<Button content={t('Send')} className="send-send" onClick={()=>{setTransferMode("send")}} />} on='click' offset={[-30, 50]}
              position='bottom center' style={{borderRadius:'10px'}}   open={isOpen}
              onOpen={handleOpen}>
                <Grid style={{width:'230px'}} >
                  <Grid.Column style={{textAlign:'center', padding:'5px'}} >
                    <h3 className="popover-header" style={{fontSize:'15px'}}>{t('SendMoney')}?</h3>
                    <br/>
                    <Button color='red' content={t('Decline')} style={{padding:'5px', width:'30%', marginRight:'10%'}} onClick={handleClose}/>
                    <Button color='green' content={t('Approve')} style={{padding:'5px', width:'30%'}} onClick={sendCryptobalance} />
                  </Grid.Column>
                </Grid>
              </Popup>
                      
              <Modal
                className="buy-modal"
                closeIcon
                open={openBnbOut}
                onClose={() => setOpenBnbOut(false)}
                onOpen={() => setOpenBnbOut(true)}
              >
              <div className="modal-content">
                  <div className="modal-body text-center">
                      <p>{t('TransferSuccessed')}</p>
                  </div>
                </div>
              </Modal>
              <div id="send-popup" className="hide" style={{display: 'none'}}>
              </div>
            </div>
            }
            <p className="transactions">{t('Transactions')}</p>
            <div className="transaction">
              <img src="/image/transaction.svg" className="wallet-icon" alt=""/>
              <p className="public-wallet">{coin}</p>
              {/* <p className="wallet-decimal">{lastDate}</p>
              <p className="right-transaction">{lastAmount}</p>
              <p className="right-symbol">~ $ {(lastAmount*tokenPrice).toFixed(2)}</p> */}
            </div>
            <div className="out-wallet">
              <p className="out-wallet-title">{t('OutWallet')}</p>
              <p className="outwallet-token">{address}</p>
            </div>
            <hr />
            <p className="all-trans" style={{textAlign:'center'}}>ALL {t('Transactions')}</p>
            <div className="table transactionTable">
              <table>
                <tbody>
                {transaction.slice(0).reverse().map((tx, index) => (
                    <tr key={index}>
                      <td>{index+1}</td> 
                      <td>{Math.abs(tx.slam)} $SLM</td> 
                      <td>{tx.eth} {tx.bnb}</td> 
                      <td>{tx.created_at}</td> 
                      {/* <i className="fa fa-copy trans-copyicon" onClick={txcopy(tx.hash)}></i>    */}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal
            className="buy-modal"
            closeIcon
            open={providerErrorDialog}
            onClose={() => setProviderErrorDialog(false)}
            onOpen={() => setProviderErrorDialog(true)}
          >
          <div className="modal-content">
            <div className="modal-body text-center">
              {t('NetIssus')}
            </div>
          </div>
          </Modal>

          
          </LoadingOverlay>

      </div>
    );
  }

  