export type HolidayThemeId = 
  | 'auto'
  | 'default'
  | 'halloween'
  | 'christmas'
  | 'sinterklaas'
  | 'easter'
  | 'valentines'
  | 'kingsday'
  | 'autumn'
  | 'summer'
  | 'winter';

export interface HolidayThemeConfig {
  id: HolidayThemeId;
  nameEn: string;
  nameNl: string;
  emoji: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  bannerGradient: string;
  particleType: 'none' | 'bats' | 'snow' | 'pepernoten' | 'petals' | 'hearts' | 'confetti' | 'leaves' | 'sun' | 'frost';
  particleCount: number;
  banner: {
    tagEn: string;
    tagNl: string;
    titleEn: string;
    titleNl: string;
    descEn: string;
    descNl: string;
    ctaEn: string;
    ctaNl: string;
    targetSlug: string; // e.g., 'holidays-seasons/halloween-spooky-nights'
  };
  // Month ranges for auto resolution (1-indexed months: 1 = Jan, 12 = Dec)
  autoWindow?: {
    startMonth: number;
    startDay: number;
    endMonth: number;
    endDay: number;
  };
}

export const HOLIDAY_THEMES: Record<HolidayThemeId, HolidayThemeConfig> = {
  auto: {
    id: 'auto',
    nameEn: 'Auto Calendar Mode',
    nameNl: 'Automatisch via Kalender',
    emoji: '🤖',
    badge: 'Aanbevolen',
    primaryColor: '#6C5CE7',
    secondaryColor: '#A29BFE',
    accentGlow: 'rgba(108, 92, 231, 0.3)',
    bannerGradient: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
    particleType: 'none',
    particleCount: 0,
    banner: {
      tagEn: 'Seasonal Special',
      tagNl: 'Seizoensfavorieten',
      titleEn: 'Discover Trending Coloring Pages',
      titleNl: 'Ontdek Populaire Kleurplaten',
      descEn: 'High quality printables for this season!',
      descNl: 'Hoogwaardige printbare kleurplaten voor dit seizoen!',
      ctaEn: 'Explore Collection ->',
      ctaNl: 'Bekijk Collectie ->',
      targetSlug: 'holidays-seasons',
    }
  },
  default: {
    id: 'default',
    nameEn: 'Standard ColorVaults',
    nameNl: 'Standaard ColorVaults',
    emoji: '🌟',
    badge: 'Klassiek',
    primaryColor: '#6C5CE7',
    secondaryColor: '#A29BFE',
    accentGlow: 'rgba(108, 92, 231, 0.25)',
    bannerGradient: 'linear-gradient(135deg, #6C5CE7 0%, #8C7AE6 100%)',
    particleType: 'none',
    particleCount: 0,
    banner: {
      tagEn: '100% Free Coloring Pages',
      tagNl: '100% Gratis Kleurplaten',
      titleEn: 'Over 53,000+ Free Printable Pages',
      titleNl: 'Meer dan 53.000+ Gratis Printbare Kleurplaten',
      descEn: 'Clean line art for toddlers, kids, teens and adults with no watermark.',
      descNl: 'Strakke lijntekeningen voor peuters, kinderen en volwassenen.',
      ctaEn: 'Start Coloring ->',
      ctaNl: 'Direct Kleuren ->',
      targetSlug: 'holidays-seasons',
    }
  },
  halloween: {
    id: 'halloween',
    nameEn: 'Halloween Spooky Night',
    nameNl: 'Halloween & Spookjes',
    emoji: '🎃',
    badge: 'Herfst Feestdag',
    primaryColor: '#F97316', // Vibrant Orange
    secondaryColor: '#9333EA', // Spooky Purple
    accentGlow: 'rgba(249, 115, 22, 0.4)',
    bannerGradient: 'linear-gradient(135deg, #2E0854 0%, #7C2D12 50%, #EA580C 100%)',
    particleType: 'bats',
    particleCount: 12,
    banner: {
      tagEn: '🎃 Spooky Halloween Special',
      tagNl: '🎃 Griezelig Gezellig Halloween',
      titleEn: 'Halloween Coloring Sheets, Ghosts & Masks',
      titleNl: 'Halloween Kleurplaten, Spookjes & Maskers',
      descEn: 'Print free pumpkins, witches, haunted castles and wearable paper masks!',
      descNl: 'Print gratis pompoenen, heksen, spookhuizen en knipmaskers!',
      ctaEn: 'Explore Halloween (600+) ->',
      ctaNl: 'Bekijk Halloween (600+) ->',
      targetSlug: 'holidays-seasons/halloween-spooky-nights',
    },
    autoWindow: {
      startMonth: 9, // Sep 15
      startDay: 15,
      endMonth: 11, // Nov 4
      endDay: 4,
    }
  },
  christmas: {
    id: 'christmas',
    nameEn: 'Christmas & Winter Magic',
    nameNl: 'Kerstmis & Winter Magie',
    emoji: '🎄',
    badge: 'Winter Feestdag',
    primaryColor: '#DC2626', // Festive Red
    secondaryColor: '#16A34A', // Pine Green
    accentGlow: 'rgba(220, 38, 38, 0.35)',
    bannerGradient: 'linear-gradient(135deg, #064E3B 0%, #15803D 50%, #B91C1C 100%)',
    particleType: 'snow',
    particleCount: 24,
    banner: {
      tagEn: '🎄 Merry Christmas & Happy Holidays',
      tagNl: '🎄 Fijne Feestdagen & Kerstmis',
      titleEn: 'Magical Christmas & Winter Wonderland Pages',
      titleNl: 'Magische Kerst- & Winterwonderland Kleurplaten',
      descEn: 'Santa Claus, reindeer, decorated trees, and cozy winter scenes!',
      descNl: 'De Kerstman, rendieren, kerstbomen en gezellige winterse taferelen!',
      ctaEn: 'View Christmas Printables ->',
      ctaNl: 'Bekijk Kerst Kleurplaten ->',
      targetSlug: 'holidays-seasons/christmas-winter-holidays',
    },
    autoWindow: {
      startMonth: 12, // Dec 6
      startDay: 6,
      endMonth: 1, // Jan 6
      endDay: 6,
    }
  },
  sinterklaas: {
    id: 'sinterklaas',
    nameEn: 'Sinterklaas & Pieten',
    nameNl: 'Sinterklaas & Pakjesavond',
    emoji: '🎁',
    badge: 'NL/BE Feestdag',
    primaryColor: '#E11D48', // Royal Red
    secondaryColor: '#F59E0B', // Sinterklaas Gold
    accentGlow: 'rgba(225, 29, 72, 0.35)',
    bannerGradient: 'linear-gradient(135deg, #881337 0%, #BE123C 50%, #D97706 100%)',
    particleType: 'pepernoten',
    particleCount: 14,
    banner: {
      tagEn: '🎁 Sinterklaas Festivities',
      tagNl: '🎁 Welkom Sinterklaas & Pieten',
      titleEn: 'Dutch Sinterklaas & Gift Season Coloring',
      titleNl: 'Sinterklaas, Pieten & Pakjesavond Kleurplaten',
      descEn: 'The traditional Dutch holiday: Amerigo horse, steam boat, and shoes!',
      descNl: 'Kleurplaten voor in de schoen, Amerigo het paard en de stoomboot!',
      ctaEn: 'Explore Sinterklaas ->',
      ctaNl: 'Bekijk Sinterklaas Platen ->',
      targetSlug: 'holidays-seasons/sinterklaas-pieten',
    },
    autoWindow: {
      startMonth: 11, // Nov 5
      startDay: 5,
      endMonth: 12, // Dec 5
      endDay: 5,
    }
  },
  easter: {
    id: 'easter',
    nameEn: 'Easter & Spring Bloom',
    nameNl: 'Pasen & Lente Bloei',
    emoji: '🐰',
    badge: 'Lente Feestdag',
    primaryColor: '#10B981', // Spring Green
    secondaryColor: '#F472B6', // Blossom Pink
    accentGlow: 'rgba(16, 185, 129, 0.3)',
    bannerGradient: 'linear-gradient(135deg, #065F46 0%, #059669 50%, #DB2777 100%)',
    particleType: 'petals',
    particleCount: 16,
    banner: {
      tagEn: '🐰 Happy Easter & Spring Season',
      tagNl: '🐰 Vrolijk Pasen & Lente',
      titleEn: 'Easter Bunny, Decorated Eggs & Spring Flowers',
      titleNl: 'Paashaas, Paaseieren Versieren & Lentebloemen',
      descEn: 'Celebrate spring with baby chicks, bunnies, and blooming gardens!',
      descNl: 'Vier de lente met vrolijke paashaasjes, eieren en bloesems!',
      ctaEn: 'View Easter Collection ->',
      ctaNl: 'Bekijk Paascollectie ->',
      targetSlug: 'holidays-seasons/easter-spring-bloom',
    },
    autoWindow: {
      startMonth: 3, // Mar 1
      startDay: 1,
      endMonth: 4, // Apr 25
      endDay: 25,
    }
  },
  valentines: {
    id: 'valentines',
    nameEn: "Valentine's Day & Love",
    nameNl: 'Valentijnsdag & Liefde',
    emoji: '💖',
    badge: 'Romantisch',
    primaryColor: '#E11D48', // Rose Red
    secondaryColor: '#F43F5E', // Pink Red
    accentGlow: 'rgba(244, 63, 94, 0.4)',
    bannerGradient: 'linear-gradient(135deg, #881337 0%, #BE123C 60%, #FB7185 100%)',
    particleType: 'hearts',
    particleCount: 15,
    banner: {
      tagEn: '💖 Happy Valentine’s Day',
      tagNl: '💖 Fijne Valentijnsdag',
      titleEn: 'Heartwarming Love & Friendship Coloring Pages',
      titleNl: 'Liefdevolle Valentijn & Vriendschap Kleurplaten',
      descEn: 'Express your love with cute animals, roses, cards and heart mandalas!',
      descNl: "Deel je liefde met schattige dieren, rozen, kaartjes en hartjes mandala's!",
      ctaEn: 'Valentine Coloring Pages ->',
      ctaNl: 'Bekijk Valentijn Platen ->',
      targetSlug: 'holidays-seasons',
    },
    autoWindow: {
      startMonth: 2, // Feb 1
      startDay: 1,
      endMonth: 2, // Feb 16
      endDay: 16,
    }
  },
  kingsday: {
    id: 'kingsday',
    nameEn: "King's Day & Carnival Party",
    nameNl: 'Koningsdag & Feest / Carnaval',
    emoji: '👑',
    badge: 'Oranje Feestdag',
    primaryColor: '#F97316', // Dutch Orange
    secondaryColor: '#2563EB', // Royal Blue
    accentGlow: 'rgba(249, 115, 22, 0.4)',
    bannerGradient: 'linear-gradient(135deg, #C2410C 0%, #EA580C 50%, #1D4ED8 100%)',
    particleType: 'confetti',
    particleCount: 20,
    banner: {
      tagEn: '👑 Royal Party & Celebrations',
      tagNl: '👑 Leve de Koning & Feest',
      titleEn: 'King’s Day, Crowns & Festive Party Sheets',
      titleNl: 'Koningsdag, Vrijmarkt, Kroontjes & Feest',
      descEn: 'Fun celebration coloring sheets with crowns, flags, and party vibes!',
      descNl: 'Vrolijke feestplaten met kroontjes, vlaggetjes en feestvreugde!',
      ctaEn: 'Explore Festive Pages ->',
      ctaNl: 'Bekijk Feestplaten ->',
      targetSlug: 'holidays-seasons',
    },
    autoWindow: {
      startMonth: 4, // Apr 20
      startDay: 20,
      endMonth: 4, // Apr 30
      endDay: 30,
    }
  },
  autumn: {
    id: 'autumn',
    nameEn: 'Cozy Autumn & Harvest',
    nameNl: 'Gezellige Herfst & Oogst',
    emoji: '🍂',
    badge: 'Seizoen',
    primaryColor: '#D97706', // Amber Gold
    secondaryColor: '#B45309', // Burnt Orange
    accentGlow: 'rgba(217, 119, 6, 0.35)',
    bannerGradient: 'linear-gradient(135deg, #78350F 0%, #B45309 60%, #D97706 100%)',
    particleType: 'leaves',
    particleCount: 14,
    banner: {
      tagEn: '🍂 Cozy Autumn & Back to School',
      tagNl: '🍂 Gezellige Herfst & Oogstfeest',
      titleEn: 'Falling Leaves, Acorns & Pumpkin Farm Pages',
      titleNl: 'Vallende Herfstblaadjes, Eikeltjes & Pompoenen',
      descEn: 'Embrace the cozy autumn vibes with warm tea, forest animals, and rain!',
      descNl: "Geniet van knusse herfsttaferelen met bosdieren, eikeltjes en paraplu's!",
      ctaEn: 'Autumn Coloring Sheets ->',
      ctaNl: 'Bekijk Herfstplaten ->',
      targetSlug: 'holidays-seasons/autumn-harvest-pumpkins',
    },
    autoWindow: {
      startMonth: 9, // Sep 1
      startDay: 1,
      endMonth: 11, // Nov 30
      endDay: 30,
    }
  },
  summer: {
    id: 'summer',
    nameEn: 'Sunny Summer & Beach',
    nameNl: 'Zonnige Zomer & Strand',
    emoji: '☀️',
    badge: 'Seizoen',
    primaryColor: '#0284C7', // Sky Blue
    secondaryColor: '#F59E0B', // Sun Yellow
    accentGlow: 'rgba(2, 132, 199, 0.35)',
    bannerGradient: 'linear-gradient(135deg, #0369A1 0%, #0284C7 60%, #D97706 100%)',
    particleType: 'sun',
    particleCount: 12,
    banner: {
      tagEn: '☀️ Sunny Summer Holidays',
      tagNl: '☀️ Fijne Zomervakantie & Strand',
      titleEn: 'Tropical Beaches, Ice Cream & Pool Fun',
      titleNl: 'Tropische Stranden, IJsjes & Zwempret',
      descEn: 'Bring the sun indoors with sandcastles, surfing dolphins and sunglasses!',
      descNl: 'Zomerse kleurplaten met zandkastelen, vrolijke dolfijnen en ijsjes!',
      ctaEn: 'Summer Collection ->',
      ctaNl: 'Bekijk Zomerplaten ->',
      targetSlug: 'holidays-seasons',
    },
    autoWindow: {
      startMonth: 6, // Jun 1
      startDay: 1,
      endMonth: 8, // Aug 31
      endDay: 31,
    }
  },
  winter: {
    id: 'winter',
    nameEn: 'Winter Wonderland',
    nameNl: 'Winter Wonderland & Schaatsen',
    emoji: '❄️',
    badge: 'Seizoen',
    primaryColor: '#0EA5E9', // Ice Blue
    secondaryColor: '#64748B', // Slate Frost
    accentGlow: 'rgba(14, 165, 233, 0.35)',
    bannerGradient: 'linear-gradient(135deg, #0F172A 0%, #0369A1 60%, #38BDF8 100%)',
    particleType: 'frost',
    particleCount: 20,
    banner: {
      tagEn: '❄️ Winter Wonderland Magic',
      tagNl: '❄️ Winterpret & Schaatsen',
      titleEn: 'Snowy Mountains, Ice Skaters & Arctic Wildlife',
      titleNl: 'Besneeuwde Bergen, Schaatsers & Poolkappen',
      descEn: 'Chill with cute penguins, polar bears, igloos, and hot cocoa!',
      descNl: 'Pinguïns, ijsberen, warme chocolademelk en winterpret!',
      ctaEn: 'Winter Printables ->',
      ctaNl: 'Bekijk Winterplaten ->',
      targetSlug: 'holidays-seasons/cozy-winter-wonderland',
    },
    autoWindow: {
      startMonth: 1, // Jan 7
      startDay: 7,
      endMonth: 2, // Feb 28
      endDay: 28,
    }
  }
};

