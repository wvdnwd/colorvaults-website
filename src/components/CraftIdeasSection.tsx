import React from'react';

interface CraftIdeasProps {
  themeTitle: string;
  isEn: boolean;
}

export default function CraftIdeasSection({ themeTitle, isEn }: CraftIdeasProps) {
  const ideas = isEn ? [
    {
      title:`1. DIY ${themeTitle} Finger Puppets`,
      desc:`After coloring your favorite ${themeTitle} figures, cut them out carefully along the outer black borders. Glue a small paper ring or popsicle stick to the back to create instant puppets for imaginative storytelling and puppet shows!`,
      icon:'🎭'},
    {
      title:`2. Custom ${themeTitle} Bookmarks`,
      desc:`Cut out vertical sections of your finished coloring pages, glue them onto sturdy cardstock, punch a hole at the top, and thread a colorful ribbon. Perfect for reading books at home or in school!`,
      icon:'🔖'},
    {
      title:`3. Room Wall Collage & Framed Art`,
      desc:`Pick 3 to 4 complementary ${themeTitle} designs, color them with matching vibrant palettes, and place them inside standard A4/Letter frames to decorate bedrooms, playrooms, or classroom walls.`,
      icon:'🖼️'},
    {
      title:`4. Laminated Wipe-Clean Placemats`,
      desc:`Laminate your completed ${themeTitle} artwork with clear contact paper or a laminating machine. Use them as durable, water-resistant dining placemats that kids can write on with dry-erase markers!`,
      icon:'🍽️'},
    {
      title:`5. Birthday Party Goodie Bag Embellishments`,
      desc:`Color and cut out miniature ${themeTitle} characters to glue onto plain gift bags, birthday invitation cards, or party treat boxes for a personalized, festive theme party.`,
      icon:''}
  ] : [
    {
      title:`1. Zelfgemaakte ${themeTitle} Vingerpopjes & Stokpoppen`,
      desc:`Knip na het inkleuren de ${themeTitle}-figuren netjes uit langs de zwarte buitenlijnen. Plak een ijscostokje of een papieren ring aan de achterkant voor een vrolijke poppenkastvoorstelling in de woonkamer of klas!`,
      icon:'🎭'},
    {
      title:`2. Prachtige ${themeTitle} Boekenleggers`,
      desc:`Knip een mooie strook uit je ingekleurde tekening, plak deze op stevig karton, maak een gaatje aan de bovenkant en haal er een mooi lintje doorheen. Ideaal voor leesboeken op school of voor het slapengaan.`,
      icon:'🔖'},
    {
      title:`3. Muurdecoratie & Sfeervolle Fotolijstjes`,
      desc:`Kleur 3 of 4 bijpassende ${themeTitle} platen in met warme of felle kleuren en stop ze in een standaard A4-fotolijstje om de kinderkamer of speelhoek vrolijk op te fleuren.`,
      icon:'🖼️'},
    {
      title:`4. Gelamineerde Placemats voor Aan Tafel`,
      desc:`Plak je mooiste ${themeTitle} tekening tussen twee lagen doorzichtig plakfolie of haal hem door het lamineerapparaat. Zo heb je een waterdichte placemat die je keer op keer met een vochtige doek kunt schoonmaken!`,
      icon:'🍽️'},
    {
      title:`5. Verjaardag Feestzakjes & Uitnodigingen`,
      desc:`Knip ingekleurde ${themeTitle} figuren uit en plak ze op eenvoudige papieren traktatiezakjes of verjaardagskaarten voor een superpersoonlijk en feestelijk themafeestje!`,
      icon:''}
  ];

  return (
    <section style={{
      marginTop:'4rem',
      background:'#FFFFFF',
      borderRadius:'var(--radius-xl, 24px)',
      padding:'2.5rem 2.25rem',
      border:'1.5px solid var(--gray-200, #E2E8F0)',
      boxShadow:'0 8px 30px rgba(0, 0, 0, 0.04)',
    }}>
      <div style={{ marginBottom:'2rem'}}>
        <span style={{
          display:'inline-flex',
          alignItems:'center',
          gap:'0.4rem',
          background:'rgba(255, 107, 53, 0.12)',
          color:'#D9480F',
          padding:'0.3rem 0.85rem',
          borderRadius:'9999px',
          fontWeight: 800,
          fontSize:'0.8rem',
          textTransform:'uppercase',
          letterSpacing:'0.05em'}}>
          {isEn ?'Crafts & Activities':'Knutsel- & Lesideeën'}
        </span>
        <h2 style={{
          fontSize:'1.75rem',
          fontWeight: 800,
          color:'#0F172A',
          marginTop:'0.6rem',
          lineHeight: 1.3
        }}>
          {isEn ?`5 Fun Craft Ideas with ${themeTitle} Coloring Pages`:`5 Leuke Knutselideeën met ${themeTitle} Kleurplaten`}
        </h2>
        <p style={{ color:'#64748B', fontSize:'1rem', marginTop:'0.4rem', lineHeight: 1.6 }}>
          {isEn
            ?`Turn your finished ${themeTitle} coloring sheets into wonderful hands-on art projects for home or school!`:`Verander je ingekleurde ${themeTitle} kleurplaten in creatieve knutselwerkjes voor thuis of in de klas!`}
        </p>
      </div>

      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',
        gap:'1.5rem'}}>
        {ideas.map((item, idx) => (
          <div key={idx} style={{
            background:'#F8FAFC',
            borderRadius:'16px',
            padding:'1.5rem',
            border:'1px solid #E2E8F0',
            display:'flex',
            flexDirection:'column',
            gap:'0.6rem'}}>
            <div style={{ fontSize:'1.75rem'}}>{item.icon}</div>
            <h3 style={{ fontSize:'1.1rem', fontWeight: 800, color:'#0F172A', margin: 0 }}>
              {item.title}
            </h3>
            <p style={{ fontSize:'0.925rem', color:'#475569', lineHeight: 1.65, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}