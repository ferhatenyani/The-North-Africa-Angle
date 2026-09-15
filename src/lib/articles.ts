import type { Locale } from "./i18n";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type LocalizedArticle = {
  title: string;
  dek: string;
  region: string;
  topic: string;
  blocks: ArticleBlock[];
};

export type Article = {
  slug: string;
  date: string;
  readMinutes: number;
  locales: Record<Locale, LocalizedArticle>;
};

/**
 * Seed articles (sample analysis, EN + FR). Replace with the client's real
 * Substack pieces at handover — see README.md.
 */
export const articles: Article[] = [
  {
    slug: "algeria-gas-diplomacy",
    date: "2026-09-08",
    readMinutes: 6,
    locales: {
      en: {
        title: "Algeria's gas moment: between European demand and domestic pressure",
        dek: "As European buyers look south to replace interrupted Russian volumes, Algeria is balancing new export revenue against rising domestic consumption — and a transition it can no longer defer.",
        region: "Algeria",
        topic: "Energy & Climate",
        blocks: [
          { type: "p", text: "Algeria's gas has rarely been so courted. Since 2022, successive agreements with Italy, and a web of pipeline and LNG arrangements with other European buyers, have turned Sonatrach into an unexpected instrument of European energy security. For Algiers, the moment brings revenue and relevance in equal measure — and a set of constraints that are easy to underestimate from Brussels." },
          { type: "h2", text: "A seller's market, with caveats" },
          { type: "p", text: "Algeria is the EU's third-largest gas supplier, and the Transmed and Medgazel pipelines give it a logistical advantage that LNG competitors cannot match. Yet the comfortable picture hides three structural limits that will define the next decade:" },
          { type: "ul", items: [
            "Reserves are maturing: several legacy fields are in decline, and reversing the trend requires investment cycles of five to ten years.",
            "Domestic consumption keeps climbing, subsidised tariffs and a growing power sector absorb an increasing share of production each summer.",
            "Flaring, under-pricing and the slow pace of partnership reforms weigh on the attractiveness of the upstream market for foreign operators.",
          ] },
          { type: "h2", text: "Domestic consumption crowds in" },
          { type: "p", text: "Every Algerian summer now brings its load-shedding episodes and its social-media criticism of electricity reliability. Each megawatt exported is, politically, a megawatt not consumed at home. The government's dilemma is real: export revenue funds the imports and the social spending on which social peace rests, but under-investment in the domestic system carries its own political cost." },
          { type: "p", text: "The solar programme announced for the south — several gigawatts across successive tenders — is the beginnings of an answer. So is the slow normalisation of relations with Niger and the discussions around the Trans-Saharan pipeline, a long-gestating project that would connect Nigerian gas to the Algerian grid and, from there, to Europe." },
          { type: "p", text: "What to watch: the pace of the 2026 licensing rounds, whether Sonatrach's partnerships move beyond operators to genuine technology transfer, and how the 2027 budget balances energy subsidies against the social spending that has become the implicit price of stability. Algeria's gas moment is real — but it is a window, not a permanent position." },
        ],
      },
      fr: {
        title: "Le moment gazier de l'Algérie : entre demande européenne et pressions domestiques",
        dek: "Alors que les acheteurs européens cherchent au sud des volumes de substitution, l'Algérie arbitre entre revenus d'exportation et consommation domestique croissante — et une transition qu'elle ne peut plus reporter.",
        region: "Algérie",
        topic: "Énergie & climat",
        blocks: [
          { type: "p", text: "Le gaz algérien a rarement été autant courtisé. Depuis 2022, les accords successifs avec l'Italie et une trame de contrats de pipeline et de GNL avec d'autres acheteurs européens ont fait de Sonatrach un instrument inattendu de la sécurité énergétique européenne. Pour Alger, le moment apporte revenus et rayonnement à parts égales — et un ensemble de contraintes faciles à sous-estimer vues de Bruxelles." },
          { type: "h2", text: "Un marché de vendeurs, avec réserves" },
          { type: "p", text: "L'Algérie est le troisième fournisseur de gaz de l'UE, et les pipelines Transmed et Medgazel lui confèrent un avantage logistique que les concurrents GNL ne peuvent égaler. Mais ce tableau confortable masque trois limites structurelles qui définiront la décennie :" },
          { type: "ul", items: [
            "Des réserves qui arrivent à maturité : plusieurs gisements historiques déclinent, et inverser la tendance exige des cycles d'investissement de cinq à dix ans.",
            "Une consommation domestique qui grimpe : tarifs subventionnés et parc électrique en croissance absorbent chaque été une part croissante de la production.",
            "Le flaring, des prix de cession lents à se réformer et un climat partenarial perfectible pèsent sur l'attractivité amont pour les opérateurs étrangers.",
          ] },
          { type: "h2", text: "La consommation domestique dans la balance" },
          { type: "p", text: "Chaque été algérien apporte désormais ses délestages et ses critiques sur les réseaux sociaux quant à la fiabilité du réseau. Chaque mégawatt exporté est, politiquement, un mégawatt non consommé à la maison. Le dilemme du gouvernement est réel : les recettes d'exportation financent les importations et la dépense sociale sur laquelle repose la paix sociale, mais le sous-investissement dans le système domestique a son propre coût politique." },
          { type: "p", text: "Le programme solaire annoncé pour le Sud — plusieurs gigawatts en appels d'offres successifs — est un début de réponse. Il en va de même de la normalisation lente des relations avec le Niger et des discussions autour du pipeline transsaharien, projet ancien qui connecterait le gaz nigérian au réseau algérien et, de là, à l'Europe." },
          { type: "p", text: "À suivre : le rythme des cycles de licences 2026, le passage ou non des partenariats de Sonatrach de l'exploitation au vrai transfert de technologie, et la façon dont la loi de finances 2027 arbitrera entre subventions énergétiques et dépense sociale devenue le prix implicite de la stabilité. Le moment gazier de l'Algérie est réel — mais c'est une fenêtre, pas une position permanente." },
        ],
      },
    },
  },
  {
    slug: "morocco-water-governance",
    date: "2026-08-25",
    readMinutes: 5,
    locales: {
      en: {
        title: "Morocco's water emergency is a governance test",
        dek: "Drought has become structural rather than cyclical. How Rabat allocates scarce water — between cities, farms and industry — is quietly reshaping policy priorities and political expectations.",
        region: "Morocco",
        topic: "Political Economy",
        blocks: [
          { type: "p", text: "Morocco's water conversation used to be about bad rain years. It is now about a structural deficit: dam levels that no longer recover, aquifers drawn down faster than they recharge, and a farming sector that consumes the large majority of available water while contributing a modest share of GDP. The emergency is no longer meteorological. It is distributive." },
          { type: "h2", text: "From drought cycle to structural scarcity" },
          { type: "p", text: "Six consecutive years of below-average rainfall have moved the country from crisis management to permanent rationing logic. Cities have faced night cuts and trucked supply in outlying neighbourhoods; irrigation districts have seen allocations slashed; and the state has responded with a rolling series of programmes — desalination, inter-basin transfers, drip-irrigation conversion — whose scale is genuine but whose sequencing is increasingly political." },
          { type: "p", text: "The pattern matters for investors and partners: water availability is becoming a de facto licensing variable for agri-industry, data centres and heavy industry along the Atlantic corridor, and the criteria by which allocations are decided are not always transparent." },
          { type: "h2", text: "What it means for policy and politics" },
          { type: "ul", items: [
            "Desalination is the flagship answer — energy-hungry, capital-intensive, and increasingly tied to the renewables build-out along the coast.",
            "Agricultural reform is the quiet battleground: export-oriented citrus and berries compete with food staples and with smallholders' livelihoods.",
            "Social tolerance for water inequality is narrowing; in peripheral urban areas, service reliability is becoming a measure of state performance.",
          ] },
          { type: "p", text: "For organisations watching Morocco, the water file is the cleanest lens into how the state balances modernisation and social cohesion — and a leading indicator of where political attention, and budget, will move next." },
        ],
      },
      fr: {
        title: "L'urgence de l'eau au Maroc est un test de gouvernance",
        dek: "La sécheresse n'est plus cyclique mais structurelle. La façon dont Rabat répartit une ressource rare — entre villes, agriculture et industrie — redessine discrètement les priorités et les attentes politiques.",
        region: "Maroc",
        topic: "Économie politique",
        blocks: [
          { type: "p", text: "Au Maroc, la question de l'eau renvoyait aux mauvaises années de pluie. Elle renvoie désormais à un déficit structurel : des barrages qui ne se remplissent plus, des nappes surexploitées et une agriculture qui consomme la grande majorité de l'eau disponible tout en pesant modestement dans le PIB. L'urgence n'est plus météorologique. Elle est distributive." },
          { type: "h2", text: "Du cycle de sécheresse à la rareté structurelle" },
          { type: "p", text: "Six années consécutives de précipitations inférieures à la moyenne ont fait passer le pays de la gestion de crise à une logique de rationnement permanent. Des villes ont connu des coupures nocturnes et des distributions par camion dans les quartiers périphériques ; les périmètres irrigués ont vu leurs allocations réduites ; et l'État a répondu par une suite de programmes — dessalement, transferts inter-bassins, conversion au goutte-à-goutte — dont l'échelle est réelle mais dont le séquençage est devenu éminemment politique." },
          { type: "p", text: "Le schéma compte pour les investisseurs et les partenaires : la disponibilité de l'eau devient une variable d'octroi de facto pour l'agro-industrie, les data centers et l'industrie lourde du corridor atlantique — et les critères d'allocation ne sont pas toujours transparents." },
          { type: "h2", text: "Ce que cela change pour la politique publique" },
          { type: "ul", items: [
            "Le dessalement est la réponse vitrine — énergivore, capitalistique, et de plus en plus couplé au déploiement des renouvelables sur le littoral.",
            "La réforme agricole est le champ de bataille silencieux : agrumes et baies d'exportation concurrencent les cultures vivrières et les revenus des petits paysans.",
            "La tolérance sociale à l'inégalité hydrique se resserre ; dans les zones urbaines périphériques, la fiabilité du service devient une mesure de la performance de l'État.",
          ] },
          { type: "p", text: "Pour qui observe le Maroc, le dossier de l'eau est la meilleure lentille pour lire comment l'État arbitre entre modernisation et cohésion sociale — et un indicateur avancé de la direction que prendront l'attention politique et le budget." },
        ],
      },
    },
  },
  {
    slug: "sahel-realignment-maghreb",
    date: "2026-07-14",
    readMinutes: 7,
    locales: {
      en: {
        title: "The Sahel's realignment and what it means for the Maghreb",
        dek: "New security architectures and external partners in the Sahel are redrawing trade, energy and political lines across North Africa. The five Maghreb states are reacting in very different ways.",
        region: "Regional",
        topic: "Regional Geopolitics",
        blocks: [
          { type: "p", text: "The Sahel's security transition — the departure of Western forces, the arrival of new Russian and regional patrons, and the consolidation of the Alliance of Sahel States — is usually read as a story about the Sahel. It is equally a story about North Africa. The region's trade corridors, migration routes, energy projects and diplomatic alignments are all being repositioned around the new map." },
          { type: "h2", text: "Five capitals, five postures" },
          { type: "ul", items: [
            "Algeria defends the primacy of its borders and its role as the region's accredited mediator, while watching the AES's legitimacy claims with suspicion.",
            "Morocco leverages its Atlantic corridor initiative, offering Sahel states ocean access and quietly competing with Algiers for regional leadership.",
            "Tunisia, focused on its own economic fragility, positions itself primarily as a migration-border partner for Europe.",
            "Libya's fragmentation keeps western routes volatile and makes its southern border a variable no one controls.",
            "Mauritania, the quiet operator, balances Gulf, Chinese and Western partnerships while keeping its own territory stable.",
          ] },
          { type: "h2", text: "Why it matters beyond the region" },
          { type: "p", text: "For European and international organisations, the practical consequence is that Maghreb expertise can no longer be separated from Sahel expertise. Migration policy is decided in Agadez as much as in Tunis; gas geopolitics runs through Niamey as much as Algiers; and the competition between Moroccan and Algerian corridor projects structures investment logics from Nouakchott to N'Djamena." },
          { type: "p", text: "The trendline for 2026-2027: further institutionalisation of the AES, continued Russian entrenchment with local adaptations, European border partnerships migrating further south, and — the open variable — whether Algeria and Morocco's regional rivalry hardens into parallel, non-communicating systems or finds managed coexistence. Businesses and programmes designing their North Africa footprint should treat the Sahel file as a first-order input, not a neighbouring storyline." },
        ],
      },
      fr: {
        title: "Le realignment du Sahel et ce qu'il signifie pour le Maghreb",
        dek: "Nouvelles architectures de sécurité et nouveaux partenaires extérieurs au Sahel redessinent les lignes commerciales, énergétiques et politiques de l'Afrique du Nord. Les cinq États maghrébins réagissent de manière très différente.",
        region: "Régional",
        topic: "Géopolitique régionale",
        blocks: [
          { type: "p", text: "La transition sécuritaire du Sahel — départ des forces occidentales, arrivée de nouveaux parrains russes et régionaux, consolidation de l'Alliance des États du Sahel — se lit habituellement comme une histoire sahelienne. C'est tout autant une histoire nord-africaine. Couloirs commerciaux, routes migratoires, projets énergétiques et alignements diplomatiques de la région se repositionnent tous autour de la nouvelle carte." },
          { type: "h2", text: "Cinq capitales, cinq postures" },
          { type: "ul", items: [
            "L'Algérie défend la primauté de ses frontières et son rôle de médiatrice accréditée de la région, tout en regardant avec méfiance les prétentions de légitimité de l'AES.",
            "Le Maroc porte son initiative de corridor atlantique, offrant aux États sahéliens un accès à l'océan et rivalisant discrètement avec Alger pour le leadership régional.",
            "La Tunisie, concentrée sur sa fragilité économique, se positionne surtout comme partenaire frontalier et migratoire de l'Europe.",
            "La fragmentation libyenne maintient la volatilité des routes occidentales et rend sa frontière sud incontrôlable pour tous.",
            "La Mauritanie, opérateur discret, équilibre partenariats du Golfe, chinois et occidentaux tout en préservant la stabilité de son territoire.",
          ] },
          { type: "h2", text: "Pourquoi cela compte au-delà de la région" },
          { type: "p", text: "Pour les organisations européennes et internationales, la conséquence pratique est que l'expertise maghrébine ne peut plus être séparée de l'expertise sahélienne. La politique migratoire se décide à Agadez autant qu'à Tunis ; la géopolitique du gaz passe par Niamey autant que par Alger ; et la compétition entre corridors marocain et algérien structure les logiques d'investissement de Nouakchott à N'Djamena." },
          { type: "p", text: "La ligne de tendance 2026-2027 : institutionalisation accrue de l'AES, enracinement russe continu avec adaptations locales, partenariats frontaliers européens qui migrent vers le sud, et — variable ouverte — durcissement ou coexistence gérée de la rivalité régionale algéro-marocaine. Les organisations qui dessinent leur empreinte nord-africaine doivent traiter le dossier sahélien comme une donnée de premier ordre, non comme une histoire voisine." },
        ],
      },
    },
  },
];

export function sortedArticles(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
