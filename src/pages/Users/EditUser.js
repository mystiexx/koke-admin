import React, { useState, useEffect  } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import { Switch } from '@chakra-ui/react';
import { Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { apiUrl } from '../../config.json';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton
} from '@chakra-ui/react';

function EditUser(props) {
	const { admin } = props;
	const toast = useToast();
	const [ firstname, setFirstName ] = useState('');
	const [ lastname, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ subAdmin, setSubAdmin ] = useState(null);
	const [ superAdmin, setSuperAdmin ] = useState(null);
	const [ phone, setPhone ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const Update = async () => {
		const obj = {
			firstname,
			lastname,
			phone,
			email,
			subAdmin,
			superAdmin
		};

		axios({
			method:'put',
			url:`${apiUrl}/admins/${admin._id}`,
			data:JSON.stringify(obj),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((result)=> {
			setLoading(false)
			if (result) {
				toast({
					title: "Updated.",
					description: "Update Succesful",
					status: "success",
					duration: 9000,
					isClosable: true,
					position: "top-right"
				  });
				  window.location.href="/admin/home"
			}
		})
		.catch ((err)=> {
			toast({
				title: "Error.",
				description: err.message || "Something went wrong",
				status: "error",
				duration: 9000,
				isClosable: true,
				position: "top-right"
			  });
		})
	}



	

	return (
		<div>
			<Modal isOpen={props.isOpen} onClose={props.Close}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader style={{ background: '#0b0c10', color: '#fff' }}>
						Edit User
					</ModalHeader>
					<ModalCloseButton onClick={props.Close} style={{ color: '#fff' }} />
					<ModalBody>
						<Row>
							<Col>
								<label
									style={{
										font: 'normal normal normal 15px/20px Lato',
										color: '#1F2833'
									}}
								>
									FirstName
								</label>{' '}
								<br />
								<Input
									type="text"
									variant="filled"
									placeholder="John"
									onChange={(e) => setFirstName(e.target.value)}
									defaultValue={admin.firstname}
								/>
							</Col>

							<Col>
								<label
									style={{
										font: 'normal normal normal 15px/20px Lato',
										color: '#1F2833'
									}}
								>
									LastName
								</label>{' '}
								<br />
								<Input
									type="text"
									variant="filled"
									placeholder="Doe"
									onChange={(e) => setLastName(e.target.value)}
									defaultValue={admin.lastname}
								/>
							</Col>
						</Row>
						<label
							style={{
								font: 'normal normal normal 15px/20px Lato',
								color: '#1F2833'
							}}
							className="mt-3"
						>
							Email
						</label>{' '}
						<br />
						<Input
							type="email"
							variant="filled"
							placeholder="johndoe@mail.com"
							onChange={(e) => setEmail(e.target.value)}
							defaultValue={admin.email}
						/>
						<br />
						<label
							style={{
								font: 'normal normal normal 15px/20px Lato',
								color: '#1F2833'
							}}
							className="mt-3"
						>
							Contact Number
						</label>{' '}
						<br />
						<Input
							type="text"
							variant="filled"
							placeholder="080-XXX-XXX-XX"
							onChange={(e) => setPhone(e.target.value)}
							defaultValue={admin.phone}
						/>
						<br />
						<div className="d-flex">
							<div>
									<FormControl display="flex" alignItems="center">
										<FormLabel htmlFor="email-alerts" mb="0">
											subAdmin
										</FormLabel>
										<Switch
											className="mt-2"
											defaultChecked={admin.subAdmin}
											onChange={(e) => setSubAdmin(e.target.checked)}
										/>
									</FormControl>
								
							</div>

							<div className="ml-5">
								<FormControl display="flex" alignItems="center">
									<FormLabel htmlFor="email-alerts" mb="0">
										SuperAdmin
									</FormLabel>
									<Switch
										className="mt-2"
										defaultChecked={admin.superAdmin}
										onChange={(e) => setSuperAdmin(e.target.checked)}
									/>
								</FormControl>
							</div>
						</div>
						<div className="d-flex justify-content-end">
						<Button
							style={{ background: '#1f2833', color: '#fff' }}
							onClick={Update}
							disabled={loading}
							isLoading={loading}
							className="mt-3"
						>
							Add
						</Button>
						</div>
				
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
}

export default EditUser;
