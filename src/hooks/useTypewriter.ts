import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  words: readonly string[];
  typeSpeedMs?: number;
  deleteSpeedMs?: number;
  pauseMs?: number;
  startDelayMs?: number;
  /** Brief pause at empty before typing the next word — smooths the swap. */
  swapPauseMs?: number;
  enabled?: boolean;
}

/**
 * Cycles through `words` forever: type → pause → delete → swap → type next.
 * Returns the currently visible substring.
 */
export function useTypewriter({
  words,
  typeSpeedMs = 95,
  deleteSpeedMs = 75,
  pauseMs = 1800,
  startDelayMs = 500,
  swapPauseMs = 280,
  enabled = true,
}: UseTypewriterOptions): string {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled || words.length === 0) {
      setText(words[0] ?? '');
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let justSwapped = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timeoutId = setTimeout(tick, pauseMs);
          return;
        }
      } else {
        charIndex -= 1;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          justSwapped = true;
        }
      }
      const nextDelay = deleting
        ? deleteSpeedMs
        : justSwapped
          ? swapPauseMs
          : typeSpeedMs;
      justSwapped = false;
      timeoutId = setTimeout(tick, nextDelay);
    };

    timeoutId = setTimeout(tick, startDelayMs);
    return () => clearTimeout(timeoutId);
  }, [words, typeSpeedMs, deleteSpeedMs, pauseMs, startDelayMs, swapPauseMs, enabled]);

  return text;
}
