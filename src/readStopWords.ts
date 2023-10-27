import * as fs from 'fs';

export function readStopWordsFile(filePath: string): string[] {
    try {
      const stopWordsContent = fs.readFileSync(filePath, 'utf8');
      return stopWordsContent.split(/\r?\n/).map(word => word.toLowerCase());
    } catch (error) {
      console.error('Error al leer el archivo de stop words:', error);
      return [];
    }
  }
  