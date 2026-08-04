/**
 * The exam spine. Everything the course notes flag with "EXAM" or "***" lives
 * here in structured form: the four teachers and their lessons, the three
 * conditions of mind with the consequences of each failing, how wisdom is
 * acquired and detected, and the short lists the lectures kept returning to.
 */

export interface Condition {
  id: string;
  apache: string;
  name: string;
  /** What the adjective means on its own, before the spatial prefix. */
  literal: string;
  /** What the compound means — the metaphor proper. */
  metaphor: string;
  /** What such a mind does. */
  does: string;
  /** Consequences if the condition is not met — the exam asks for these. */
  ifAbsent: string[];
  /** Which class of distraction it wards off. */
  wards?: string;
  /** Dudley's illustrative story, where he gave one. */
  story?: { placeId: string; title: string; failing: string };
}

export const WISDOM_DEF = {
  apache: '’igoyá’í',
  short: 'a heightened mental capacity for detecting danger before it is apparent',
  long:
    'Wisdom is a heightened mental capacity that facilitates the avoidance of harmful events by detecting threatening circumstances when none are apparent. It is sustained by three conditions of mind, none of them given at birth, each of which must be cultivated deliberately by acquiring knowledge and applying it critically to the workings of one’s own mind.',
  water:
    'Likened to water because of its life-sustaining properties, wisdom is viewed first and foremost as an instrument of survival. Dudley Patterson: you can’t live long without water and you can’t live a long time without wisdom — you need to drink both.',
  distribution:
    'Because the conditions vary from mind to mind, the theory explains why some people are wiser than others: in any Apache community at any time wisdom is present in varying degrees, and only a few people are ever completely wise. Those few can foresee disaster, fend off misfortune and avoid explosive conflicts — so they are highly respected and often live to be very old.',
  citation: 'WSP pp. 130-40',
};

/**
 * NOTE the dependency structure, which the exam answer should state:
 * smoothness is the PRIMARY condition, and it is produced by the two
 * subsidiary ones — resilience against external distraction, steadiness
 * against internal distraction.
 */
export const CONDITIONS: Condition[] = [
  {
    id: 'smooth',
    apache: 'bíni’ godilkooh',
    name: 'Smoothness of mind',
    literal: 'dilkooh alone describes an even surface — a pane of glass, varnished wood.',
    metaphor:
      'With the spatial prefix go- it means cleared space, an area free of obstructions — like an agricultural field from which all vegetation has been carefully removed.',
    does:
      'Smooth minds are uncluttered and unfettered, so they observe and reason with penetrating clarity. Sceptical of outward appearances, they look through and beyond them to detect obscured realities and hidden possibilities. They see danger before it happens and trouble before it comes.',
    ifAbsent: [
      'You will fail to see danger.',
      'You will trust your eyes, but they will deceive you.',
      'You will be easily tricked and fooled.',
      'Then there will be nothing but trouble for you.',
    ],
    wards: 'THE PRIMARY CONDITION — produced and preserved by the other two.',
  },
  {
    id: 'resilient',
    apache: 'bíni’ gontł’iz',
    name: 'Resilience of mind',
    literal: 'ntł’iz alone means hard — surfaces that resist damage from outside forces.',
    metaphor:
      'With go- it becomes an enclosed space that holds its shape: a tightly woven basket, yielding but strong; an inflated ball; a flexible box that takes a child’s weight.',
    does:
      'Resilient minds protect their interior space against jarring external events, centring themselves on what must be done about the problem at hand. Fear and alarm are the greatest threats. They do not panic, or fall prey to anxiety, or succumb to crippling worry; even in terrifying circumstances they keep reasoning clearly, so they neither block themselves nor stand in their own way.',
    ifAbsent: [
      'You will be easily startled.',
      'You will be easily frightened.',
      'You will try to think quickly but you won’t think clearly.',
      'You yourself will stand in the way of your own mind — you will block it.',
      'Then there will be trouble for you.',
    ],
    wards: 'Wards off EXTERNAL distractions.',
    story: {
      placeId: 'coyote_piss',
      title: 'Coyote Pisses In The Water',
      failing:
        'Thirsty people drank before their leader had finished looking around, then panicked when they fell ill. They trusted their eyes and would not wait; one child nearly died.',
    },
  },
  {
    id: 'steady',
    apache: 'bíni’ gonłdzil',
    name: 'Steadiness of mind',
    literal: 'The compound describes what maintains its own stability and reliability.',
    metaphor:
      'Achieved by relinquishing all thoughts of personal superiority and eliminating aggressive feelings toward other human beings — the essence is doing away with self-serving emotions that exploit or demean the worth of other people.',
    does:
      'Steady minds are unhampered by arrogance or pride, anger or vindictiveness, jealousy or lust — all serious hindrances to calm and measured thinking. Free of conceit and hostile ambition, they forget about themselves and conduct their social affairs in harmony and peace, so the wise rarely encounter serious interpersonal problems.',
    ifAbsent: [
      'You will be easily angered and upset.',
      'You will be arrogant and proud; you will look down on other people.',
      'You will envy them and desire their possessions.',
      'You will speak about them without thinking — complain, gossip, criticize.',
      'You will lust after their women.',
      'People will come to despise you. They will pay someone to use his power on you. They will want to kill you.',
      'Then there will be nothing but trouble for you. You must learn to forget about yourself.',
    ],
    wards: 'Wards off INTERNAL distractions.',
    story: {
      placeId: 'grasshoppers',
      title: 'Grasshoppers Piled Up Across',
      failing:
        'A medicine man insisted on singing alone because the people had come to him first, and sang four fruitless nights while the corn was eaten. He was far too proud; his mind was not smooth; he thought only of himself.',
    },
  },
];

