/**
 * Key-term network: the working vocabulary of Wisdom Sits in Places — Basso's
 * analytic terms, the Western Apache words the argument turns on, and the
 * theory he borrows — linked by the relations the book itself draws. This view
 * is the study glossary; the section slider does not filter it.
 *
 * Apache forms follow Basso's orthography as printed. Where the source could
 * not be relied on for a nasalized vowel, the gloss carries the weight and the
 * Apache form is given only if it could be reproduced exactly.
 */

export type TermDomain =
  | 'place' // places, names, and place-making
  | 'speech' // speech genres, metaphor, the ethics of talk
  | 'mind' // wisdom and the conditions of mind
  | 'moral' // morality, kinship obligation, living right
  | 'method'; // ethnography, theory, the discipline

export const DOMAIN_COLORS: Record<TermDomain, string> = {
  place: '#5eead4', // spring teal
  speech: '#fbbf24', // spoken gold
  mind: '#a78bfa', // violet
  moral: '#fb7185', // arrow red
  method: '#38bdf8', // sky
};

export const DOMAIN_LABELS: Record<TermDomain, string> = {
  place: 'Places & naming',
  speech: 'Speech & metaphor',
  mind: 'Wisdom & mind',
  moral: 'Morality & kin',
  method: 'Method & theory',
};

export interface Term {
  id: string;
  term: string;
  lang: 'Apache' | 'English' | 'Anthro. theory';
  domain: TermDomain;
  /** true = flagged KEY or *** as essential in the reading notes. */
  essential?: boolean;
  gloss: string;
  note?: string;
}

export interface TermLink {
  source: string;
  target: string;
  relation: string;
  note?: string;
}

