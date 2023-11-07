import { readDocuments } from "./readDocuments"
import { calculateTF, calculateIDF, calculateTFIDF } from './functions';
import { printDocumentTable, printDocumentCosineSimilarity } from './printDocumentTable';
import { cosineSimilarity } from "./cosineSimilarity";
import { ArgumentParser } from "argparse";
import * as path from "path";
import * as pc from "picocolors";

const parser = new ArgumentParser({ description: 'Modelos basados en contenido' });

// Crea un grupo para los argumentos requeridos
const requiredArgumentsGroup = parser.add_argument_group({ title: 'required arguments' });

requiredArgumentsGroup.add_argument('--file', {
  metavar: 'file',
  type: String,
  required: true,
  help: 'file path that contains the documents'
});

requiredArgumentsGroup.add_argument('--stop_words', {
  metavar: 'stop_words',
  type: String,
  required: true,
  help: 'file path that contains stop words'
});

requiredArgumentsGroup.add_argument('--corpus', {
  metavar: 'corpus',
  type: String,
  required: true,
  help: 'file path that contains the corpus data'
});

class ArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ArgumentError";
  }
}

function validatePath(ruta: string, fileType: string) {
  try {
    const absolutePath = path.resolve(ruta);
    return absolutePath;
  } catch (error) {
    throw new ArgumentError(`Invalid path given for argument ${fileType}`);
  }
}

(function processArguments() {
  let args: { file: string, stop_words: string, corpus: string };
  try {
    args = parser.parse_args();

    validatePath(args.file, "file");
    validatePath(args.stop_words, "stop_words");
    validatePath(args.corpus, "corpus");
    
    console.time("time");

    const filePath = args.file;
    const stopWordsFilePath = args.stop_words;
    const corpusFilePath = args.corpus;

    const documents = readDocuments(filePath, stopWordsFilePath, corpusFilePath);

    calculateTF(documents);
    calculateIDF(documents);
    calculateTFIDF(documents);

    const cosines = cosineSimilarity(documents)

    console.timeEnd("time");

    printDocumentTable(documents);
    printDocumentCosineSimilarity(cosines);

  } catch (error) {
    console.error(pc.red(error.name + ":"), error.message);
  }
})();

