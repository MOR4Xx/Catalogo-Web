function Button({children, onClick, classNames}) {

    return (
        <button
            className={`${"rounded-xl p-3 text-center"} ${classNames}`}
            onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;