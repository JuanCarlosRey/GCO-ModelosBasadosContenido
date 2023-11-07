import * as fs from 'fs';
import { Term } from './term';
import { removeStopWords } from './removeStopWords';
import { replaceWords } from './replaceWords';

export function readDocuments(filePath: string, stowWordsfilePath: string, corpusFilePath: string): Term[][] {
  try {

    let fileContent: string;
    try {
      fileContent = fs.readFileSync(filePath, 'utf8');
      const lines = fileContent.split('\n');
      const nonEmptyLines = lines.filter(line => line.trim() !== '');
      fileContent = nonEmptyLines.join('\n');
    } catch (e) {
      throw new Error(`Error al leer el archivo ${filePath}`)
    }

    let stopWordsContent: string;
    try {
      stopWordsContent = fs.readFileSync(stowWordsfilePath, 'utf8');
    } catch (e) {
      throw new Error(`Error al leer el archivo ${stowWordsfilePath}`)
    }
     
    let corpusContent: string;
    try {
      corpusContent = fs.readFileSync(corpusFilePath, 'utf8');
    } catch (e) {
      throw new Error(`Error al leer el archivo ${stowWordsfilePath}`)
    }

    const rows = fileContent.split('\n');
    const stopwords = stopWordsContent.split(/\r?\n/).map(word => word.toLowerCase());
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
            tf: 0, 
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
    throw new Error(error.message);
  }
}
