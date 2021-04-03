import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from './image/logo.png'
import './Header.css'


function Header(){
	const [time, setTime] = useState("00:00:00")
	const [timeZone, setTimeZone] = useState("utc")

	useEffect(
		()=>{
			
			
			setInterval(
				() => {
					var param1 = new Date().toLocaleTimeString()
					var param2 = "-"+new Date().getTimezoneOffset() / 60
		
					axios.post('https://gocho-api.herokuapp.com/',{
						param1,
						param2
					},{
						headers: {
							'Content-type':'application/json'
						}
					}).then( (resp) =>{
						var data = resp.data
						if(data != null){
							setTime(data.time)
							setTimeZone(data.timeZone)
						}
					}).catch( (resp) => console.error(resp))
				},
				1000
			)
		},
		{}
	)


	return (
		<div className="header">

			<div className="header__menu">
				<a href="/" > <img src={logo} alt="imagen no encontrada" /></a>
				
				<div className="header__nav">
					<nav>
						<a href="https://github.com/ElGocho/" target='_blank' rel='noreferrer'> Github </a>
						<a href="/contact"> Contacto </a>
					</nav>
				</div>
			</div>
			
			<span className="header__time"> <b> {time}  {timeZone} </b></span>
		</div>
	)
}

export default Header
