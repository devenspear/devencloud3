import React, { useMemo } from 'react';

interface Question {
  text: string;
  url: string;
  id: string;
}

const questions: Question[] = [
  {
    id: 'linkedin-experience',
    text: 'Curious about my 30+ years founding startups in real estate, software, and tech?',
    url: 'https://www.linkedin.com/in/devenspear',
  },
  {
    id: 'ai-trends',
    text: 'How can I dive into the latest trends in artificial intelligence and exponential technologies?',
    url: 'https://www.futurefast.ai/',
  },
  {
    id: 'decentralization-manifesto',
    text: "Want to read my manifesto on decentralization and why it's the future of freedom?",
    url: 'https://www.deven.blog/p/the-new-declaration-of-independence',
  },
  {
    id: 'overabove-innovation',
    text: 'Need strategic brand positioning and brand DNA development for your business?',
    url: 'https://overabove.com/',
  },
  {
    id: 'crypto-beginner',
    text: 'How do I get started with crypto and blockchain as a beginner?',
    url: 'https://www.cryptodeven.com/',
  },
  {
    id: 'disruption-weekly',
    text: 'Want weekly insights on disruptive technologies and innovation trends?',
    url: 'https://www.linkedin.com/newsletters/disruption-weekly-7120892654304776192/',
  },
  {
    id: 'wisdom-hub',
    text: 'Looking for curated wisdom and philosophical insights from 20 years of reading?',
    url: 'https://nlight10.me',
  },
  {
    id: 'daily-thoughts',
    text: 'Want to follow my daily thoughts on disruption, tech, and metaphysical ideas?',
    url: 'https://twitter.com/DevenSpear',
  },
  {
    id: 'executive-intelligence',
    text: 'Need executive intelligence on AI, Web3, and exponential technology disruption?',
    url: 'https://www.futurefast.ai/',
  },
  {
    id: 'ai-workshop',
    text: 'Curious how I rapidly prototype innovative solutions using AI-powered development?',
    url: 'https://workshop.deven.network',
  },
];

const PANEL_WIDTH = 350;
const BUBBLE_WIDTH = 240; // Increased from 195px
const H_BUFFER = 20;
const V_BUFFER = 30;
const H_SLOTS = 3;
const MIN_BUBBLE_HEIGHT = 60; // Increased from 48px
const MAX_BUBBLE_HEIGHT = 80;
const MIN_FONT_SIZE = 11;
const MAX_FONT_SIZE = 14;

function getSlotCenters(panelSize: number, bubbleSize: number, slots: number, buffer: number) {
  const slotSize = (panelSize - 2 * buffer - bubbleSize) / (slots - 1);
  return Array.from({ length: slots }, (_, i) => buffer + bubbleSize / 2 + i * slotSize);
}

function getMaxVerticalSlots(windowHeight: number, buffer: number, minBubbleHeight: number) {
  return Math.max(1, Math.floor((windowHeight - 2 * buffer) / minBubbleHeight));
}

function getVerticalCenters(slots: number, buffer: number, bubbleHeight: number, windowHeight: number) {
  const minY = buffer + bubbleHeight / 2;
  const maxY = windowHeight - buffer - bubbleHeight / 2;
  const slotSize = slots > 1 ? (maxY - minY) / (slots - 1) : 0;
  return Array.from({ length: slots }, (_, i) => minY + i * slotSize);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FloatingQuestions: React.FC = () => {
  const availHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  // Dynamically calculate max slots that fit
  const maxSlots = getMaxVerticalSlots(availHeight, V_BUFFER, MIN_BUBBLE_HEIGHT);
  const vSlots = Math.min(5, maxSlots);
  const fitHeight = Math.max(MIN_BUBBLE_HEIGHT, Math.min(MAX_BUBBLE_HEIGHT, Math.floor((availHeight - 2 * V_BUFFER) / vSlots)));
  const fitFont = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.floor(fitHeight * 0.18)));

  const { left, right } = useMemo(() => {
    const leftQs = questions.filter((_, i) => i % 2 === 0).slice(0, vSlots);
    const rightQs = questions.filter((_, i) => i % 2 === 1).slice(0, vSlots);
    const hCenters = getSlotCenters(PANEL_WIDTH, BUBBLE_WIDTH, H_SLOTS, H_BUFFER);
    const vCenters = getVerticalCenters(vSlots, V_BUFFER, fitHeight, availHeight);
    function cleanText(text: string) {
      return text.replace(/\s+$/g, '').replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
    }
    function assignLeft(questions: Question[]) {
      const vSlotsArr = shuffle([...vCenters]);
      const hSlots = shuffle([...hCenters, ...hCenters]);
      return questions.map((q, i) => {
        const jitterX = (Math.random() - 0.5) * 20;
        const jitterY = (Math.random() - 0.5) * 10;
        return {
          ...q,
          text: cleanText(q.text),
          top: vSlotsArr[i] + jitterY,
          left: hSlots[i] + jitterX,
        };
      });
    }
    function assignRight(questions: Question[]) {
      const vSlotsArr = shuffle([...vCenters]);
      const hSlots = shuffle([...hCenters, ...hCenters]);
      return questions.map((q, i) => {
        const jitterX = (Math.random() - 0.5) * 20;
        const jitterY = (Math.random() - 0.5) * 10;
        return {
          ...q,
          text: cleanText(q.text),
          top: vSlotsArr[i] + jitterY,
          right: hSlots[i] + jitterX,
        };
      });
    }
    return { left: assignLeft(leftQs), right: assignRight(rightQs) };
  }, [availHeight, fitHeight, vSlots]);

  const handleClick = (url: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="floating-questions-container">
      <div className="floating-questions-left">
        {left.map(q => (
          <div
            key={q.id}
            className="floating-question"
            style={{
              position: 'absolute',
              top: q.top,
              left: q.left,
              width: BUBBLE_WIDTH,
              height: fitHeight,
              fontSize: fitFont,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${Math.random() * 5}s`,
              fontStyle: 'italic',
              color: '#3ef3ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 18px',
              margin: 0,
              boxSizing: 'border-box',
              overflow: 'hidden',
              whiteSpace: 'pre-line',
            }}
            onClick={() => handleClick(q.url)}
          >
            <span className="question-text">{q.text}</span>
          </div>
        ))}
      </div>
      <div className="floating-questions-right">
        {right.map(q => (
          <div
            key={q.id}
            className="floating-question"
            style={{
              position: 'absolute',
              top: q.top,
              right: q.right,
              width: BUBBLE_WIDTH,
              height: fitHeight,
              fontSize: fitFont,
              transform: 'translate(50%, -50%)',
              animationDelay: `${Math.random() * 5}s`,
              fontStyle: 'italic',
              color: '#3ef3ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 18px',
              margin: 0,
              boxSizing: 'border-box',
              overflow: 'hidden',
              whiteSpace: 'pre-line',
            }}
            onClick={() => handleClick(q.url)}
          >
            <span className="question-text">{q.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingQuestions; 