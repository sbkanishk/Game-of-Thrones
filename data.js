// Houses of Westeros — structured data
// Each person: { id, name, house, role, bio, parents:[], spouses:[], children:[], secret:bool }

const HOUSES = [
  { id:'stark',      label:'Stark',      words:'"Winter is coming"',       sigil:'direwolf',    seat:'Winterfell',  region:'The North',     color:'#8b9aa6' },
  { id:'targaryen',  label:'Targaryen',  words:'"Fire and blood"',         sigil:'dragon',      seat:'Dragonstone', region:'Exiled / Crownlands', color:'#b02030' },
  { id:'lannister',  label:'Lannister',  words:'"Hear me roar"',           sigil:'lion',        seat:'Casterly Rock',region:'The Westerlands', color:'#c9a227' },
  { id:'baratheon',  label:'Baratheon',  words:'"Ours is the fury"',       sigil:'stag',        seat:"Storm's End",  region:'The Stormlands', color:'#c27d20' },
  { id:'tyrell',     label:'Tyrell',     words:'"Growing strong"',         sigil:'rose',        seat:'Highgarden',  region:'The Reach',     color:'#6a8f3a' },
  { id:'martell',    label:'Martell',    words:'"Unbowed, unbent, unbroken"',sigil:'sun-spear', seat:'Sunspear',    region:'Dorne',         color:'#c96b1a' },
  { id:'greyjoy',    label:'Greyjoy',    words:'"We do not sow"',          sigil:'kraken',      seat:'Pyke',        region:'Iron Islands',  color:'#5a8085' },
  { id:'arryn',      label:'Arryn',      words:'"As high as honor"',       sigil:'falcon',      seat:'The Eyrie',   region:'The Vale',      color:'#5a7fa0' },
];

