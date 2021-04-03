import React, { useEffect } from 'react'
import axios from 'axios'
import {useState} from 'react'
import './Home.css'


function Home() {
	
	const [imgs,setImgs] = useState([]);

	useEffect(
		() => {
			const load = async (e) => {
				//https://gocho-api.herokuapp.com/v2/api-docs
				axios.get('https://gocho-api.herokuapp.com/images',{},{
					headers: {
						'Content-type':'application/json'
					}
				}).then( (resp) =>{
					var data = resp.data
		
					if(data != null ) 
						setImgs(data)

				}).catch( (resp) => console.error(resp))
				
			}		

			load()
		}, {}
	)


	return (
		<div className="Home"> 
			<div className="home__banner" >
				<h1><b></b></h1>
			</div>
			<div className="home__subBanner">
				<p>Pagina desarrollado con React.Js y CSS</p>
			</div>
			<div className="home__content">
				<div className="home__content__title"> 
					<h2>El Cafe Ayuda A Desarrollar</h2> 
				</div>
				<div className="home__content__cluster">
					{ 
						imgs.map( (data,index) =>{ 
							return <div className={"cafe ("+index+").jpg"}  key={data.src +"."+index}> 
										<img src={"/"+data.src} alt={data.alt} title={data.title} />
									</div> 
						}) 
					}
				</div>
			</div>
		</div>
	)
}

export default Home
