import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import { Button, useDisclosure, Input, Spinner, useToast } from '@chakra-ui/react';
import { getAdmins, removeAdmin } from '../../services/admins';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import EditUser from './EditUser'

function Users() {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ user, setUser ] = useState([]);
	const [ admin, setAdmin ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const [ open, setOpen ] = useState(false);
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ filter, setFilter ] = useState([]);

	const getAllAdmins = async () => {
		try {
			let { data } = await getAdmins();
			setUser(data.admins);
			setFilter(data.admins);
			setLoading(false);
		} catch (err) {}
	};

	const openModal = (val) => {
		setAdmin(val)
		setOpen(true)
	}

	const deleteAdmin = async (id) => {
		try {
			let { data } = await removeAdmin(id);
			if (data) {
				toast({
					title: 'Deleted.',
					description: data.message,
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top-right'
				});
				let {data: obj} = await getAdmins();
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
			let data = user.filter(
				(content) =>
					content.firstname.toLowerCase().includes(string.toLowerCase()) ||
					content.lastname.toLowerCase().includes(string.toLowerCase())
			);
			setFilter(data);
		}
	};

	useEffect(() => {
		getAllAdmins();
	}, []);
	return (
		<div>
			<div className="d-flex">
				<div style={{ width: '450px' }}>
					<div className="flex-fill">
						<Input
							type="text"
							placeholder="Search..."
							variant="filled"
							onChange={Search}
						/>
					</div>
				</div>

				<div className="mb-5" style={{ marginLeft: '50%' }}>
					<Button onClick={onOpen} style={{ background: '#1f2833', color: '#fff' }}>
						Add User
					</Button>
				</div>
			</div>

			<UserForm isOpen={isOpen} Close={onClose} />
			<EditUser isOpen={open} Close={() => setOpen(false)} admin={admin}/>
			{loading ? (
				<div className="text-center" style={{ marginTop: 100 }}>
					<Spinner size="xl" style={{ color: '#1B2F5E' }} />
				</div>
			) : (
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
										First name
									</TableCell>
									<TableCell
										align="left"
										style={{
											font: 'normal normal bold 16px/19px Lato',
											color: '#7A7A7A'
										}}
									>
										Last name
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
										Phone Number
									</TableCell>
									<TableCell
										align="left"
										style={{
											font: 'normal normal bold 16px/19px Lato',
											color: '#7A7A7A'
										}}
									>
										Sub Admin
									</TableCell>
									<TableCell
										align="left"
										style={{
											font: 'normal normal bold 16px/19px Lato',
											color: '#7A7A7A'
										}}
									>
										Super Admin
									</TableCell>
									<TableCell />
									<TableCell />
								</TableRow>
							</TableHead>
							{loading ? (
								<div className="text-center" style={{ marginTop: 10 }}>
									<Spinner size="xl" style={{ color: '#1B2F5E' }} />
								</div>
							) : (
								<TableBody>
									{filter
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => (
											<TableRow key={row.name}>
												<TableCell
													component="th"
													scope="row"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{row.firstname}
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{row.lastname}
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
													{row.subAdmin.toString()}
												</TableCell>
												<TableCell
													align="left"
													style={{
														font: 'normal normal normal 16px/19px Lato',
														color: '#7A7A7A'
													}}
												>
													{row.superAdmin.toString()}
												</TableCell>
												<TableCell>
													<Button
														leftIcon={<FaEdit />}
														style={{ background: 'none' }}
														onClick={() => openModal(row)}
													>
														Edit
													</Button>
												</TableCell>
												<TableCell>
													<Button
														leftIcon={<MdDelete />}
														style={{ background: 'none' }}
														onClick={() => deleteAdmin(row._id)}
													>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							)}
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
			)}
		</div>
	);
}

export default Users;