/** How wisdom is acquired — the exam asks for this with an example. */
export const ACQUISITION = [
  {
    step: 'It is nobody’s birthright',
    detail:
      'Except for the mentally impaired, every Apache can legitimately aspire to wisdom — but no one is born with the three conditions. Cultivating them is a long, uneven process involving much introspection and many disheartening setbacks.',
  },
  {
    step: 'Private work and public instruction',
    detail:
      'It is the individual’s responsibility to assess their own mind critically. But instruction is also needed, from people sympathetic to the endeavour who have pursued it with some success themselves.',
  },
  {
    step: 'It starts in preadolescence',
    detail:
      'Instruction usually begins when children become aware that adult life entails an endless flow of demands needing special skills. They are told to be constantly alert, to remember everything they observe, and to report anything out of the ordinary.',
  },
  {
    step: 'Watch the right adults',
    detail:
      'They are urged to pay close attention to the words and actions of older people whose general demeanour is deemed worthy of emulation.',
  },
  {
    step: 'Travel, and be talked to',
    detail:
      'They are regularly invited to travel, especially with people who will speak to them about the places they see and visit. It is on these excursions that the link between places and wisdom is first made explicit: drink from places, they are told, then you can work on your mind.',
  },
  {
    step: 'Then work on the mind, until it holds',
    detail:
      'Reflecting on narratives that exemplify the conditions reveals where remedial work is needed. This is bíni’ naayik’e’iziig — working on one’s mind — and it becomes less difficult as it becomes habitual. Disciplined effort, diligently sustained, eventually gives rise to a permanent state of mind.',
  },
];

/** How its presence or absence is detected. */
export const DETECTION = [
  'Composure deepens: the wise are increasingly quiet and self-possessed, and rarely show fear or alarm.',
  'They grow more magnanimous, and seldom get angry or upset.',
  'They are more than ever watchful and observant — and it shows in obvious ways.',
  'In crisis they can consult dozens of cautionary narratives in a very short time, testing each until thinker and character flow swiftly together.',
  'The absence shows in the opposite: impulsive acts, alarm and confusion, self-serving haste, and trouble that keeps arriving.',
];

/** Annie Peaches, Nick Thompson, Ronnie Lupe, Benson Lewis: the land claims. */
export const LAND_CLAIMS = [
  'The land is always stalking people.',
  'The land makes people live right.',
  'The land looks after us. The land looks after people.',
  'The land makes us behave.',
  'The land helps us to remember.',
  'The land makes us think.',
  'The land keeps badness away.',
];

