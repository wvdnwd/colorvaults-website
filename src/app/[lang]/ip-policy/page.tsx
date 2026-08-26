export default async function IPPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  return (
    <div className="container section">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="title-h1">{isEn ? 'IP Violation and Removal Policy' : 'Beleid inzake IE-inbreuk en verwijdering'}</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--gray-800)', lineHeight: '1.6' }}>
          <p>This Policy pertains to the content by ColorVaults (“the Corporation”) through the website at colorvaults.com.</p>
          
          {/* Trademark & Non-Affiliation Disclaimer */}
          <div style={{
            background: 'var(--gray-100)',
            border: '2px solid var(--primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              🛡️ {isEn ? 'Trademark & Non-Affiliation Disclaimer' : 'Handelsmerk & Niet-Gelieerdheid Verklaring'}
            </h3>
            <p style={{ margin: 0, fontSize: '0.925rem' }}>
              {isEn
                ? 'ColorVaults is an independent provider of free AI-assisted line art templates for personal and educational coloring. All trademarked brand names, franchise characters, and logos mentioned or referenced on this website (including but not limited to Disney, Paw Patrol, Pokémon, Bluey, Super Mario, etc.) belong to their respective copyright and trademark owners. ColorVaults is not affiliated with, sponsored by, or endorsed by any of these entities. Brand names and character references are used strictly for descriptive identification under nominative fair use.'
                : 'ColorVaults is een onafhankelijke aanbieder van gratis AI-gegenereerde lijntekening-sjablonen voor persoonlijk en educatief kleuren. Alle merknamen, franchisekarakters en logo\'s die op deze website worden genoemd of waarnaar wordt verwezen (waaronder Disney, Paw Patrol, Pokémon, Bluey, Super Mario, etc.) behoren toe aan hun respectievelijke auteursrecht- en merkhouders. ColorVaults is op geen enkele wijze gelieerd aan, gesponsord door of goedgekeurd door deze entiteiten. Merknamen en karakterreferenties worden uitsluitend gebruikt voor beschrijvende identificatie onder fair use.'
              }
            </p>
          </div>

          <h2 className="title-h2" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>1. Terminology and Explanation</h2>
          <p>In this Policy, the ensuing expressions shall denote the following interpretations:</p>
          <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>“Operational Day”</strong> refers to any day excluding Saturday or Sunday when conventional banks are available for their complete set of standard operations.</li>
            <li><strong>“Violation Material”</strong> denotes any content disseminated by the Corporation which is claimed (and/or established) to violate any Intellectual Property Rights;</li>
            <li><strong>“Intellectual Property Rights”</strong> comprise all patents, rights in inventions, rights in designs, trademarks, trade and business identities, and all related goodwill, rights to sue for misrepresentation or unfair competition, copyright, moral rights and corresponding rights, rights in databases, topography rights, domain names, rights in information (including expertise and trade secrets), and all other similar or comparable rights (existing now or in the future) globally, whether they are registered or unregistered and incorporating all applications for, and renewals or extensions of, such rights for their entire term;</li>
            <li><strong>“Notification”</strong> signifies a message received by the Corporation advising us of an alleged violation.</li>
          </ul>

          <h2 className="title-h2" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>2. Notification and Removal</h2>
          <p>While the Corporation has taken every reasonable measure to ensure that all content disseminated does not violate the Intellectual Property Rights of any third party, the possibility of such violation cannot be entirely eradicated.</p>
          <p>In accordance with this Policy, any third party who recognizes any content belonging to them that the Corporation has utilized without the required approval should communicate with the Corporation using the procedures detailed herein.</p>

          <h2 className="title-h2" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>3. Notification Procedure</h2>
          <p>If you detect any material protected by Intellectual Property Rights belonging to you in any content disseminated by the Corporation, you should instantly communicate with the Corporation using the following method:</p>
          <p>Dispatch a message to the Corporation at <strong>colorvaults@hotmail.com</strong> comprising the ensuing details:</p>
          <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Your identification and communication details;</li>
            <li>Comprehensive details of the content you believe to be violating. This may incorporate URLs, highlighted copies of content containing violation material, screenshots, and/or any other evidence you deem appropriate;</li>
            <li>Particulars of the alleged violation;</li>
            <li>Evidence of your possession of the Intellectual Property Rights inherent in the Violation Material or of your right to communicate with us on behalf of the owner of such rights.</li>
          </ul>
          <p>The Corporation shall confirm receipt of all Notifications within 7 Operational Days.</p>

          <h2 className="title-h2" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>4. Evaluation and Removal</h2>
          <p>Upon receipt of a Notification, the Corporation shall conduct a preliminary evaluation of the alleged violation to establish its believability and legitimacy.</p>
          <p>If the outcome of the preliminary evaluation indicates that the complaint in the Notification is believable and legitimate, the Violation Material will be taken down pending the finalization of our investigations and/or the reaching of an agreement between the Corporation and you.</p>
          <p>Should the Violation Material have been supplied to the Corporation by a third party, the Corporation will get in touch with that third party during its investigations to determine the extent of that third party’s rights over the Violation Material.</p>
          <p>In instances where it is considered necessary and appropriate, the Corporation shall seek legal counsel to resolve any matters of violation.</p>
          <p>Following the Corporation’s preliminary evaluation of the alleged violation, we shall get in touch with you to inform you of the outcome of the evaluation and to discuss, where relevant, a suitable resolution to your complaint.</p>

          <h2 className="title-h2" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>5. Settlement of Complaints</h2>
          <p>The Corporation shall exert all reasonable efforts to resolve complaints swiftly and impartially. The following outcomes shall be desirable (but not assured):</p>
          <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Where no violation is found, the (alleged) Violation Material shall remain unaltered;</li>
            <li>The Violation Material shall be replaced without changes and without necessitating licensing fees;</li>
            <li>The Violation Material shall be replaced without changes as per the terms of a negotiated paid license;</li>
            <li>The Violation Material shall be replaced with modifications to eliminate violating elements; or</li>
            <li>The Violation Material shall be taken down and not re-published.</li>
          </ul>
          <p>If a complaint cannot be resolved, the Violation Material shall stay removed indefinitely or until an acceptable resolution is achieved.</p>
          <p>Should a complaint be unresolved and becomes the subject of legal proceedings, the Violation Material shall stay removed, the provisions of this Policy shall cease to apply, and the complaint shall be settled as directed by the parties, their legal advisors, and/or the courts of your jurisdiction.</p>

          <h2 className="title-h2" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>6. Modifications to this Policy and Procedure</h2>
          <p>The Corporation reserves the right to modify this Policy as we may consider necessary from time to time or as required by law.</p>

          <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--gray-100)', borderRadius: 'var(--radius)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>IP Violation Form</h3>
            <p style={{ marginBottom: '1rem' }}>Please refer to the Notification Procedure section of the policy above for the information to provide. Send your details and the required evidence to:</p>
            <a href="mailto:colorvaults@hotmail.com" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius)', textDecoration: 'none', fontWeight: 'bold' }}>Email colorvaults@hotmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
