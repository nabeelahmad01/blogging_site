import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - InsightHub',
    description: 'Read our terms of service to understand the rules for using InsightHub.',
};

export default function TermsOfServicePage() {
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
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>Terms of Service</h1>
                    <p style={{ opacity: 0.9 }}>Last updated: December 2024</p>
                </div>
            </section>

            <section style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="blog-content">
                        <h2>Agreement to Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you and InsightHub,
                            concerning your access to and use of our website. You agree that by accessing the Site,
                            you have read, understood, and agreed to be bound by all of these Terms of Service.
                        </p>
                        <p>
                            IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY
                            PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                        </p>

                        <h2>Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code,
                            databases, functionality, software, website designs, audio, video, text, photographs,
                            and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, service marks,
                            and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us.
                        </p>
                        <p>
                            The Content and the Marks are provided on the Site &quot;AS IS&quot; for your information and
                            personal use only. Except as expressly provided in these Terms of Service, no part of
                            the Site and no Content or Marks may be copied, reproduced, aggregated, republished,
                            uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed,
                            sold, licensed, or otherwise exploited for any commercial purpose whatsoever.
                        </p>

                        <h2>User Representations</h2>
                        <p>By using the Site, you represent and warrant that:</p>
                        <ul>
                            <li>All registration information you submit will be true, accurate, current, and complete</li>
                            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
                            <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
                            <li>You are not under the age of 13</li>
                            <li>You will not access the Site through automated or non-human means</li>
                            <li>You will not use the Site for any illegal or unauthorized purpose</li>
                        </ul>

                        <h2>Prohibited Activities</h2>
                        <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to:</p>
                        <ul>
                            <li>Systematically retrieve data or other content from the Site to create or compile a collection, compilation, database, or directory</li>
                            <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users</li>
                            <li>Circumvent, disable, or otherwise interfere with security-related features of the Site</li>
                            <li>Engage in unauthorized framing of or linking to the Site</li>
                            <li>Trick, defraud, or mislead us and other users</li>
                            <li>Attempt to bypass any measures of the Site designed to prevent or restrict access</li>
                            <li>Upload or transmit viruses, Trojan horses, or other material that interferes with any party&apos;s uninterrupted use and enjoyment of the Site</li>
                        </ul>

                        <h2>User Generated Contributions</h2>
                        <p>
                            The Site may invite you to chat, contribute to, or participate in blogs, message boards,
                            online forums, and other functionality, and may provide you with the opportunity to create,
                            submit, post, display, transmit, perform, publish, distribute, or broadcast content and
                            materials to us or on the Site.
                        </p>
                        <p>
                            Any content you post to the site will be considered non-confidential and non-proprietary.
                            By providing any User Contributions on the Site, you grant us and our affiliates and service
                            providers, and each of their and our respective licensees, successors, and assigns the right
                            to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third
                            parties any such material for any purpose.
                        </p>

                        <h2>Site Management</h2>
                        <p>We reserve the right, but not the obligation, to:</p>
                        <ul>
                            <li>Monitor the Site for violations of these Terms of Service</li>
                            <li>Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service</li>
                            <li>Refuse, restrict access to, limit the availability of, or disable any of your contributions or any portion thereof</li>
                            <li>Remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems</li>
                            <li>Otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site</li>
                        </ul>

                        <h2>Term and Termination</h2>
                        <p>
                            These Terms of Service shall remain in full force and effect while you use the Site.
                            WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO,
                            IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE
                            SITE TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
                        </p>

                        <h2>Modifications and Interruptions</h2>
                        <p>
                            We reserve the right to change, modify, or remove the contents of the Site at any time
                            or for any reason at our sole discretion without notice. We also reserve the right to
                            modify or discontinue all or part of the Site without notice at any time.
                        </p>

                        <h2>Governing Law</h2>
                        <p>
                            These Terms shall be governed by and defined following the laws of your jurisdiction.
                            InsightHub and yourself irrevocably consent that the courts shall have exclusive jurisdiction
                            to resolve any dispute which may arise in connection with these terms.
                        </p>

                        <h2>Disclaimer</h2>
                        <p>
                            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF
                            THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED
                            BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE
                            AND YOUR USE THEREOF.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            In order to resolve a complaint regarding the Site or to receive further information
                            regarding use of the Site, please contact us at:
                        </p>
                        <p>
                            <strong>InsightHub</strong><br />
                            Email: legal@InsightHub.com<br />
                            Address: 123 Blog Street, Content City
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

