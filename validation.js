export function parsePageString(input) {
  if (!input || !input.trim()) {
    return { error: 'Page reference string cannot be empty.' };
  }

  const parts = input
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);

  const pages = [];
  for (const part of parts) {
    const num = parseInt(part, 10);
    if (isNaN(num) || num < 0) {
      return { error: `"${part}" is not a valid non-negative integer.` };
    }
    pages.push(num);
  }

  if (pages.length < 1) {
    return { error: 'Please enter at least one page reference.' };
  }

  if (pages.length > 50) {
    return { error: 'Maximum 50 page references allowed for a clear visualization.' };
  }

  return { pages };
}

export function parseFrameCount(input) {
  const num = parseInt(input, 10);
  if (isNaN(num) || num < 1) {
    return { error: 'Number of frames must be a positive integer.' };
  }
  if (num > 10) {
    return { error: 'Maximum 10 frames allowed.' };
  }
  return { frameCount: num };
}
