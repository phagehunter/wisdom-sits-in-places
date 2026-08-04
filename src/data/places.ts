import type { Place } from '../types';

/**
 * The named land. Every place Basso is taken to, or that is spoken in his
 * hearing, with how it got its name, the story told there, and what Cibecue
 * draws from it. Page numbers are the print pagination of the 1996 University
 * of New Mexico Press edition, checked against the book's own index.
 *
 * Toponyms are given as printed in Basso's text. Two names (Trail Extends Into
 * A Grove Of Sticklike Trees, Coyote Pisses In The Water) appear here in
 * translation only, because the source could not be relied on to reproduce
 * their nasalized vowels exactly and a study aid should not invent them.
 *
 * x/y are schematic coordinates for the Named Land view, NOT geography. Basso
 * mapped Cibecue's places under restrictions agreed with the community, and
 * this project deliberately does not reproduce locations: places are laid out
 * left to right in the order the book walks through them.
 */
export const PLACES: Place[] = [
  // ——————————— Ch. 1 · Charles Henry (pp. 3-35) ———————————
  {
    id: 'mud_container',
    apache: 'Goshtł’ish Tú Bił Sikáné',
    gloss: 'Water Lies With Mud In An Open Container',
    kind: 'descriptive', feature: 'water', book: 2, pages: 'pp. 8, 11-12',
    teacher: 'Charles Henry', exam: true, x: 120, y: 300,
    naming:
      'Ancestors exploring unfamiliar country came on a seep where clay-clouded water stood in a natural basin. Their leader judged that the place might let them survive, and said that to be able to speak of it and remember it clearly they would have to name it. So they made a picture of it with words.',
    story:
      'Basso stumbles over the name, gets it wrong, and suggests coming back to it later. Charles Henry will not move on: to say a place-name is to repeat, word for word, the speech of the ancestors who conferred it, so mangling it slights them. He says it again, slowly, until Basso has it right.',
    lesson:
      'Pronouncing a name correctly is an act of respect toward the dead. And the name still fits what stands there: the names do not lie — they record the look of the land in ancestral times, showing what has changed and what has not.',
  },
  {
    id: 'snakes_water',
    apache: 'Tłiish Bi Tú’é',
    gloss: 'Snakes’ Water',
    kind: 'descriptive', feature: 'water', book: 2, pages: 'pp. 13-15, 17, 31',
    teacher: 'Charles Henry', exam: true, x: 90, y: 100,
    naming:
      'Named for a spring at the foot of a sandstone bluff where snakes were plentiful — the beings who protect the water. Long ago a man who knew how to address them made the people wait at a distance until he had asked the snakes to move aside.',
    story:
      'The spring is dry now and hidden behind manzanita. Charles Henry points out the lack of match between the place and the name, then builds the ancestral place-world around it: the people arriving, forbidden to approach, praying and wailing as if a relative had died, begging Water to take pity on them and asking what it would mean if this happened everywhere.',
    lesson:
      'Place-names are a climate archive — many record springs, seeps and bogs that are now permanently dry, like Birds’ Water and Foul Water. And a blessing withdrawn is read morally: what is not respected and cared for can be taken away.',
  },
  {
    id: 'juniper',
    apache: 'Gad ’O’ááhá',
    gloss: 'Juniper Tree Stands Alone',
    kind: 'clan', feature: 'tree', book: 2, pages: 'pp. 17, 19-22',
    teacher: 'Charles Henry', exam: true, x: 150, y: 410,
    naming:
      'A flat marked by a single juniper, where ancestors found runoff enough to plant corn. Having decided to stay, they took the place’s name for their own and became Gad ’O’ááhń — Juniper Tree Stands Alone People. This is the middle layer of naming: clan names are built from descriptive place-names.',
    story:
      'The same fields are still planted, generation after generation. Ellen Josay Tessay, the clan’s oldest member and spokesperson, settles on a ground cloth and begins pulling weeds. Charles Henry says she is helping her corn; she answers, gently, that she is looking after her children.',
    lesson:
      'Apache names for themselves are really the names of their places — clan identity is inherited from ground, and people scattered into distant cities are still known by the place they came from. Corn draws life from the earth and people from the corn, so the earth is kin: this earth is part of us.',
  },
  {
    id: 'shades_shit',
    apache: 'Chaa Bi Dałt’ohé',
    gloss: 'Shades Of Shit',
    kind: 'commemorative', feature: 'plain', book: 2, pages: 'pp. 23-24, 27-28',
    teacher: 'Charles Henry', exam: true, x: 300, y: 505,
    naming:
      'Named for what happened there rather than for how it looks — the commemorative layer, awarded last, after the Apaches had made the land their own and were living with both the rewards and the painful problems of community life.',
    story:
      'The people here had ample corn. Their relatives had almost none and asked for help, and were refused. The hungry kin then penned the hoarders inside their own brush shelters and would not let them out, until they were living in their own filth and close to death. The man with little corn tells them: you kept eating, knowing we had nothing, and ignored us — your own relatives — as if we were nothing.',
    lesson:
      'Stinginess toward kin is not mere rudeness but catastrophe: relatives make each other rich precisely by helping in times of need, and it has been so since the beginning. Commemorative names give the landscape a dark, instructive moral dimension that place-makers can aim at the living.',
  },
  {
    id: 'bitter_agave',
    apache: 'Nadah Nch’íí’ Golgaiyé',
    gloss: 'Bitter Agave Plain',
    kind: 'descriptive', feature: 'plain', book: 2, pages: 'pp. 8, 13',
    teacher: 'Charles Henry', x: 330, y: 100,
    naming: 'An open expanse named for the bitter agave growing across it.',
    story:
      'Standing here, Charles Henry slips into the past and lets the ancestors speak in the present tense: they marvel at grass tall and thick and heavy with edible seeds, and read it as the sign of an ample summer rain.',
    lesson:
      'Place-making is history performed — given in the active present ("now they are arriving") and thick with quoted speech, so that long-elapsed events unfold as if before the eyes.',
  },
  {
    id: 'scattered_rocks',
    apache: 'Tséé Naadadn’áhá',
    gloss: 'Scattered Rocks Stand Erect',
    kind: 'descriptive', feature: 'rock', book: 2, pages: 'p. 13',
    teacher: 'Charles Henry', x: 200, y: 185,
    naming: 'A dispersion of vertical boulders, named for exactly what stands there.',
    story:
      'Pausing here, the ancestors of Charles Henry’s telling wonder — with a mixture of fear and curiosity — why the rocks should stand the way they do.',
    lesson:
      'Even the flattest descriptive name can open a place-world. What is remembered about a place guides how it may be imagined without exhausting it: remembering provides the basis for imagining.',
  },

  // ——————————— Ch. 2 · Nick Thompson (pp. 37-70) ———————————
  {
    id: 'ndee_dah',
    apache: 'Ndee Dah Naazíné',
    gloss: 'Men Stand Above Here And There',
    kind: 'commemorative', feature: 'rock', book: 3, pages: 'pp. 54, 57',
    teacher: 'Nick Thompson', exam: true, x: 520, y: 410,
    naming: 'Commemorates what happened at the spot where an Apache policeman released his prisoner.',
    story:
      'Long ago a man killed a cow off the reservation and was arrested — by a policeman who was himself Apache. He had joined with outsiders against one of his own; when he died, his relatives dispensed with customary mortuary ritual, which showed with devastating clarity that they meant to disown him completely.',
    lesson:
      'Nick Thompson’s model historical tale, and a harsh indictment of anyone who sides with outsiders against their own community and flaunts it by parading the attitudes and mannerisms of whitemen. Told at a target, it is an arrow.',
  },
  {
    id: 'tsee_ligai',
    apache: 'Tséé Łigai Dah Sidilé',
    gloss: 'White Rocks Lie Above In A Compact Cluster',
    kind: 'descriptive', feature: 'rock', book: 3, pages: 'pp. 38, 87-88',
    teacher: 'Benson Lewis', exam: true, x: 560, y: 100,
    naming:
      'Built by stacking prefixes on a stem: rock + white + above ground level + three or more forming a compact cluster + the one. The name is a description precise enough to be a picture.',
    story:
      'Benson Lewis says he thinks of that mountain as if it were his maternal grandmother. He recalls the stories of how it once was there; hearing the name elsewhere, he sees it. Its name is like a picture. Stories go to work on you like arrows — they make you live right, they make you replace yourself.',
    lesson:
      'A mountain can stand in a kinship relation. This is the passage that ties the picture-making power of names to the arrow metaphor and to replacing oneself.',
  },
  {
    id: 'tsee_bika',
    apache: 'Tséé Biká’ Tú Yaahilíné',
    gloss: 'Water Flows Down On A Succession Of Flat Rocks',
    kind: 'descriptive', feature: 'water', book: 3, pages: 'pp. 46, 88, 90',
    teacher: 'Nick Thompson', x: 470, y: 185,
    naming: 'Another stacked description: rock + on top of + water + it flows downward + the one.',
    story:
      'For ordinary errands — where I am going, where I have been, the latest gossip — Apache speakers clip this name into shorter forms. When a name is doing ceremonial work, it is pronounced in full.',
    lesson:
      'The full form is the marked form. Completeness signals that the speaker is quoting the ancestors rather than merely giving directions.',
  },
  {
    id: 'tiis_bitlah',
    apache: 'T’iis Bitł’áh Tú ’Olíné',
    gloss: 'Water Flows Inward Under A Cottonwood Tree',
    kind: 'descriptive', feature: 'tree', book: 3, pages: 'pp. 46, 86, 88, 90',
    teacher: 'Nick Thompson', x: 440, y: 300,
    naming: 'Cottonwood + beneath it + water + it flows inward + the one.',
    lesson:
      'Descriptive specificity is why Apaches liken place-names to pictures. A name also implies a vantage: to picture the site from its name is to imagine standing at the one spot from which it looks the way the name says.',
  },

  // ——————————— Ch. 3 · Lola Machuse (pp. 71-104) ———————————
  {
    id: 'sticklike_trees',
    gloss: 'Trail Extends Into A Grove Of Sticklike Trees',
    kind: 'descriptive', feature: 'trail', book: 4, pages: 'p. 78',
    teacher: 'Louise', x: 790, y: 100,
    naming: 'Named for a trail running into a stand of thin, stick-like trees.',
    story:
      'Months before the kitchen conversation, Louise’s younger brother was working a cattle roundup here and stepped on a snakeskin wedged in a crevice between rocks. A crewman who saw it warned him that contact with snakes is always dangerous and urged him to go straight to a snake medicine person. He only smiled and said he was not alarmed, that no harm would come to him. He is now ill.',
    lesson:
      'The offence that sets the whole exchange in motion. He trusted his own eyes and brushed off a warning — exactly the failure the tales spoken afterwards are chosen to picture.',
  },
  {
    id: 'tsee_hadigaiye',
    apache: 'Tséé Hadigaiyé',
    gloss: 'Line Of White Rocks Extends Up And Out',
    kind: 'descriptive', feature: 'rock', book: 4, pages: 'pp. 46, 79, 93-94, 100',
    teacher: 'Lola Machuse', exam: true, x: 740, y: 185,
    naming: 'Rock + up and out + extends in a line + white + the one.',
    story:
      'Lola Machuse speaks it first: it happened at Line Of White Rocks Extends Up And Out, at this very place. The tale: a girl living with her maternal grandmother was sent out regularly for firewood and told always to avoid the rocky canyon where many snakes lived. One hot day, thirsty and unwilling to carry a heavy load the long way round, she went down through the canyon anyway, slipped on loose rock, and sent her firewood scattering.',
    lesson:
      'The name is offered to Louise as a picture to travel to, not as a rebuke. Her brother’s carelessness is never mentioned; nothing critical is said about him at all. Speaking with names criticizes without criticizing — the talk goes around it.',
  },
  {
    id: 'tuzhi',
    apache: 'Túzhį’ Yaahigaiyé',
    gloss: 'Whiteness Spreads Out Descending To Water',
    kind: 'descriptive', feature: 'water', book: 4, pages: 'pp. 23, 79-80, 95-96, 124-25',
    teacher: 'Emily', exam: true, x: 780, y: 300,
    naming: 'Named for a white slope running down to water.',
    story:
      'After a pause of thirty to forty-five seconds, Emily answers Lola with a second name: yes, it happened at Whiteness Spreads Out Descending To Water, at this very place. Her version of the tale, she says, is slightly abridged: long ago a boy went to hunt deer, riding out on horseback.',
    lesson:
      'The names are laid down one after another, each building on the last, with long silences between. Nobody explains anything. The point is to leave the hearer room to travel in her mind and add to the pictures herself.',
  },
  {
    id: 'kis_deeschii',
    apache: 'K’is Deeschii’ Naaditiné',
    gloss: 'Trail Extends Across A Red Ridge With Alder Trees',
    kind: 'descriptive', feature: 'trail', book: 4, pages: 'pp. 79-80, 97-98',
    teacher: 'Lola Machuse', exam: true, x: 900, y: 410,
    naming: 'Alder + red ridge + a trail extends across + the one.',
    story:
      'Lola speaks the third name — truly, it happened there, at this very place. Louise laughs softly. Robert Machuse says gozh doleeł, pleasantness and goodness will be forthcoming, and Lola repeats it. Louise closes by remarking that her younger brother is foolish — addressing the remark to the dog. Then the talk stops under the ramada and everyone withdraws into their own thoughts.',
    lesson:
      'The shape of the exchange is the lesson: three names, a laugh, a blessing, and an admission made sideways to an animal. Lola’s own account of it — that they gave the woman pictures to work on in her mind, did not speak too much, and did not hold her down, so she could travel and add on easily — is the fullest statement of Apache speech ethics in the book.',
  },

  // ——————————— Ch. 4 · Dudley Patterson (pp. 105-142) ———————————
  {
    id: 'gizhyaa',
    apache: 'Gizhyaa’itiné',
    gloss: 'Trail Goes Down Between Two Hills',
    kind: 'commemorative', feature: 'trail', book: 5, pages: 'pp. 113-16, 118-21, 142',
    teacher: 'Dudley Patterson', exam: true, x: 1120, y: 300,
    naming:
      'Descriptive in form — a trail dropping between two hills, with a great cottonwood standing at it. By the end of the chapter the name has acquired the stamp of human events, and Basso hears it as a natural stage upon the land rather than a geographical site.',
    story:
      'Two Old Man Owl stories belong here. In one, the lustful and half-blind Old Man Owl is lured by two sisters and made to run back and forth between the two hills. In the other, he tries to burn down the tree a girl has climbed, and she keeps putting his fire out from above. Talbert Paxton — normally restrained and plainly intelligent, but lately drinking, chasing love affairs and spreading rumours about women who had refused him — rejoins the horsemen after three weeks away. Dudley greets him with the place: so, you have returned from Trail Goes Down Between Two Hills. Sam Endfield adds: so, you have smelled enough burning piss. Talbert answers, for a while I couldn’t see.',
    lesson:
      'Why not simply say it? Criticizing Talbert outright would have insulted and condescended — from his apologetic manner he had clearly reached those conclusions himself, and telling a man what he already knows treats him like a child. None of the three had the kinship standing to instruct him on his personal life; that belongs to his older matrilineal kinsmen. They were also fond of him. And beyond all this, they wanted the lesson attached to something concrete, fixed and permanent, that he had seen and could go to see again — a place upon the land. Their past-tense phrasing let his resolve to change stand as already accomplished.',
  },
  {
    id: 'coyote_piss',
    gloss: 'Coyote Pisses In The Water',
    kind: 'commemorative', feature: 'water', book: 5, pages: 'pp. 123, 136',
    teacher: 'Dudley Patterson', exam: true, x: 1010, y: 185,
    naming:
      'Named for what a leader found at the crossing: fresh tracks, and Coyote’s urine still running off a slanted rock into the water.',
    story:
      'Acorn-gathering people stopped where the trail crossed a shallow stream, hot and very thirsty. Their leader — who was wise, and saw danger in his mind — told them not to drink until he had looked around. The moment he was gone, a young woman said her children needed to drink and the water looked safe to her; the others agreed that it looked good. They drank, and soon all of them, children included, were dizzy and vomiting violently, crying out in pain and in fear that they were dying. Their leader came back with the reason. One of the children nearly died.',
    lesson:
      'Dudley Patterson’s first illustrative story: a failure of RESILIENCE of mind. Those people trusted their eyes and would not wait, and when trouble came they gave way to alarm. As one of them said afterwards: we were thirsty, the water looked safe, we were in a hurry and it didn’t look dangerous.',
  },
  {
    id: 'grasshoppers',
    apache: 'Na’ischagi Naadeez’áhá',
    gloss: 'Grasshoppers Piled Up Across',
    kind: 'commemorative', feature: 'plain', book: 5, pages: 'pp. 137-38, 144',
    teacher: 'Dudley Patterson', exam: true, x: 1060, y: 100,
    naming: 'Named for the drifts of dead grasshoppers left piled across the ground after the storm.',
    story:
      'A black cloud came over Cibecue just as the corn was coming up — a swarm of grasshoppers eating the shoots, ch’iziid! ch’iziid! An old man saw what it meant and said that all the medicine men should work on it together. His mind was smooth; he had seen the danger in his mind. But the medicine man they went to insisted on singing alone, because the people had come to him first, and sang four nights running while the corn was eaten and the people grew frightened. Only when four medicine men finally sang together did the rainstorm come and destroy the swarm.',
    lesson:
      'Dudley’s second story: a failure of STEADINESS of mind. As the four put it — that man who sings alone is far too proud, his mind is not smooth, he thinks only of himself. Pride, not ignorance, nearly cost Cibecue its corn.',
  },
  {
    id: 'scorched_rocks',
    apache: 'Tséé Ditł’ige Naaditiné',
    gloss: 'Trail Extends Across Scorched Rocks',
    kind: 'descriptive', feature: 'trail', book: 5, pages: 'pp. 23, 135',
    teacher: 'Dudley Patterson', x: 1240, y: 410,
    naming: 'Named for a trail running over fire-blackened rock.',
    story:
      'One of the places Dudley names in passing as he tells the Coyote story: the gatherers camped at Line Of Rocks Circles Around, filled their baskets near here, and were heading for Big Willow Stands Alone when they stopped at the crossing.',
    lesson:
      'Even a cautionary tale is anchored place by place, because a placeless event is an impossibility — everything that happens must happen somewhere, and the location is part of the event itself. So Apache narratives move along a route of names.',
  },
];

export const PLACE_BY_ID: Record<string, Place> = Object.fromEntries(
  PLACES.map((p) => [p.id, p]),
);

export const KIND_LABELS: Record<Place['kind'], string> = {
  descriptive: 'Descriptive — conferred while exploring & settling',
  clan: 'Clan name — built from a descriptive name',
  commemorative: 'Commemorative — awarded last, for what happened there',
};

export const KIND_COLORS: Record<Place['kind'], string> = {
  descriptive: '#5eead4', // spring-water teal
  clan: '#fbbf24', // corn gold
  commemorative: '#fb7185', // the moral tales, in arrow red
};
