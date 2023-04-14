const HeaderMenu = (props) => {
	return (
	  <div className={`hero-section ${props.type} ${props.style} ${props.page}`}>
		<div className="hero-content">
		  <h1>{props.title}</h1>
		  <h2>{props.subtitle}</h2>
		  {props.text && <p>{props.text}</p>}
		</div>
	  </div>
	);
  };
  
  export default HeaderMenu;