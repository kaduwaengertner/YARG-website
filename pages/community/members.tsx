import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";
import classnames from "classnames";
import Head from "next/head";
import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import HeroHeader from "@/components/modules/HeroHeader";
import Spinner from "react-bootstrap/Spinner";

const MembersPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const [members, setMembers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [membersPerPage, setMembersPerPage] = useState(25);
	const [memberPosition, setMemberPosition] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [vipFilter, setVipFilter] = useState(false);
	const [subscriberFilter, setSubscriberFilter] = useState(false);
	const [moderatorFilter, setModeratorFilter] = useState(false);

	// Fetch members data from external API
	const fetchMembersData = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/.json`
			);
			const data = await response.json();
			const settingsResponse = await fetch(
				`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/settings.json`
			);
			const settingsData = await settingsResponse.json();
			const experienceBase = settingsData.experience_base;
			const membersData = Object.entries(data).map(([id, member]) => {
				const level = member.season_level;
				const experience = member.season_experience;
				const barWidth = level * experienceBase;
				const percentage = Math.min(100, (experience / barWidth) * 100);

				return {
					id,
					name: member.name,
					name_display: member.name_display,
					avatar: member.avatar_url,
					language: member.language,
					joined: member.joined,
					role: member.role,
					status: member.user_status,
					level,
					experience,
					points: member.points,
					season_experience: member.season_experience,
					position: 0,
					vip: member.vip || false,
					subscriber: member.subscriber || false,
					moderator: member.moderator || false,
					progress: percentage,
				};
			});
			setMembers(membersData);
		} catch (error) {
			console.error("Error fetching members data:", error);
		}
		setLoading(false);
	};

	// Paginate members list
	const indexOfLastMember = currentPage * membersPerPage;
	const indexOfFirstMember = indexOfLastMember - membersPerPage;
	const currentMembers = members
		.sort((a, b) => new Date(b.joined) - new Date(a.joined))
		.filter(
			(member) =>
				(!vipFilter || member.vip) &&
				(!subscriberFilter || member.subscriber) &&
				(!moderatorFilter || member.moderator)
		)
		.filter((member) =>
			member.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.slice(indexOfFirstMember, indexOfLastMember)
		.map((member, index) => ({
			...member,
			position: currentPage * membersPerPage + index + 1,
		}));

	// Change page
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		router.push(`/community/members?page=${pageNumber}`, undefined, {
			shallow: true,
		});
	};

	// Set current page when component mounts or page query parameter changes
	useEffect(() => {
		const {
		  query: { page = 1 },
		} = router;
		setCurrentPage(parseInt(page, 10));
	  }, [router.query.page, router]);	  
	// Update when the page query parameter or members data changes

	useEffect(() => {
		fetchMembersData();
	}, []);

	useEffect(() => {
	}, [members, user]);

	return (
		<>
			<Head>
				<title>Members 👥 | Kadu&apos;s Crazy Lab 🧪</title>
				<meta
					name="description"
					content="Creating a world of fun, one crazy experiment at a time."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header style="light" />
			<HeroHeader
				style="light"
				type="page"
				page="about"
				title="Members"
				subtitle=""
			/>
			<div className="content-full">
				<div className="content-container">
					<div className="directory-filter">
						<input
							className="filter-name-search"
							type="text"
							placeholder="Find a user..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<label>
							<span className="checkbox-container subscriber">
								<input
                  className="checkbox-filter-subscriber"
									type="checkbox"
									checked={subscriberFilter}
									onChange={(e) => setSubscriberFilter(e.target.checked)}
								/>
								Subscriber
							</span>
						</label>
						<label>
							<span className="checkbox-container moderator">
								<input
									type="checkbox"
									checked={moderatorFilter}
									onChange={(e) => setModeratorFilter(e.target.checked)}
								/>
								Moderator
							</span>
						</label>
					</div>
					{loading ? (
						<div className="directory-loading"><Spinner animation="border" variant="primary" /> Loading members informations</div>
					) : currentMembers.length > 0 ? (
						<>
							<ul className="member-directory">
								{currentMembers.map((member) => (
									<Link
										className="member-view-link"
										href={`/profile/${member.name}`}
										key={member.id}
									>
										<li
											key={member.id}
											className={classnames("member-card-view", {
												"member--logged": user && member.id === user.id,
											})}
										>
											<div className="member-card-main">
												<div
													className="member-card-avatar"
													style={{ backgroundImage: `url(${member.avatar})` }}
												>
													{member.language && (
														<div
															className={`member-card-avatar-flag flag-${member.language}`}
														></div>
													)}
												</div>
												<div className="member-card-informations">
													<div className="member-card-name">
														{member.name_display}
														{member.moderator && (
															<div className="member__moderator">
																<span className="member-tag member-tag-moderator">
																	Moderator
																</span>
															</div>
														)}
														{member.subscriber && (
															<div className="member__role">
																<span className="member-tag member-tag-subscriber">
																	Subscriber
																</span>
															</div>
														)}
													</div>
													<div className="member-card-extras">
														{member.status}
													</div>
												</div>
											</div>
											<div className="member-card-experience">
												<div className="member-card-experience-bar">
													<div className="experience-bar-points-hide">
														{member.experience}
													</div>
													<div className="experience-bar-full">
														<div
															className="experience-bar-fill"
															style={{ width: `${member.progress}%` }}
														></div>
													</div>
													<div className="experience-bar-points">
														{member.experience} SXP
													</div>
												</div>
												<div className="member-card-experience-level">
													{member.level}
												</div>
											</div>
										</li>
									</Link>
								))}
							</ul>
							<div className="members-pagination">
								<ul>
									{Array.from(
										{ length: Math.ceil(members.length / membersPerPage) },
										(_, i) => (
											<li key={i}>
												<button
													onClick={() => paginate(i + 1)}
													disabled={i + 1 === currentPage}
												>
													{i + 1}
												</button>
											</li>
										)
									)}
								</ul>
							</div>
						</>
					) : (
						<div className="directory-empty"><i class="fa-solid fa-triangle-exclamation"></i> No members found.</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MembersPage;
