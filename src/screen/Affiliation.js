import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table'
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSetting } from '../actions/projectSetting';
function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
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
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    // Render the UI for your table
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
            <table {...getTableProps()}>
                <thead>
                    <tr className="table-header">
                        <th>Time</th>
                        <th>Email</th>
                        <th>Asset</th>
                        <th>Invest Amount</th>
                        <th>3% Bonus</th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        return (
                            <tr>
                                <td className="column-time">{row.original["column-time"]}</td>
                                <td className="column-email">{row.original["column-email"]}</td>
                                <td className="column-asset">{row.original["column-asset"]}</td>
                                <td className="column-investAmount">{row.original["column-investAmount"]}</td>
                                <td className="column-bonus">{row.original["column-bonus"]}</td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
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
function Affiliation(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay);
    const [sideBarShow, setSideBarShow] = useState(false);
    const onSetDayStatus = () => {
        let tempDay = isDay;
        setIsDay(!tempDay);
        props.setSetting(!tempDay);
    }
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
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }, {
        "column-time": "2021-10-03 20:46:35",
        "column-email": "radause@***",
        "column-asset": "BONUS",
        "column-investAmount": 0,
        "column-bonus": 8571.4286999999999
    }];
    const onClickSideBarShow = () => {
        setSideBarShow(!sideBarShow);
    }
    return (
        <div className={!isDay ? "NightMode" : ""}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />

            <div className="content AffiliationComponent">
                <SideBar page="Affiliation" sideBarShow={sideBarShow} isDay={isDay} onSetDayStatus={onSetDayStatus} />
                <div className="main-content ">
                    <div className="automargin_content">
                        <p className="title">Affiliation</p>
                        <div className="affiliation">
                            <Table columns={columns} data={data} />
                            <div className="bottom">
                                <div className="total">Total Affiliation</div>
                                <div className="total_value">0 $SLM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Affiliation.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
});

export default connect(mapStateToProps, { setSetting })(
    Affiliation
);