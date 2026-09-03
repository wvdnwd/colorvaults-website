import React from 'react';

interface CraftIdeasProps {
  themeTitle: string;
  isEn: boolean;
  hubSlug?: string;
  themeSlug?: string;
}

export default function CraftIdeasSection({ themeTitle, isEn, hubSlug = '', themeSlug = '' }: CraftIdeasProps) {
  const slug = (themeSlug || '').toLowerCase();
  const hub = (hubSlug || '').toLowerCase();

  const isMandala = slug.includes('mandala') || slug.includes('pattern') || hub.includes('mandala');
  const isVehicle = slug.includes('car') || slug.includes('race') || slug.includes('formula') || slug.includes('vehicle') || slug.includes('train');
  const isAnimal = hub.includes('animal') || slug.includes('dino') || slug.includes('dog') || slug.includes('puppy') || slug.includes('cat') || slug.includes('kitten') || slug.includes('lion');
  const isCharacter = hub.includes('disney') || hub.includes('anime') || hub.includes('gaming') || hub.includes('superhero') || hub.includes('kids-tv') || slug.includes('pokemon') || slug.includes('stitch') || slug.includes('mario') || slug.includes('sonic');

  const getCraftIdeas = () => {
    if (isMandala) {
      return isEn ? [
        { title: `1. Handcrafted ${themeTitle} Cork Coasters`, desc: `Color your mandala with vibrant waterproof markers, cut out along the outer circular border, and glue onto round cork tiles or wood disks. Seal with Mod Podge for gorgeous, usable coffee table drink coasters!`, icon: '☕' },
        { title: `2. Stained-Glass Mandala Suncatchers`, desc: `Rub the backside of your finished mandala with a drop of baby oil on a cotton pad to make the paper translucent. Tape against sunny windows so the sun lights up your intricate geometric symmetry like stained glass.`, icon: '☀️' },
        { title: `3. Zen Bedroom & Office Framed Art`, desc: `Mount 2 to 3 harmonious mandalas inside square frames with white passe-partout mats to create a serene, minimalist gallery wall that promotes daily calmness and mindfulness.`, icon: '🖼️' },
        { title: `4. DIY Geometric Kaleidoscope Tube`, desc: `Cut circular mandala disks to fit into the transparent lens cap of a cardboard kaleidoscope cylinder. Rotating the tube reveals dazzling shifting reflections!`, icon: '🔮' },
        { title: `5. Meditation Journal & Diary Covers`, desc: `Laminate your completed mandala and adhere it to the front of a lined notebook, bullet journal, or gratitude diary for a personalized, calming cover.`, icon: '📓' },
        { title: `6. Laminated Mindfulness Desk Mat`, desc: `Join multiple colored mandala sheets into a wide rectangle and laminate them to create an inspiring, wipe-clean desk mat for studying or computer work.`, icon: '🧘' },
        { title: `7. Mandala Greeting Cards for Loved Ones`, desc: `Fold high-quality cardstock and paste a circular mandala on the front with an inspirational quote inside for birthdays, thank-you notes, or holidays.`, icon: '💌' },
        { title: `8. Traditional Accordion Paper Fan`, desc: `Fold your colored mandala sheet back and forth like an accordion, glue the bottom point with two popsicle sticks, and unfold into a cooling summer paper fan!`, icon: '🪭' },
        { title: `9. Hanging Geometric Mobile & Chandelier`, desc: `Cut out several concentric mandala disks, suspend them with transparent nylon thread from an embroidery hoop, and hang from the ceiling for gentle, spinning room decor.`, icon: '🎐' },
        { title: `10. Silk Ribbon Bookmark`, desc: `Cut a 2-inch vertical mandala strip, mount onto heavy cardstock, punch a hole at the top, and tie with a silky tassel for mindful reading.`, icon: '🔖' },
      ] : [
        { title: `1. Zelfgemaakte ${themeTitle} Kurken Onderzetters`, desc: `Kleur je mandala in met stiften, knip de cirkel netjes uit en plak hem op ronde kurken onderzetters. Werk af met een laagje vernislijm (Mod Podge) voor stijlvolle, waterbestendige koffie-onderzetters!`, icon: '☕' },
        { title: `2. Glas-in-Lood Mandala Raamhangers`, desc: `Wrijf de achterkant van je voltooide mandala licht in met een paar druppels babyolie op een watje. Het papier wordt prachtig doorschijnend en tovert het zonlicht om in een kleurrijk schouwspel!`, icon: '☀️' },
        { title: `3. Zen Muurkunst & Rustgevende Fotolijstjes`, desc: `Plaats 2 of 3 bijpassende mandala's in vierkante lijstjes met een passe-partout. Dit geeft direct rust en sfeer aan de slaapkamer, werkplek of yogahoek.`, icon: '🖼️' },
        { title: `4. Magische Mandala Caleidoscoop`, desc: `Knip ronde mandala-schijfjes uit en plaats ze in de kop van een kartonnen caleidoscoopbuis voor adembenemende symmetrische reflecties!`, icon: '🔮' },
        { title: `5. Meditatie Dagboek & Notitieboek Kaft`, desc: `Gebruik je mooiste mandala als gepersonaliseerde kaft voor je schetsboek, bullet journal of dagboek voor een dagelijks moment van rust.`, icon: '📓' },
        { title: `6. Gelamineerde Mindful Werkplekmat`, desc: `Lamineer je afgeronde mandala's tot een inspirerende, waterdichte bureaumat voor rust tijdens het huiswerk of thuiswerken.`, icon: '🧘' },
        { title: `7. Handgemaakte Wenskaarten vol Liefde`, desc: `Plak een ingekleurde mandala op een stevige blanco vouwkaart met een mooie persoonlijke boodschap voor verjaardagen of feestdagen.`, icon: '💌' },
        { title: `8. Zomerse Mandala Handwaaier`, desc: `Vouw het ingekleurde vel harmonicagewijs op, plak twee ijsstokjes aan de uiteinden en vouw hem open tot een verkoelende, kleurrijke waaier!`, icon: '🪭' },
        { title: `9. Draaiende Plafondmobiel & Windhanger`, desc: `Knip mandala's van verschillende formaten uit, hang ze met transparant nylondraad aan een houten ring en geniet van een zacht draaiende kunstmobiel.`, icon: '🎐' },
        { title: `10. Luxe Boekenlegger met Kwastje`, desc: `Knip een mooie strook uit het symmetrische patroon, lamineer hem en haal een zijden kwastje door de bovenkant voor je favoriete leesboek.`, icon: '🔖' },
      ];
    }

    if (isAnimal) {
      return isEn ? [
        { title: `1. 3D ${themeTitle} Habitat Shoebox Diorama`, desc: `Turn a recycled shoebox into a prehistoric or wild habitat! Paint a backdrop (jungle, savanna, ocean), color and cut out your ${themeTitle} figures, and glue small paper tabs to stand them up inside in 3D layers!`, icon: '🌴' },
        { title: `2. Safari Explorer Binoculars`, desc: `Tape two cardboard toilet paper rolls together, wrap with colored ${themeTitle} patterns, attach a yarn neck strap, and take your safari binoculars on an adventurous backyard expedition!`, icon: '🔭' },
        { title: `3. Wearable Animal Masks & Ears Headband`, desc: `Cut out the character faces along the outlines, snip out eyeholes, punch side holes, and tie an elastic cord for instant dress-up roleplay!`, icon: '🦁' },
        { title: `4. Collectible Wildlife Fact & Stat Cards`, desc: `Paste cutout ${themeTitle} drawings onto index cards. On the back, write diet, habitat, size, and speed to play educational quiz games with friends and classmates!`, icon: '📋' },
        { title: `5. Animal Bookmarks with Fluffy Yarn Tails`, desc: `Cut character strips, punch a hole at the bottom, and attach a fuzzy yarn tail matching the animal's coat. A fun way to keep track of storybooks!`, icon: '🔖' },
        { title: `6. Wipe-Clean Dining Placemats`, desc: `Laminate your finished masterpiece for a durable, water-resistant breakfast placemat that kids can also draw on with dry-erase markers.`, icon: '🍽️' },
        { title: `7. Handmade Jigsaw Habitat Puzzle`, desc: `Glue your finished sheet to a cereal box, draw puzzle pieces on the back, cut out, and assemble as a brain-building family game!`, icon: '🧩' },
        { title: `8. Laminated Sunlit Window Clings`, desc: `Apply a tiny drop of oil to make the paper translucent and stick to windows for glowing natural light art.`, icon: '☀️' },
        { title: `9. Safari & Prehistoric Wall Gallery`, desc: `Frame 3 to 4 animal sheets together to create a wildlife-themed adventure corner in children's bedrooms.`, icon: '🖼️' },
        { title: `10. Jungle Room Garland & Bunting`, desc: `String pennant-cut animal figures along a braided twine rope across windows, doors, or classroom walls.`, icon: '🚩' },
      ] : [
        { title: `1. 3D ${themeTitle} Schoenendoos Diorama`, desc: `Tover een oude schoenendoos om in een leefgebied (oerwoud, savanne of oceaan)! Schilder de achtergrond, knip je ingekleurde ${themeTitle} dieren uit met een voetje en zet ze neer in 3D!`, icon: '🌴' },
        { title: `2. Zelfgemaakte Safari Verrekijker`, desc: `Plak twee wc-rolletjes aan elkaar, beplak ze met ingekleurde ${themeTitle} patronen, maak een koordje eraan vast en ga op ontdekkingsreis in de tuin of woonkamer!`, icon: '🔭' },
        { title: `3. Vrolijke Dierenmaskers met Elastiek`, desc: `Knip het dierenhoofd netjes uit, maak openingen voor de ogen, prik twee gaatjes aan de zijkanten en bevestig een elastiekje voor urenlang verkleedplezier!`, icon: '🦁' },
        { title: `4. Verzamelbare Dieren Weetjeskaarten`, desc: `Plak je ingekleurde figuren op stevige kaartjes. Schrijf aan de achterkant weetjes zoals leefgebied, voedsel en snelheid voor een leuk kenniskwissamen met vriendjes!`, icon: '📋' },
        { title: `5. Dieren Boekenlegger met Wollen Staartje`, desc: `Knip een mooie boekenlegger uit en maak aan de onderkant een zacht wollen staartje vast dat grappig uit het leesboek piept.`, icon: '🔖' },
        { title: `6. Gelamineerde Placemats voor Aan Tafel`, desc: `Haal de voltooide tekening door een lamineerapparaat voor een waterdichte placemat die je met een doekje zo weer schoonveegt.`, icon: '🍽️' },
        { title: `7. Zelfgemaakte Dieren Legpuzzel`, desc: `Plak de kleurplaat op karton, teken puzzelstukken aan de achterkant en knip ze uit voor een zelfgemaakt spelletje!`, icon: '🧩' },
        { title: `8. Magische Zonnevangers voor het Raam`, desc: `Wrijf de achterkant in met een paar druppels olie zodat het zonlicht prachtig door de kleuren heen schijnt.`, icon: '☀️' },
        { title: `9. Safari Kinderkamer Kunstgalerij`, desc: `Lijst 3 of 4 van je mooiste platen in om de slaapkamer om te toveren tot een echte wildernis.`, icon: '🖼️' },
        { title: `10. Vrolijke Jungle Feestslinger`, desc: `Rijg de ingekleurde dierenfiguren aan een touwtje voor een feestelijke slinger in de speelhoek of klas!`, icon: '🚩' },
      ];
    }

    // Default rich character & general collection
    return isEn ? [
      { title: `1. DIY ${themeTitle} Finger Puppets & Stick Figures`, desc: `After coloring your favorite ${themeTitle} characters, cut them out carefully along the outer black borders. Glue a popsicle stick, wooden skewer, or paper ring to the back. Children can stage their own creative theater plays and imaginative storytelling at home or in school!`, icon: '🎭' },
      { title: `2. Custom ${themeTitle} Bookmarks with Tassels`, desc: `Cut out vertical character strips from completed sheets, glue them onto sturdy cardstock (160–200 gsm), punch a hole at the top, and thread a colorful ribbon or yarn tassel. A fun, rewarding project that encourages daily reading habits!`, icon: '🔖' },
      { title: `3. Framed Wall Gallery & Bedroom Art`, desc: `Pick 3 to 4 complementary ${themeTitle} designs, color them using matching color harmonies (like warm sunset shades or pastel tones), and mount them inside standard A4 or Letter frames to brighten bedrooms, playrooms, or classroom bulletin boards.`, icon: '🖼️' },
      { title: `4. Wipe-Clean Laminated Dining Placemats`, desc: `Laminate your completed ${themeTitle} masterpieces with transparent contact paper or a home laminator. Kids will enjoy durable, waterproof dining placemats that can also be drawn on repeatedly with dry-erase markers!`, icon: '🍽️' },
      { title: `5. Birthday Party Goodie Bags & Treat Toppers`, desc: `Color and cut out miniature ${themeTitle} characters, then adhere them to plain kraft party bags, cupcake toppers, or birthday invitations for an unforgettable, cost-effective themed celebration.`, icon: '🎁' },
      { title: `6. 3D Pop-Up Greeting Cards`, desc: `Fold a piece of sturdy construction paper in half to form a card. Cut out your colored ${themeTitle} hero and attach it to a simple accordion-folded paper tab inside the fold. When the card opens, the character pops right out!`, icon: '💌' },
      { title: `7. Translucent Window Suncatchers`, desc: `Lightly brush the backside of your colored page with a drop of baby oil or cooking oil on a cotton swab. The paper becomes magically translucent! Tape it to a sunlit window so the light glows through like stained glass.`, icon: '☀️' },
      { title: `8. Handmade Jigsaw Puzzle`, desc: `Glue your finished coloring page securely onto thin cardboard (like a cereal box). Once dry, draw puzzle piece outlines on the back and cut them out with scissors. Store in a labeled envelope for a reusable brain game!`, icon: '🧩' },
      { title: `9. Personalized Notebook & Diary Covers`, desc: `Use full-page ${themeTitle} illustrations as custom covers for school binders, sketchbooks, or bullet journals. Seal with clear tape or adhesive film to protect against daily classroom wear and tear.`, icon: '📓' },
      { title: `10. Festive Party Bunting & Room Garland`, desc: `Cut finished ${themeTitle} figures into uniform triangle or pennant shapes, punch two holes along the top edge, and string them onto twine or ribbon to create festive hanging garlands for parties or bedrooms.`, icon: '🚩' },
    ] : [
      { title: `1. Zelfgemaakte ${themeTitle} Vingerpopjes & Stokpoppen`, desc: `Knip na het inkleuren de ${themeTitle}-figuren netjes uit langs de buitenlijnen. Plak een houten ijsstokje of papieren ring aan de achterkant. Kinderen kunnen zo hun eigen poppenkastverhalen naspelen in de woonkamer of op school!`, icon: '🎭' },
      { title: `2. Prachtige ${themeTitle} Boekenleggers met Lint`, desc: `Knip een mooie verticale strook uit je voltooide tekening, plak deze op stevig karton, maak een gaatje aan de bovenkant en rijg er een vrolijk lintje doorheen. Een superleuke knutselactiviteit die kinderen stimuleert om te lezen!`, icon: '🔖' },
      { title: `3. Sfeervolle Fotolijstjes & Kinderkamer Kunst`, desc: `Kies 3 of 4 bijpassende ${themeTitle} platen, kleur ze in met een harmonieus kleurenpalet en plaats ze in standaard A4-lijstjes om de slaapkamer, speelhoek of het klaslokaal gezellig en persoonlijk aan te kleden.`, icon: '🖼️' },
      { title: `4. Gelamineerde Placemats voor Aan Tafel`, desc: `Haal je mooiste ${themeTitle} tekening door het lamineerapparaat of plak hem tussen twee lagen transparant plakfolie. Het resultaat is een waterdichte placemat die je met een vochtige doek schoonveegt en zelfs met whiteboardstiften kunt hergebruiken!`, icon: '🍽️' },
      { title: `5. Traktatiezakjes & Themafeest Uitnodigingen`, desc: `Knip ingekleurde ${themeTitle} figuurtjes uit en plak ze op eenvoudige papieren feestzakjes, prikkers of verjaardagskaarten voor een uniek en vrolijk kinderfeestje.`, icon: '🎁' },
      { title: `6. Verrassende 3D Pop-Up Wenskaarten`, desc: `Vouw een stevig vel gekleurd papier dubbel tot een kaart. Knip je ingekleurde ${themeTitle} figuur uit en plak hem op een klein harmonicapapiertje binnenin. Zodra de ontvanger de kaart opent, springt het personage naar voren!`, icon: '💌' },
      { title: `7. Magische Raamhangers & Zonnevangers`, desc: `Wrijf de achterkant van de ingekleurde tekening licht in met een paar druppels babyolie op een watje. Het papier wordt prachtig semi-transparant! Plak het tegen het raam zodat het zonlicht er doorheen schijnt als glas-in-lood.`, icon: '☀️' },
      { title: `8. Zelfgemaakte Legpuzzel`, desc: `Plak de voltooide kleurplaat op stevig karton (zoals een mueslidoos). Teken aan de achterkant puzzelstukjes en knip ze uit. Bewaar ze in een envelop voor een zelfgemaakt spelletje voor urenlang speelplezier!`, icon: '🧩' },
      { title: `9. Gepersonaliseerde Schriften & Boekkaften`, desc: `Gebruik een paginagrote ${themeTitle} tekening als unieke omslag voor een schoolschrift, schetsboek of dagboek. Bedek met transparante folie om hem het hele schooljaar mooi en krasvrij te houden.`, icon: '📓' },
      { title: `10. Feestelijke Vlaggenlijn & Slinger`, desc: `Knip meerdere ingekleurde ${themeTitle} tekeningen in vlaggetjesvorm, maak twee gaatjes aan de bovenzijde en rijg ze aan een touwtje. Zo maak je in een handomdraai een vrolijke slinger voor verjaardagen of de klas!`, icon: '🚩' },
    ];
  };

  const ideas = getCraftIdeas();

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