import React, {} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Paper, TableContainer } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setAppraisals } from "../store";

const columns = [
	{
		field: "vessel_name",
		headerName: "Vessel",
		width: 130
	},
	{
		field: "CA_ASSESSMENT_DATE",
		headerName: "Assessment Date",
		width: 230
	},
	{
		field: "CA_ASSESSOR_NAME",
		headerName: "Assessor Name",
		width: 230
	},
	{
		field: "type",
		headerName: "Type",
		width: 130
	},
	{
		field: "employment_status",
		headerName: "Employment Status",
		width: 230
	},
];
function BodyContent(props) {		
	const dispatch = useDispatch();
	const appraisals = useSelector(state=>state.crewApp.crew_details.appraisals.list);
	const [state, setState] = React.useState({
		rows: []
	});

	React.useEffect(() => {
		if (appraisals) {
			setState({
				...state,
				rows: appraisals.map(appraisal => ({
					...appraisal,	
					vessel_name: appraisal.vessel ? appraisal.vessel.VESSEL_NAME : "",
					employment_status: appraisal.employ_status ? appraisal.employ_status.ES_DESCR : "",		
					type: appraisal.CA_TYPE == 1 ? "Appraisal" : appraisal.CA_TYPE == 2 ? "Discharge" : ""
				}))
			})
		}

	}, [appraisals])

	const handleSelectRow = (event) => {
		dispatch(setAppraisals(event.data))
	}
	return <React.Fragment>
		<TableContainer component={Paper} className="w-full h-full">
			<DataGrid 
				rows={state.rows}
				columns={columns}		
				rowHeight={25}	
				onRowClick={event => handleSelectRow(event)}
			/>
		</TableContainer>
	</React.Fragment>
}

export default BodyContent;
