import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import c from './Form.module.css';
import { useState } from 'react';

export const MainForm = () => {
	const [error, setError] = useState(false);
	const {
		register,
		formState: { errors },
	} = useForm();

	const Submit = e => {
		e.preventDefault();
		console.log(e);
		const formData = new FormData(e.target);
		const name = formData.get('name');
		const email = formData.get('email');
		const phone = formData.get('phone');
		fetch(' http://localhost:5000/telegram', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, phone }),
		})
			.then(response => response.json())
			.then(result => alert(result.message));
	};


	

	return (
		<div className={c.cont} id='application'>
			<form onSubmit={Submit} className={c.form}>
				<h1 className={c.zag}> Закажите звонок</h1>
				<p className={c.parag}>
					Оставьте контакты, по которым мы можем с вами связаться, наши
					специалисты помогут вам с решением вашего вопроса.
				</p>
				<div className={c.inputs}>
					<div className={c.label}>
						<input
							type='text'
							className={c.name}
							name='name'
							id='name'
							placeholder='	Ваше имя'
							autoComplete='name'
							{...register('name', {
								required: 'Поле обязательно к заполнению',
								pattern: {
									value: /^[A-Za-zА-Яа-яЁё\s]+$/,
									message: 'Поле должно содержать только буквы',
								},
							})}
						/>
					</div>
					<div className={c.label}>
						<InputMask
							mask='+7 (999) 999-99-99'
							className={c.name}
							type='tel'
							name='phone'
							id='phone'
							placeholder='	Номер телефона'
							autoComplete='phone'
							{...register('phone', {
								required: 'Поле обязательно к заполнению',
								pattern: {
									value: /^[0-9]+$/,
									message: 'Поле должно содержать только цифры',
								},
								valueAsNumber: true,
								minLength: {
									value: 10,
									message: 'Должно быть не менее 10 цифр',
								},
							})}
						/>
					</div>
					<div className={c.label}>
						<input
							className={c.name}
							type='text'
							name='email'
							id='email'
							placeholder='	E-mail'
							autoComplete='email'
							{...register('email', {
								required: 'Поле обязательно к заполнению',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Некорректный адрес электронной почты',
								},
							})}
						/>
					</div>
				</div>
				<button className={c.btn}>Оставить заявку</button>
				<div className={c.error}>
					{errors?.firstName && <p>{errors?.firstName?.message || 'Error'}</p>}
					{errors?.phoneNumber && (
						<p>{errors?.phoneNumber?.message || 'Error'}</p>
					)}
					{errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
				</div>
			</form>
		</div>
	);
};

// import { useState } from 'react';

// export default function Form() {
// 	const [responseMessage, setResponseMessage] = useState('');

// 	async function submit(e) {
// 		e.preventDefault();

// 		const formData = new FormData(e.target);
// 		const name = formData.get('name');
// 		const email = formData.get('email');
// 		const phone = formData.get('phone');
// 		console.log(name, email, phone);
// 		const response = await fetch('/api/feedback', {
// 			method: 'POST',
// 			body: formData,
// 		});
// 		const data = await response.json();
// 		if (data.phone) {
// 			setResponseMessage(data.phone);
// 		}
// 	}

// 	return (
// 		<form onSubmit={submit}>
// 			<label htmlFor='name'>
// 				Name
// 				<input type='text' id='name' name='name' autoComplete='name' required />
// 			</label>
// 			<label htmlFor='email'>
// 				Email
// 				<input
// 					type='email'
// 					id='email'
// 					name='email'
// 					autoComplete='email'
// 					required
// 				/>
// 			</label>
// 			<label htmlFor='message'>
// 				Message
// 				<textarea id='phone' name='phone' autoComplete='off' required />
// 			</label>
// 			<button>Send</button>
// 			{responseMessage && <p>{responseMessage}</p>}
// 		</form>
// 	);
// }