const PEOPLE = [
  // === STARK ===
  { id:'rickard',   name:'Rickard Stark',   house:'stark',     role:'Lord of Winterfell (prior generation)', bio:'Father of Ned, Benjen, and Lyanna. Burned alive by the Mad King Aerys, which sparked Robert\'s Rebellion.', parents:[], spouses:['lyarra'], children:['ned','benjen','lyanna'] },
  { id:'lyarra',    name:'Lyarra Stark',     house:'stark',     role:'Lady of Winterfell', bio:'Mother of Ned, Benjen, and Lyanna. Died young.', parents:[], spouses:['rickard'], children:['ned','benjen','lyanna'] },
  { id:'ned',       name:'Eddard "Ned" Stark', house:'stark',  role:'Lord of Winterfell · Hand of the King', bio:'Warden of the North and the story\'s first moral anchor. Named Hand of the King by Robert Baratheon. Executed in Season 1 for declaring Joffrey\'s claim illegitimate — the moment that told audiences no character is safe.', parents:['rickard','lyarra'], spouses:['catelyn'], children:['robb','sansa','arya','bran','rickon'], secret:false },
  { id:'catelyn',   name:'Catelyn Tully',    house:'stark',     role:'Lady of Winterfell', bio:'Born into House Tully of Riverrun. Her marriage to Ned ties two great houses together. Killed at the Red Wedding alongside Robb.', parents:[], spouses:['ned'], children:['robb','sansa','arya','bran','rickon'] },
  { id:'robb',      name:'Robb Stark',       house:'stark',     role:'Heir · "King in the North"', bio:'Eldest Stark child. Led a war of independence after Ned\'s execution, crowned King in the North by his bannermen. Killed at the Red Wedding — a trap set by House Frey with Lannister backing.', parents:['ned','catelyn'], spouses:[], children:[] },
  { id:'sansa',     name:'Sansa Stark',      house:'stark',     role:'Eldest daughter · Queen in the North', bio:'Betrothed to Joffrey, forced to marry Tyrion Lannister, then Ramsay Bolton. Survived every trap through endurance and quiet observation. Ends the story as the rightful Queen in the North.', parents:['ned','catelyn'], spouses:[], children:[] },
  { id:'arya',      name:'Arya Stark',       house:'stark',     role:'Younger daughter · faceless assassin', bio:'Trained as a faceless assassin in Braavos after escaping King\'s Landing. Kept a kill list. Defeated the Night King at the Battle of Winterfell. Sails west of Westeros at the story\'s end.', parents:['ned','catelyn'], spouses:[], children:[] },
  { id:'bran',      name:'Bran Stark',       house:'stark',     role:'Second son · Three-Eyed Raven · King', bio:'Pushed from a tower by Jaime Lannister in episode one, which paralyzed him. Became the Three-Eyed Raven — capable of seeing all history. Chosen as King of the Six Kingdoms at the story\'s end.', parents:['ned','catelyn'], spouses:[], children:[] },
  { id:'rickon',    name:'Rickon Stark',     house:'stark',     role:'Youngest son', bio:'The youngest Stark child. Killed by a Ramsay Bolton arrow during the Battle of the Bastards, having been used as a living target.', parents:['ned','catelyn'], spouses:[], children:[] },
  { id:'benjen',    name:'Benjen Stark',     house:'stark',     role:'First Ranger of the Night\'s Watch', bio:'Ned\'s brother. Vanished beyond the Wall early in Season 1. Later reappears as a half-undead ranger, killed protecting Bran and Meera.', parents:['rickard','lyarra'], spouses:[], children:[] },
  { id:'lyanna',    name:'Lyanna Stark',     house:'stark',     role:'Ned\'s sister · secretly wed to Rhaegar', bio:'Ned\'s sister. Her secret marriage to Rhaegar Targaryen — and the belief that she\'d been kidnapped — sparked Robert\'s Rebellion. She died giving birth to Jon Snow in the Tower of Joy, asking Ned to protect her son.', parents:['rickard','lyarra'], spouses:['rhaegar'], children:['jon'], secret:true },
  { id:'jon',       name:'Jon Snow',         house:'stark',     role:'Lord Commander of Night\'s Watch · true heir', bio:'Raised at Winterfell as Ned\'s bastard son. His true identity is Aegon Targaryen, legitimate son of Rhaegar and Lyanna — making his claim to the Iron Throne stronger than Daenerys\'s own. Kills Daenerys in the final season and is exiled beyond the Wall.', parents:['rhaegar','lyanna'], spouses:[], children:[], secret:true },

  // === TARGARYEN ===
  { id:'jaehaerys', name:'Jaehaerys II Targaryen', house:'targaryen', role:'King (prior generation)', bio:'Grandfather of Daenerys and Rhaegar. A competent king who began the dynasty\'s decline.', parents:[], spouses:[], children:['aerys','rhaella'] },
  { id:'aerys',     name:'Aerys II "the Mad King"', house:'targaryen', role:'Last Targaryen king before the rebellion', bio:'Grew increasingly paranoid and cruel. His execution of Rickard and Brandon Stark, and his plan to burn King\'s Landing, led to his overthrow by Robert\'s Rebellion. Killed by his own Kingsguard knight, Jaime Lannister — earning Jaime the name "Kingslayer."', parents:['jaehaerys'], spouses:['rhaella'], children:['rhaegar','viserys','daenerys'] },
  { id:'rhaella',   name:'Rhaella Targaryen', house:'targaryen', role:'Queen consort', bio:'Sister-wife to Aerys (Targaryen tradition of dynastic marriage). Died giving birth to Daenerys during a storm on Dragonstone.', parents:['jaehaerys'], spouses:['aerys'], children:['rhaegar','viserys','daenerys'] },
  { id:'rhaegar',   name:'Rhaegar Targaryen', house:'targaryen', role:'Crown prince · secretly wed Lyanna Stark', bio:'The eldest son of Aerys. A celebrated warrior and scholar. His marriage to Lyanna Stark — kept secret because he was already wed to Elia Martell — was interpreted as an abduction, sparking Robert\'s Rebellion. Killed by Robert at the Battle of the Trident. Father of Jon Snow.', parents:['aerys','rhaella'], spouses:['lyanna'], children:['jon'], secret:true },
  { id:'viserys',   name:'Viserys Targaryen', house:'targaryen', role:'Exiled prince', bio:'Daenerys\'s older brother. Sold his sister into marriage with Khal Drogo to gain an army, growing increasingly cruel. Killed by Drogo with a "golden crown" — molten gold poured over his head — in Season 1.', parents:['aerys','rhaella'], spouses:[], children:[] },
  { id:'daenerys',  name:'Daenerys Targaryen', house:'targaryen', role:'"Mother of Dragons" · Queen', bio:'The youngest Targaryen, born in exile after the rebellion. Hatched three dragon eggs and built an army through Essos. Conquered Westeros and sat the Iron Throne briefly — then burned King\'s Landing, was killed by Jon Snow, and her dragon Drogon flew her body east.', parents:['aerys','rhaella'], spouses:[], children:[] },

  // === LANNISTER ===
  { id:'tywin',     name:'Tywin Lannister',  house:'lannister', role:'Lord of Casterly Rock · Hand of the King', bio:'The most feared man in Westeros. Orchestrated the Red Wedding, the sack of King\'s Landing, and nearly every major political maneuver keeping the Lannister grip on power. Shot with a crossbow by Tyrion while on the privy.', parents:[], spouses:['joanna'], children:['cersei','jaime','tyrion'] },
  { id:'joanna',    name:'Joanna Lannister', house:'lannister', role:'Lady of Casterly Rock', bio:'Tywin\'s wife and cousin. Died giving birth to Tyrion — which Tywin blamed Tyrion for, shaping their lifelong antagonism.', parents:[], spouses:['tywin'], children:['cersei','jaime','tyrion'] },
  { id:'cersei',    name:'Cersei Lannister', house:'lannister', role:'Queen consort · Queen regnant', bio:'Married to King Robert Baratheon but had a secret incestuous relationship with her twin Jaime. Her three children — Joffrey, Myrcella, Tommen — were all Jaime\'s. Maneuvered to place them on the throne. Crowned herself queen after their deaths. Killed when the Red Keep collapsed around her.', parents:['tywin','joanna'], spouses:['robert'], children:['joffrey','myrcella','tommen'] },
  { id:'jaime',     name:'Jaime Lannister',  house:'lannister', role:'Kingsguard knight · "Kingslayer"', bio:'Cersei\'s twin and secret lover; biological father of her three children. Served in the Kingsguard, making his relationship with Cersei a double betrayal. Killed the Mad King to prevent him burning the city — earning the mocking title "Kingslayer." Underwent a genuine redemption arc, then reversed it by returning to Cersei in the end.', parents:['tywin','joanna'], spouses:[], children:['joffrey','myrcella','tommen'], secret:true },
  { id:'tyrion',    name:'Tyrion Lannister', house:'lannister', role:'"The Imp" · Hand of the King / Queen', bio:'The sharpest mind in the family, consistently underestimated because of his dwarfism. Served as Hand of the King under Joffrey, then Hand of the Queen to Daenerys. Named Hand of the King to Bran at the story\'s end.', parents:['tywin','joanna'], spouses:[], children:[] },
  { id:'joffrey',   name:'Joffrey Baratheon', house:'lannister', role:'King (son of Cersei)', bio:'Crowned king after Robert\'s death. Publicly cruel, incapable of restraint, ordered Ned Stark\'s execution against all political advice. Poisoned at his own wedding feast — the "Purple Wedding."', parents:['cersei','jaime'], spouses:[], children:[], secret:true },
  { id:'myrcella',  name:'Myrcella Baratheon', house:'lannister', role:'Princess (daughter of Cersei)', bio:'Sent to Dorne as a political ward. Poisoned by Ellaria Sand in retaliation for the Oberyn Martell affair.', parents:['cersei','jaime'], spouses:[], children:[], secret:true },
  { id:'tommen',    name:'Tommen Baratheon', house:'lannister', role:'King after Joffrey', bio:'Sweet-natured, easily manipulated. Married Margaery Tyrell. Jumped from a window after Cersei destroyed the Sept of Baelor, killing Margaery inside.', parents:['cersei','jaime'], spouses:[], children:[], secret:true },

  // === BARATHEON ===
  { id:'steffon',   name:'Steffon Baratheon', house:'baratheon', role:'Lord of Storm\'s End (prior generation)', bio:'Father of Robert, Stannis, and Renly. Drowned at sea, an event witnessed by the young Stannis from the castle walls.', parents:[], spouses:[], children:['robert','stannis','renly'] },
  { id:'robert',    name:'Robert Baratheon',  house:'baratheon', role:'King of the Seven Kingdoms', bio:'Led the rebellion that overthrew the Targaryens. A brilliant warrior who became a discontented king. By the story\'s start he\'s overweight, drunk, and nostalgic for war. Killed in a staged hunting accident orchestrated by Cersei and Lancel Lannister.', parents:['steffon'], spouses:['cersei'], children:['joffrey','myrcella','tommen'] },
  { id:'stannis',   name:'Stannis Baratheon', house:'baratheon', role:'Lord of Dragonstone · claimant king', bio:'Robert\'s middle brother. A rigid, humorless man convinced the throne is legally his. Fell under the influence of the red priestess Melisandre and burned his own daughter Shireen as a sacrifice. Killed by Brienne of Tarth.', parents:['steffon'], spouses:[], children:['shireen'] },
  { id:'renly',     name:'Renly Baratheon',   house:'baratheon', role:'Lord of Storm\'s End · claimant king', bio:'The youngest Baratheon brother. Charming and popular — the opposite of Stannis. Assembled the largest army of any claimant with Tyrell support. Killed by a shadow creature conjured by Melisandre acting on Stannis\'s behalf.', parents:['steffon'], spouses:[], children:[] },
  { id:'shireen',   name:'Shireen Baratheon', house:'baratheon', role:'Princess', bio:'Stannis\'s daughter. Smart and kind, with greyscale scarring on her face from a childhood infection. Burned alive as a sacrifice by her father at Melisandre\'s urging — one of the show\'s most condemned scenes.', parents:['stannis'], spouses:[], children:[] },

  // === TYRELL ===
  { id:'mace',      name:'Mace Tyrell',       house:'tyrell',    role:'Lord of Highgarden', bio:'The well-meaning but dim lord of House Tyrell, overshadowed by his mother Olenna in every political matter.', parents:[], spouses:[], children:['loras','margaery'] },
  { id:'olenna',    name:'Olenna Tyrell',     house:'tyrell',    role:'"Queen of Thorns"', bio:'The real political mind of House Tyrell. Arranged Joffrey\'s assassination (the Purple Wedding) to protect Margaery. Poisoned herself after Highgarden fell to the Lannisters, spitting her confession at Jaime as she died.', parents:[], spouses:[], children:['mace'] },
  { id:'loras',     name:'Loras Tyrell',      house:'tyrell',    role:'Knight of Flowers', bio:'One of the best knights in Westeros. Secretly in a relationship with Renly Baratheon. Imprisoned by the Faith Militant and killed when the Sept of Baelor was destroyed.', parents:['mace'], spouses:[], children:[] },
  { id:'margaery',  name:'Margaery Tyrell',   house:'tyrell',    role:'Queen consort (twice over)', bio:'Married Renly, then Joffrey, then Tommen — always maneuvering toward actual power. Genuinely kind to smallfolk. Killed in the Sept of Baelor explosion Cersei engineered.', parents:['mace'], spouses:[], children:[] },

  // === MARTELL ===
  { id:'doran',     name:'Doran Martell',     house:'martell',   role:'Prince of Dorne', bio:'The cautious, patient ruler of Dorne. Concealed his long game of vengeance against the Lannisters — killed by Ellaria Sand before he could execute it.', parents:[], spouses:[], children:['trystane'] },
  { id:'oberyn',    name:'Oberyn Martell',    house:'martell',   role:'"The Red Viper"', bio:'Doran\'s younger brother. A brilliant fighter who came to King\'s Landing seeking vengeance for his sister Elia\'s murder by Gregor "the Mountain" Clegane. Won his trial by combat against the Mountain, then lost it — and his head — by stopping to demand a confession instead of delivering the killing blow.', parents:[], spouses:[], children:[] },
  { id:'trystane',  name:'Trystane Martell',  house:'martell',   role:'Prince', bio:'Doran\'s son. Betrothed to Myrcella Baratheon. Killed by Obara Sand on a ship.', parents:['doran'], spouses:[], children:[] },

  // === GREYJOY ===
  { id:'balon',     name:'Balon Greyjoy',     house:'greyjoy',   role:'Lord of the Iron Islands', bio:'Led a failed rebellion against Robert Baratheon, losing his sons as forfeit. His surviving son Theon was sent to Winterfell as a ward-hostage. Thrown from a rope bridge by his brother Euron.', parents:[], spouses:[], children:['yara','theon'] },
  { id:'yara',      name:'Yara Greyjoy',      house:'greyjoy',   role:'Captain, heiress', bio:'Balon\'s eldest child, the capable and loyal captain of the Iron Fleet. Allied with Daenerys. Her claim to the Salt Throne was usurped by Euron.', parents:['balon'], spouses:[], children:[] },
  { id:'theon',     name:'Theon Greyjoy',     house:'greyjoy',   role:'Ward of Winterfell · redeemed hero', bio:'Raised at Winterfell after the Greyjoy Rebellion, torn between his birth family and the Starks his whole life. Betrayed Robb, was captured and broken by Ramsay Bolton, escaped, and eventually redeemed himself fighting for Winterfell against the Night King.', parents:['balon'], spouses:[], children:[] },

  // === ARRYN ===
  { id:'jon_arryn', name:'Jon Arryn',         house:'arryn',     role:'Hand of the King', bio:'Ned Stark\'s mentor and foster father. The Hand of the King whose suspicious death opens the entire story — he had discovered that Cersei\'s children were Jaime\'s, not Robert\'s, and was killed before he could act on it.', parents:[], spouses:['lysa'], children:['robin'] },
  { id:'lysa',      name:'Lysa Tully',        house:'arryn',     role:'Lady of the Eyrie', bio:'Catelyn Stark\'s sister. Married Jon Arryn for political alliance. Revealed to have poisoned Jon herself at Petyr Baelish\'s instruction. Obsessive and unstable. Pushed through the Moon Door by Petyr Baelish.', parents:[], spouses:['jon_arryn'], children:['robin'] },
  { id:'robin',     name:'Robin Arryn',       house:'arryn',     role:'Lord of the Eyrie', bio:'Lysa and Jon\'s sickly, sheltered son. Still breastfeeding at an unnervingly advanced age. The Eyrie and the Vale ultimately declare for Sansa Stark.', parents:['jon_arryn','lysa'], spouses:[], children:[] },
];

