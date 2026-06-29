import type { Metadata } from 'next';
import LegalPage, { LegalSection } from '@/app/components/LegalPage';
import { PRIVACY_VERSION, ORG_NAME, ORG_EMAIL } from '@/app/lib/legal';

export const metadata: Metadata = {
  title: 'Accessibility — Union 30',
  description: 'Union 30 is committed to making its website accessible to all visitors.',
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" updated={PRIVACY_VERSION}>
      <p>
        {ORG_NAME} is committed to ensuring that our website is accessible to everyone, including people
        with disabilities. We strive to follow widely recognized accessibility standards and to improve the
        experience for all visitors on an ongoing basis.
      </p>

      <LegalSection heading="Our Commitment">
        <p>
          We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA where reasonably
          practicable. Accessibility is an ongoing effort, and we continue to test and refine the site to
          remove barriers.
        </p>
      </LegalSection>

      <LegalSection heading="Requesting Accommodations">
        <p>
          If you encounter any difficulty using this website, or need information provided in an alternative
          format, please contact us and we will work with you to provide the information or service you
          need.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Email{' '}
          <a href={`mailto:${ORG_EMAIL}`} className="underline text-flag hover:text-cream">
            {ORG_EMAIL}
          </a>{' '}
          with the subject &ldquo;Accessibility,&rdquo; and describe the issue and the page where you
          encountered it. We aim to respond promptly.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
