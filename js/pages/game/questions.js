/**
 * Quiz content — Singapore scam scenarios for senior players.
 *
 * Focused on the 4 scam types seniors in Singapore are most often hit by:
 *   impersonation  🎭  bank officer / government official / family member
 *   blessing       🙏  stranger claims to remove a curse or "double your money"
 *   love           💕  online relationship builds over weeks, then asks for money
 *   investment     📈  high returns promised via a "trusted" contact
 *
 * To add more scenarios later, just push more objects into this array —
 * nothing in index.js needs to change. Keep `category` to one of the four
 * keys above so per-category analytics keeps working.
 *
 * Shape:
 *   {
 *     category: 'impersonation' | 'blessing' | 'love' | 'investment',
 *     scenario: 'The situation described to the player',
 *     options: ['choice A', 'choice B', 'choice C', 'choice D'],
 *     correctIndex: 0,           // index into options[]
 *     explanation: 'Why that answer is right, shown after they answer',
 *   }
 */

export const CATEGORIES = {
  impersonation: { label: 'Impersonation', emoji: '🎭' },
  blessing: { label: 'Blessing Scam', emoji: '🙏' },
  love: { label: 'Love Scam', emoji: '💕' },
  investment: { label: 'Investment Scam', emoji: '📈' },
};

export const QUESTIONS = [
  {
    category: 'impersonation',
    scenario:
      'A caller says he is a police officer investigating a case linked to your bank account, which has been used for "money laundering". He tells you to transfer your savings to a "safe account" while investigations continue.',
    options: [
      'Transfer the money quickly since the police are already investigating',
      'Hang up and call the police hotline (1800-255-0000) yourself to check',
      'Ask the caller for his badge number and transfer once he gives it',
      'Withdraw cash and wait for someone to collect it, as instructed',
    ],
    correctIndex: 1,
    explanation:
      'The real police will never ask you to transfer money to a "safe account" or hand over cash to a stranger. Hang up and verify by calling the police hotline yourself.',
  },
  {
    category: 'impersonation',
    scenario:
      'Your "grandson" messages you on WhatsApp from a new number saying he lost his phone and urgently needs $2,000 transferred to a friend\u2019s account to pay for something before he can call you back.',
    options: [
      'Transfer the money immediately since he sounds urgent',
      'Call your grandson on his old number or ask another family member to confirm it\u2019s really him',
      'Ask him to prove it by sending a photo of his NRIC over WhatsApp',
      'Reply on WhatsApp asking "Are you sure?" and transfer if he says yes',
    ],
    correctIndex: 1,
    explanation:
      'Scammers often message from a new number pretending to be a relative in urgent need. Always verify by calling the family member directly on a known number before sending anything.',
  },
  {
    category: 'blessing',
    scenario:
      'An elderly stranger approaches you and says your family has bad luck because of a curse, and offers to "cleanse" your gold jewellery and cash by praying over them \u2014 but you must hand the items over first.',
    options: [
      'Hand over the jewellery and cash so the curse can be removed',
      'Politely decline and walk away \u2014 no one can remove a curse by taking your valuables',
      'Give only the jewellery, keep the cash',
      'Agree, but ask them to do the ritual in front of you first',
    ],
    correctIndex: 1,
    explanation:
      'This is a classic blessing scam. Once your valuables leave your hands, they are gone. Genuine religious or spiritual help never requires handing over your cash or jewellery.',
  },
  {
    category: 'blessing',
    scenario:
      'A "temple medium" calls and says your health problems are caused by evil spirits. She offers to double your money through a special ritual if you first transfer your savings to her for "blessing".',
    options: [
      'Transfer a small amount first to test if it really doubles',
      'Hang up \u2014 no ritual can double your money, and this is a scam',
      'Ask a family member to transfer on your behalf instead',
      'Meet her in person and pay in cash so it feels safer',
    ],
    correctIndex: 1,
    explanation:
      'No ritual, blessing, or medium can "double" your money. Any request to send money to have it multiplied or blessed is a scam \u2014 hang up and do not engage further.',
  },
  {
    category: 'love',
    scenario:
      'You have been chatting for two months with someone you met online who says he\u2019s an engineer working overseas. He has never video called you, and now says he needs money urgently for a "customs fee" to fly to Singapore to meet you.',
    options: [
      'Send the money \u2014 he\u2019s been so caring in your chats',
      'Insist on a live video call first, and refuse to send money to someone you\u2019ve never actually seen or met',
      'Ask him to send a photo holding today\u2019s newspaper as proof',
      'Send half the amount to show you trust him',
    ],
    correctIndex: 1,
    explanation:
      'Avoiding video calls and asking for money for "fees" before ever meeting are classic love scam signs. Genuine partners won\u2019t repeatedly avoid a live video call or ask for money to "fly over".',
  },
  {
    category: 'love',
    scenario:
      'Your new online partner introduces you to a "friend" who works at an investment company, and suggests you both put money into a trading platform "together" to build your future.',
    options: [
      'Join the platform since your partner recommended it',
      'Recognise this as a common love-and-investment scam combo, and decline to invest through anyone you\u2019ve only met online',
      'Invest a small amount just to see the relationship\u2019s intentions',
      'Ask your partner to invest first, then you\u2019ll follow',
    ],
    correctIndex: 1,
    explanation:
      'Online partners who introduce "investment opportunities" are one of the most common scam patterns in Singapore. Never invest money based on a recommendation from someone you\u2019ve only met online.',
  },
  {
    category: 'investment',
    scenario:
      'A former schoolmate adds you to a WhatsApp group where members share screenshots of huge profits from a cryptocurrency platform, and encourages everyone to "join early" with a guaranteed 20% monthly return.',
    options: [
      'Join immediately \u2014 your schoolmate wouldn\u2019t lie to you',
      'Be cautious \u2014 guaranteed high returns with no risk is a major red flag, even if a friend recommends it',
      'Invest a small "test" amount to see if the profit screenshots are real',
      'Ask the group admin for more proof, then invest the amount they suggest',
    ],
    correctIndex: 1,
    explanation:
      'No legitimate investment can guarantee high monthly returns with no risk. Scammers often use a trusted contact\u2019s WhatsApp or social media to make the scheme look credible \u2014 verify with MAS before ever investing.',
  },
  {
    category: 'investment',
    scenario:
      'You see a Facebook ad featuring a well-known local TV personality "endorsing" an investment app that promises to turn $500 into $5,000 in a month. The app asks you to top up more funds before you can withdraw your "profits".',
    options: [
      'Top up more funds since your profits are already showing in the app',
      'Recognise the fake celebrity endorsement and "pay to withdraw" request as scam signs, and stop immediately',
      'Withdraw a small amount first, then top up if it works',
      'Ask the app\u2019s customer service chat to prove it\u2019s legitimate',
    ],
    correctIndex: 1,
    explanation:
      'Fake celebrity endorsements and apps that ask you to "top up" before you can withdraw your own profits are hallmark signs of an investment scam. Check the MAS Financial Institutions Directory before investing anywhere.',
  },
];
