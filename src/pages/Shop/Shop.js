import React, { useState, useEffect } from 'react';
import './Shop.css';
import { Button, useDisclosure, Spinner, IconButton, useToast } from '@chakra-ui/react';
import { getProducts, removeProduct } from '../../services/shop';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import ShopForm from './ShopForm';
import moment from 'moment';
import {RiDeleteBin2Line} from 'react-icons/ri'

function Shop() {
	const toast = useToast()
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ product, setProduct ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

	const Products = async () => {
		try {
			let { data } = await getProducts();
			setProduct(data.products);
			setLoading(false);
		} catch (err) {}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const deleteProduct = async (id) => {
		setLoading(false);
		try {
			let { data } = await removeProduct(id);
			if (data) {
				toast({
					title: 'Deleted.',
					description: 'Product has been deleted',
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top-right'
				});
				let { data: obj } = await getProducts();
				setProduct(obj.products);
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

	useEffect(() => {
		Products();
	}, []);

	return (
		<div>
			{
				loading ? (
					<div className="text-center" style={{ marginTop: 100 }}>
					<Spinner size="xl" style={{ color: '#1B2F5E' }} />
				</div>
				) : (
					<div>
					<div className="d-flex justify-content-end mb-5">
					<Button onClick={onOpen} style={{ background: '#1f2833', color: '#fff' }}>
						Add Product
					</Button>
				</div>
	
				<ShopForm isOpen={isOpen} Close={onClose}/>
	
				<h4
					style={{
						font: 'normal normal bold 16px/19px Lato',
						color: '#7A7A7A'
					}}
					className="mb-3"
				>
					Products ({product.length})
				</h4>
	
				<div style={{ background: '#fff', borderRadius: '8px' }} className="p-4">
					<TableContainer>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell
										style={{
											font: 'normal normal bold 16px/19px Lato',
											color: '#7A7A7A'
										}}
									>
										Name
									</TableCell>
									<TableCell
										align="left"
										style={{
											font: 'normal normal bold 16px/19px Lato',
											color: '#7A7A7A'
										}}
									>
										Price
									</TableCell>
									<TableCell
										align="left"
										style={{
											font: 'normal normal bold 16px/19px Lato',
											color: '#7A7A7A'
										}}
									>
										Sizes
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
										Quantity
									</TableCell>
									<TableCell
										align="left"
										style={{
											font: 'normal normal bold 16px/19px Lato',
											color: '#7A7A7A'
										}}
									>
										Created At
									</TableCell>
									<TableCell />
									<TableCell />
								</TableRow>
							</TableHead>
								<TableBody>
									{product
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => (
											<TableRow key={row.productName}>
												<TableCell
													component="th"
													scope="row"
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
													{row.price}
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{row.sizes.map((data, i) => {
														return <div>{data}</div>;
													})}
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{row.colors.map((data, i) => {
														return <div>{data}</div>;
													})}
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{' '}
													{row.quantity}
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{moment(row.createdAt).format('MMM Do YY')}
												</TableCell>
												<TableCell align="left">
														<IconButton
															onClick={() => deleteProduct(row._id)}
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
					<TablePagination
						rowsPerPageOptions={[ 5 ]}
						component="div"
						count={product.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</div>
				</div>
				)
			}
		
		</div>
	);
}

export default Shop;
