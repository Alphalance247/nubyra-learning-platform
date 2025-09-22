import Layout from "../components/common/layout";

export default function CookiePolicyPage() {
  return (
    <Layout>
      <main className="max-w-[1000px] mx-auto px-4 py-12 text-[#1D1003]">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
          Nubyira Web Cookie Policy
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Effective Date: 2025-09-18 • Company Name: Nubyira LTD
        </p>

        <p className="mb-6">
          This Cookie Policy explains how Nubyira LTD (&quot;Nubyira Process
          Designers&quot;,&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
          uses cookies and similar technologies to recognize you when you visit
          our website and use our services. It explains what these technologies
          are, why we use them, and your rights to control our use of them.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">1. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. They are widely used to
              make websites work, or work more efficiently, as well as to
              provide reporting information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">
              2. Types of Cookies We Use
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Strictly Necessary Cookies: Required for core site
                functionality.
              </li>
              <li>
                Performance and Analytics Cookies: Help us understand how the
                site is used.
              </li>
              <li>
                Functional Cookies: Remember your preferences and settings.
              </li>
              <li>
                Targeting/Advertising Cookies: Deliver relevant advertising (if
                applicable).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">
              3. Cookies Set by Third Parties
            </h2>
            <p>
              Some cookies are set by third parties, such as analytics providers
              (e.g., Google Analytics) or payment providers, to deliver services
              on our behalf.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">4. Why We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and secure our services</li>
              <li>To remember your preferences</li>
              <li>To analyze site traffic and performance</li>
              <li>To improve user experience</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">
              5. How You Can Control Cookies
            </h2>
            <p className="mb-2">
              You have the right to decide whether to accept or reject cookies.
              You can manage your cookie preferences through your browser
              settings. Please note that disabling cookies may affect the
              functionality of the website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">
              6. Updates to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes to the cookies we use or for other operational, legal, or
              regulatory reasons. Please revisit this page regularly to stay
              informed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">7. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other
              technologies, please contact us.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}


