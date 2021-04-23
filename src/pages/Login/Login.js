import React, { useState } from 'react';
import { Input, InputGroup } from '@chakra-ui/react';
import './Login.css';
import { authLogin } from '../../services/Login';
import { Button, InputRightElement, useToast } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Login() {
	const toast = useToast()
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ show, setShow ] = useState(false);

	const handleClick = () => setShow(!show);

	const Login = async () => {
		setLoading(true);
		const user = {
			email,
			password
		};
		try {
			let { data } = await authLogin(user);
			console.log(data)
			localStorage.setItem('token', data);
			localStorage.setItem('user', JSON.stringify(user));
			if (data) {
				toast({
					title: "Welcome.",
					description: "Login Successful.",
					status: "success",
					duration: 9000,
					isClosable: true,
					position: "top-right"
				  });
			}
			window.location.href = '/admin/home';
		} catch (err) {
			console.log(err)
			setLoading(false);
			toast({
			  title: "Error.",
			  description: err.message || "Something went wrong",
			  status: "error",
			  duration: 9000,
			  isClosable: true,
			  position: "top-right"
			});
		}
	};
	return (
		<div>
			<div className="d-flex">
				<div className="background-image" />

				<div style={{ marginLeft: 200, width: '350px', marginTop: 150 }}>
					<h3
						className="mb-4"
						style={{ font: 'normal normal bold 32px/39px Lato', color: '#0B0C10' }}
					>
						Sign in
					</h3>
					<label
						style={{ font: 'normal normal normal 13px/16px Lato', color: '#1F2833' }}
					>
						Email
					</label>{' '}
					<br />
					<Input
						variant="filled"
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<br />
					<label
						className="mt-4"
						style={{ font: 'normal normal normal 13px/16px Lato', color: '#1F2833' }}
					>
						Password
					</label>{' '}
					<br />
					<InputGroup>
						<Input
							onChange={(e) => setPassword(e.target.value)}
							type={show ? 'text' : 'password'}
							variant="filled"
						/>
						<InputRightElement width="4.5rem">
							<Button size="sm" onClick={handleClick}>
								{show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
							</Button>
						</InputRightElement>
					</InputGroup>
					<Button
						style={{
							width: '100%',
							background: '#45A29E',
							color: '#fff',
							font: ' normal normal normal 18px/22px Lato'
						}}
						className="mt-4"
						isLoading={loading}
						disabled={loading}
						onClick={Login}
					>
						Sign in
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Login;
