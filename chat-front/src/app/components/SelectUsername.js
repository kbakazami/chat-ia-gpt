'use client'
import {useState} from "react";

export default function SelectUsername (){
    const [username, setUsername] = useState("");

    const handleUsername = (e) => {
        e.preventDefault();
        console.log(username);
    }
    return(
        <div className="flex justify-center my-5">
            <form onSubmit={handleUsername} className="flex">
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="p-2 rounded-l-lg"/>
                <button className="bg-primary text-tertiary px-5 rounded-r-lg">Select</button>
            </form>
        </div>
    )
}