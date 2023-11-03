import * as fs from 'fs';
import { readDocuments } from "./readDocuments.js"
import { calculateTF, calculateIDF, calculateTFIDF } from './functions.js';
import { cosineSimilarity } from './cosineSimilarity.js';

//// TODO: Probar que sucede con documentos grandes (descargar elquijote.txt de google) y comprobar que sucede.

export function replaceWords(wordPairs: any, wordsToReplace: string[]): string[] {
  const replacedText = wordsToReplace.map(word => wordPairs[word] || word);
  return replacedText;
}

console.time("time");
const filePath = './examples/documents/documents-01.txt';
const stopWordsFilePath = './examples/stop-words/stop-words-en.txt';
const corpusFilePath = './examples/corpus/corpus-en.txt';
const documents = readDocuments(filePath, stopWordsFilePath, corpusFilePath);

calculateTF(documents);
calculateIDF(documents);
calculateTFIDF(documents);
console.log(documents);

console.log(cosineSimilarity(documents))
console.timeEnd("time");
