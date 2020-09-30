const Button = ({ cssClass, text, closeModal }) => {
  return (
    <div onClick={() => closeModal()} className={cssClass}>
      {text}
    </div>
  );
};

export default Button;
