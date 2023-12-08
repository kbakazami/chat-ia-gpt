'use client'
import {useState} from "react";

export default function Messages(props){
    const [messages, setMessages] = useState([])

    const addMessages = () => {
        const newMessages = [...props];
        setMessages(...newMessages);
    }

    return(
        <div className="flex justify-center">
            <div className="rounded bg-primary w-1/2 flex flex-col p-5 shadow-2xl">
                {/*{*/}
                {/*    messages.map((message, key) => (*/}
                {/*        <p>*/}
                {/*            { message.text }*/}
                {/*        </p>*/}
                {/*    ))*/}
                {/*}*/}
                <div className="flex justify-end">
                    <p className="rounded bg-secondary w-fit py-2 px-2 m-4">
                        <small className=" flex text-xs">Me :</small>
                        Bonjour !
                        <small className=" flex justify-end text-xs">Envoyé à 17h45</small>
                    </p>
                </div>

                <div className="flex justify-start">
                    <p className="rounded bg-tertiary w-fit py-2 px-2 m-4">
                        <small className=" flex text-xs">Albert :</small>
                        Hello comment ça va ?
                        <small className="flex justify-end text-xs">Envoyé à 17h52</small>
                    </p>
                </div>

                <div className="flex justify-end">
                    <p className="rounded bg-secondary w-fit py-2 px-2 m-4">
                        <small className=" flex text-xs">Me :</small>
                        Ca va et toi ?
                        <small className=" flex justify-end text-xs">Envoyé à 17h55</small>
                    </p>
                </div>

            </div>
        </div>
    )
}