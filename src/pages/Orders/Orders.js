import React, { useState, useEffect } from 'react';
import { Spinner, IconButton, useToast, Badge, Button } from '@chakra-ui/react';
import {
	getOrders,
	getReadOrders,
	markViewed,
	removeOrder,
	getUnReadOrders
} from '../../services/orders';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BsChevronDown } from 'react-icons/bs';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

function Orders() {
	const classes = useStyles();
	const toast = useToast();
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
				setLoading(false);
			}
		} catch (err) {}
	};

	const deleteOrder = async (id) => {
		setLoading(false);
		try {
			let { data } = await removeOrder(id);
			if (data) {
				toast({
					title: 'Deleted.',
					description: 'Order has been deleted',
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top-right'
				});
				let { data: obj } = await getOrders();
				setOrders(obj.orders);
			}
		} catch (err) {
			toast({
				title: 'Error.',
				description: 'Something went wrong',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top-right'
			});
		}
	};

	const Read = async (id) => {
		try {
			let { data } = await markViewed(id);
			if (data) {
				toast({
					title: 'Done.',
					description: 'Marked as Read',
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top-right'
				});
				let { data: obj } = await getOrders();
				console.log(obj);
				setOrders(obj.orders);
			}
		} catch (err) {
			toast({
				title: 'Error.',
				description:  'Something went wrong',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top-right'
			});
		}
	};

	const viewRead = async () => {
		try {
			let { data } = await getReadOrders();
			console.log(data);
		} catch (err) {}
	};

	const viewUnRead = async () => {
		try {
			let { data } = await getUnReadOrders();
			console.log(data);
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
					{orders.length <= 0 ? (
						<h3
							style={{
								font: 'normal normal bold 25px/30px Lato',
								color: '#1f2833'
							}}
						>
							You have {orders.length} orders
						</h3>
					) : (
						<div>
							<div className="d-flex">
								<div className="flex-grow-1">
									<h3
										style={{
											font: 'normal normal bold 25px/30px Lato',
											color: '#1f2833'
										}}
									>
										Available Orders
									</h3>
									<h6
										className="mt-3"
										style={{
											font: 'normal normal bold 16px/19px Lato',
											color: '#1f2833'
										}}
									>
										You have {orders.length} orders{' '}
									</h6>{' '}
								</div>

								<div>
									<Menu>
										<MenuButton as={Button} rightIcon={<BsChevronDown />}>
											Sort by
										</MenuButton>
										<MenuList>
											<MenuItem onClick={() => viewRead()}>Read</MenuItem>
											<MenuItem onClick={() => viewUnRead()}>Unread</MenuItem>
										</MenuList>
									</Menu>
								</div>
							</div>

							<div
								style={{ background: '#fff', borderRadius: '8px' }}
								className="p-4 mt-3"
							>
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
												<TableCell
													align="left"
													style={{
														font: 'normal normal bold 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{' '}
													Read{' '}
												</TableCell>
												<TableCell />
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
															font:
																'normal normal normal 16px/19px Lato',
															color: '#7A7A7A'
														}}
													>
														{row.fullname}
													</TableCell>
													<TableCell
														align="left"
														style={{
															font:
																'normal normal normal 16px/19px Lato',
															color: '#7A7A7A'
														}}
													>
														{row.productName}
													</TableCell>
													<TableCell
														align="left"
														style={{
															font:
																'normal normal normal 16px/19px Lato',
															color: '#7A7A7A'
														}}
													>
														{row.size}
													</TableCell>
													<TableCell
														align="left"
														style={{
															font:
																'normal normal normal 16px/19px Lato',
															color: '#7A7A7A'
														}}
													>
														{row.color}
													</TableCell>
													<TableCell
														align="left"
														style={{
															font:
																'normal normal normal 16px/19px Lato',
															color: '#7A7A7A'
														}}
													>
														{row.phone}
													</TableCell>
													<TableCell align="left">
														{row.isRead === false && (
															<Badge colorScheme="red">
																Not Read
															</Badge>
														)}
														{row.isRead === true && (
															<Badge colorScheme="purple">Read</Badge>
														)}
													</TableCell>

													<TableCell>
														<Button
															onClick={() => Read(row._id)}
															size="sm"
														>
															Mark as read
														</Button>
													</TableCell>
													<TableCell align="left">
														<IconButton
															onClick={() => deleteOrder(row._id)}
															isLoading={loading}
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
			)}
		</div>
	);
}

export default Orders;
