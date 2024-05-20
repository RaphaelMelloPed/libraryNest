import React from "react"
import styles from "./Privacy.module.css"

export default function Privacy() {
    return (
        <section>
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:py-16 lg:px-6">
                <div>
                    <h2 className={styles.title}>Privacy Policy</h2>
                    <p className="mb-4">Mystic Library is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information about you when you use our website and services.</p>
                    <hr className={styles.line} />
                    <h2 className={styles.title}>Information We Collect</h2>
                    <h3 className={styles.subtitle}>Account Information:</h3>
                    <p className="mb-4">When you create an account with Mystic Library, we collect your name, email address, CPF, phone number and password.</p>
                    <h3 className={styles.subtitle}>Usage Information:</h3>
                    <p className="mb-4">We collect information about how you use our website, such as the books you rent, the pages you visit, and the actions you take.</p>
                    <h3 className={styles.subtitle}>Device Information:</h3>
                    <p className="mb-4">We may collect information about the device you use to access our website, including IP address, browser type, and operating system.</p>
                    <hr className={styles.line} />
                    <h2 className={styles.title}>How We Use Your Information</h2>
                    <h2 className={styles.subtitle}>Provide Services: </h2>
                    <p className="mb-4">We use your information to provide you with access to our library services, including renting books and managing your account.</p>
                    <h2 className={styles.subtitle}>Personalization:</h2>
                    <p className="mb-4">We may use your information to personalize your experience on our website, such as recommending books based on your reading history.</p>
                    <h2 className={styles.subtitle}>Communication:</h2>
                    <p className="mb-4">We may use your email address to send you important updates about our services, such as changes to our terms or security updates.</p>
                    <hr className={styles.line} />
                    <h2 className={styles.title}>Information Sharing</h2>
                    <h2 className={styles.subtitle}>Third-Party Service Providers:</h2>
                    <p className="mb-4">We may share your information with third-party service providers who help us operate our website and provide services to you.</p>
                    <h2 className={styles.subtitle}>Legal Compliance:</h2>
                    <p className="mb-4">We may disclose your information if required by law or in response to a subpoena or other legal request.</p>
                    <h2 className={styles.subtitle}>Business Transfers:</h2>
                    <p className="mb-4">If Mystic Library is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
                    <hr className={styles.line} />
                    <h2 className={styles.title}>Data Security</h2>
                    <p className="mb-4">We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
                    <hr className={styles.line} />
                    <h2 className={styles.title}>Children's Privacy</h2>
                    <p className="mb-4">Mystic Library is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13. If you believe that we have inadvertently collected information from a child under 13, please contact us immediately.</p>
                    <hr className={styles.line} />
                    <h2 className={styles.title}>Changes to This Privacy Policy</h2>
                    <p className="mb-4">We may update this Privacy Policy from time to time. If we make any material changes, we will notify you by email or by posting a notice on our website prior to the change becoming effective. Your continued use of our website after the effective date of the revised Privacy Policy constitutes your acceptance of the terms.</p>

                </div>
            </div>
        </section>
    )
}