'use client'
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Home() {
    const [content, setContent] = useState("");
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [exists, setExists] = useState(true);
    const [translate, setTranslate] = useState("");
    const [language, setLanguage] = useState("English");
    const [check, setCheck] = useState("");


    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected !");
        });

        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        socket.on("user-exist", (data) => {
            setExists(data);
        });

        socket.on("translate", (data) => {
            setTranslate(data);
        });

        socket.on("check", (data) => {
            setCheck(data)
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        socket.emit("message", {
            username,
            content,
            timeSent: new Date().toUTCString(),
        });

        setContent("");
        setCheck("");
        setTranslate("");
    }

    const handleTranslate = (e) => {
        e.preventDefault()
         const content = e.target.value;

        socket.emit("translate", {
            username,
            content,
            language,
            timeSent: new Date().toUTCString(),
        });

        setContent("");
    }

    const handleCheckInfo = (e) => {
        e.preventDefault()
        const content = e.target.value;

        socket.emit("check", {
            username,
            content,
            timeSent: new Date().toUTCString(),
        });

        setContent("");
    }

    const handleUsername = (e) => {
        e.preventDefault();

        if (!exists) socket.emit("user-take", username);
    }

    useEffect(() => {
        socket.emit("user-check", username);
    }, [username]);


    return (
        <main>
            <h1 className="flex justify-center font-bold text-4xl my-10">Global chat - Hello !</h1>
            <div>
                <div className="flex justify-center my-5">
                    <form onSubmit={ handleUsername } className="flex">
                        <input value={username} onChange={(e) => setUsername(e.target.value)}
                               type="text" className={`p-2 rounded-l-lg ${exists ? "input-error" : ""}`}/>
                        <button type="submit" className="bg-primary text-tertiary px-5 rounded-r-lg">Join</button>
                    </form>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="rounded bg-primary w-1/2 flex flex-col p-5 shadow-2xl">
                    {messages.map((message) => {
                        if (message.username === username) {
                            return (
                                <div className="flex justify-end" key={message.timeSent}>
                                    <div className="rounded bg-secondary w-fit py-2 px-2 m-4">
                                        <small className=" flex text-xs">{message.username}</small>
                                        <p>{message.content}</p>
                                        <small className=" flex justify-end text-xs">{message.timeSent}</small>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex justify-start" key={message.timeSent}>
                                    <div className="rounded bg-tertiary w-fit py-2 px-2 m-4">
                                        <small className=" flex text-xs">{message.username}</small>
                                        <p>{ message.content }</p>
                                        <span className="block">{ translate }</span>
                                        <p>{ check }</p>
                                        <small className=" flex justify-end text-xs">{message.timeSent}</small>
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <button onClick={ handleTranslate } value={message.content} className="text-tertiary hover:text-blue-500">translate</button>
                                        <button onClick={ handleCheckInfo } value={message.content} className="text-tertiary hover:text-blue-500">check</button>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>

            <div className="flex justify-center my-5 gap-x-3">
                <form onSubmit={ handleSubmit } className="flex">
                    <input type="text" value={ content } onChange={(e) => setContent(e.target.value)} className="p-2 rounded-l-lg"/>
                    <button type="submit" className="bg-primary text-tertiary px-5 rounded-r-lg">Send</button>
                </form>
                <select onChange={(e) => setLanguage(e.target.value)} className="bg-primary text-tertiary px-5 rounded">
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="German">German</option>
                    <option value="Italian">Italian</option>
                    <option value="Russian">Russian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Chinese">Chinese</option>
                </select>
            </div>
        </main>
    )
}
