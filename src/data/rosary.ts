export type MysteryKey = 'joyful' | 'sorrowful' | 'glorious' | 'luminous'

type MysteryDefinition = {
  key: MysteryKey
  name: string
  scheduleLabel: string
  mysteries: Array<{
    title: string
    focus: string
  }>
}

export type RosaryStep = {
  groupId: string
  groupLabel: string
  section: string
  title: string
  beadLabel: string
  instruction: string
  prayer: string
  mysteryTitle?: string
  mysteryFocus?: string
}

const PRAYERS = {
  signOfCross:
    'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
  apostlesCreed:
    "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
  ourFather:
    'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
  hailMary:
    'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
  gloryBe:
    'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  fatimaPrayer:
    'O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy.',
  hailHolyQueen:
    'Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.',
  closingPrayer:
    'O God, whose only-begotten Son, by his life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech thee, that meditating upon these mysteries of the most holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.',
} as const

const MYSTERIES: Record<MysteryKey, MysteryDefinition> = {
  joyful: {
    key: 'joyful',
    name: 'Joyful Mysteries',
    scheduleLabel: 'Mon · Sat',
    mysteries: [
      {
        title: 'The Annunciation',
        focus: 'Receive God with openness and trust.',
      },
      {
        title: 'The Visitation',
        focus: 'Carry Christ to others with gladness.',
      },
      {
        title: 'The Nativity',
        focus: 'Adore the humility of Christ made small for us.',
      },
      {
        title: 'The Presentation',
        focus: 'Offer everything back to God with freedom.',
      },
      {
        title: 'The Finding in the Temple',
        focus: 'Seek Jesus patiently when he seems hidden.',
      },
    ],
  },
  sorrowful: {
    key: 'sorrowful',
    name: 'Sorrowful Mysteries',
    scheduleLabel: 'Tue · Fri',
    mysteries: [
      {
        title: 'The Agony in the Garden',
        focus: 'Stay with Christ in his sorrow and surrender.',
      },
      {
        title: 'The Scourging at the Pillar',
        focus: 'Contemplate the wounds Christ accepted for love.',
      },
      {
        title: 'The Crowning with Thorns',
        focus: 'Let Christ heal pride with meekness.',
      },
      {
        title: 'The Carrying of the Cross',
        focus: 'Walk with Jesus beneath the weight of suffering.',
      },
      {
        title: 'The Crucifixion',
        focus: 'Remain at the foot of the Cross in gratitude.',
      },
    ],
  },
  glorious: {
    key: 'glorious',
    name: 'Glorious Mysteries',
    scheduleLabel: 'Wed · Sun',
    mysteries: [
      {
        title: 'The Resurrection',
        focus: 'Live from the victory of Christ over death.',
      },
      {
        title: 'The Ascension',
        focus: 'Lift your heart toward heaven.',
      },
      {
        title: 'The Descent of the Holy Spirit',
        focus: 'Ask for courage, wisdom, and holy zeal.',
      },
      {
        title: 'The Assumption',
        focus: 'Entrust your life to the hope of heaven.',
      },
      {
        title: 'The Coronation of Mary',
        focus: 'Honor the Queen who always leads to Christ.',
      },
    ],
  },
  luminous: {
    key: 'luminous',
    name: 'Luminous Mysteries',
    scheduleLabel: 'Thu',
    mysteries: [
      {
        title: 'The Baptism of the Lord',
        focus: 'Remember your baptism and belovedness in Christ.',
      },
      {
        title: 'The Wedding Feast at Cana',
        focus: 'Trust Mary when she says, "Do whatever he tells you."',
      },
      {
        title: 'The Proclamation of the Kingdom',
        focus: 'Hear Christ call you to repentance and mercy.',
      },
      {
        title: 'The Transfiguration',
        focus: 'Let the light of Christ strengthen your faith.',
      },
      {
        title: 'The Institution of the Eucharist',
        focus: 'Receive the gift of Christ truly present.',
      },
    ],
  },
}

export const MYSTERY_OPTIONS = Object.values(MYSTERIES)

export function getMystery(key: MysteryKey) {
  return MYSTERIES[key]
}

export function getDefaultMysteryKey(date: Date): MysteryKey {
  switch (date.getDay()) {
    case 0:
    case 3:
      return 'glorious'
    case 1:
    case 6:
      return 'joyful'
    case 2:
    case 5:
      return 'sorrowful'
    default:
      return 'luminous'
  }
}

