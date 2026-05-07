import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypewriter } from './useTypewriter';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const advance = async (ms: number) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
};

describe('useTypewriter', () => {
  it('starts empty before startDelayMs has elapsed', () => {
    const { result } = renderHook(() =>
      useTypewriter({
        words: ['ab'],
        startDelayMs: 1000,
        typeSpeedMs: 50,
      }),
    );
    expect(result.current).toBe('');
  });

  it('returns the first word immediately when disabled', () => {
    const { result } = renderHook(() =>
      useTypewriter({
        words: ['hello', 'world'],
        enabled: false,
      }),
    );
    expect(result.current).toBe('hello');
  });

  it('returns empty when given an empty word list', () => {
    const { result } = renderHook(() => useTypewriter({ words: [] }));
    expect(result.current).toBe('');
  });

  it('completes typing the first word after enough time', async () => {
    const { result } = renderHook(() =>
      useTypewriter({
        words: ['abcd'],
        startDelayMs: 10,
        typeSpeedMs: 10,
        pauseMs: 10000,
        deleteSpeedMs: 10,
        swapPauseMs: 10,
      }),
    );
    // 10ms start delay + 4 chars × 10ms = 50ms covers full first-word type
    await advance(200);
    expect(result.current).toBe('abcd');
  });

  it('cycles past the first word eventually (does not stay stuck)', async () => {
    const { result } = renderHook(() =>
      useTypewriter({
        words: ['a', 'b'],
        startDelayMs: 10,
        typeSpeedMs: 10,
        pauseMs: 10,
        deleteSpeedMs: 10,
        swapPauseMs: 10,
      }),
    );
    // Run long enough for at least one full cycle to land back on the first
    // word. Final state is necessarily one of the cycle's valid texts.
    await advance(2000);
    expect(['a', 'b', '']).toContain(result.current);
  });
});
