import Link from "next/link";
import useUser from "../../lib/useUser";
import { useEffect, useState } from "react";
import Image from "next/image";

const Footer = () => {
	const { user } = useUser();
	const [settings, setSettings] = useState(null);
	const currentYear = new Date().getFullYear();

	useEffect(() => {
		async function fetchSettings() {
			try {
				const response = await fetch(
					"https://beast-wolf-default-rtdb.firebaseio.com/settings.json"
				);
				const data = await response.json();
				setSettings(data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchSettings();
	}, []);

	return (
		<footer>
			<div className="footer-container">
				<div className="footer-blocks">
					<div className="footer-block-main">
						<div className="footer-main-logo">
							<Image src="../assets/logo-default.png" width="20" alt="Kadu&apos;s Crazy Lab"/>
							<span className="footer-main-logo-text">Kadu&apos;s Crazy Lab</span>
						</div>
						<div className="footer-main-text">
							Creating a world of fun, one crazy experiment at a time.
						</div>
					</div>
					<div className="footer-block-default">
						<Link className="footer-block-title" href="/stream">
							<h2>
								The Lab{" "}
								<i class="fa-solid fa-chevron-right block-title-arrow"></i>
							</h2>
						</Link>
						<ul>
							<li>
								<Link href="/stream/about">About</Link>
							</li>
							<li>
								<Link href="/stream/setup">Setup</Link>
							</li>
							<li>
								<Link href="/stream/commands">Commands</Link>
							</li>
						</ul>
					</div>
					<div className="footer-block-default">
						<Link className="footer-block-title" href="/link">
							<h2>
								Community{" "}
								<i class="fa-solid fa-chevron-right block-title-arrow"></i>
							</h2>
						</Link>
						<ul>
							<li>
								<Link href="/community/members">Members</Link>
							</li>
							<li>
								<Link href="/community/leaderboard">Leaderboard</Link>
							</li>
						</ul>
					</div>
					<div className="footer-block-default">
						<Link className="footer-block-title" href="/link">
							<h2>
								Support{" "}
								<i class="fa-solid fa-chevron-right block-title-arrow"></i>
							</h2>
						</Link>
						<ul>
							<li>
								<Link
									className="footer-support-subscriber"
									href="https://www.twitch.tv/subs/kaduwaengertner"
								>
									<i class="fa-brands fa-twitch"></i> Subscribe on Twitch
								</Link>
							</li>
							<li>
								<Link
									className="footer-support-streamelements"
									href="https://streamelements.com/kaduwaengertner-7733/tip"
								>
									<i class="fa-solid fa-rocket"></i> Stream Elements
								</Link>
							</li>
							<li>
								<Link
									className="footer-support-kofi"
									href="https://ko-fi.com/kaduwaengertner"
								>
									<i class="fa-solid fa-mug-hot"></i> Ko-fi
								</Link>
							</li>
							<li>
								<Link
									className="footer-support-tipa"
									href="https://tipa.ai/kadu"
								>
									<i class="fa-solid fa-coins"></i> Tipa.ai
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="footer-bottom">
					<div className="footer-copyright">
						{settings && (
							<div>
								{settings.theme === "default" && (
									<span className="copyright-default">
										🧪 Crafted with a lot of{" "}
										<i class="fa-solid fa-heart footer-heart-icon"></i> for my
										community <span className="footer-divider">|</span>{" "}
										<span className="footer-copyright-name">
											&copy; {currentYear} Kadu&apos;s Crazy Lab
										</span>{" "}
										<span className="footer-version">v{settings.version}</span>
									</span>
								)}
								{settings.theme === "christmas" && (
									<span className="copyright-christmas">
										🎅 Crafted with a lot of{" "}
										<i class="fa-solid fa-heart footer-heart-icon"></i> for my
										community <span className="footer-divider">|</span>{" "}
										<span className="footer-copyright-name">
											&copy; {currentYear} Kadu&apos;s Crazy Lab
										</span>{" "}
										<span className="footer-version">v{settings.version}</span>
									</span>
								)}
								{settings.theme === "halloween" && (
									<span className="copyright-halloween">
										🎃 Crafted with a lot of{" "}
										<i class="fa-solid fa-heart footer-heart-icon"></i> for my
										community <span className="footer-divider">|</span>{" "}
										<span className="footer-copyright-name">
											&copy; {currentYear} Kadu&apos;s Crazy Lab
										</span>{" "}
										<span className="footer-version">v{settings.version}</span>
									</span>
								)}
								{settings.theme === "new-year" && (
									<span className="copyright-new-year">
										✨ Crafted with a lot of{" "}
										<i class="fa-solid fa-heart footer-heart-icon"></i> for my
										community <span className="footer-divider">|</span>{" "}
										<span className="footer-copyright-name">
											&copy; {currentYear} Kadu&apos;s Crazy Lab
										</span>{" "}
										<span className="footer-version">v{settings.version}</span>
									</span>
								)}
								<span className="footer-season">
									Season{" "}
									<span className="footer-season-number">
										{settings.season}
									</span>
								</span>
							</div>
						)}
					</div>
					<div className="footer-social">
						<Link
							className="footer-social-link footer-twitch"
							href="https://www.twitch.tv/kaduwaengertner"
						>
							<i class="fa-brands fa-twitch"></i>
						</Link>
						<Link
							className="footer-social-link footer-discord"
							href="https://discord.gg/s7bMQA9ZtS"
						>
							<i class="fa-brands fa-discord"></i>
						</Link>
						<Link
							className="footer-social-link footer-twitter"
							href="https://twitter.com/kaduwaengertner"
						>
							<i class="fa-brands fa-twitter"></i>
						</Link>
						<Link
							className="footer-social-link footer-instagram"
							href="https://instagram.com/kaduwaengertner"
						>
							<i class="fa-brands fa-instagram"></i>
						</Link>
						<Link
							className="footer-social-link footer-youtube"
							href="https://www.youtube.com/@kaduwaengertner"
						>
							<i class="fa-brands fa-youtube"></i>
						</Link>
						<Link
							className="footer-social-link footer-tiktok"
							href="https://tiktok.com/@kaduwaengertner"
						>
							<i class="fa-brands fa-tiktok"></i>
						</Link>
						<Link
							className="footer-social-link footer-spotify"
							href="https://open.spotify.com/user/31whitq34azdjcptscqr7c23yxtu?si=19038efd0b134c71"
						>
							<i class="fa-brands fa-spotify"></i>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
