import React from "react"
import styles from "./Home.module.css"

export default function Home() {
    return (
        <section>
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div>
                    <h2 className={styles.title}>Welcome to the <span>mystic library</span></h2>
                    <p className="mb-4">This library belong to those how think knowledge shoud be free an acessible to all that wants to find the path of the wise.</p>
                    <p>In the <span>mystic library</span> no one will charge you to get any book, no one will sell you courses full of empty promisses. You want to be part of our comunity? <a href="/users/new" className="hover:text-blue-800 italic font-bold">Click to register</a> or read more <a href="/about" className="hover:text-blue-800 italic font-bold">about us</a>!</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <img className="w-full rounded-lg" src="https://i.pinimg.com/564x/a0/0c/1c/a00c1ce74da914060b26f6bda5855a0d.jpg" alt="office content 1"/>
                    <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://i.pinimg.com/564x/eb/18/0f/eb180f32cae4b20d7743e892f1fc67d5.jpg" alt="office content 2"/>
                </div>
            </div>
        </section>
    )
}