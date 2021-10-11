<template>
	<div class="container mx-auto mt-12">
		<table>
			<thead>
				<tr>
					<th>Sun</th>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="1" />
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
				</tr>
				<tr>
					<td>7</td>
					<td>8</td>
					<td class="marked">
						9
					</td>
					<td>10</td>
					<td>11</td>
					<td>12</td>
					<td>13</td>
				</tr>
				<tr>
					<td>14</td>
					<td>15</td>
					<td>16</td>
					<td>17</td>
					<td>18</td>
					<td class="marked">
						19
					</td>
					<td>20</td>
				</tr>
				<tr>
					<td>21</td>
					<td class="marked">
						22
					</td>
					<td>23</td>
					<td>24</td>
					<td>25</td>
					<td>26</td>
					<td>27</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'Calendar'
}
</script>

<style scoped lang="scss">
*{
    box-sizing: border-box;
	table {
		width: 100%;
		height: 100%;
	}



	th, tr, td {
        border: 1px solid #C7D6E3;
		text-align: center;
	}

	td {
		padding: 7px;
		margin: 2px;
		cursor: pointer;
            padding-top: 2rem;
    padding-bottom: 2rem;
	}

	tr {
		padding-top: 8px;
		padding-bottom: 8px;
	}

	th {
		font-weight: bold;
        font-size: 16px;
        text-transform: uppercase;
        color: #8B9EB1;
        padding: 0.5rem 1rem;
	}


}
</style>

