import React, { useState } from 'react';
import CountrySelect from 'react-bootstrap-country-select';
import '../../css/style.css'

export default function SelectCountry() {
	const [value, setValue] = React.useState(null);
	return (
		<div id='auth-pad-10'>
			<CountrySelect
				value={value}
				onChange={setValue}
				matchNameFromStart={false}
				matchAbbreviations
				required
			/>
		</div>
	)
}
