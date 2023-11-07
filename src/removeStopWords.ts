export function removeStopWords(stopwords: string[], data: string[]): string[] {
  return data.map(word => {
    if (!stopwords.includes(word)) {
      return word;
    }
    return '';
  }).filter(word => word !== '');    
}
