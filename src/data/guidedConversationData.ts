import type { GuidedConversationConfig } from '@/types'

export const guidedConversationConfigs: Record<string, GuidedConversationConfig> = {
  'cat-family': {
    categoryId: 'cat-family',
    moduleId: 'mod-fam-1',
    moduleTitle: "Who's in Your Family",
    categoryLabel: 'Family',
    questions: [
      {
        id: 'gq-fam-1',
        questionText: "Let's start with the people closest to you. Who's in your family?",
        followUpChips: [
          'Partner or spouse',
          'My children',
          'Parents or siblings',
          'Move on',
        ],
        mockUserResponse:
          "Well, my wife Linda, we've been married 44 years this June. She's my best friend. We have 2 kids, Sarah and Michael. Sarah's 38, Michael's 35.",
        mockAiResponse:
          "That's a wonderful family. 44 years with Linda — that's something special. And Sarah and Michael — it sounds like you've built a really full life together.",
      },
      {
        id: 'gq-fam-2',
        questionText: 'Is there someone in your family who has really shaped who you are?',
        followUpChips: [
          'What they taught me',
          'A memory with them',
          'Move on',
        ],
        mockUserResponse:
          "My dad Robert, without a doubt. He passed about ten years ago but he taught me everything about hard work and showing up for people. My mom Margaret is still here — she's 89 and still sharp as a tack.",
        mockAiResponse:
          "Robert sounds like the kind of person who leads by example. And Margaret at 89, still sharp — that's incredible. You clearly come from strong people.",
      },
      {
        id: 'gq-fam-3',
        questionText: 'Who in your family would you most want your grandchildren to know about?',
        followUpChips: [
          'Why them',
          'What I want them to know',
          'Move on',
        ],
        mockUserResponse:
          "Definitely my dad. I want them to know about his kindness, his work ethic, and the way he could make anyone feel welcome. He had this laugh that could fill a room.",
        mockAiResponse:
          "That image of his laugh filling the room — your grandchildren will treasure knowing that. Those are the kinds of details that keep someone alive in a family's memory.",
      },
    ],
    closingMessage:
      "That's a wonderful picture of your family. I'll keep everything you've shared safe.",
    confirmationCTALabel: 'Save my family',
  },

  'cat-friends': {
    categoryId: 'cat-friends',
    moduleId: 'mod-fri-1',
    moduleTitle: 'Your Circle',
    categoryLabel: 'Friends',
    questions: [
      {
        id: 'gq-fri-1',
        questionText: 'Tell me about the friends who have really been there for you.',
        followUpChips: [
          'How we met',
          'What makes them special',
          'A time they showed up',
          'Move on',
        ],
        mockUserResponse:
          "My buddy Tom — we've been friends since college. He was my best man. And Nancy from work, she's been a close friend for about 20 years now.",
        mockAiResponse:
          "Tom and Nancy — sounds like you've had some real anchors in your life. College friendships that last are something special.",
      },
      {
        id: 'gq-fri-2',
        questionText: 'Is there a friend who changed the way you see the world?',
        followUpChips: [
          'What they helped me see',
          'A story about them',
          'Move on',
        ],
        mockUserResponse:
          "Tom, honestly. He went through a really tough time in his 40s — lost his job, went through a divorce. Watching how he rebuilt everything taught me that resilience isn't just a word.",
        mockAiResponse:
          "That kind of friendship — where you learn from each other's hardest moments — that's rare and really meaningful.",
      },
      {
        id: 'gq-fri-3',
        questionText: 'Anyone else you want to make sure we capture? A neighbor, someone from your community?',
        followUpChips: [
          'More about them',
          'How long in my life',
          'Move on',
        ],
        mockUserResponse:
          "Bill next door. We've been neighbors for 15 years. He's the kind of guy who just shows up when you need him.",
        mockAiResponse:
          "Bill sounds like a true friend. The ones who show up without being asked — those are keepers.",
      },
    ],
    closingMessage:
      "I've got a wonderful picture of your closest friends. These are the people who've walked alongside you.",
    confirmationCTALabel: 'Save my circle',
  },

  'cat-career': {
    categoryId: 'cat-career',
    moduleId: 'mod-car-1',
    moduleTitle: 'Career Journey',
    categoryLabel: 'Career',
    questions: [
      {
        id: 'gq-car-1',
        questionText: 'Walk me through your working life. Where did it begin?',
        followUpChips: [
          'What it taught me',
          'How old I was',
          'What came next',
          'Move on',
        ],
        mockUserResponse:
          "I started as a stock boy at the local hardware store when I was 16. My dad knew the owner. It taught me how to work hard and show up on time.",
        mockAiResponse:
          "A hardware store at 16 — that's a great way to learn the basics. Sounds like it set a strong foundation for everything that came after.",
      },
      {
        id: 'gq-car-2',
        questionText: 'What about the career you\'re most known for? Walk me through how that unfolded.',
        followUpChips: [
          'The hardest part',
          'What I\'m most proud of',
          'A turning point',
          'Move on',
        ],
        mockUserResponse:
          "I spent 30 years in engineering at Boeing. Started as a junior engineer, worked my way up to lead the 747 maintenance program. Retired as a senior director.",
        mockAiResponse:
          "30 years at Boeing, from junior engineer to senior director — that's an incredible arc. The 747 program is legendary.",
      },
      {
        id: 'gq-car-3',
        questionText: 'Was there a moment in your career that changed everything — a promotion, a risk, a failure that taught you something?',
        followUpChips: [
          'What I learned',
          'How it shaped what came next',
          'Move on',
        ],
        mockUserResponse:
          "Getting passed over for a promotion at 35. It stung at the time, but it pushed me to go get my MBA. That ended up being the best thing that ever happened to my career.",
        mockAiResponse:
          "Turning a setback into fuel for growth — that says a lot about your character. The MBA clearly opened new doors.",
      },
    ],
    closingMessage:
      "I've got a clear picture of your career journey. These are the roles and moments that defined your professional life.",
    confirmationCTALabel: 'Save my career',
  },

  'cat-education': {
    categoryId: 'cat-education',
    moduleId: 'mod-edu-1',
    moduleTitle: 'Where You Learned',
    categoryLabel: 'Education',
    questions: [
      {
        id: 'gq-edu-1',
        questionText: 'Tell me about your education. Where did you go to school?',
        followUpChips: [
          'What it was like',
          'My friends there',
          'Subjects I loved',
          'Move on',
        ],
        mockUserResponse:
          "I went to Lincoln High School in our small town. It was one of those places where everybody knew everybody. I wasn't the best student, but I loved history class — Mr. Abrams made it come alive.",
        mockAiResponse:
          "Lincoln High — sounds like one of those places that really shapes you. And a great history teacher can change everything.",
      },
      {
        id: 'gq-edu-2',
        questionText: 'Did you go on to college or any other kind of training after that?',
        followUpChips: [
          'That experience',
          'What I studied',
          'Why that path',
          'Move on',
        ],
        mockUserResponse:
          "I went to State University for my bachelor's in history. Then years later, after I'd been working a while, I went back and got my MBA at Wharton. That was a whole different experience — I was the oldest one in the room.",
        mockAiResponse:
          "A history degree and then an MBA at Wharton — that's quite a range. Going back to school later in life takes real courage.",
      },
      {
        id: 'gq-edu-3',
        questionText: 'Was there a teacher, professor, or mentor from your school years who really left a mark on you?',
        followUpChips: [
          'Lessons beyond the subject',
          'Still in touch',
          'Move on',
        ],
        mockUserResponse:
          "Professor Davis at State. She taught American history and she had this way of connecting the past to the present that just clicked for me. She's the reason I almost went into teaching myself.",
        mockAiResponse:
          "Professor Davis sounds like someone who saw something in you. The teachers who make us consider a different path — those are the ones that matter most.",
      },
    ],
    closingMessage:
      "I've got a clear picture of your education journey. These are the places and people that shaped how you think.",
    confirmationCTALabel: 'Save my education',
  },
}
