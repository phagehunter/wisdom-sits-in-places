/**
 * Guide-text name -> network-node id. Longest names first so "Charles Cromwell"
 * wins over "Charles" and "Lola Machuse" over "Machuse". Powers the clickable
 * names in the section guides.
 */
export const NAME_TO_ID: Record<string, string> = {
  'Water Lies With Mud In An Open Container': 'p_mud_container',
  'Trail Extends Into A Grove Of Sticklike Trees': 'p_sticklike_trees',
  'Trail Extends Across A Red Ridge With Alder Trees': 'p_kis_deeschii',
  'White Rocks Lie Above In A Compact Cluster': 'p_tsee_ligai',
  'Water Flows Down On A Succession Of Flat Rocks': 'p_tsee_bika',
  'Water Flows Inward Under A Cottonwood Tree': 'p_tiis_bitlah',
  'Whiteness Spreads Out Descending To Water': 'p_tuzhi',
  'Line Of White Rocks Extends Up And Out': 'p_tsee_hadigaiye',
  'Men Stand Above Here And There': 'p_ndee_dah',
  'Trail Goes Down Between Two Hills': 'p_gizhyaa',
  'Trail Extends Across Scorched Rocks': 'p_scorched_rocks',
  'Grasshoppers Piled Up Across': 'p_grasshoppers',
  'Coyote Pisses In The Water': 'p_coyote_piss',
  'Scattered Rocks Stand Erect': 'p_scattered_rocks',
  'Juniper Tree Stands Alone': 'p_juniper',
  'Bitter Agave Plain': 'p_bitter_agave',
  'Shades Of Shit': 'p_shades_shit',
  'Snakes’ Water': 'p_snakes_water',
  'Ellen Josay Tessay': 'ellen_tessay',
  'Charles Cromwell': 'charles_cromwell',
  'Dudley Patterson': 'dudley_patterson',
  'Morley Cromwell': 'morley_cromwell',
  'Wilson Lavender': 'wilson_lavender',
  'Robert Machuse': 'robert_machuse',
  'the young people': 'apache_youth',
  'Talbert Paxton': 'talbert_paxton',
  'Ruth Patterson': 'ruth_patterson',
  'Nick Thompson': 'nick_thompson',
  'Annie Peaches': 'annie_peaches',
  'Charles Henry': 'charles_henry',
  'Lola Machuse': 'lola_machuse',
  'Benson Lewis': 'benson_lewis',
  'Sam Endfield': 'sam_endfield',
  'his grandmother': 'grandmother',
  'Ronnie Lupe': 'ronnie_lupe',
  'Old Man Owl': 'old_man_owl',
  'the ancestors': 'ancestors',
  'Lakoff & Johnson': 'lakoff_johnson',
  'Marmon Silko': 'silko',
  Kluckhohn: 'kluckhohn',
  McCullers: 'mccullers',
  Heidegger: 'heidegger',
  'Merleau-Ponty': 'husserl',
  Momaday: 'momaday',
  Greenbie: 'greenbie',
  Bakhtin: 'bakhtin',
  Chapman: 'chapman',
  Deloria: 'deloria',
  Archytas: 'archytas',
  Talbert: 'talbert_paxton',
  Machuse: 'lola_machuse',
  Patterson: 'dudley_patterson',
  Husserl: 'husserl',
  Spicer: 'spicer',
  Geertz: 'geertz',
  Silko: 'silko',
  Camus: 'camus',
  Radin: 'radin',
  Louise: 'louise',
  Dudley: 'dudley_patterson',
  Charles: 'charles_henry',
  Emily: 'emily',
  Basso: 'basso',
  Coyote: 'coyote',
  Boas: 'boas',
  Nick: 'nick_thompson',
  Lola: 'lola_machuse',
};

/**
 * Alternation regex, longest names first, with word boundaries so short names
 * never match inside longer words.
 */
export const NAME_REGEX = new RegExp(
  `\\b(${Object.keys(NAME_TO_ID)
    .sort((a, b) => b.length - a.length)
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})\\b`,
);
