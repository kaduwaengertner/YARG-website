import { useState, useEffect } from 'react';

const Footer = (props) => {
	const [contributorsCount, setContributorsCount] = useState(null);

	useEffect(() => {
		fetch('https://api.github.com/repos/EliteAsian123/YARG/stats/contributors')
			.then((response) => response.json())
			.then((data) => setContributorsCount(data.length))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className="page-footer">
			<div className="footer-social">
				<a className="social-icon social-twitter" href="https://twitter.com/EliteAsian123">Twitter</a>
				<a className="social-icon social-discord" href="https://discord.gg/sqpu4R552r">Discord</a>
				<a className="social-icon social-github" href="https://github.com/EliteAsian123/YARG">GitHub</a>
			</div>
			<div className="footer-text">
				Made with a lot of <i className="fa-solid fa-heart fa-heart-red"></i> by <span className="contributors-color">{contributorsCount}</span> amazing people
			</div>
		</div>
	);
};

export default Footer;