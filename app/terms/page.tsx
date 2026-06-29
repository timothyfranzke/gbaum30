import type { Metadata } from 'next';
import LegalPage, { LegalSection } from '@/app/components/LegalPage';
import { PRIVACY_VERSION, ORG_NAME, ORG_EMAIL } from '@/app/lib/legal';

export const metadata: Metadata = {
  title: 'Terms of Service — Union 30',
  description: 'The terms that govern your use of the Union 30 website.',
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated={PRIVACY_VERSION}>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the {ORG_NAME} website. By using
        this site, you agree to these Terms. If you do not agree, please do not use the site.
      </p>

      <LegalSection heading="Use of the Site">
        <p>
          You agree to use this site only for lawful purposes and not to interfere with its operation,
          security, or other visitors&apos; use of it. We may suspend or restrict access if we reasonably
          believe the site is being misused.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual Property">
        <p>
          All content on this website&mdash;including text, graphics, logos, images, and video&mdash;is
          owned by {ORG_NAME} unless otherwise noted, and is protected by applicable intellectual property
          laws. You may not reproduce or distribute it without our permission.
        </p>
      </LegalSection>

      <LegalSection heading="Assumption of Risk & Liability">
        <p>
          Participation in athletic training carries inherent risks, including the risk of injury. Any
          training arrangements are subject to separate agreements and waivers provided at enrollment. To
          the fullest extent permitted by law, {ORG_NAME} is not liable for indirect or consequential
          damages arising from your use of this website.
        </p>
      </LegalSection>

      <LegalSection heading="Accuracy of Information">
        <p>
          We work to keep the site accurate, but training schedules, programs, and pricing may change
          without notice. Information on this site is provided for general purposes and without warranty of
          any kind.
        </p>
      </LegalSection>

      <LegalSection heading="External Links">
        <p>
          This site may link to third-party services, including PushPress for enrollment and payment. We do
          not control and are not responsible for the content, terms, or practices of those services.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of the site after changes are posted
          constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection heading="Severability">
        <p>
          If any provision of these Terms is found to be unenforceable, the remaining provisions will
          continue in full force and effect.
        </p>
      </LegalSection>

      <LegalSection heading="Governing Law">
        <p>
          These Terms are governed by the laws of the State of Kansas, without regard to its conflict-of-law
          principles.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these Terms? Email{' '}
          <a href={`mailto:${ORG_EMAIL}`} className="underline text-flag hover:text-cream">
            {ORG_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