// Iron Throne sequence
const THRONE_SEQUENCE = [
  { name:'Aerys II Targaryen',  house:'targaryen', note:'The Mad King — overthrown by Robert\'s Rebellion' },
  { name:'Robert Baratheon',    house:'baratheon',  note:'Won the throne, reigned ~17 years, died in a staged hunting accident' },
  { name:'Joffrey Baratheon',   house:'lannister', note:'Robert\'s "son" — actually Jaime\'s. Poisoned at his own wedding' },
  { name:'Tommen Baratheon',    house:'lannister', note:'Joffrey\'s younger brother. Jumped from a window after Cersei\'s wildfire attack' },
  { name:'Cersei Lannister',    house:'lannister', note:'Crowned herself queen. Killed when the Red Keep fell' },
  { name:'Daenerys Targaryen',  house:'targaryen', note:'Briefly sat the throne after burning King\'s Landing. Killed by Jon Snow' },
  { name:'Bran Stark',          house:'stark',     note:'Chosen by council of lords as King of the Six Kingdoms' },
];

// Glossary
const GLOSSARY = [
  {
    category: 'Titles & rank',
    terms: [
      { term:'Lord / Lady', plain:'ruler of a domain', meaning:'The noble who governs a castle, town, or region under a king.', context:'Ned Stark is "Lord of Winterfell" — the regional governor of the North, answerable to the king the way a state governor answers to a head of state.' },
      { term:'Hand of the King', plain:'prime minister', meaning:'The king\'s chief advisor — runs the government day to day while the king reigns.', context:'Think "chief of staff." Ned becomes Hand after Jon Arryn\'s death, which pulls the Starks into King\'s Landing\'s politics and sets off the entire story.' },
      { term:'Warden', plain:'military commander of a region', meaning:'A lord granted authority to defend an entire region — e.g. "Warden of the North."', context:'It\'s a military rank, not just a title. The Warden raises armies for the king and commands regional defense.' },
      { term:'Maester', plain:'scholar-physician', meaning:'A trained advisor who handles medicine, science, and record-keeping for a noble house.', context:'Part doctor, part librarian, part secretary. Every great castle has one, wearing a chain forged from different metals showing what subjects they\'ve studied.' },
      { term:'Septon / Septa', plain:'priest / nun', meaning:'Clergy of the Faith of the Seven, Westeros\'s main religion.', context:'A septon leads worship; a septa often tutors noble girls. The High Sparrow who torments Cersei is the leader of this faith.' },
    ]
  },
  {
    category: 'Family & bloodlines',
    terms: [
      { term:'Bastard', plain:'child born outside marriage', meaning:'A child whose parents weren\'t married — historically barred from inheriting titles or lands.', context:'Bastards get regional surnames instead of their father\'s house name: "Snow" in the North, "Sand" in Dorne, "Storm" in the Stormlands, "Waters" near King\'s Landing. Jon being "Jon Snow" is a label marking his birth status, not a chosen name.' },
      { term:'Ward', plain:'political hostage', meaning:'A young noble raised in another lord\'s household — officially as a guest, functionally as a guarantee of loyalty.', context:'Theon Greyjoy is Ned\'s "ward" — held at Winterfell to ensure the Greyjoys don\'t rebel again. His lifelong sense of not belonging anywhere comes directly from this.' },
      { term:'Heir', plain:'next in line', meaning:'The person legally entitled to inherit a title, castle, or throne.', context:'Succession is complicated in the show. When Robb dies, legitimate heirs are dead, missing, or (in Jon\'s case) believed to be a bastard with no legal claim — which is why everyone scrambles.' },
      { term:'Betrothed', plain:'formally engaged', meaning:'Promised in marriage, usually arranged for political alliance rather than love.', context:'Sansa is betrothed to Joffrey purely to bind Stark and Lannister together. She had no say in it.' },
      { term:'Kinslayer', plain:'killer of one\'s own family', meaning:'Someone who has killed a blood relative — one of the deepest taboos in Westerosi culture.', context:'Treated as spiritually catastrophic, worse than ordinary murder. Several character arcs hinge on whether someone will cross this line.' },
    ]
  },
  {
    category: 'Oaths & orders',
    terms: [
      { term:'Bannerman', plain:'vassal lord', meaning:'A lesser lord who owes military service and loyalty to a greater house.', context:'When Robb Stark is crowned "King in the North," it\'s his bannermen — the smaller northern houses — who raise the troops for him. Betrayal by bannermen (the Boltons, the Freys) drives major plot turns.' },
      { term:'Sworn sword', plain:'loyal soldier', meaning:'A fighter formally pledged to protect a particular lord or house.', context:'Not a mercenary — a sworn sword has taken an oath and is expected to honor it even at personal cost. Brienne of Tarth exemplifies this.' },
      { term:'Kingsguard', plain:'royal bodyguards', meaning:'An elite order of seven knights sworn to protect the king, for life.', context:'Joining means permanently forfeiting land, titles, and marriage rights. Jaime is a Kingsguard for most of the story — which is why his relationship with Cersei is a double betrayal of his oath.' },
      { term:"Night's Watch", plain:'guardians of the Wall', meaning:'A sworn brotherhood defending the great northern Wall against threats beyond it.', context:'Vows include "I shall take no wife, hold no lands, father no children." Jon joins because bastards inherit nothing at home. His later election as Lord Commander makes him the senior figure in an order that\'s dwindling and poorly supplied.' },
      { term:'Faceless Men', plain:'an assassin guild', meaning:'A secretive order of shape-shifting assassins based in Braavos, serving the Many-Faced God of death.', context:'Arya trains with them for two seasons. The price of their services is always a life — sometimes the client\'s. Their central rule: the gift of death must be given freely, not for personal motive.' },
    ]
  },
  {
    category: 'Honorifics & address',
    terms: [
      { term:'Ser', plain:'"Sir" for a knight', meaning:'The title given to a formally knighted man — earned through ceremony, separate from inherited noble rank.', context:'Not every nobleman is a knight, and not every knight is high-born. It\'s a specific honor. Jaime is "Ser Jaime"; Ned is "Lord Stark" (never "Ser Ned").' },
      { term:'Your grace', plain:'how to address a king or queen', meaning:'The formal direct address to a reigning monarch.', context:'Equivalent to "Your Majesty." Princes and princesses get "Your Highness" instead.' },
      { term:'Khaleesi', plain:'wife of a Dothraki warlord', meaning:'The title for the wife of a "khal" — the warlord-chief of a Dothraki horse-riding clan.', context:'Daenerys earns this title through her marriage to Khal Drogo. It\'s specific to Dothraki culture, not a Westerosi title — which is why it sounds different from everything else.' },
      { term:'Wildlings', plain:'"free folk" beyond the Wall', meaning:'People living north of the Wall who don\'t acknowledge any southern king.', context:'They call themselves "free folk." "Wildling" is the pejorative southerners use. Jon Snow\'s alliance with them — especially Tormund — is central to the later seasons.' },
    ]
  },
];
