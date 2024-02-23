import { useState } from "preact/hooks";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import "./form.css";

export const MainForm = () => {
  const [formData, setFormData] = useState({});
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
console.log(errors);
  return (
    <div className="f-cont">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1 className="zag"> Закажите звонок</h1>
        <p className="parag">
          Оставьте контакты, по которым мы можем с вами связаться, наши
          специалисты помогут вам с решением вашего вопроса.
        </p>
        <div>
          <label className="label">
            Имя:
            <input
              type="text"
              className="name"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              {...register("firstName", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                  message: "Поле должно содержать только буквы",
                },
              })}
            />
          </label>
          <label className="label">
            Номер телефона:
            <InputMask
              mask="+7 (999) 999-99-99"
              className="name"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleInputChange}
              {...register("phoneNumber", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[0-9]+$/, 
                  message: "Поле должно содержать только цифры",
                },
                valueAsNumber: true,
                minLength: {
                  value: 10,
                  message: "Должно быть не менее 10 цифр",
                },
              })}
            />
          </label>
          <label className="label">
            Почта:
            <input
              className="name"
              type="text"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              {...register("email", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Некорректный адрес электронной почты",
                },
              })}
            />
          </label>
          <button onClick={() => onSubmit()} className="btn">Оставить Заявку</button>
          <div className="error">
            {errors?.firstName && (
              <p>{errors?.firstName?.message || "Error"}</p>
            )}
            {errors?.phoneNumber && (
              <p>{errors?.phoneNumber?.message || "Error"}</p>
            )}
            {errors?.email && <p>{errors?.email?.message || "Error"}</p>}
            
          </div>
        </div>
      </form>
    </div>
  );
};
