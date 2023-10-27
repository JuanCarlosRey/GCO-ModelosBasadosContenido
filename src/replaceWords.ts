import * as fs from 'fs';
import { readDocument } from "./readDocument.js"
import { readStopWordsFile } from "./readStopWords.js"
import { removeStopWords } from "./removeStopWords.js"

export function replaceWords(filePath: string, wordsToReplace: string[][]): string[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const wordPairs = JSON.parse(fileContent);

    const replacedText = wordsToReplace.map(wordArray => 
      wordArray.map(word => wordPairs[word] || word).join(' ')
    );

    return replacedText;
  } catch (error) {
    console.error('Error al leer el archivo o reemplazar palabras:', error);
    return [];
  }
}

const filePath = './examples/documents/documents-01.txt';
const result = readDocument(filePath);

const stopWordsFilePath = './examples/stop-words/stop-words-en.txt';
const stopwords = readStopWordsFile(stopWordsFilePath);

console.log(stopwords)

const filteredResult = removeStopWords(result, stopwords);

console.log('Número de filas:', filteredResult.length);
filteredResult.forEach((row, index) => {
  console.log(`Fila ${index + 1}:`, row);
});

const corpusFilePath = './examples/corpus/corpus-en.txt';
const corpusResult = replaceWords(corpusFilePath, filteredResult);
console.log('Texto reemplazado:', corpusResult);