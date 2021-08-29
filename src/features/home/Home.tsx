import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Row, Col } from 'antd';
import {
	FacebookFilled,
	LinkedinFilled,
	TwitterOutlined,
	InstagramOutlined,
} from '@ant-design/icons';
import {
	faBuilding,
	faHandshake,
	faSwimmer,
} from '@fortawesome/free-solid-svg-icons';
import logoImg from 'features/home/assets/images/logo.svg';
import apartmentGraphic from 'features/home/assets/images/apartment.svg';
import apartmentImg from 'features/home/assets/images/society.jpg';
import TeamMember from 'features/home/components/TeamMember';
import Feature from 'features/home/components/Feature';
import LoginForm from 'features/home/components/LoginForm';
import harisImg from 'features/home/assets/images/haris.jpeg';
import deepakImg from 'features/home/assets/images/deepak.jpg';
import { useAuth } from 'config/hooks';

export default function Home() {
	const { isLoggedIn, isAdmin } = useAuth();
	const history = useHistory();

	useEffect(() => {
		if (isAdmin) {
			history.push('/dashboard');
		}
		if (isLoggedIn && !isAdmin) {
			history.push('/social-feeds');
		}
	}, [isLoggedIn, isAdmin, history]);

	return (
		<>
			<main>
				<Container>
					<nav>
						<div className="inline-block p-4 bg-gray-100">
							<img className="w-20" src={logoImg} alt="logo" />
						</div>
					</nav>
				</Container>
				<section className="pb-32">
					<Container className="pt-8">
						<Row
							gutter={[0, { xs: 48, sm: 48, md: 0 }]}
							justify="center"
						>
							<Col md={{ span: 16, order: 1 }} order={2}>
								<div className="flex">
									<div>
										<HeroText>
											Connect together to build a smart
											society
										</HeroText>
										<img
											src={apartmentGraphic}
											className=""
											alt="society"
										/>
									</div>
								</div>
							</Col>
							<Col
								md={{ span: 8, order: 2 }}
								order={1}
								className="flex items-center"
							>
								<LoginForm />
							</Col>
						</Row>
					</Container>
				</section>

				<section className="bg-emarat-tertiary-default">
					<Container className="py-32">
						<div className="mt-0 md:-mt-52 mb-16">
							<Row className="justify-center md:justify-between">
								<Col
									lg={7}
									md={8}
									sm={20}
									className="pr-0 md:pr-4 w-full"
								>
									<Feature
										title="Members Onboarded"
										number="200+"
										icon={faBuilding}
									/>
								</Col>
								<Col
									lg={7}
									md={8}
									sm={20}
									className="pr-0 md:pr-4 mt-8 md:mt-0 w-full"
								>
									<Feature
										title="Complaints Resolved"
										number="120+"
										icon={faHandshake}
									/>
								</Col>
								<Col
									lg={7}
									md={8}
									sm={20}
									className="mt-8 md:mt-0 w-full"
								>
									<Feature
										title="Amenities"
										number="20+"
										icon={faSwimmer}
									/>
								</Col>
							</Row>
						</div>
						<Row align="middle" className="text-white">
							<Col md={{ span: 12 }}>
								<img
									src={apartmentImg}
									className="rounded-5xl"
									alt="apartment"
								/>
							</Col>
							<Col
								md={{ span: 12 }}
								className="text-lg p-0 lg:pr-20 md:pl-20 pt-12 md:pt-0"
							>
								<div>
									<StatementHeading>Misson</StatementHeading>
									<p>
										To empower cooperative society digitally
										by providing a platform to avail
										facilities easily and to connect.
									</p>
								</div>

								<div className="mt-8">
									<StatementHeading>Vision</StatementHeading>
									<p>
										To make all the members of the society
										feel like a family and to resolve all
										the problems digitally at one stop.
									</p>
								</div>

								<div className="mt-8">
									<StatementHeading>Values</StatementHeading>
									<ul>
										<li>
											Simple solutions for complex
											problems.
										</li>
										<li>All solutions at one place.</li>
										<li>
											Bridge the communication gap within
											the society.
										</li>
									</ul>
								</div>
							</Col>
						</Row>
					</Container>
				</section>

				<section className="bg-gray-50">
					<Container className="py-32">
						<h2 className="text-5xl font-bold mb-8">Team</h2>
						<Row justify="space-around">
							<TeamMember
								name="Haris Rahman"
								img={harisImg}
								github="#"
								linkedin="#"
								twitter="#"
							/>
							<TeamMember
								name="Deepak Rawat"
								img={deepakImg}
								github="#"
								linkedin="#"
								twitter="#"
							/>
						</Row>
					</Container>
				</section>
			</main>
			<footer>
				<Container className="flex justify-between items-center py-4 flex-col-reverse lg:flex-row gap-4 lg:gap-0 text-gray-400 font-semibold">
					<div>© e-Marat. All Rights Reserved</div>

					<div>
						<a href="https://www.google.com/" className="pr-4">
							Contact
						</a>
						<a href="https://www.google.com/" className="pr-4">
							About
						</a>
						<a href="https://www.google.com/" className="pr-4">
							Terms Of Use
						</a>
						<a href="https://www.google.com/">Privacy Policy</a>
					</div>

					<div>
						<a
							href="https://www.google.com/"
							className="pr-3 text-xl"
						>
							<FacebookFilled
								className={`text-brands-facebook ${iconScale}`}
							/>
						</a>
						<a
							href="https://www.google.com/"
							className="pr-3 text-xl"
						>
							<InstagramOutlined
								className={`text-brands-instagram ${iconScale}`}
							/>
						</a>
						<a
							href="https://www.google.com/"
							className="pr-3 text-xl"
						>
							<TwitterOutlined
								className={`text-brands-twitter ${iconScale}`}
							/>
						</a>
						<a href="https://www.google.com/" className="text-xl">
							<LinkedinFilled
								className={`text-brands-linkedin ${iconScale}`}
							/>
						</a>
					</div>
				</Container>
			</footer>
		</>
	);
}

const Container = styled.div`
	${tw`container mx-auto px-6`};
`;

const HeroText = styled.h1`
	${tw`text-3xl md:text-5xl font-bold mb-3 md:mb-10 md:leading-snug`};
`;

const StatementHeading = styled.h4`
	${tw`text-4xl text-white font-bold`};
`;

const iconScale = 'transform transition duration-500 hover:scale-150';