export const TERMS: Term[] = [
  // ——————————— Places & naming ———————————
  { id: 'place_name', term: 'place-name (toponym)', lang: 'English', domain: 'place', essential: true,
    gloss: 'A name that describes a location, conferred by the ancestors and quoted verbatim whenever it is spoken.',
    note: 'KEY. Not merely a handy vehicle of reference: place-names are used and valued for much more. Apache names are built by stacking prefixes onto verb stems, so they are extremely compact yet semantically rich — which is why Apaches liken them to pictures.' },
  { id: 'place_making', term: 'place-making', lang: 'English', domain: 'place', essential: true,
    gloss: 'Retrospective world-building: fleshing out historical material until a place-world comes into being.',
    note: 'KEY: the four questions any place-maker asks — what happened here? who was involved? what was it like? why should it matter? It needs no special skill; anyone with the inclination can do it, which makes it a universal tool of the historical imagination.' },
  { id: 'place_world', term: 'place-world', lang: 'English', domain: 'place', essential: true,
    gloss: 'A posited state of affairs at a place — a particular universe of objects and events in which portions of the past are brought into being.',
    note: 'Basso’s coinage for what a narrator constructs while standing on the ground. Accepted by others as credible or provocative, it enriches the common stock everyone can draw on.' },
  { id: 'sense_place', term: 'sense of place', lang: 'English', domain: 'place', essential: true,
    gloss: 'The lived, culturally informed attachment to locality — everywhere parochial and everywhere specific.',
    note: 'Usually taken for granted until we are deprived of it and find ourselves dislocated; then it surges into awareness. Camus: it is not just something people know and feel, it is something people do.' },
  { id: 'dwelling', term: 'dwelling', lang: 'Anthro. theory', domain: 'place',
    gloss: 'Heidegger’s term: the multiple lived relationships people maintain with places, by which alone space acquires meaning.',
    note: 'Spaces receive their essential being from particular localities, not from space itself.' },
  { id: 'chronotope', term: 'chronotope', lang: 'Anthro. theory', domain: 'place',
    gloss: 'Bakhtin’s term for a point where time and space intersect and fuse.',
    note: 'Apache places are chronotopes: time takes on flesh and becomes visible for contemplation, and places stand as monuments to the community itself.' },
  { id: 'descriptive', term: 'descriptive names', lang: 'English', domain: 'place', essential: true,
    gloss: 'The earliest layer, conferred while the ancestors were exploring the land and deciding to make it home.',
    note: 'KEY: first of the three layers. They describe the place just as it looked then and — often — as it still looks now.' },
  { id: 'clan_names', term: 'clan names', lang: 'English', domain: 'place', essential: true,
    gloss: 'The middle layer: clan names built out of descriptive place-names, taken once people had settled near farms.',
    note: 'KEY: their names for themselves are really the names of their places. Juniper Tree Stands Alone People are still known that way, even in cities far away.' },
  { id: 'commemorative', term: 'commemorative names', lang: 'English', domain: 'place', essential: true,
    gloss: 'The last layer, awarded after the land was theirs, recording what happened there rather than how it looks.',
    note: 'KEY: these carry the moral weight — Shades Of Shit, Men Stand Above Here And There. They invest the landscape with a sobering moral dimension, dark but instructive.' },
  { id: 'intin', term: '’intin (trail; path)', lang: 'Apache', domain: 'place',
    gloss: 'The past conceived as a well-worn trail first travelled by the founding ancestors.',
    note: 'Beyond living memory the trail is no longer visible, so the past must be constructed — imagined — from what survives.' },
  { id: 'tracks', term: 'footprints; tracks', lang: 'Apache', domain: 'place',
    gloss: 'The surviving historical materials from which the invisible trail of the past is reconstructed.' },
  { id: 'ndee', term: 'ndee (people)', lang: 'Apache', domain: 'place',
    gloss: 'What the Western Apache of Cibecue call themselves.',
    note: '"Western Apache" is the outsider’s term; Cibecue is the community where Basso worked from 1959, on the Fort Apache Indian Reservation in Arizona.' },
  { id: 'sikaa', term: 'sikaa (it sits)', lang: 'Apache', domain: 'place', essential: true,
    gloss: 'A verb with a classificatory stem used only of rigid containers and their contents.',
    note: 'KEY: this is why wisdom SITS in places. The stem makes places watertight vessels and the knowledge wisdom needs the water standing in them — so preparing the mind is a form of drinking, and wisdom, like water, is basic to survival.' },
  { id: 'maps_mind', term: 'maps in our minds', lang: 'English', domain: 'place',
    gloss: 'Nick Thompson: whitemen need paper maps; we have maps in our minds.',
    note: 'A cowboy Basso overhears recites place-names for ten minutes at a stretch. Asked why, he says: I like to. I ride that way in my mind.' },

  // ——————————— Speech & metaphor ———————————
  { id: 'speaking_names', term: 'yałti’ bee’ízhi (speaking with names)', lang: 'Apache', domain: 'speech', essential: true,
    gloss: 'Commenting on someone’s conduct by speaking place-names, one after another, instead of speaking about the person.',
    note: 'KEY: the routine at the centre of Ch. 3. It lets speakers register claims about their own moral worth and about their relationship to the hearer, and it produces a beneficial heightened self-awareness. Place-names are all we need for that, Lola says. We just fix them up.' },
  { id: 'agodzaahi', term: '’ágodzaahí (historical tales)', lang: 'Apache', domain: 'speech', essential: true,
    gloss: 'Literally "to tell of that which has happened": short tales set in the time when the Apache were developing themselves.',
    note: 'KEY: they begin and end with a place-name, are closely plotted, and though they edify, their main purpose is to criticize social delinquents. Telling one is almost always prompted by an offence.' },
  { id: 'myths', term: 'myths ("to tell of holiness")', lang: 'Apache', domain: 'speech', essential: true,
    gloss: 'Long narratives of the time of creation, told by medicine men.',
    note: 'KEY: one of the four narrative genres, distinguished by temporal locus and purpose. Myths = the beginning; historical tales = long ago; sagas = modern times; gossip = the present.' },
  { id: 'sagas', term: 'sagas ("to tell of pleasantness")', lang: 'Apache', domain: 'speech', essential: true,
    gloss: 'Narratives of modern times told for relaxation and entertainment.' },
  { id: 'gossip', term: 'gossip', lang: 'Apache', domain: 'speech', essential: true,
    gloss: 'Narratives of the present, keeping people up to date on local developments.',
    note: 'Minor subgenres also exist: Coyote stories ("to tell of Coyote’s travels") and seduction tales ("to tell of sexual desires").' },
  { id: 'three_forms', term: 'three forms of speech', lang: 'English', domain: 'speech', essential: true,
    gloss: 'Ordinary talk, prayer, and narrative — the major categories of Western Apache speech.',
    note: 'KEY: narrative then divides into myths, historical tales, sagas and gossip.' },
  { id: 'arrow', term: 'stories as arrows (the hunting metaphor)', lang: 'English', domain: 'speech', essential: true,
    gloss: 'Storytellers are hunters; stories are arrows; someone stalks you and shoots a tale at you.',
    note: 'KEY: all these places have stories — we shoot each other with them, like arrows. A weak one bounces off; a strong one goes in deep and starts working on your mind. You feel weak, you don’t want to eat or talk. Some Apaches add that the arrow leaves a wound and that replacing oneself is a form of healing.' },
  { id: 'replace_self', term: 'replace yourself', lang: 'English', domain: 'speech', essential: true,
    gloss: 'To change your ideas about yourself after a story has done its work, and resolve to live right.',
    note: 'KEY: the response the arrow is meant to produce. You try to pull the arrow out — but the place keeps stalking you, even across oceans, even after the person who shot you has died. So people need to be reminded why they were shot in the first place.' },
  { id: 'stalking', term: 'the land is always stalking people', lang: 'English', domain: 'moral', essential: true,
    gloss: 'Annie Peaches: the land is always stalking people; the land makes people live right; the land looks after us.',
    note: 'KEY: know these claims. The landscape is a repository of distilled wisdom and a stern but benevolent keeper of tradition — an omnipresent moral force, not scenery. It makes you think, helps you remember, and makes you behave.' },
  { id: 'pictures', term: 'be’elzaahí (pictures)', lang: 'Apache', domain: 'speech', essential: true,
    gloss: 'Apache thought is conceived visually: thinking happens as pictures which the mind sees.',
    note: 'KEY: speaking displays thinking; the speaker depicts and conveys images; hearers, on hearing and holding the words, view those images in their own minds. Discourse is a running exchange of depicted pictures and pictured depictions.' },
  { id: 'thinking', term: 'natsíkęęs (thinking)', lang: 'Apache', domain: 'speech',
    gloss: 'Thinking, evidenced by every occasion of speaking; to display thinking is the motive for talk.' },
  { id: 'smothering', term: 'smothering the hearer', lang: 'English', domain: 'speech', essential: true,
    gloss: 'What a person who speaks too much does: repeating, over-qualifying, supplying too many details.',
    note: 'KEY: too many words presume on the hearer’s right to build freely, insult their imagination, block their thinking and hold down their minds. The arrogant message is: see everything exactly as I do. An effective narrator opens up thinking so listeners can travel in their minds.' },
  { id: 'gozh_doleel', term: 'gozh doleeł', lang: 'Apache', domain: 'speech',
    gloss: '"Pleasantness and goodness will be forthcoming" — the formula that closes a round of speaking with names.' },
  { id: 'flow_together', term: 'thinker and character flow swiftly together', lang: 'Apache', domain: 'speech',
    gloss: 'The experience that confirms a narrative is the right one for the trouble at hand.',
    note: 'If the identification fails to occur, the story is discarded and others are consulted. Wise people can run through dozens of cautionary narratives in a very short time when a crisis looms.' },
  { id: 'parallelism', term: 'grammatical parallelism & lexical redundancy', lang: 'English', domain: 'speech', essential: true,
    gloss: 'The features of Dudley Patterson’s delivery of the trail of wisdom: parallel grammar, marked repetition of words, measured repetition of dominant metaphors.',
    note: 'KEY in the notes: the register resembles Western Apache prayer. The economy of his speech made parts of it accessible while the metaphors that anchored it — boldly figured, densely compressed, probably very old — stood beyond Basso’s reach.' },
  { id: 'quoting', term: 'quoting the ancestors', lang: 'English', domain: 'speech', essential: true,
    gloss: 'To use a place-name is to repeat, word for word, the speech of the ancestors who conferred it.',
    note: 'KEY: this is why mispronunciation is disrespect, and why Charles Henry would not let Basso hurry past a hard name.' },

  // ——————————— Wisdom & mind ———————————
  { id: 'wisdom', term: '’igoyá’í (wisdom)', lang: 'Apache', domain: 'mind', essential: true,
    gloss: 'A heightened mental capacity that lets a person avoid harmful events by detecting threats when none are apparent.',
    note: 'KEY: wisdom is first and foremost an instrument of survival, likened to water for its life-sustaining properties. It is produced by three conditions of mind, none of them given at birth, so in any community at any time wisdom exists in varying degrees and only a few are ever completely wise. Those few foresee disaster, fend off misfortune, avoid explosive conflict — and often live to be very old.' },
  { id: 'smooth', term: 'bíni’ godilkooh (smoothness of mind)', lang: 'Apache', domain: 'mind', essential: true,
    gloss: 'The primary condition: a mind cleared of obstructions, like a field from which all vegetation has been removed.',
    note: 'KEY — and know the consequences. Smooth minds are unobstructed and reason with penetrating clarity; sceptical of appearances, they look past them to detect hidden realities, and so they see danger before it happens. IF ABSENT: you fail to see danger, you trust your eyes and they deceive you, you are easily tricked and fooled, and there is nothing but trouble for you.' },
  { id: 'resilient', term: 'bíni’ gontł’iz (resilience of mind)', lang: 'Apache', domain: 'mind', essential: true,
    gloss: 'Resistance to EXTERNAL disruption — like a tightly woven basket, yielding but strong, an enclosed space that holds its shape.',
    note: 'KEY — and know the consequences. Resilient minds shield their interior against jarring events, centring on what must be done; fear and alarm are the great threats. IF ABSENT: you are easily startled and easily frightened, you try to think quickly but cannot think clearly, and you yourself stand in the way of your own mind and block it. Dudley’s illustration: Coyote Pisses In The Water.' },
  { id: 'steady', term: 'bíni’ gonłdzil (steadiness of mind)', lang: 'Apache', domain: 'mind', essential: true,
    gloss: 'Elimination of INTERNAL distraction: relinquishing all thoughts of personal superiority and aggression toward others.',
    note: 'KEY — and know the consequences. Steady minds are free of arrogance, anger, jealousy and lust, so the wise rarely have serious interpersonal trouble. IF ABSENT: you are easily angered and upset, arrogant and proud; you look down on people, envy their possessions, speak about them without thinking, complain, gossip, criticize, lust after their women — people come to despise you, and may pay someone to use his power on you, or want to kill you. You must learn to forget about yourself. Dudley’s illustration: Grasshoppers Piled Up Across.' },
  { id: 'working_mind', term: 'bíni’ naayik’e’iziig (working on one’s mind)', lang: 'Apache', domain: 'mind', essential: true,
    gloss: 'The self-reflexive labour of scrutinising and improving one’s own mind against the standard the stories set.',
    note: 'KEY: a drawn-out affair that becomes less difficult as it becomes habitual. Disciplined mental effort, diligently sustained, eventually gives rise to a permanent state of mind — composure deepens, fear and anger recede, watchfulness grows.' },
  { id: 'mind_region', term: 'bíni’ (mind) vs. the brain', lang: 'Apache', domain: 'mind',
    gloss: 'Both are described with a stem for compact roundish portable objects, but only the mind takes the spatial prefix go-.',
    note: 'An instructive bit of morphology: the mind is conceived as a REGION within the brain, which is what lets it be smooth, enclosed, or cleared like ground.' },
  { id: 'drink_places', term: 'drink from places', lang: 'English', domain: 'mind', essential: true,
    gloss: 'What Apache boys and girls are told: drink from places, then you can work on your mind.',
    note: 'KEY (how wisdom is acquired). Dudley: you can’t live long without water and you can’t live a long time without wisdom — you need to drink both. The knowledge wisdom depends on comes from observing many places and being able to recall them quickly and clearly.' },
  { id: 'trail_wisdom', term: 'the trail of wisdom', lang: 'English', domain: 'mind', essential: true,
    gloss: 'Dudley’s grandmother’s figure: your life is like a trail, and you must be watchful as you go.',
    note: 'KEY: you must see danger in your mind before it happens. Walk it well and your trail extends a long way — you will live a long time and people will respect you.' },

  // ——————————— Morality & kin ———————————
  { id: 'live_right', term: 'living right', lang: 'English', domain: 'moral', essential: true,
    gloss: 'Conduct that conforms to community expectation — the aim all the moral machinery serves.',
    note: 'It requires constant care and attention, because old stories and their impact, like old arrows and their wounds, can fade. So the landscape keeps up the surveillance.' },
  { id: 'kin_obligation', term: 'relatives make each other rich', lang: 'English', domain: 'moral', essential: true,
    gloss: 'The obligation of kin: help in times of need, as it has been since the beginning.',
    note: 'KEY (Shades Of Shit). Its violation is the darkest story in Ch. 1 — and the punishment is delivered by the offended relatives themselves.' },
  { id: 'ancestral_knowledge', term: 'ancestral knowledge', lang: 'English', domain: 'moral',
    gloss: 'What the stories attributed to the ancestors carry: an unformalized model of wisdom and a reason to want it.',
    note: 'Some embrace it eagerly and memorise it in exhaustive detail; others are less successful, and many find it hard to apply to their own minds.' },
  { id: 'moral_force', term: 'the landscape as moral force', lang: 'English', domain: 'moral', essential: true,
    gloss: 'Places proclaim by their presence and their names both the imminence of chaos and the preventive wisdom of moral norms.',
    note: 'Grandmothers and uncles must perish, but the landscape endures — which is why the Apache are grateful for it. The land keeps badness away.' },
  { id: 'indirect_advice', term: 'indirect advice', lang: 'English', domain: 'moral', essential: true,
    gloss: 'Naming a place instead of naming a fault, so the hearer draws the conclusion themselves.',
    note: 'KEY: why the horsemen did not simply tell Talbert. Explicit criticism insults and condescends; kinship standing limits who may instruct whom; and a lesson attached to a place is one the person can go and see again.' },

  // ——————————— Method & theory ———————————
  { id: 'lived_topographies', term: 'ethnography of lived topographies', lang: 'Anthro. theory', domain: 'method', essential: true,
    gloss: 'Basso’s name for the field he is proposing: the study of what people make of places.',
    note: 'KEY: he calls places a dimly lit region of the anthropological world, and says ethnographers, like everyone else, take senses of place for granted. Everything, or almost everything, hinges on the particulars — and because it does, ethnography is essential.' },
  { id: 'epiphenomena', term: 'epiphenomena', lang: 'Anthro. theory', domain: 'method', essential: true,
    gloss: 'What human ecologists treat the meanings of environments as: side effects outside their proper concern.',
    note: 'KEY in the notes. Basso’s rebuttal: ecological models are pitched at a systemic level well removed from the individual — and it is individuals, not institutions, who make and act on cultural meanings. Cultural meanings are epiphenomenal only for those who choose to make them so.' },
  { id: 'local_knowledge', term: 'local knowledge', lang: 'Anthro. theory', domain: 'method',
    gloss: 'Geertz’s phrase for the shared bodies of knowledge with which communities render places meaningful.',
    note: 'Basso adds the crucial qualification: people, not cultures, sense places — and they do so in varying ways.' },
  { id: 'reciprocal', term: 'reciprocal appropriation', lang: 'Anthro. theory', domain: 'method',
    gloss: 'Momaday: man invests himself in the landscape and simultaneously incorporates the landscape into his own experience.',
    note: 'An act of imagination that is moral in kind.' },
  { id: 'metaphor', term: 'metaphor', lang: 'Anthro. theory', domain: 'method',
    gloss: 'Understanding and experiencing one kind of thing in terms of another.',
    note: 'The ethnographic question is always on what grounds — what people must believe for their metaphors to work.' },
  { id: 'reflexivity_field', term: 'reflexive ethnography', lang: 'Anthro. theory', domain: 'method',
    gloss: 'Basso writes himself into the book: his mistakes, his ethnographic gloom, his sense of being unmoored.',
    note: 'He also insists doing ethnography can be great fun, and that disguising the fact is less than honest — in crafting prose, as in fieldwork, it is always permissible to smile and even to laugh.' },
];