export function buildRosarySteps(mystery: MysteryDefinition): RosaryStep[] {
  const openingSteps: RosaryStep[] = [
    {
      groupId: 'opening',
      groupLabel: 'Opening prayers',
      section: 'Opening',
      title: 'Sign of the Cross',
      beadLabel: 'Crucifix',
      instruction: 'Begin by placing yourself in the presence of God.',
      prayer: PRAYERS.signOfCross,
    },
    {
      groupId: 'opening',
      groupLabel: 'Opening prayers',
      section: 'Opening',
      title: "Apostles' Creed",
      beadLabel: 'Crucifix',
      instruction: 'Profess the faith before entering the mysteries.',
      prayer: PRAYERS.apostlesCreed,
    },
    {
      groupId: 'opening',
      groupLabel: 'Opening prayers',
      section: 'Opening',
      title: 'Our Father',
      beadLabel: 'First large bead',
      instruction: 'Offer the prayer Jesus taught us.',
      prayer: PRAYERS.ourFather,
    },
    {
      groupId: 'opening',
      groupLabel: 'Opening prayers',
      section: 'Opening',
      title: 'Hail Mary',
      beadLabel: 'Preparation bead 1',
      instruction: 'Pray for growth in faith.',
      prayer: PRAYERS.hailMary,
    },
    {
      groupId: 'opening',
      groupLabel: 'Opening prayers',
      section: 'Opening',
      title: 'Hail Mary',
      beadLabel: 'Preparation bead 2',
      instruction: 'Pray for growth in hope.',
      prayer: PRAYERS.hailMary,
    },
    {
      groupId: 'opening',
      groupLabel: 'Opening prayers',
      section: 'Opening',
      title: 'Hail Mary',
      beadLabel: 'Preparation bead 3',
      instruction: 'Pray for growth in charity.',
      prayer: PRAYERS.hailMary,
    },
    {
      groupId: 'opening',
      groupLabel: 'Opening prayers',
      section: 'Opening',
      title: 'Glory Be',
      beadLabel: 'Connector',
      instruction: 'Give praise to the Holy Trinity.',
      prayer: PRAYERS.gloryBe,
    },
  ]

  const decadeSteps = mystery.mysteries.flatMap((mysteryEntry, decadeIndex) => {
    const decadeNumber = decadeIndex + 1
    const section = `Decade ${decadeNumber}`

    const steps: RosaryStep[] = [
      {
        groupId: `decade-${decadeNumber}`,
        groupLabel: `Decade ${decadeNumber}`,
        section,
        title: `Announce ${mysteryEntry.title}`,
        beadLabel: `Decade ${decadeNumber} marker`,
        instruction: 'Pause with the mystery before beginning the decade.',
        prayer: PRAYERS.ourFather,
        mysteryTitle: mysteryEntry.title,
        mysteryFocus: mysteryEntry.focus,
      },
    ]

    for (let beadNumber = 1; beadNumber <= 10; beadNumber += 1) {
      steps.push({
        groupId: `decade-${decadeNumber}`,
        groupLabel: `Decade ${decadeNumber}`,
        section,
        title: 'Hail Mary',
        beadLabel: `Decade ${decadeNumber}, bead ${beadNumber}`,
        instruction: 'Pray one Hail Mary while staying with the mystery.',
        prayer: PRAYERS.hailMary,
        mysteryTitle: mysteryEntry.title,
        mysteryFocus: mysteryEntry.focus,
      })
    }

    steps.push(
      {
        groupId: `decade-${decadeNumber}`,
        groupLabel: `Decade ${decadeNumber}`,
        section,
        title: 'Glory Be',
        beadLabel: `Decade ${decadeNumber} closing`,
        instruction: 'Offer praise to the Holy Trinity.',
        prayer: PRAYERS.gloryBe,
        mysteryTitle: mysteryEntry.title,
        mysteryFocus: mysteryEntry.focus,
      },
      {
        groupId: `decade-${decadeNumber}`,
        groupLabel: `Decade ${decadeNumber}`,
        section,
        title: 'Fatima Prayer',
        beadLabel: `Decade ${decadeNumber} closing`,
        instruction: 'Conclude the decade with the Fatima prayer.',
        prayer: PRAYERS.fatimaPrayer,
        mysteryTitle: mysteryEntry.title,
        mysteryFocus: mysteryEntry.focus,
      },
    )

    return steps
  })

  return [
    ...openingSteps,
    ...decadeSteps,
    {
      groupId: 'closing',
      groupLabel: 'Closing prayers',
      section: 'Closing',
      title: 'Hail Holy Queen',
      beadLabel: 'Final medal',
      instruction: 'Ask Our Lady to intercede for you and the whole Church.',
      prayer: PRAYERS.hailHolyQueen,
    },
    {
      groupId: 'closing',
      groupLabel: 'Closing prayers',
      section: 'Closing',
      title: 'Closing Prayer',
      beadLabel: 'Final medal',
      instruction: 'Ask for grace to live what you have contemplated.',
      prayer: PRAYERS.closingPrayer,
    },
    {
      groupId: 'closing',
      groupLabel: 'Closing prayers',
      section: 'Closing',
      title: 'Sign of the Cross',
      beadLabel: 'Crucifix',
      instruction: 'End the rosary with gratitude and peace.',
      prayer: PRAYERS.signOfCross,
    },
  ]
}

export function getStepProgressLabel(index: number, total: number) {
  return `${index + 1} of ${total}`
}
