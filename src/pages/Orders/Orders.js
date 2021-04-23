import React, { useState, useEffect } from 'react';
import { Spinner, IconButton } from '@chakra-ui/react';
import { getOrders } from '../../services/orders';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { RiDeleteBin2Line } from 'react-icons/ri';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

function Orders() {
	const classes = useStyles();
	const [ orders, setOrders ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const retrieveOrders = async () => {
		try {
			let { data } = await getOrders();
			if (data.orders.length <= 0) {
				setOrders([]);
				setLoading(false);
			} else if (data.orders) {
				setOrders(data.orders);
				console.log(data.orders);
				setLoading(false);
			}
		} catch (err) {}
	};

	useEffect(() => {
		retrieveOrders();
	}, []);
	return (
		<div>
			{loading ? (
				<div className="text-center" style={{ marginTop: 100 }}>
					<Spinner size="xl" style={{ color: '#1B2F5E' }} />
				</div>
			) : (
				<div>
					<h3
						style={{
							font: 'normal normal bold 25px/30px Lato',
							color: '#1f2833'
						}}
					>
						Orders
					</h3>
					<h6
						className="mt-3"
						style={{
							font: 'normal normal bold 16px/19px Lato',
							color: '#1f2833'
						}}
					>
						You have {orders.length} orders{' '}
					</h6>

					<div style={{ background: '#fff', borderRadius: '8px' }} className="p-4 mt-3">
						<TableContainer>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell
											style={{
												font: 'normal normal bold 16px/19px Lato',
												color: '#7A7A7A'
											}}
										>
											Buyer
										</TableCell>
										<TableCell
											align="left"
											style={{
												font: 'normal normal bold 16px/19px Lato',
												color: '#7A7A7A'
											}}
										>
											Product
										</TableCell>
										<TableCell
											align="left"
											style={{
												font: 'normal normal bold 16px/19px Lato',
												color: '#7A7A7A'
											}}
										>
											Size
										</TableCell>
										<TableCell
											align="left"
											style={{
												font: 'normal normal bold 16px/19px Lato',
												color: '#7A7A7A'
											}}
										>
											Color
										</TableCell>
										<TableCell
											align="left"
											style={{
												font: 'normal normal bold 16px/19px Lato',
												color: '#7A7A7A'
											}}
										>
											Phone Number
										</TableCell>
										<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									{orders.map((row) => (
										<TableRow key={row._id}>
											<TableCell
												component="th"
												scope="row"
												style={{
													font: 'normal normal normal 16px/19px Lato',
													color: '#7A7A7A'
												}}
											>
												{row.fullname}
											</TableCell>
											<TableCell
												align="left"
												style={{
													font: 'normal normal normal 16px/19px Lato',
													color: '#7A7A7A'
												}}
											>
												{row.productName}
											</TableCell>
											<TableCell
												align="left"
												style={{
													font: 'normal normal normal 16px/19px Lato',
													color: '#7A7A7A'
												}}
											>
												{row.size}
											</TableCell>
											<TableCell
												align="left"
												style={{
													font: 'normal normal normal 16px/19px Lato',
													color: '#7A7A7A'
												}}
											>
												{row.color}
											</TableCell>
											<TableCell
												align="left"
												style={{
													font: 'normal normal normal 16px/19px Lato',
													color: '#7A7A7A'
												}}
											>
												{row.phone}
											</TableCell>
											<TableCell align="left">
												<IconButton
                                                colorScheme="red"
													icon={
														<RiDeleteBin2Line
															style={{ fontSize: 20 }}
														/>
													}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
			)}
		</div>
	);
}

export default Orders;
