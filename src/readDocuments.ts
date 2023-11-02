import * as fs from 'fs';
import { Term } from './term';
import { removeStopWords } from './removeStopWords';
import { replaceWords } from './replaceWords';

export function readDocuments(filePath: string, stowWordsfilePath: string, corpusFilePath: string): Term[][] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const rows = fileContent.split('\n');

    const stopWordsContent = fs.readFileSync(stowWordsfilePath, 'utf8');
    const stopwords = stopWordsContent.split(/\r?\n/).map(word => word.toLowerCase());

    const corpusContent = fs.readFileSync(corpusFilePath, 'utf8');
    const wordPairs = JSON.parse(corpusContent);

    const result: Term[][] = rows.map(row => {
      const cleanedRow = row
        .replace(/[\n\r,.]/g, ' ')
        .split(' ')
        .filter(word => word.trim() !== '')
        .map(word => word.toLowerCase());
    
      const withoutStopWords = removeStopWords(stopwords, cleanedRow);
      const replacedWords = replaceWords(wordPairs, withoutStopWords);
    
      const termMap: { [term: string]: Term } = {}; // Un objeto para mantener un seguimiento de los términos y sus índices en esta línea.
    
      const analyzedRow: Term[] = [];
    
      replacedWords.forEach(term => {
        if (termMap[term]) {
          // Si el término ya está en el mapa, incrementa las ocurrencias.
          termMap[term].occurrences += 1;
        } else {
          // Si el término no está en el mapa, crea un nuevo objeto Term.
          const index = analyzedRow.length;
          termMap[term] = {
            index,
            term,
            occurrences: 1,
            tf: 0, // Calcula el TF e IDF según tus necesidades
            idf: 0,
            tf_idf: 0,
          };
          analyzedRow.push(termMap[term]);
        }
      });
    
      return analyzedRow;
    });    

    return result;
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return [];
  }
}
