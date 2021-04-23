import React, { useEffect, useState } from 'react';
import './Members.css';
import { Input, Button, Spinner, useToast } from '@chakra-ui/react';
import { getUsers } from '../../services/member';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import moment from 'moment';
import { removeMember } from '../../services/member';

function Members() {
	const toast = useToast();
	const [ user, setUser ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ filter, setFilter ] = useState([]);

	const getMembers = async () => {
		try {
			let { data } = await getUsers();
			setUser(data.members);
			setFilter(data.members);
			setLoading(false);
		} catch (err) {}
	};

	const deleteMember = async (id) => {
		setLoading(false);
		try {
			let { data } = await removeMember(id);
			if (data) {
				toast({
					title: 'Deleted.',
					description: data.message,
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top-right'
				});
				let { data: obj } = await getUsers();
				setUser(obj.admins);
				setFilter(obj.admins);
			}
		} catch (err) {
			toast({
				title: 'Error.',
				description: err.message || 'Something went wrong',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top-right'
			});
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const Search = (e) => {
		let string = e.target.value;
		if (string.length >= 1) {
			let data = user.filter((content) =>
				content.fullName.toLowerCase().includes(string.toLowerCase())
			);
			setFilter(data);
		}
	};

	useEffect(() => {
		getMembers();
	}, []);
	return (
		<div>
			{loading ? (
				<div className="text-center" style={{ marginTop: 100 }}>
					<Spinner size="xl" style={{ color: '#1B2F5E' }} />
				</div>
			) : (
				<div>
					<div style={{ width: '450px' }} className="mb-3 mt-3">
						<div className="flex-fill">
							<Input
								type="text"
								placeholder="Search..."
								variant="filled"
								onChange={Search}
							/>
						</div>
					</div>

					<div style={{ background: '#fff', borderRadius: '8px' }} className="p-4">
						<TableContainer>
							<Table aria-label="simple table" size="small">
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
											Email
										</TableCell>
										<TableCell
											align="left"
											style={{
												font: 'normal normal bold 16px/19px Lato',
												color: '#7A7A7A'
											}}
										>
											Gender
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
											Talent
										</TableCell>
										<TableCell
											align="left"
											style={{
												font: 'normal normal bold 16px/19px Lato',
												color: '#7A7A7A'
											}}
										>
											Address
										</TableCell>
										<TableCell
											align="left"
											style={{
												font: 'normal normal bold 16px/19px Lato',
												color: '#7A7A7A'
											}}
										>
											Date of Birth
										</TableCell>
										<TableCell />
										<TableCell />
									</TableRow>
								</TableHead>

								<TableBody>
									{filter
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => (
											<TableRow key={row._id}>
												<TableCell
													component="th"
													scope="row"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													<div className="d-flex">{row.fullName}</div>
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{row.email}
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{row.gender}
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
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{' '}
													{row.talent}
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{row.address}
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{moment(row.dateOfBirth).format('MMM Do YY')}
												</TableCell>
												<TableCell>
													<Button
														leftIcon={<FaEdit />}
														style={{ background: 'none' }}
													>
														Edit
													</Button>
												</TableCell>
												<TableCell>
													<Button
														leftIcon={<MdDelete />}
														onClick={() => deleteMember(row._id)}
														isLoading={loading}
														style={{ background: 'none' }}
													>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[ 5 ]}
							component="div"
							count={user.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Members;
