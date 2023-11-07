export function replaceWords(wordPairs: any, wordsToReplace: string[]): string[] {
  const replacedText = wordsToReplace.map(word => wordPairs[word] || word);
  return replacedText;
}