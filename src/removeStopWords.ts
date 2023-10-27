import * as fs from 'fs';

export function removeStopWords(filePath: string, data: string[][]): string[][] {
    try {
      const stopWordsContent = fs.readFileSync(filePath, 'utf8');
      const stopwords = stopWordsContent.split(/\r?\n/).map(word => word.toLowerCase());
  
      return data.map(row =>
        row.map(word => {
          if (!stopwords.includes(word)) {
            return word;
          }
          return '';
        }).filter(word => word !== '')
      );
    } catch (error) {
      console.error('Error al leer el archivo de stop words o al eliminar palabras:', error);
      return [];
    }
}
