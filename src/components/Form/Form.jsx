import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import c from './Form.module.css';
import { useState } from 'react';

export const MainForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [error, setError] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data, e) => {
		e.preventDefault();
		alert(JSON.stringify(data));
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handlePhoneChange = (e) => {
		setPhone(e.target.value);
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	console.log(name)
	console.log(email)

	return (
		<div className={c.cont} id='application'>
			<form onSubmit={handleSubmit(onSubmit)} className={c.form}>
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
							name='firstName'
							placeholder='	Ваше имя'
							value={name}
							onChange={handleNameChange}
							{...register('firstName', {
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
							name='phoneNumber'
							placeholder='	Номер телефона'
							value={phone}
							onChange={handlePhoneChange}
							{...register('phoneNumber', {
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
							placeholder='	E-mail'
							value={email}
							onChange={handleEmailChange}
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
				<button onClick={onSubmit} className={c.btn}>
					Оставить заявку
				</button>
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
