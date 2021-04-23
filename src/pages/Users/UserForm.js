import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from '@chakra-ui/react';
import { createAdmins } from '../../services/admins';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
	useToast
} from '@chakra-ui/react';

function UserForm(props) {
	const toast = useToast();
	const [ firstname, setFirstName ] = useState('');
	const [ lastname, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const Submit = async () => {
		setLoading(true);

		const obj = {
			firstname,
			lastname,
			email,
			phone,
			password
		};
		try {
			let { data } = await createAdmins(obj);
			if (data) {
				toast({
					title: 'User Created.',
					description: 'Successful',
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top-right'
				});
				window.href.location = '/admin/home';
			}
		} catch (err) {
			toast({
				title: 'Failed',
				description: err.message,
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top-right'
			});
		}
	};

	return (
		<div>
			<Modal isOpen={props.isOpen} onClose={props.Close}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader style={{ background: '#0b0c10', color: '#fff' }}>
						Add User
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
						/>
						<br />
						<label
							style={{
								font: 'normal normal normal 15px/20px Lato',
								color: '#1F2833'
							}}
							className="mt-3"
						>
							Password
						</label>{' '}
						<br />
						<Input
							type="password"
							variant="filled"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</ModalBody>

					<ModalFooter>
						<Button
							style={{ background: '#1f2833', color: '#fff' }}
							onClick={Submit}
							disabled={loading}
							isLoading={loading}
						>
							Add
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
}

export default UserForm;
