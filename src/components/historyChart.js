import React, {useEffect, useMemo} from 'react';

import { Chart } from "react-charts";

import UseDemoConfig from "../config/useDemoConfig";
import UseLagRadar from "../config/useLagRadar";
import ResizableBox from "../config/ResizableBox";
// var React = require('react');
// var Component = React.Component;
//import  CanvasJSReact from 'canvasjs.react';
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSChart.CanvasJS;

export default function HistoryChart() {

	// UseLagRadar();

	const {
		data,
		primaryAxisShow,
		secondaryAxisShow,
		randomizeData,
		Options
	} = UseDemoConfig({
		series: 1,
		show: ["primaryAxisShow", "secondaryAxisShow"]
	});

	const axes = useMemo(
		() => [
			{
				primary: true,
				position: "bottom",
				type: "ordinal",
				show: primaryAxisShow
			},
			{ position: "left", type: "linear", show: secondaryAxisShow }
		],
		[primaryAxisShow, secondaryAxisShow]
	);
	return (
		<div>
			
			<ResizableBox>
				<Chart data={data} axes={axes} tooltip />
			</ResizableBox>
		</div>

	);

}

