import Link from "next/link";
import useUser from "../../lib/useUser";
import { useState, useEffect } from "react";
import Image from "next/image";

const Header = (props) => {
	const { user } = useUser();
	const [userData, setUserData] = useState(null);
	const [totalExperience, setTotalExperience] = useState(0);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		if (user?.isLoggedIn) {
			fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members/${user.id}.json`)
				.then((response) => response.json())
				.then((data) => {
					setUserData({
						avatarUrl: data.avatar_url,
						displayName: data.name_display,
						nameTwitch: data.name,
						seasonExperience: Number(data.season_experience),
						seasonLevel: Number(data.season_level),
						points: Number(data.points),
					});
				})
				.catch((error) => console.error(error));

			fetch(`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/settings.json`)
				.then((response) => response.json())
				.then((data) => {
					// Make sure to use the correct key for the experience base value
					setTotalExperience(Number(data.experience_base));
				})
				.catch((error) => console.error(error));
		}
	}, [user]);

	useEffect(() => {
		function handleScroll() {
			const scrollPosition = window.scrollY;
			const isScrolled = scrollPosition > 100;
			setScrolled(isScrolled);
		}
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const headerClass = `site-header ${scrolled ? "scrolled" : ""}`;

	const formatNumberWithPeriodSeparator = (number) => {
		return new Intl.NumberFormat("en-US", { grouping: true, useGrouping: true })
			.format(number)
			.replace(/,/g, ".");
	};

	const progressValue = userData
		? Math.floor(
				((userData.seasonExperience -
					(userData.seasonLevel - 1) * totalExperience) /
					(userData.seasonLevel * totalExperience -
						(userData.seasonLevel - 1) * totalExperience)) *
					100
		  )
		: 0;

	const circleRadius = 36;
	const circleCircumference = 2 * Math.PI * circleRadius;

	return (
		<header className={`${headerClass} ${props.style}`}>
			<div className="header-left">
				<Link className="header-logo" href="/">
					<Image src={`../assets/logo-${props.style}.png`} width="20" alt="Kadu`s Crazy Lab"/>
				</Link>
				<ul className="header-menu">
					<li>
						<Link href="/leaderboard">Leaderboard</Link>
					</li>
					<li>
						<Link href="/stream">Stream</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
					{user?.isLoggedIn && (
						<li>
							<Link href="/dashboard">Dashboard</Link>
						</li>
					)}
				</ul>
			</div>
			{user?.isLoggedIn ? (
				userData ? (
					<div className="user-info">
						<div className="header-user-greeting">
							Hey,{" "}
							<Link
								href={`/profile/${userData.nameTwitch}`}
								className="header-user-name"
							>
								<span>{userData.displayName}</span>
							</Link>
						</div>
						<div className="header-user-points">
							<span className="header-nav-stats">
								<i class="fa-solid fa-coins header-icon-points"></i>{" "}
								{formatNumberWithPeriodSeparator(userData.points)}
							</span>
						</div>
						<div className="header-user-level">
							<span className="header-nav-stats">
								<i class="fa-solid fa-star header-icon-level"></i>{" "}
								{userData.seasonLevel}
							</span>
						</div>
						<div className="user-info__avatar">
							<svg
								className="circular-progress"
								width="80"
								height="80"
								viewBox="0 0 80 80"
							>
								<circle
									className="circular-progress__background"
									cx="40"
									cy="40"
									r={circleRadius}
									strokeWidth="8"
								/>
								<circle
									className="circular-progress__fill"
									cx="40"
									cy="40"
									r={circleRadius}
									strokeWidth="15"
									stroke={progressValue === 100 ? "#00E6CB" : "#00E6CB"} // Apply the stroke color conditionally based on progressValue
									strokeDasharray={circleCircumference}
									strokeDashoffset={
										(1 - progressValue / 100) * circleCircumference
									}
									transform="rotate(-90 40 40)"
								/>
							</svg>
							<Image src={userData.avatarUrl} alt="Avatar" />
						</div>
					</div>
				) : (
					<div className="header-interact">
						<i class="fa-solid fa-triangle-exclamation interact-icon"></i> You
						need to interact in our{" "}
						<Link
							className="header-interact-link"
							href="https://www.twitch.tv/kaduwaengertner"
						>
							Chat
						</Link>{" "}
						to activate your account
					</div>
				)
			) : (
				<Link className="header-connect" href="/login">
					<i class="fa-brands fa-twitch"></i> Connect with Twitch
				</Link>
			)}
		</header>
	);
};

export default Header;
