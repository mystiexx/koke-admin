import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaBars } from 'react-icons/fa';
import { useMediaQuery } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { BiLogOutCircle } from 'react-icons/bi';

const NavBar = (props) => {
	const [ loading, setLoading ] = useState(false);
	const { showSideBar } = props;
	const [ mobile ] = useMediaQuery('(min-width: 800px)');

	const logout = () => {
		localStorage.removeItem('token');
		setLoading(true);
		window.location.href = '/auth/login';
	};

	return (
		<NavBar.Wrapper>
			<button className={`${mobile ? 'active' : ''}`} onClick={() => showSideBar()}>
				{' '}
				<FaBars />{' '}
			</button>
			<div className="holder">
				<h2> {window.location.pathname.split('/')[2]} </h2>
				<div className={`${!mobile ? 'active' : ''} logos`}>
					{' '}
					<IconButton
						onClick={logout}
						isLoading={loading}
						colorScheme="red"
						icon={<BiLogOutCircle style={{ color: '#fff' }} />}
					/>
				</div>
			</div>
		</NavBar.Wrapper>
	);
};
NavBar.Wrapper = styled.nav`
	display: flex;
	align-items: center;
	background-color: #fff;
	padding-top: 26px;
	padding-bottom: 18px;
	padding-left: 40px;
	@media only screen and (max-width: 600px) {
		padding-left: 12px;
	}

	.holder {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		.logos {
			display: flex;
			margin-right: 1rem;
			svg {
				color: #8a94a6;
				font-size: 1.3rem;
				margin-left: 1rem;
			}
		}
	}
	h2 {
		color: #304762;
		font-weight: bold;
		font-size: 18px;
		line-height: 0;
		text-transform: uppercase;
	}
	button {
		margin-right: 1rem;
		outline: none;
		svg {
			font-size: 1.3rem;
			color: #304762;
		}
	}
	.active {
		display: none !important;
	}
`;
export default NavBar;
