'use client';

import { useMemo, useState } from 'react';

type Question = {
  prompt: string;
  options: string[];
  correct: string;
  background: string;
};

const questions: Question[] = [
  {
    prompt: 'Your lane is fully pushed under enemy tower. Your jungler spam-pings Dragon. What do you do?',
    options: ['Keep pushing until you see the Nexus', 'Dive 1v2 and die', 'Recall at full HP', 'Rotate to Dragon'],
    correct: 'Rotate to Dragon',
    background: '🐉 Dragon Soul energy'
  },
  {
    prompt: 'You place a control ward at Dragon and it spots an enemy ward. What do you do?',
    options: ['Auto the ward', 'Ignore the ward', 'Spam mastery', 'Type “?” in chat'],
    correct: 'Ignore the ward',
    background: '👁️ Control ward mind game'
  },
  {
    prompt: 'Enemy jungler is showing top. Dragon is up.',
    options: ['Take one more minion', 'Push with no vision', 'Start Dragon', 'Random invade'],
    correct: 'Start Dragon',
    background: '🗺️ Free objective alarm'
  },
  {
    prompt: 'You’re 0/3 at minute 5.',
    options: ['Force another fight', 'Type “jungle diff”', 'Play safe and farm', 'AFK'],
    correct: 'Play safe and farm',
    background: '🧠 Ego containment zone'
  },
  {
    prompt: 'Your jungler ganks and burns enemy Flash.',
    options: ['Ping “?” because no kill', 'Go back to farming brainlessly', 'Set up the wave for a follow-up kill', 'Recall immediately'],
    correct: 'Set up the wave for a follow-up kill',
    background: '⚡ Flash timer classroom'
  },
  {
    prompt: 'Two enemies are dead. Baron is up.',
    options: ['Chase for no reason', 'Reset and then Baron', 'Go mid randomly', 'Start Baron immediately'],
    correct: 'Start Baron immediately',
    background: '👑 Baron buffet'
  },
  {
    prompt: 'You have Teleport available. Fight breaks out bot lane.',
    options: ['Save TP for next game', 'TP on a good ward', 'TP on a random minion', 'Type “no mana”'],
    correct: 'TP on a good ward',
    background: '📡 Teleport discipline'
  },
  {
    prompt: 'You are the fed ADC.',
    options: ['Splitpush alone', 'Stay behind your team', 'Flash 1v5', 'Fight without support'],
    correct: 'Stay behind your team',
    background: '🎯 Carry positioning check'
  },
  {
    prompt: 'Your support places a control ward.',
    options: ['Protect it', 'Ignore it', 'Last hit it', 'Sell it'],
    correct: 'Protect it',
    background: '🛡️ Vision protection protocol'
  },
  {
    prompt: 'You lost the game but you had 200 CS and zero impact.',
    options: ['Type “team diff”', 'Review the replay', 'Blame jungle', 'Insta queue again'],
    correct: 'Review the replay',
    background: '📼 Accountability nightmare'
  }
];

const correctFeedback = [
  'OK, maybe you have a brain.',
  'gj, not completely useless.',
  'Rare human behavior detected.',
  'Clean macro. Someone clip this.',
  'Disgusting. You actually used your minimap.',
  'That was legal and intelligent. Suspicious.',
  'Coach diff. Keep cooking.',
  'Finally, a playable teammate.'
];
const wrongFeedback = [
  'Wrong. This is why you’re hardstuck.',
  'Porcod*o, come to the damn drake.',
  'You are not a real person.',
  'Macro criminal behavior detected.',
  'Did you play with monitor off?',
  'This click lowered team MMR globally.',
  'Enemy support is now shotcalling better than you.',
  'You heard a ping and chose violence instead.'
];

const rankMap = [
  { max: 3, rank: 'IRON BRAIN', message: 'Uninstall and find a new hobby.' },
  { max: 6, rank: 'SILVER CREATURE', message: 'One day you might understand macro.' },
  { max: 8, rank: 'DIAMOND HUMAN', message: 'Playable. Barely.' },
  { max: 10, rank: 'CHALLENGER GIGACHAD', message: 'Fully sentient lifeform detected.' }
];

const randomLine = (lines: string[]) => lines[Math.floor(Math.random() * lines.length)];

