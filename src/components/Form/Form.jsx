import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import c from "./Form.module.css";
import { useState,useRef } from "react";

export const MainForm = () => {
  const [error, setError] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
	handleSubmit,
	setValue,
  } = useForm();

  const ref = useRef();

  const Submit = (data) => {
   const phone = data.phone
   const name = data.name
      fetch('https://breezecrime.com:5000/telegram', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, phone }),
				// body: JSON.stringify({ name, email, phone }),
			})
				.then(response => response.json())
				.then(result => alert(result.message));
				reset();
				setValue('phone', '')
  };

  return (
    <div className={c.cont} id="application">
      <form onSubmit={handleSubmit(Submit)} className={c.form}>
        <h1 className={c.zag}> Закажите звонок</h1>
        <p className={c.parag}>
          Оставьте контакты, по которым мы можем с вами связаться, наши
          специалисты помогут вам с решением вашего вопроса.
        </p>
        <div className={c.inputs}>
          <div className={c.label}>
            <input
              type="text"
              className={c.name}
              name="name"
              id="name"
              placeholder="	Ваше имя"
              autoComplete="name"
              {...register("name", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                  message: "Поле должно содержать только буквы",
                },
              })}
            />
          </div>
          <div className={c.label}>
            <InputMask
              ref={ref}
              mask="+7 999 999 99 99"
              className={c.name}
              type="tel"
              name="phone"
              id="phone"
              placeholder="Номер телефона"
              autoComplete="phone"
              alwaysShowMask={false}
              maskPlaceholder=""
              {...register("phone", {
                required: "Поле обязательно к заполнению",
                valueAsNumber: false,
                minLength: {
                  value: 10,
                  message: "Должно быть не менее 10 цифр",
                },
              })}
            />
          </div>
        </div>
        <button className={c.btn}>Оставить заявку</button>
        <div className={c.error}>
          {errors?.name && <p>{errors?.name?.message || "Error"}</p>}
          {errors?.phone && <p>{errors?.phone?.message || "Error"}</p>}
        </div>
      </form>
    </div>
  );
};
