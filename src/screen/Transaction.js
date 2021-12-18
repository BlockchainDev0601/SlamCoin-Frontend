import React, { useState, useEffect } from "react";
import { useTable, usePagination } from 'react-table'
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

import TransactionItem from "../components/transactionItem";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSetting } from '../actions/projectSetting';
function TransactionPagination(props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns: props.columns,
            data: props.data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )
    return (
        <>
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            <div {...getTableBodyProps()}>
                {page.map((row, i) => {
                    return (
                        <div className="transaction-items">
                            <TransactionItem status={row.original["status"]} tokenType={row.original["tokenType"]} tokenName={row.original["tokenName"]} itemDate={row.original["itemDate"]} itemNetwork={row.original["itemNetwork"]} itemAddress={row.original["itemAddress"]} itemTxID={row.original["itemTxID"]} depositWallet={row.original["depositWallet"]} onClickCopyBtn={props.onClickCopyBtn} />
                        </div>
                    )

                })}
            </div>
            {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
            <div className="pagination">

                <div className="pageControl">
                    <button className="btnfirst" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'First'}
                    </button>
                    <button className="btnprev" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>
                    {/* <input
                        type="number"
                        value={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '40px', height: '40px' }}
                    /> */}
                    <div className="pageNum">
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                    </div>
                    <button className="btnnext" onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                    <button className="btnlast" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'Last'}
                    </button>
                </div>

            </div>
        </>
    )
}
function Transaction(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay);
    const [showCopied, setShowCopied] = useState(false);
    const [sideBarShow, setSideBarShow] = useState(false);
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

    useEffect(() => {
        if (showCopied == true) {
            const timer = setInterval(() => {
                setShowCopied(false);
                clearInterval(timer);
            }, 5000);
        }
    }, [showCopied]);
    const columns = React.useMemo(
        () => [

            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Visits',
                accessor: 'visits',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
            },
        ]
    )
    const data = [{
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }, {
        "status": "completed",
        "tokenType": "SLM",
        "tokenName": "22 $SLM",
        "itemDate": "2021-11-18 05:23",
        "itemNetwork": " BSC",
        "itemAddress": "0x111aed06e421465442eq0462x1234e12f2131e364fcv970",
        "itemTxID": "0xeac464...453210",
        "depositWallet": "Spot Wallet",
    }]
    return (
        <div className={!isDay ? "NightMode" : ""}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />

            <div className="content TransactionComponent">
                <SideBar page="Transaction" showCopied={showCopied} sideBarShow={sideBarShow} isDay={isDay} onSetDayStatus={onSetDayStatus} />
                <div className="main-content ">
                    <div className="automargin_content">
                        <p className="title">Transactions</p>
                        <div className="recent-transactions">
                            {/* <p className="title">Recent Transactions</p> */}
                            <TransactionPagination data={data} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

Transaction.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
});

export default connect(mapStateToProps, { setSetting })(
    Transaction
);