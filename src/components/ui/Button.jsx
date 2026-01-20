"use client"

function Button({children, onClick, className}) {

    return (
        <button
            className={`${"rounded-xl p-3 text-center"} ${className}`}
            onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;