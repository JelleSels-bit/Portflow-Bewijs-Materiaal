import {type PrismaClient, Difficulty, Status} from '@/generated/prisma/client'
import {faker} from '@faker-js/faker'

export async function seedDev(prisma: PrismaClient) {
  console.log('Seeding development database...')

  // Users
  const users = []
  for (let i = 0; i < 2; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.username(),
        role: i === 0 ? 'Admin' : 'User',
      },
    })
    users.push(user)
  }

  // Themes
  const themesData = [
    {name: 'Geschiedenis', description: 'Vragen over historische gebeurtenissen en personen.'},
    {name: 'Wiskunde', description: 'Vragen over rekenen, algebra en logica.'},
    {name: 'Aardrijkskunde', description: 'Vragen over landen, steden en geografie.'},
    {name: 'Natuur', description: 'Vragen over planten, dieren en het milieu.'},
    {name: 'Literatuur', description: 'Vragen over boeken, schrijvers en verhalen.'},
    {name: 'Technologie', description: 'Vragen over wetenschap, computers en uitvindingen.'},
    {name: 'Sport', description: 'Vragen over sport, wedstrijden en atleten.'},
    {name: 'Muziek', description: 'Vragen over muziekgenres, artiesten en instrumenten.'},
    {name: 'Kunst', description: 'Vragen over schilderkunst, beeldhouwkunst en kunstenaars.'},
    {name: 'Taal', description: 'Vragen over grammatica, woorden en literatuur.'},
  ]

  const themes = []
  for (const t of themesData) {
    const theme = await prisma.theme.create({data: t})
    themes.push(theme)
  }

  // Quizzes
  const quizzesData = [
    {
      title: 'Wereldgeschiedenis',
      description: 'Test je kennis over historische gebeurtenissen.',
      difficulty: Difficulty.Medium,
    },
    {title: 'Basale Wiskunde', description: 'Oefen met rekenen en simpele algebra.', difficulty: Difficulty.Easy},
    {
      title: 'Europese Geografie',
      description: 'Hoe goed ken jij de Europese landen en steden?',
      difficulty: Difficulty.Hard,
    },
    {title: 'Natuur en Milieu', description: 'Vragen over flora, fauna en milieu.', difficulty: Difficulty.Medium},
    {
      title: 'Nederlandse Literatuur',
      description: 'Ken jij de bekende schrijvers en boeken?',
      difficulty: Difficulty.Medium,
    },
    {
      title: 'Technologische Uitvindingen',
      description: 'Vragen over wetenschap en techniek.',
      difficulty: Difficulty.Hard,
    },
    {title: 'Sportkennis', description: 'Vragen over sport en atleten.', difficulty: Difficulty.Easy},
    {title: 'Muziekgeschiedenis', description: 'Vragen over artiesten en genres.', difficulty: Difficulty.Medium},
    {
      title: 'Kunstgeschiedenis',
      description: 'Vragen over beroemde kunstwerken en kunstenaars.',
      difficulty: Difficulty.Hard,
    },
    {
      title: 'Taalvaardigheid',
      description: 'Test je kennis van grammatica en woordenschat.',
      difficulty: Difficulty.Easy,
    },
  ]

  const quizzes = []
  for (const q of quizzesData) {
    const quiz = await prisma.quiz.create({data: q})
    quizzes.push(quiz)
  }

  // Questions & Answers
  const questionsData = [
    {
      question: 'Wat is de hoofdstad van Nederland?',
      answers: ['Amsterdam', 'Rotterdam', 'Utrecht'],
    },
    {
      question: "Wie schreef 'De Brief voor de Koning'?",
      answers: ['Tonke Dragt', 'J.K. Rowling', 'Erik van den Berg'],
    },
    {
      question: 'Wat is 12 x 8?',
      answers: ['96', '88', '104'],
    },
    {
      question: 'In welk jaar begon de Tweede Wereldoorlog?',
      answers: ['1939', '1914', '1945'],
    },
    {
      question: 'Welk land staat bekend om de fjorden?',
      answers: ['Noorwegen', 'Zweden', 'Finland'],
    },
    {
      question: 'Wat is de grootste planeet in ons zonnestelsel?',
      answers: ['Jupiter', 'Saturnus', 'Mars'],
    },
    {
      question: 'Wie schilderde de Nachtwacht?',
      answers: ['Rembrandt', 'Van Gogh', 'Vermeer'],
    },
    {
      question: 'Wat is de officiële taal van België?',
      answers: ['Nederlands', 'Frans', 'Duits'],
    },
    {
      question: 'Hoeveel provincies heeft Nederland?',
      answers: ['12', '10', '15'],
    },
    {
      question: 'Wat is de hoofdstad van Frankrijk?',
      answers: ['Parijs', 'Lyon', 'Marseille'],
    },
  ]

  const questions = []
  for (const quiz of quizzes) {
    for (const q of questionsData) {
      const question = await prisma.question.create({
        data: {
          question: q.question,
          points: 5,
          answerExplanation: 'Dit is een uitleg bij het antwoord.',
          quizId: quiz.id,
        },
      })
      questions.push(question)

      //Bezig met json typings toe te voegen + deze data was anyway toch niet bruikbaar...
      // for (let i = 0; i < q.answers.length; i++) {
      //   await prisma.answer.create({
      //     data: {
      //       answer: q.answers[i],
      //       isCorrect: i === 0,
      //       questionId: question.id,
      //     },
      //   });
      // }
    }
  }

  // QuizTheme
  const usedQuizThemePairs = new Set<string>()
  while (usedQuizThemePairs.size < 10) {
    const quiz = quizzes[usedQuizThemePairs.size % quizzes.length]
    const theme = themes[usedQuizThemePairs.size % themes.length]
    const pairKey = `${quiz.id}-${theme.id}`
    if (!usedQuizThemePairs.has(pairKey)) {
      usedQuizThemePairs.add(pairKey)
      await prisma.quizTheme.create({data: {quizId: quiz.id, ThemeId: theme.id}})
    }
  }

  // QuestionTheme
  const usedQuestionThemePairs = new Set<string>()
  while (usedQuestionThemePairs.size < 10) {
    const question = questions[usedQuestionThemePairs.size % questions.length]
    const theme = themes[usedQuestionThemePairs.size % themes.length]
    const pairKey = `${question.id}-${theme.id}`
    if (!usedQuestionThemePairs.has(pairKey)) {
      usedQuestionThemePairs.add(pairKey)
      await prisma.questionTheme.create({data: {questionId: question.id, themeId: theme.id}})
    }
  }

  // GameSessions
  // const gameSessions = [];
  // for (let i = 0; i < 10; i++) {
  //   const host = users[i % users.length];
  //   const session = await prisma.gameSession.create({
  //     data: {
  //       maxPlayers: 4,
  //       status: Status.Pending,
  //       hostId: host.id,
  //     },
  //   });
  //   gameSessions.push(session);
  // }
  //
  // // UserGameSession
  // for (const session of gameSessions) {
  //   const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
  //
  //   for (let j = 0; j < 3; j++) {
  //     const user = shuffledUsers[j];
  //     if (!user) continue; // skip als er geen gebruiker is
  //     await prisma.userGameSession.create({
  //       data: {
  //         userId: user.id,
  //         gameSessionId: session.id,
  //         score: 0,
  //       },
  //     });
  //   }
  // }

  console.log('Development database seeded')
}
