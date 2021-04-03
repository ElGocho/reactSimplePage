import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Contact.css'
import UserData from './UserData.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {

	const [name,setName] = useState('');
	const [message, setMessage] = useState('');
	const [user, setUser] = useState({});

	var component = "";

	useEffect(
		() => {
			const load = async (e) => {
		
				axios.put('https://gocho-api.herokuapp.com/user',{},{
					headers: {
						'Content-type':'application/json'
					}
				}).then( (resp) =>{
					var data = resp.data
		
					if(data != null ) 
						setUser(data)

				}).catch( (resp) => console.error(resp))
				
			}		

			load()
		}, {}
	)

	const sendMessage = async (e) => {
		e.preventDefault()

		axios.post('https://gocho-api.herokuapp.com/message', {
			name: name,
			message:  message
		}).then( (resp) => {
			if(resp.data == null || !resp.data)
				showToast("Error al enviar mensaje")
			else
				showToast("Mensaje enviado")
		}).catch( (resp) => {showToast(resp); console.error(resp)} )

		setName('')
		setMessage('')

	}

	function showToast(input){
		toast(input, {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}

	if(user != null && user != {}){
		component = <UserData user={user}></UserData>
	}

	return (
		<div className="contact">
			<div className="contact__title">
				<h1> Contacto </h1>
			</div>

			<div className="contact__form">
				<form >
					<input type='text' name='name' placeholder= 'Nombre completo' value={name} onChange={ (e) => setName(e.target.value) }  />

					<textarea placeholder='Escribe aqui el mensaje' value={message} onChange={ (e) => setMessage(e.target.value) } ></textarea >

					<button type='submit' onClick={sendMessage}> Enviar Mensaje </button>
				</form>

				<ToastContainer></ToastContainer>
			</div>

			{component}

		</div>
	)
}

export default Contact
