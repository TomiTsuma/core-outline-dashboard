'use client'
import DataCard from "@/Dashboard/FinancialAnalytics/components/data-cards/cards"
import "../styles/style.css"
import React from 'react'
import LineGraph from "@/components/visualizations/line";
import BarGraph from "@/components/visualizations/bar";
import { useState, useEffect} from 'react'
import { DataSourceSelection } from "../../DataSources/components/dataSourceSelection";
import QuerySelection from "@/Dashboard/DataSources/components/querySelection";
import CustomWidget from "@/Dashboard/FinancialAnalytics/components/custom-widget/customWidget";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "@/constants/colors";
import BreakDown from "../components/breakdownContainer/breakDown";
import { commafyNumber } from "@/helpers/commafy";


export default function Financials(){
    const data = [
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          cv: 4908,
          dv: 1908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          cv: 2133,
          dv: 611,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          cv: 6774,
          dv: 1233,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          cv: 722,
          dv: 1111,
          amt: 2100,
        },
    ];
    const mrr = [
        {
          name: 'January',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'February',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'March',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'April',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'May',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'June',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'July',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
        {
            name: 'August',
            uv: 2410,
            pv: 5215,
            amt: 2100,
        },
        {
            name: 'September',
            uv: 8239,
            pv: 2000,
            amt: 2100,
        },
        {
            name: 'October',
            uv: 1000,
            pv: 2000,
            amt: 2100,
        },
        {
            name: 'November',
            uv: 6000,
            pv: 7120,
            amt: 2100,
        },
        {
            name: 'December',
            uv: 4500,
            pv: 3100,
            amt: 2100,
        },
    ];

    const [MRR, setMRR] = useState([])
    const [averContractValue, setAverContractValue] = useState([])
    const [monthlyGrossValue, setMonthlyGrossValue] = useState([])
    const [monthlyNetValue, setMonthlyNetValue] = useState([])
    const [dataSourcesWidgetVisible, showDataSourcesWidget] = useState(false) 
    const [queryWidgetVisible, showQueryWidget] = useState(false)

    const [customMetrics, setCustomMetrics] = useState([
        {
            id: 1,
            name: 'Monthly Recurring Revenue',
            data: mrr
        },
        {
            id: 2,
            name: 'Average Monthly Recurring Revenue',
            data: mrr
        },
        {
            id: 3,
            name: 'Net Revenue',
            data: mrr
        },
        {
            id: 4,
            name: 'Fees',
            data: mrr
        },
        {
            id: 5,
            name: 'Annual Run Rate',
            data: mrr
        }
    ])

    const selectDataSource=()=>{
        showDataSourcesWidget(true)

    }
    const selectQuery=()=>{
        showQueryWidget(true)
        showDataSourcesWidget(false)

    }
    return(
        <div className='section-container'>
                <h1>Robodine</h1>
                {
                    dataSourcesWidgetVisible?
                    <DataSourceSelection onDataSourceSelected={selectQuery}></DataSourceSelection>
                    :
                    queryWidgetVisible?
                    <QuerySelection></QuerySelection>
                    :
                    null
                }
                
                <div style={{ width:'100%', display: "flex", flexDirection:"row", justifyContent:'space-between' }}>
                    <div style={{ width:'65%', display: "flex", flexDirection:"column" , alignItems:'flex-start'}}>
                        <div style={{ width:'100%', display: "flex", flexDirection:"row", justifyContent:'space-between' }}>
                            <DataCard title={'Monthly Recurring Revenue'} x={['uv']} width={'40%'} height={'40%'} type='bar' data={data} selectDataSource={selectDataSource}></DataCard>
                            <DataCard title={'Average Contract Value'} x={['uv']} width={'40%'} height={'40%'} type='bar' data={data}></DataCard>
                            <DataCard title={'Monthly Gross Value'} x={['uv']} width={'40%'} height={'40%'} type='bar' data={data}></DataCard>
                            <DataCard title={'Monthly Net Value'} x={['uv']} width={'40%'} height={'40%'} type='bar' data={data}></DataCard>
                        </div>
                        <div className="mrr-growth-container">
                            <h2>ACCOUNT & MONTHLY RECURRING REVENUE GROWTH</h2>

                            <div className="description-container">
                                <div className="mrr-description">
                                    <h2>Ksh. {commafyNumber(mrr.reduce((accumulator, current) =>{ return accumulator + current.uv;}, 0))}</h2>
                                    <h1>MRR</h1>
                                    <p>Measure of how fast your monthly recurring revenue is growing.</p>
                                </div>
                                <div className="mrr-description">
                                    <h2>Ksh. {commafyNumber(mrr.reduce((accumulator, current) =>{ return accumulator + current.pv;}, 0))}</h2>
                                    <h1>Avg. MRR/Customer</h1>
                                    <p>Measure of the revenue generated by each user over a given period of time, taken as an average.</p>
                                </div>
                            </div>
                            <LineGraph
                            keys = {['uv','pv']}
                            data = {mrr}
                            width = {'100%'}
                            xaxis = {'name'}
                            yaxis = {'uv'}
                            type = {'natural'}
                            height = {400}></LineGraph>

                        </div>
                        <div className="custom-widget-container">
                            {
                                customMetrics.map((metric)=>{
                                    return <CustomWidget key={metric.id} name={metric.name} data={metric.data}></CustomWidget>
                                })
                            }
                        </div>
                            
                    </div>

                    <div style={{ width:'30vw', display: 'flex', flexDirection:'column', alignItems:'flex-end'}}>
                        <div className="financial-monitoring-container">
                    <h2>FINANCIAL MONITORING</h2>
                    <p>July 16,2023 - October 16,2023</p>
                    <div class="grid-container">
                        <div class="grid-item">
                        <h1>{commafyNumber(387098)}</h1>
                        <h2>ACCOUNTS RECEIVABLE</h2>
                        </div>
                        <div class="grid-item">
                        <h1>{commafyNumber(387098)}</h1>
                        <h2>ACCOUNTS PAYABLE</h2>
                        </div>
                        <div class="grid-item">
                        <h1>{commafyNumber(387098)}</h1>
                        <h2>MONTHLY BURN</h2>
                        </div>
                        <div class="grid-item">
                        <h1>{commafyNumber(387098)}</h1>
                        <h2>NET MONTHLY BURN</h2>
                        </div>
                    </div>
    
                    <div class="financial-monitoring-graphs">
                        <div className="label-container">
                            <h1>JUL</h1>
                        </div>
                        
                        
                        <div className="bar-graph-container">
                        <BarGraph
                            color={["#000"]}
                            data = {data}
                            width = {90}
                            height = {70}
                            x = {['uv']}></BarGraph>
                        </div>
                    </div>
                    <div class="financial-monitoring-graphs">
                        <div className="label-container">
                            <h1>AUG</h1>
                        </div>
                        <div className="bar-graph-container">
                        <BarGraph
                            color={["#000"]}
                            data = {data}
                            width = {90}
                            height = {70}
                            x = {['pv']}></BarGraph>
                        </div>
                    </div>
                    <div class="financial-monitoring-graphs">
                        <div className="label-container">
                            <h1>SEP</h1>
                        </div>
                        <div className="bar-graph-container">
                            <BarGraph
                            color={["#000"]}
                            data = {data}
                            width = {90}
                            height = {70}
                            x = {['cv']}></BarGraph>
                        </div>
                    </div>
                    <div class="financial-monitoring-graphs">
                        <div className="label-container">
                            <h1>OCT</h1>
                        </div>
                        <div className="bar-graph-container">
                            <BarGraph
                            color={["#000"]}
                            data = {data}
                            width = {90}
                            height = {70}
                            x = {['dv']}></BarGraph>
                        </div>
                    </div>
                        </div>
                        {
                            customMetrics.map((metric)=>{
                                return <BreakDown key='id' title={metric.name}></BreakDown>
                            })
                        }                        
                        
                    </div>
                </div>
                
        </div>
    )
}