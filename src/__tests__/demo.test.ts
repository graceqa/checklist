import { describe, it, expect } from 'vitest';
import { detectDemoRoutine } from '../hooks/useSchedule';

describe('Demo Direct Path Detection', () => {
  it('detects morning routine from direct paths', () => {
    expect(detectDemoRoutine('/demo/morning')).toBe('morning');
    expect(detectDemoRoutine('/checklist/demo/morning')).toBe('morning');
    expect(detectDemoRoutine('/checklist/demo/morning/')).toBe('morning');
    expect(detectDemoRoutine('', '#/demo/morning')).toBe('morning');
    expect(detectDemoRoutine('', '', '?demo=morning')).toBe('morning');
    expect(detectDemoRoutine('', '', '?p=%2Fdemo%2Fmorning')).toBe('morning');
  });

  it('detects evening routine from direct paths', () => {
    expect(detectDemoRoutine('/demo/evening')).toBe('evening');
    expect(detectDemoRoutine('/checklist/demo/evening')).toBe('evening');
    expect(detectDemoRoutine('/checklist/demo/evening/')).toBe('evening');
    expect(detectDemoRoutine('', '#/demo/evening')).toBe('evening');
    expect(detectDemoRoutine('', '', '?demo=evening')).toBe('evening');
    expect(detectDemoRoutine('', '', '?p=%2Fdemo%2Fevening')).toBe('evening');
  });

  it('returns null for normal paths with no demo route', () => {
    expect(detectDemoRoutine('/')).toBe(null);
    expect(detectDemoRoutine('/checklist')).toBe(null);
    expect(detectDemoRoutine('/checklist/')).toBe(null);
    expect(detectDemoRoutine('/about')).toBe(null);
  });
});
