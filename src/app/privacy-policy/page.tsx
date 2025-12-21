import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - BlogHub',
    description: 'Read our privacy policy to understand how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
    return (
        <>
            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '4rem 0',
                textAlign: 'center',
                color: 'white',
            }}>
                <div className="container">
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>Privacy Policy</h1>
                    <p style={{ opacity: 0.9 }}>Last updated: December 2024</p>
                </div>
            </section>

            <section style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="blog-content">
                        <h2>Introduction</h2>
                        <p>
                            At BlogHub, we take your privacy seriously. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you visit our website. Please read
                            this privacy policy carefully. If you do not agree with the terms of this privacy policy,
                            please do not access the site.
                        </p>

                        <h2>Information We Collect</h2>
                        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>

                        <h3>Personal Data</h3>
                        <p>
                            Personally identifiable information, such as your name, email address, and other contact
                            details that you voluntarily give to us when you register with the Site or when you choose
                            to participate in various activities related to the Site, such as online chat and message boards.
                        </p>

                        <h3>Derivative Data</h3>
                        <p>
                            Information our servers automatically collect when you access the Site, such as your IP
                            address, your browser type, your operating system, your access times, and the pages you
                            have viewed directly before and after accessing the Site.
                        </p>

                        <h2>Use of Your Information</h2>
                        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                        <ul>
                            <li>Create and manage your account</li>
                            <li>Email you regarding your account or order</li>
                            <li>Send you newsletters and updates</li>
                            <li>Improve our website and services</li>
                            <li>Monitor and analyze usage and trends</li>
                            <li>Notify you of updates to the Site</li>
                            <li>Respond to your comments, questions, and customer service requests</li>
                        </ul>

                        <h2>Disclosure of Your Information</h2>
                        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>

                        <h3>By Law or to Protect Rights</h3>
                        <p>
                            If we believe the release of information about you is necessary to respond to legal process,
                            to investigate or remedy potential violations of our policies, or to protect the rights,
                            property, and safety of others, we may share your information as permitted or required by
                            any applicable law, rule, or regulation.
                        </p>

                        <h3>Third-Party Service Providers</h3>
                        <p>
                            We may share your information with third parties that perform services for us or on our
                            behalf, including payment processing, data analysis, email delivery, hosting services,
                            customer service, and marketing assistance.
                        </p>

                        <h2>Tracking Technologies</h2>
                        <h3>Cookies and Web Beacons</h3>
                        <p>
                            We may use cookies, web beacons, tracking pixels, and other tracking technologies on the
                            Site to help customize the Site and improve your experience. When you access the Site,
                            your personal information is not collected through the use of tracking technology.
                        </p>

                        <h3>Internet-Based Advertising</h3>
                        <p>
                            Additionally, we may use third-party software to serve ads on the Site, implement email
                            marketing campaigns, and manage other interactive marketing initiatives. This third-party
                            software may use cookies or similar tracking technology to help manage and optimize your
                            online experience with us.
                        </p>

                        <h2>Third-Party Websites</h2>
                        <p>
                            The Site may contain links to third-party websites and applications of interest, including
                            advertisements and external services, that are not affiliated with us. Once you have used
                            these links to leave the Site, any information you provide to these third parties is not
                            covered by this Privacy Policy.
                        </p>

                        <h2>Security of Your Information</h2>
                        <p>
                            We use administrative, technical, and physical security measures to help protect your
                            personal information. While we have taken reasonable steps to secure the personal information
                            you provide to us, please be aware that despite our efforts, no security measures are
                            perfect or impenetrable.
                        </p>

                        <h2>Policy for Children</h2>
                        <p>
                            We do not knowingly solicit information from or market to children under the age of 13.
                            If you become aware of any data we have collected from children under age 13, please
                            contact us using the contact information provided below.
                        </p>

                        <h2>Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time in order to reflect changes to our
                            practices or for other operational, legal, or regulatory reasons. We will notify you of
                            any changes by posting the new Privacy Policy on this page.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have questions or comments about this Privacy Policy, please contact us at:
                        </p>
                        <p>
                            <strong>BlogHub</strong><br />
                            Email: privacy@bloghub.com<br />
                            Address: 123 Blog Street, Content City
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
