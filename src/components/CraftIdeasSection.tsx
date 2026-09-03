import React from 'react';

interface CraftIdeasProps {
  themeTitle: string;
  isEn: boolean;
}

export default function CraftIdeasSection({ themeTitle, isEn }: CraftIdeasProps) {
  const ideas = isEn ? [
    {
      title: `1. DIY ${themeTitle} Finger Puppets & Stick Figures`,
      desc: `After coloring your favorite ${themeTitle} characters, cut them out carefully along the outer black borders. Glue a popsicle stick, wooden skewer, or paper ring to the back. Children can stage their own creative theater plays and imaginative storytelling at home or in school!`,
      icon: '🎭',
    },
    {
      title: `2. Custom ${themeTitle} Bookmarks with Tassels`,
      desc: `Cut out vertical character strips from completed sheets, glue them onto sturdy cardstock (160–200 gsm), punch a hole at the top, and thread a colorful ribbon or yarn tassel. A fun, rewarding project that encourages daily reading habits!`,
      icon: '🔖',
    },
    {
      title: `3. Framed Wall Gallery & Bedroom Art`,
      desc: `Pick 3 to 4 complementary ${themeTitle} designs, color them using matching color harmonies (like warm sunset shades or pastel tones), and mount them inside standard A4 or Letter frames to brighten bedrooms, playrooms, or classroom bulletin boards.`,
      icon: '🖼️',
    },
    {
      title: `4. Wipe-Clean Laminated Dining Placemats`,
      desc: `Laminate your completed ${themeTitle} masterpieces with transparent contact paper or a home laminator. Kids will enjoy durable, waterproof dining placemats that can also be drawn on repeatedly with dry-erase markers!`,
      icon: '🍽️',
    },
    {
      title: `5. Birthday Party Goodie Bags & Treat Toppers`,
      desc: `Color and cut out miniature ${themeTitle} characters, then adhere them to plain kraft party bags, cupcake toppers, or birthday invitations for an unforgettable, cost-effective themed celebration.`,
      icon: '🎁',
    },
    {
      title: `6. 3D Pop-Up Greeting Cards`,
      desc: `Fold a piece of sturdy construction paper in half to form a card. Cut out your colored ${themeTitle} hero and attach it to a simple accordion-folded paper tab inside the fold. When the card opens, the character pops right out!`,
      icon: '💌',
    },
    {
      title: `7. Translucent Window Suncatchers`,
      desc: `Lightly brush the backside of your colored page with a drop of baby oil or cooking oil on a cotton swab. The paper becomes magically translucent! Tape it to a sunlit window so the light glows through like stained glass.`,
      icon: '☀️',
    },
    {
      title: `8. Handmade Jigsaw Puzzle`,
      desc: `Glue your finished coloring page securely onto thin cardboard (like a cereal box). Once dry, draw puzzle piece outlines on the back and cut them out with scissors. Store in a labeled envelope for a reusable brain game!`,
      icon: '🧩',
    },
    {
      title: `9. Personalized Notebook & Diary Covers`,
      desc: `Use full-page ${themeTitle} illustrations as custom covers for school binders, sketchbooks, or bullet journals. Seal with clear tape or adhesive film to protect against daily classroom wear and tear.`,
      icon: '📓',
    },
    {
      title: `10. Festive Party Bunting & Room Garland`,
      desc: `Cut finished ${themeTitle} figures into uniform triangle or pennant shapes, punch two holes along the top edge, and string them onto twine or ribbon to create festive hanging garlands for parties or bedrooms.`,
      icon: '🚩',
    },
  ] : [
    {
      title: `1. Zelfgemaakte ${themeTitle} Vingerpopjes & Stokpoppen`,
      desc: `Knip na het inkleuren de ${themeTitle}-figuren netjes uit langs de buitenlijnen. Plak een houten ijsstokje of papieren ring aan de achterkant. Kinderen kunnen zo hun eigen poppenkastverhalen naspelen in de woonkamer of op school!`,
      icon: '🎭',
    },
    {
      title: `2. Prachtige ${themeTitle} Boekenleggers met Lint`,
      desc: `Knip een mooie verticale strook uit je voltooide tekening, plak deze op stevig karton, maak een gaatje aan de bovenkant en rijg er een vrolijk lintje doorheen. Een superleuke knutselactiviteit die kinderen stimuleert om te lezen!`,
      icon: '🔖',
    },
    {
      title: `3. Sfeervolle Fotolijstjes & Kinderkamer Kunst`,
      desc: `Kies 3 of 4 bijpassende ${themeTitle} platen, kleur ze in met een harmonieus kleurenpalet en plaats ze in standaard A4-lijstjes om de slaapkamer, speelhoek of het klaslokaal gezellig en persoonlijk aan te kleden.`,
      icon: '🖼️',
    },
    {
      title: `4. Gelamineerde Placemats voor Aan Tafel`,
      desc: `Haal je mooiste ${themeTitle} tekening door het lamineerapparaat of plak hem tussen twee lagen transparant plakfolie. Het resultaat is een waterdichte placemat die je met een vochtige doek schoonveegt en zelfs met whiteboardstiften kunt hergebruiken!`,
      icon: '🍽️',
    },
    {
      title: `5. Traktatiezakjes & Themafeest Uitnodigingen`,
      desc: `Knip ingekleurde ${themeTitle} figuurtjes uit en plak ze op eenvoudige papieren feestzakjes, prikkers of verjaardagskaarten voor een uniek en vrolijk kinderfeestje.`,
      icon: '🎁',
    },
    {
      title: `6. Verrassende 3D Pop-Up Wenskaarten`,
      desc: `Vouw een stevig vel gekleurd papier dubbel tot een kaart. Knip je ingekleurde ${themeTitle} figuur uit en plak hem op een klein harmonicapapiertje binnenin. Zodra de ontvanger de kaart opent, springt het personage naar voren!`,
      icon: '💌',
    },
    {
      title: `7. Magische Raamhangers & Zonnevangers`,
      desc: `Wrijf de achterkant van de ingekleurde tekening licht in met een paar druppels babyolie op een watje. Het papier wordt prachtig semi-transparant! Plak het tegen het raam zodat het zonlicht er doorheen schijnt als glas-in-lood.`,
      icon: '☀️',
    },
    {
      title: `8. Zelfgemaakte Legpuzzel`,
      desc: `Plak de voltooide kleurplaat op stevig karton (zoals een mueslidoos). Teken aan de achterkant puzzelstukjes en knip ze uit. Bewaar ze in een envelop voor een zelfgemaakt spelletje voor urenlang speelplezier!`,
      icon: '🧩',
    },
    {
      title: `9. Gepersonaliseerde Schriften & Boekkaften`,
      desc: `Gebruik een paginagrote ${themeTitle} tekening als unieke omslag voor een schoolschrift, schetsboek of dagboek. Bedek met transparante folie om hem het hele schooljaar mooi en krasvrij te houden.`,
      icon: '📓',
    },
    {
      title: `10. Feestelijke Vlaggenlijn & Slinger`,
      desc: `Knip meerdere ingekleurde ${themeTitle} tekeningen in vlaggetjesvorm, maak twee gaatjes aan de bovenzijde en rijg ze aan een touwtje. Zo maak je in een handomdraai een vrolijke slinger voor verjaardagen of de klas!`,
      icon: '🚩',
    },
  ];

  const supplies = isEn ? [
    { name: 'Heavy Paper or Cardstock', detail: '120–200 gsm prevents ink bleed-through', icon: '📄' },
    { name: 'Colored Pencils & Gel Pens', detail: 'Ideal for detailed line art and shading', icon: '✏️' },
    { name: 'Child-Safe Scissors', detail: 'Blunt-tip scissors for safe crafting', icon: '✂️' },
    { name: 'Non-Toxic Glue Sticks', detail: 'Clean adhesion without wrinkling paper', icon: '🧴' },
    { name: 'Ribbons, Twine & Sticks', detail: 'For bookmarks, puppets, and garlands', icon: '🎀' },
    { name: 'Laminating Pouches (Optional)', detail: 'For durable placemats and keepsakes', icon: '🛡️' },
  ] : [
    { name: 'Stevig Papier of Karton', detail: '120–200 g/m² voorkomt doordrukken van viltstiften', icon: '📄' },
    { name: 'Kleurpotloden & Gelpennen', detail: 'Ideaal voor fijne details en schaduwen', icon: '✏️' },
    { name: 'Veilige Kinderschaar', detail: 'Met afgeronde punten voor veilig knipwerk', icon: '✂️' },
    { name: 'Niet-giftige Lijmstiften', detail: 'Plakt schoon zonder dat het papier gaat bobbelen', icon: '🧴' },
    { name: 'Lintjes, Touw & IJscostokjes', detail: 'Voor boekenleggers, poppen en slingers', icon: '🎀' },
    { name: 'Lamineerfolie (Optioneel)', detail: 'Voor waterdichte placemats en duurzaam gebruik', icon: '🛡️' },
  ];

  return (
    <section 
      style={{
        marginTop: '4rem',
        background: '#FFFFFF',
        borderRadius: '28px',
        padding: '2.5rem 2.25rem',
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 12px 36px rgba(15, 23, 42, 0.05)',
      }}
      aria-label={isEn ? 'Craft and Activity Ideas' : 'Knutsel- en Activiteitenideeën'}
    >
      {/* Header */}
      <div style={{ marginBottom: '2.25rem' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: 'rgba(255, 107, 53, 0.1)',
          color: '#EA580C',
          padding: '0.35rem 0.95rem',
          borderRadius: '9999px',
          fontWeight: 800,
          fontSize: '0.82rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          boxShadow: '0 2px 8px rgba(255, 107, 53, 0.1)',
        }}>
          <span aria-hidden="true">✂️</span>
          {isEn ? 'Creative Crafts & Classroom Activities' : 'Creatieve Knutsel- & Lesideeën'}
        </span>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
          fontWeight: 900,
          color: '#0F172A',
          marginTop: '0.75rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
        }}>
          {isEn ? `10 Fun Craft Ideas to Do With ${themeTitle} Coloring Pages` : `10 Leuke Knutselideeën met ${themeTitle} Kleurplaten`}
        </h2>
        <p style={{ color: '#475569', fontSize: '1.025rem', marginTop: '0.5rem', lineHeight: 1.65, maxWidth: '820px' }}>
          {isEn
            ? `Don't let finished coloring sheets end up in the recycle bin! Here are 10 hands-on, budget-friendly art projects and classroom activities parents and educators love:`
            : `Gooi ingekleurde tekeningen niet zomaar weg! Hier zijn 10 creatieve, voordelige knutselprojecten en lesactiviteiten waar ouders, juffen en meesters dol op zijn:`}
        </p>
      </div>

      {/* 10 Ideas Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem',
      }}>
        {ideas.map((item, idx) => (
          <div 
            key={idx} 
            style={{
              background: '#F8FAFC',
              borderRadius: '20px',
              padding: '1.4rem 1.35rem',
              border: '1.5px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ 
              fontSize: '1.8rem',
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0.2rem 0 0', lineHeight: 1.3 }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Recommended Craft Supplies Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
        border: '1.5px solid #FDE68A',
        borderRadius: '20px',
        padding: '1.5rem 1.6rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.35rem' }}>🎨</span>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#92400E', margin: 0 }}>
            {isEn ? 'Recommended Craft Supplies for Best Results' : 'Aanbevolen Knutselspullen voor het Mooiste Resultaat'}
          </h4>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.85rem',
        }}>
          {supplies.map((sup, sIdx) => (
            <div 
              key={sIdx}
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '14px',
                padding: '0.75rem 0.95rem',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{sup.icon}</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.84rem', color: '#0F172A', fontWeight: 700 }}>
                  {sup.name}
                </strong>
                <span style={{ fontSize: '0.76rem', color: '#64748B' }}>
                  {sup.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}