/**
 * Resolves the active theme ID based on the current date if 'auto' is selected.
 */
export function resolveHolidayTheme(requestedId: HolidayThemeId, date: Date = new Date()): HolidayThemeConfig {
  if (requestedId !== 'auto') {
    return HOLIDAY_THEMES[requestedId] || HOLIDAY_THEMES.default;
  }

  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // Priority order for holiday windows
  const holidayOrder: HolidayThemeId[] = [
    'halloween',
    'sinterklaas',
    'christmas',
    'valentines',
    'kingsday',
    'easter',
    'autumn',
    'summer',
    'winter'
  ];

  for (const tid of holidayOrder) {
    const theme = HOLIDAY_THEMES[tid];
    const w = theme.autoWindow;
    if (!w) continue;

    const inRange = (() => {
      // Handles year rollover (e.g. Dec to Jan)
      if (w.startMonth > w.endMonth) {
        return (
          (month === w.startMonth && day >= w.startDay) ||
          (month > w.startMonth) ||
          (month === w.endMonth && day <= w.endDay) ||
          (month < w.endMonth)
        );
      }
      return (
        (month > w.startMonth || (month === w.startMonth && day >= w.startDay)) &&
        (month < w.endMonth || (month === w.endMonth && day <= w.endDay))
      );
    })();

    if (inRange) {
      return theme;
    }
  }

  return HOLIDAY_THEMES.default;
}
