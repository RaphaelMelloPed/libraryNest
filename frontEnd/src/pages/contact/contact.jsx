import React from "react"
import styles from "./Contact.module.css"

export default function Contact() {
    return (
        <section>
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:py-16 lg:px-6">
                <div>
                    <h2 className={styles.title}>Contact Us</h2>
                    <p className="mb-4">Have questions or feedback? We'd love to hear from you!</p>
                    <div className={styles.contactInfo}>
                        <p><strong>Email:</strong> support@mysticlibrary.com</p>
                        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                        <p><strong>Address:</strong> 123 Mystic Street, Library City, LS 12345</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
