import React from "react"
import styles from "./Licensing.module.css"

export default function Privacy() {
    return (
        <section>
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:py-16 lg:px-6">
                <div>
                    <h2 className={styles.title}>Licensing Statement</h2>
                    <p className="mb-4">Mystic Library is a free web application developed by Mystic Org. By using Mystic Library, you agree to be bound by the following licensing terms:</p>
                    <hr className={styles.line} />
                    <h2 className={styles.subtitle}>Usage:</h2>
                    <p className="mb-4">Mystic Library is provided free of charge for personal and non-commercial use. You may use Mystic Library to browse, rent books, and manage your reading preferences.</p>
                    <hr className={styles.line} />
                    <h3 className={styles.subtitle}>Modifications</h3>
                    <p className="mb-4">You may not modify, adapt, or create derivative works based on Mystic Library. However, you are encouraged to provide feedback and suggestions for improvements.</p>
                    <hr className={styles.line} />
                    <h3 className={styles.subtitle}>Distribution:</h3>
                    <p className="mb-4">You may not distribute Mystic Library or any portion of it without prior written consent from Mystic Org.</p>
                    <hr className={styles.line} />
                    <h2 className={styles.subtitle}>Ownership: </h2>
                    <p className="mb-4">Mystic Library, including all intellectual property rights, remains the property of Mystic Org.</p>
                    <hr className={styles.line} />
                    <h2 className={styles.subtitle}>Disclaimer:</h2>
                    <p className="mb-4">Mystic Library is provided "as is" without warranty of any kind, express or implied. Mystic Org shall not be liable for any damages arising out of the use or inability to use Mystic Library.</p>
                    <hr className={styles.line} />
                    <h2 className={styles.subtitle}>Changes to Licensing: :</h2>
                    <p className="mb-4">Mystic Org reserves the right to update or modify these licensing terms at any time without prior notice. Your continued use of Mystic Library after any such changes constitutes your acceptance of the new terms.</p>
                    <hr className={styles.line} />
                    <p className="mb-4">By using Mystic Library, you acknowledge that you have read, understood, and agree to be bound by these licensing terms.</p>
                    <p className="mb-4">For inquiries regarding licensing or to request permission for distribution, please <a href="/contact" className="hover:text-blue-800 italic font-bold">contact us</a>.</p>

                </div>
            </div>
        </section>
    )
}