export const TERM_BY_ID: Record<string, Term> = Object.fromEntries(TERMS.map((t) => [t.id, t]));

export const TERM_LINKS: TermLink[] = [
  { source: 'place_name', target: 'quoting', relation: 'is', note: 'Saying the name repeats ancestral speech.' },
  { source: 'place_name', target: 'pictures', relation: 'evokes', note: 'A name is a picture, and implies a vantage point to see it from.' },
  { source: 'place_name', target: 'descriptive', relation: 'layer 1' },
  { source: 'place_name', target: 'clan_names', relation: 'layer 2' },
  { source: 'place_name', target: 'commemorative', relation: 'layer 3' },
  { source: 'place_name', target: 'place_making', relation: 'material for' },
  { source: 'place_making', target: 'place_world', relation: 'produces' },
  { source: 'place_making', target: 'intin', relation: 'reconstructs' },
  { source: 'intin', target: 'tracks', relation: 'read from' },
  { source: 'place_world', target: 'chronotope', relation: 'is a' },
  { source: 'place_making', target: 'sense_place', relation: 'cultivates' },
  { source: 'sense_place', target: 'dwelling', relation: 'theorised as' },
  { source: 'sense_place', target: 'local_knowledge', relation: 'partakes of' },
  { source: 'commemorative', target: 'agodzaahi', relation: 'anchors' },
  { source: 'agodzaahi', target: 'arrow', relation: 'fired as' },
  { source: 'agodzaahi', target: 'three_forms', relation: 'genre within' },
  { source: 'three_forms', target: 'myths', relation: 'includes' },
  { source: 'three_forms', target: 'sagas', relation: 'includes' },
  { source: 'three_forms', target: 'gossip', relation: 'includes' },
  { source: 'arrow', target: 'replace_self', relation: 'aims at' },
  { source: 'arrow', target: 'stalking', relation: 'why the land' },
  { source: 'stalking', target: 'moral_force', relation: 'makes the land a' },
  { source: 'moral_force', target: 'live_right', relation: 'enforces' },
  { source: 'replace_self', target: 'live_right', relation: 'resolves to' },
  { source: 'speaking_names', target: 'place_name', relation: 'uses only' },
  { source: 'speaking_names', target: 'indirect_advice', relation: 'is a form of' },
  { source: 'speaking_names', target: 'pictures', relation: 'hands over' },
  { source: 'speaking_names', target: 'smothering', relation: 'avoids' },
  { source: 'speaking_names', target: 'gozh_doleel', relation: 'closes with' },
  { source: 'pictures', target: 'thinking', relation: 'form of' },
  { source: 'smothering', target: 'thinking', relation: 'blocks' },
  { source: 'indirect_advice', target: 'kin_obligation', relation: 'limited by' },
  { source: 'wisdom', target: 'smooth', relation: 'requires' },
  { source: 'wisdom', target: 'resilient', relation: 'requires' },
  { source: 'wisdom', target: 'steady', relation: 'requires' },
  { source: 'resilient', target: 'smooth', relation: 'produces (external)' },
  { source: 'steady', target: 'smooth', relation: 'produces (internal)' },
  { source: 'smooth', target: 'mind_region', relation: 'presupposes' },
  { source: 'wisdom', target: 'working_mind', relation: 'cultivated by' },
  { source: 'working_mind', target: 'trail_wisdom', relation: 'walks' },
  { source: 'trail_wisdom', target: 'drink_places', relation: 'begins with' },
  { source: 'drink_places', target: 'sikaa', relation: 'grounded in' },
  { source: 'sikaa', target: 'wisdom', relation: 'why it sits' },
  { source: 'drink_places', target: 'place_name', relation: 'requires knowing' },
  { source: 'wisdom', target: 'ancestral_knowledge', relation: 'modelled by' },
  { source: 'ancestral_knowledge', target: 'agodzaahi', relation: 'carried in' },
  { source: 'flow_together', target: 'agodzaahi', relation: 'selects' },
  { source: 'parallelism', target: 'trail_wisdom', relation: 'register of' },
  { source: 'kin_obligation', target: 'live_right', relation: 'core of' },
  { source: 'lived_topographies', target: 'sense_place', relation: 'studies' },
  { source: 'lived_topographies', target: 'epiphenomena', relation: 'refuses' },
  { source: 'epiphenomena', target: 'metaphor', relation: 'would dismiss' },
  { source: 'metaphor', target: 'arrow', relation: 'explains' },
  { source: 'reciprocal', target: 'dwelling', relation: 'kin to' },
  { source: 'reflexivity_field', target: 'lived_topographies', relation: 'method of' },
  { source: 'reflexivity_field', target: 'quoting', relation: 'learned by failing at' },
  { source: 'maps_mind', target: 'place_name', relation: 'made of' },
  { source: 'ndee', target: 'clan_names', relation: 'named by' },
];
