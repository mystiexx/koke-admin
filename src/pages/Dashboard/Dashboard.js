import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Spinner } from '@chakra-ui/react';
import './Dashboard.css';
import Mission from './Mission.js';
import Vision from './Vision.js';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { getAdmins } from '../../services/admins';
import { getUsers } from '../../services/member';
import { getOrders } from '../../services/orders';
import { getProducts } from '../../services/shop';

function Dashboard() {
	const [ loading, setLoading ] = useState(true);
	const [ members, setMembers ] = useState([]);
	const [ orders, setOrders ] = useState([]);
	const [ products, setProducts ] = useState([]);
	const [ user, setUser ] = useState([]);

	const getMembers = async () => {
		try {
			let { data } = await getUsers();
			setMembers(data.members);
			setLoading(false);
		} catch (err) {}
	};

	const getOrder = async () => {
		try {
			let { data } = await getOrders();
			setOrders(data.orders);
			setLoading(false);
		} catch (err) {}
	};

	const getProduct = async () => {
		try {
			let { data } = await getProducts();
			setProducts(data.products);
			setLoading(false);
		} catch (err) {}
	};

	const getUser = async () => {
		try {
			let { data } = await getAdmins();
			setUser(data.admins);
			setLoading(false);
		} catch (err) {}
	};

	useEffect(() => {
		getMembers();
		getUser();
		getOrder();
		getProduct();
	}, []);
	return (
		<div>
			{loading ? (
				<div className="text-center" style={{ marginTop: 100 }}>
					<Spinner size="xl" style={{ color: '#1B2F5E' }} />
				</div>
			) : (
				<div>
					<h6
						className="mb-4"
						style={{
							font: 'normal normal bold 25px/30px Lato',
							color: '#1f2833'
						}}
					>
						Overview
					</h6>
					<Row>
						<Col>
							<div
								className="p-4"
								style={{ background: ' #F6F6F7', borderRadius: '10px' }}
							>
								<Stat>
									<StatNumber
										style={{
											font: 'normal normal bold 25px/30px Lato',
											color: '#1f2833'
										}}
									>
										{user.length}
									</StatNumber>
									<StatLabel
										style={{
											color: '#797979',
											font: 'normal normal bold 16px/19px Lato'
										}}
									>
										Total Users
									</StatLabel>
								</Stat>
							</div>
						</Col>
						<Col>
							<div
								className="p-4"
								style={{ background: ' #F6F6F7', borderRadius: '10px' }}
							>
								<Stat>
									<StatNumber
										style={{
											font: 'normal normal bold 25px/30px Lato',
											color: '#1f2833'
										}}
									>
										{members.length}
									</StatNumber>
									<StatLabel
										style={{
											color: '#797979',
											font: 'normal normal bold 16px/19px Lato'
										}}
									>
										Total Members
									</StatLabel>
								</Stat>
							</div>
						</Col>
						<Col>
							<div
								className="p-4"
								style={{ background: ' #F6F6F7', borderRadius: '10px' }}
							>
								<Stat>
									<StatNumber
										style={{
											font: 'normal normal bold 25px/30px Lato',
											color: '#1f2833'
										}}
									>
										{orders.length}
									</StatNumber>
									<StatLabel
										style={{
											color: '#797979',
											font: 'normal normal bold 16px/19px Lato'
										}}
									>
										Total Orders
									</StatLabel>
								</Stat>
							</div>
						</Col>
						<Col>
							<div
								className="p-4"
								style={{ background: ' #F6F6F7', borderRadius: '10px' }}
							>
								<Stat>
									<StatNumber
										style={{
											font: 'normal normal bold 25px/30px Lato',
											color: '#1f2833'
										}}
									>
										{products.length}
									</StatNumber>
									<StatLabel
										style={{
											color: '#797979',
											font: 'normal normal bold 16px/19px Lato'
										}}
									>
										Total Products
									</StatLabel>
								</Stat>
							</div>
						</Col>
					</Row>

					<Row>
						<Col>
							<div className="mt-5">
								<Mission />
							</div>
						</Col>

						<Col>
							<div className="mt-5">
								<Vision />
							</div>
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
}

export default Dashboard;
