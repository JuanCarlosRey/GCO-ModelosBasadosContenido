import * as fs from 'fs';
import { readDocument } from "./readDocument.js"
import { removeStopWords } from "./removeStopWords.js"
import { calculateTF } from './functions.js';

export function replaceWords(filePath: string, wordsToReplace: string[][]): string[][] {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const wordPairs = JSON.parse(fileContent);
  
      const replacedText = wordsToReplace.map(wordArray =>
        wordArray.map(word => wordPairs[word] || word)
      );
  
      return replacedText;
    } catch (error) {
      console.error('Error al leer el archivo o reemplazar palabras:', error);
      return [];
    }
}

/*
const filePath = './examples/documents/documents-01.txt';
const documents = readDocument(filePath);

const stopWordsFilePath = './examples/stop-words/stop-words-en.txt';

const filteredResult = removeStopWords(stopWordsFilePath, documents);

console.log('Número de filas:', filteredResult.length);
filteredResult.forEach((row, index) => {
  console.log(`Fila ${index + 1}:`, row);
});

const corpusFilePath = './examples/corpus/corpus-en.txt';
const corpusResult = replaceWords(corpusFilePath, filteredResult);
console.log('Texto reemplazado:', corpusResult);

console.log('TF: ', calculateTF(corpusResult[0][0], corpusResult[0]));
*/