/** The four questions any place-maker asks. */
export const PLACEMAKING_QUESTIONS = [
  'What happened here?',
  'Who was involved?',
  'What was it like?',
  'Why should it matter?',
];

/** The three historical layers of Apache naming, in order. */
export const NAME_LAYERS = [
  {
    kind: 'descriptive' as const,
    when: 'First — while the ancestors were exploring the land and deciding to make it home.',
    note: 'They describe the place as it looked then. Charles Henry: the names do not lie; they show what is different and what is still the same.',
  },
  {
    kind: 'clan' as const,
    when: 'Later — when the land was being settled and people had gathered near farms.',
    note: 'Clan names are built out of descriptive place-names, so a people’s name for itself is really the name of its place.',
  },
  {
    kind: 'commemorative' as const,
    when: 'Last — after the Apaches had made the land their own and were living with the rewards and the painful problems of community life.',
    note: 'These record what happened, not what it looks like, and carry the moral freight the historical tales draw on.',
  },
];

/** Western Apache speech, as Basso classifies it (figs. 2-4). */
export const SPEECH_GENRES = [
  { name: 'Ordinary talk', temporal: '—', purpose: 'Everyday business.' },
  { name: 'Prayer', temporal: '—', purpose: 'Address to the holy.' },
  {
    name: 'Myths ("to tell of holiness")',
    temporal: 'The beginning of time',
    purpose: 'Told by medicine men; long; involve a genesis.',
  },
  {
    name: '’ágodzaahí — historical tales ("to tell of that which has happened")',
    temporal: '"Long ago", as the Apache were developing themselves',
    purpose:
      'Short; begin and end with a place-name; nominally edifying, but chiefly used to criticize social delinquents — to shoot them.',
  },
  {
    name: 'Sagas ("to tell of pleasantness")',
    temporal: 'Modern times',
    purpose: 'Relaxation and entertainment.',
  },
  {
    name: 'Gossip',
    temporal: 'The present',
    purpose: 'Keeping people current on local developments.',
  },
];

/** The three ways Cibecue involves itself with the landscape (Ch. 3). */
export const LANDSCAPE_MODES = [
  {
    mode: 'Observe the landscape',
    detail: 'Attending, for reasons of their own, to aspects of its appearance and to goings-on within it.',
  },
  {
    mode: 'Use the landscape',
    detail:
      'Engaging in a broad range of physical activities which, depending on duration and extent, may leave portions of it visibly modified.',
  },
  {
    mode: 'Communicate about the landscape',
    detail:
      'Formulating descriptions and other representations of it, shared in the course of social gatherings.',
  },
];

/** The four teachers and the lesson each one teaches Basso. */
export const TEACHERS = [
  {
    id: 'charles_henry',
    chapter: 'Ch. 1 — Quoting the Ancestors',
    lesson: 'Pronounce the names correctly.',
    why:
      'To speak a place-name is to quote ancestral speech verbatim, so mangling one — or hurrying past it — is disrespect to the ancestors. He also teaches the three layers of naming and takes Basso to the four place-worlds.',
  },
  {
    id: 'nick_thompson',
    chapter: 'Ch. 2 — Stalking with Stories',
    lesson: 'Learn the names first.',
    why:
      'Because the names carry the stories, and the stories are arrows: we shoot each other with them. Whitemen need paper maps; we have maps in our minds.',
  },
  {
    id: 'lola_machuse',
    chapter: 'Ch. 3 — Speaking with Names',
    lesson: 'Speak with names.',
    why:
      'Place-names are all we need for that. Spoken in sequence for a troubled hearer, they give pictures to work on in the mind — criticism delivered without ever criticizing.',
  },
  {
    id: 'dudley_patterson',
    chapter: 'Ch. 4 — Wisdom Sits in Places',
    lesson: 'Wisdom sits in places.',
    why:
      'Places are containers and the knowledge wisdom needs is the water in them, so you must drink from places and then work on your mind. He quotes his grandmother’s trail of wisdom, and shoots Talbert Paxton with Old Man Owl.',
  },
];
