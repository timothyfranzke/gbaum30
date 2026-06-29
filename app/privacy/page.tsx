import type { Metadata } from 'next';
import LegalPage, { LegalSection } from '@/app/components/LegalPage';
import { PRIVACY_VERSION, ORG_NAME, ORG_LOCATION, ORG_EMAIL } from '@/app/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy — Union 30',
  description: 'How Union 30 collects, uses, and protects the information you provide.',
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={PRIVACY_VERSION}>
      <p>
        {ORG_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), based in {ORG_LOCATION},
        provides goalkeeper training and related services. This policy explains what information we
        collect through this website, how we use it, and the choices you have. We process information
        to respond to your inquiry and to operate our business.
      </p>

      <LegalSection heading="Information We Collect">
        <p>
          We currently collect the following information when you submit our contact form: the parent
          or guardian&apos;s name and email address; the player&apos;s name and age; the program or
          experience level you select; and any details you include in your message.
        </p>
        <p>
          For security and abuse prevention, we also store a hashed version of your IP address and your
          browser&apos;s user-agent string, along with a record of your consent. We do not currently
          collect any other personal information from visitors to this site.
        </p>
      </LegalSection>

      <LegalSection heading="How We Use Information">
        <p>
          We use the information you provide solely to respond to your inquiry, schedule and coordinate
          training, and operate our business. We do not sell your information, and we do not share it for
          third-party marketing.
        </p>
      </LegalSection>

      <LegalSection heading="Children's Privacy">
        <p>
          Our contact form is intended to be completed by a parent or legal guardian. We collect a
          player&apos;s first name and age only so that we can respond to a training inquiry submitted by
          their parent or guardian. We do not knowingly collect personal information directly from
          children. A parent or guardian may request that we delete their child&apos;s information at any
          time by emailing{' '}
          <a href={`mailto:${ORG_EMAIL}`} className="underline text-flag hover:text-cream">
            {ORG_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Cookies & Tracking Technologies">
        <p>
          We do not currently use advertising or analytics cookies. If this changes in the future, we
          will update this Privacy Policy and request your consent where required before any such cookies
          are set.
        </p>
        <p>
          The only cookies used today are strictly necessary: a session cookie that keeps administrators
          signed in to our private admin area, and&mdash;if and when we enable optional analytics&mdash;a
          small record of your cookie preference. We do not currently respond to browser &ldquo;Do Not
          Track&rdquo; signals.
        </p>
      </LegalSection>

      <LegalSection heading="Third-Party Service Providers">
        <p>We rely on a small number of service providers to operate this site:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Google Firebase</strong> &mdash; website hosting, database, and file storage (United
            States).
          </li>
          <li>
            <strong>Our email delivery provider</strong> (Franzke Creative) &mdash; delivers contact-form
            submissions to us by email.
          </li>
          <li>
            <strong>PushPress</strong> &mdash; if you click through to enroll or pay, your information is
            handled by PushPress under its own privacy policy.
          </li>
          <li>
            <strong>Cloudflare Turnstile</strong> &mdash; helps protect our forms from spam and abuse.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          We use commercially reasonable administrative, technical, and physical safeguards to protect the
          information you provide. Information submitted through our forms is transmitted using encrypted
          HTTPS connections. No method of electronic transmission or storage is 100% secure, but we take
          appropriate measures to reduce risk.
        </p>
        <p>
          <strong>Automated security measures.</strong> To protect our site and your data we use automated
          tools that may process limited personal information, including spam detection, rate limiting, bot
          protection, and log monitoring.
        </p>
      </LegalSection>

      <LegalSection heading="Data Retention">
        <p>
          We retain contact-form inquiries for up to 24 months unless you request deletion sooner or a
          longer retention period is required for legal or operational reasons.
        </p>
      </LegalSection>

      <LegalSection heading="Your Privacy Rights">
        <p>
          You may request access to, correction of, or deletion of the personal information we hold about
          you by emailing{' '}
          <a href={`mailto:${ORG_EMAIL}`} className="underline text-flag hover:text-cream">
            {ORG_EMAIL}
          </a>
          . Depending on where you live, you may have additional rights under your state&apos;s privacy
          laws, such as the right to know what information we collect and the right to request deletion.
          We do not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="International Visitors">
        <p>This website is intended for visitors located in the United States.</p>
      </LegalSection>

      <LegalSection heading="Third-Party Links">
        <p>
          Our website may link to third-party services. We are not responsible for the privacy practices or
          content of those services, and we encourage you to review their policies.
        </p>
      </LegalSection>

      <LegalSection heading="Policy Updates">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last
          updated&rdquo; date above. Material changes affecting optional cookies will be accompanied by a
          renewed request for your consent where required.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Information">
        <p>
          {ORG_NAME}, {ORG_LOCATION}. Questions about this policy? Email{' '}
          <a href={`mailto:${ORG_EMAIL}`} className="underline text-flag hover:text-cream">
            {ORG_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
