export interface CalendarMonth {
  monthNumber: number;
  slug: string;
  nameEn: string;
  nameNl: string;
  seasonEn: string;
  seasonNl: string;
  themeTitleEn: string;
  themeTitleNl: string;
  icon: string;
  days: number;
  image: string;
  quoteEn: string;
  quoteNl: string;
}

export interface CalendarYearData {
  year: number;
  months: CalendarMonth[];
}

export const CALENDAR_2026_MONTHS: CalendarMonth[] = [
  {
    monthNumber: 1,
    slug:'january',
    nameEn:'January',
    nameNl:'Januari',
    seasonEn:'Winter Wonderland',
    seasonNl:'Winter Wonderland',
    themeTitleEn:'Snowman & Cozy Winter Forest',
    themeTitleNl:'Sneeuwpop & Winterbos',
    icon:'⛄',
    days: 31,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/hub_holidays-seasons.webp',
    quoteEn:'New year, new creative adventures!',
    quoteNl:'Nieuw jaar, nieuwe creatieve avonturen!'},
  {
    monthNumber: 2,
    slug:'february',
    nameEn:'February',
    nameNl:'Februari',
    seasonEn:'Love & Friendship',
    seasonNl:'Liefde & Vriendschap',
    themeTitleEn:'Valentine Hearts & Cute Animals',
    themeTitleNl:'Valentijnshartjes & Vriendjes',
    icon:'💖',
    days: 28,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_cute-pets-animals.webp',
    quoteEn:'Spread kindness and color everywhere.',
    quoteNl:'Verspreid vrolijkheid en kleur overal.'},
  {
    monthNumber: 3,
    slug:'march',
    nameEn:'March',
    nameNl:'Maart',
    seasonEn:'Early Spring',
    seasonNl:'Begin van de Lente',
    themeTitleEn:'Spring Flowers & Singing Birds',
    themeTitleNl:'Lentebloemen & Zingende Vogels',
    icon:'🌸',
    days: 31,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_flowers-floral-patterns.webp',
    quoteEn:'Watch your creativity bloom!',
    quoteNl:'Laat je creativiteit tot bloei komen!'},
  {
    monthNumber: 4,
    slug:'april',
    nameEn:'April',
    nameNl:'April',
    seasonEn:'Easter & Spring',
    seasonNl:'Pasen & Lente',
    themeTitleEn:'Easter Bunny & Decorated Eggs',
    themeTitleNl:'Paashaas & Versierde Paaseieren',
    icon:'🐰',
    days: 30,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_unicorns-pegasus.webp',
    quoteEn:'Hop into spring with bright colors!',
    quoteNl:'Hup de lente in met vrolijke kleuren!'},
  {
    monthNumber: 5,
    slug:'may',
    nameEn:'May',
    nameNl:'Mei',
    seasonEn:'Sunny Nature',
    seasonNl:'Zonnige Natuur',
    themeTitleEn:'Butterflies & Garden Flowers',
    themeTitleNl:'Vlinders & Tuinbloemen',
    icon:'🦋',
    days: 31,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_insects-bugs.webp',
    quoteEn:'Sunny days and colorful ways.',
    quoteNl:'Zonnige dagen vol kleur en plezier.'},
  {
    monthNumber: 6,
    slug:'june',
    nameEn:'June',
    nameNl:'Juni',
    seasonEn:'Welcome Summer',
    seasonNl:'Welkom Zomer',
    themeTitleEn:'Beach Castles & Tropical Sun',
    themeTitleNl:'Zandkastelen & Tropische Zon',
    icon:'🏖️',
    days: 30,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_ocean-sea-creatures.webp',
    quoteEn:'Dive into sunny summer art!',
    quoteNl:'Duik in een zee van zomerkleuren!'},
  {
    monthNumber: 7,
    slug:'july',
    nameEn:'July',
    nameNl:'Juli',
    seasonEn:'Summer Fun',
    seasonNl:'Zomervakantie',
    themeTitleEn:'Ice Cream & Under the Sea Dolphins',
    themeTitleNl:'IJsjes & Dolfijnen in de Zee',
    icon:'🍦',
    days: 31,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_dolphins-underwater.webp',
    quoteEn:'Sweet summer vacation vibes!',
    quoteNl:'Heerlijke zomervakantie!'},
  {
    monthNumber: 8,
    slug:'august',
    nameEn:'August',
    nameNl:'Augustus',
    seasonEn:'Outdoor Adventures',
    seasonNl:'Buitenavonturen',
    themeTitleEn:'Safari Animals & Starry Nights',
    themeTitleNl:'Safaridieren & Sterrenhemel',
    icon:'',
    days: 31,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_safari-wildlife.webp',
    quoteEn:'Roar into adventure!',
    quoteNl:'Ga op avontuur in de wilde natuur!'},
  {
    monthNumber: 9,
    slug:'september',
    nameEn:'September',
    nameNl:'September',
    seasonEn:'Back to School',
    seasonNl:'Terug naar School',
    themeTitleEn:'Classroom Art & Autumn Forest',
    themeTitleNl:'Schoolspullen & Herfstblaadjes',
    icon:'🎒',
    days: 30,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/hub_school-education-templates.webp',
    quoteEn:'Learn, color, and grow!',
    quoteNl:'Leren, kleuren en groeien!'},
  {
    monthNumber: 10,
    slug:'october',
    nameEn:'October',
    nameNl:'Oktober',
    seasonEn:'Autumn & Halloween',
    seasonNl:'Herfst & Halloween',
    themeTitleEn:'Friendly Ghosts & Pumpkins',
    themeTitleNl:'Vrolijke Spookjes & Pompoenen',
    icon:'🎃',
    days: 31,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_halloween.webp',
    quoteEn:'Spooktacular coloring fun!',
    quoteNl:'Griezelig gezellig kleurplezier!'},
  {
    monthNumber: 11,
    slug:'november',
    nameEn:'November',
    nameNl:'November',
    seasonEn:'Cozy Season',
    seasonNl:'Knusse Seizoen',
    themeTitleEn:'Warm Tea, Books & Forest Friends',
    themeTitleNl:'Warme Chocomel & Bosdieren',
    icon:'🍂',
    days: 30,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_woodland-forest-animals.webp',
    quoteEn:'Grateful for colors and warmth.',
    quoteNl:'Gezellig samen binnen kleuren.'},
  {
    monthNumber: 12,
    slug:'december',
    nameEn:'December',
    nameNl:'December',
    seasonEn:'Holidays & Christmas',
    seasonNl:'Feestdagen & Kerstmis',
    themeTitleEn:'Christmas Tree, Santa & Reindeer',
    themeTitleNl:'Kerstboom, Kerstman & Sinterklaas',
    icon:'🎄',
    days: 31,
    image:'https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/theme_christmas.webp',
    quoteEn:'May your days be merry and colorful!',
    quoteNl:'Fijne feestdagen en een magisch nieuwjaar!'}
];

export function getCalendarYear(year: number = 2026): CalendarYearData {
  return {
    year,
    months: CALENDAR_2026_MONTHS
  };
}