export default function Home() {
  const [stage, setStage] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isWrong, setIsWrong] = useState(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [shareStatus, setShareStatus] = useState('');

  const current = questions[index];
  const progress = ((index + (stage === 'result' ? 1 : 0)) / questions.length) * 100;
  const rankData = useMemo(() => rankMap.find((tier) => score <= tier.max)!, [score]);

  const handleStart = () => {
    setStage('quiz');
    setIndex(0);
    setScore(0);
    setFeedback('');
    setIsWrong(false);
    setIsAnswerLocked(false);
    setShareStatus('');
  };

  const handleAnswer = (option: string) => {
    if (isAnswerLocked) {
      return;
    }

    setIsAnswerLocked(true);
    const correct = option === current.correct;
    setIsWrong(!correct);
    setFeedback(correct ? randomLine(correctFeedback) : randomLine(wrongFeedback));

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (index === questions.length - 1) {
        setStage('result');
      } else {
        setIndex((prev) => prev + 1);
      }
      setIsAnswerLocked(false);
    }, 950);

    setTimeout(() => {
      setFeedback('');
      setIsWrong(false);
    }, 3200);
  };

  const shareTextOptions = [
    `Ragazzi ho fatto il test LoL IQ: ${score}/10 (${rankData.rank}). Il verdetto ufficiale è che faccio cagare e devo disinstallare. Qualcuno offre coaching?`,
    `Update tragicomico: LoL IQ Test -> ${score}/10, rank ${rankData.rank}. Mi hanno detto di smettere di shotcallare e toccare erba.`,
    `Breaking news: ho preso ${score}/10 al LoL IQ Test e ora il mio team vuole farmi pagare i danni emotivi.`,
    `Ho appena fatto ${score}/10 (${rankData.rank}) al test. Se vedete un drake free e io sono top, confiscatemi mouse e tastiera.`
  ];

  const handleShare = async () => {
    const trollMessage = randomLine(shareTextOptions);

    try {
      await navigator.clipboard.writeText(trollMessage);
      setShareStatus('✅ Hai copiato il recap troll negli appunti. Ora spamma la chat del team.');
    } catch {
      setShareStatus('❌ Clipboard bloccata. Copia manuale: ' + trollMessage);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-4xl flex-col justify-center rounded-3xl border border-white/10 quiz-card p-6 shadow-glowPurple transition-all md:p-10">
        {stage !== 'landing' && (
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs text-white/70 md:text-sm">
              <span>Macro Progress</span>
              <span>{Math.min(Math.round(progress), 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-neonBlue via-neonPurple to-neonRed transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {stage === 'landing' && (
          <section className="text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neonBlue">Are You Actually Human?</p>
            <h1 className="mb-4 text-5xl font-black tracking-tight text-white md:text-7xl">LoL IQ Test</h1>
            <p className="mb-10 text-lg text-white/75 md:text-xl">Test your macro before you feed.</p>
            <button
              onClick={handleStart}
              className="rounded-xl border border-neonBlue/70 bg-neonBlue/10 px-8 py-4 text-lg font-semibold text-neonBlue shadow-glowBlue transition hover:-translate-y-0.5 hover:bg-neonBlue/20"
            >
              Start the Damn Test
            </button>
          </section>
        )}

        {stage === 'quiz' && (
          <section className="space-y-5 transition-all duration-300">
            <div className="rounded-xl border border-neonPurple/50 bg-black/25 p-3 text-sm text-neonPurple md:text-base">{current.background}</div>
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">{current.prompt}</h2>
            <div className="grid gap-3">
              {current.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswerLocked}
                  className="rounded-xl border border-white/20 bg-white/5 p-4 text-left text-base transition hover:border-neonBlue/60 hover:bg-neonBlue/10 hover:shadow-glowBlue disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {option}
                </button>
              ))}
            </div>
            {feedback && (
              <p
                className={`text-lg font-semibold ${isWrong ? 'animate-shake text-neonRed drop-shadow-[0_0_8px_rgba(255,77,109,0.8)]' : 'text-emerald-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.75)]'}`}
              >
                {feedback}
              </p>
            )}
          </section>
        )}

        {stage === 'result' && (
          <section className="text-center">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-neonBlue">Final Diagnosis</p>
            <h2 className="mb-2 text-4xl font-black md:text-6xl">{score}/10</h2>
            <p className="mb-3 text-2xl font-bold text-neonPurple md:text-3xl">{rankData.rank}</p>
            <p className="mb-8 text-lg text-white/80">{rankData.message}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={handleStart}
                className="rounded-xl border border-neonBlue/60 bg-neonBlue/10 px-6 py-3 font-semibold text-neonBlue transition hover:bg-neonBlue/20 hover:shadow-glowBlue"
              >
                Run It Back
              </button>
              <button
                onClick={handleShare}
                className="rounded-xl border border-neonPurple/60 bg-neonPurple/10 px-6 py-3 font-semibold text-neonPurple transition hover:bg-neonPurple/20 hover:shadow-glowPurple"
              >
                Share your LoL IQ
              </button>
            </div>
            {shareStatus && <p className="mt-4 text-sm text-white/80">{shareStatus}</p>}
          </section>
        )}
      </div>
    </main>
  );
}
