export function removeStopWords(data: string[][], stopwords: string[]): string[][] {
    return data.map(row =>
      row.map(word => {
        if (!stopwords.includes(word)) {
          return word;
        }
        return '';
      }).filter(word => word !== '')
    );
}