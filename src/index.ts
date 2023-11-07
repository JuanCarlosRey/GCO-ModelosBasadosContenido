import { readDocuments } from "./readDocuments"
import { calculateTF, calculateIDF, calculateTFIDF } from './functions';
import { printDocumentTable, printDocumentCosineSimilarity } from './printDocumentTable';
import { cosineSimilarity } from "./cosineSimilarity";

console.time("time");
const filePath = './examples/documents/documents-01.txt';
const stopWordsFilePath = './examples/stop-words/stop-words-en.txt';
const corpusFilePath = './examples/corpus/corpus-en.txt';
const documents = readDocuments(filePath, stopWordsFilePath, corpusFilePath);

calculateTF(documents);
calculateIDF(documents);
calculateTFIDF(documents);

const cosines = cosineSimilarity(documents)

console.timeEnd("time");

printDocumentTable(documents);
printDocumentCosineSimilarity(cosines);

