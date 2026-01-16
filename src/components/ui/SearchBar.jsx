import Image from "next/image";

export default function SearchBar({icon, info, className}) {
    return (
        <div
            className={`${"flex items-center rounded-md pl-3 outline-2 -outline-offset-1 outline-transparent has-[input:focus-within]:outline-2 " +
            "has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-dark-text"} ${className}`}>
            <div className="flex items-center">
                <Image className="w-3 h-3 text-white" src={icon}/>
            </div>
            <input
                type="text"
                placeholder={info}
                className="w-full rounded-lg px-4 py-2 text-white outline-none "
            />
        </div>
    );
}