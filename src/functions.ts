import { Term } from "./term";

// Función para calcular TF (Término Frecuencia) de todos los términos de todos los documentos
export function calculateTF(termMatrix: Term[][]): void {
  termMatrix.forEach(document => {
    // Calcula el número total de términos en el documento
    const totalTermsInDocument = document.reduce((total, term) => total + term.occurrences, 0);

    // Calcula el TF para cada término en el documento
    document.forEach(term => {
      term.tf = term.occurrences / totalTermsInDocument;
    });
  });
}

// Función para calcular el IDF de un término en una matriz de documentos (Term[][])
export // Función para calcular el IDF de todos los términos en una matriz de documentos (Term[][])
function calculateIDF(termMatrix: Term[][]): void {
  const totalDocuments = termMatrix.length;

  // Crear un mapa para realizar un seguimiento de cuántos documentos contienen cada término
  const termDocumentCount: { [term: string]: number } = {};

  // Contar el número de documentos que contienen cada término
  termMatrix.forEach(document => {
    const uniqueTerms = new Set(document.map(term => term.term));
    uniqueTerms.forEach(term => {
      termDocumentCount[term] = (termDocumentCount[term] || 0) + 1;
    });
  });

  // Calcular el IDF para cada término y asignarlo a los objetos Term en la matriz
  termMatrix.forEach(document => {
    document.forEach(term => {
      const documentsWithTerm = termDocumentCount[term.term] || 0;
      term.idf = documentsWithTerm > 0 ? Math.log(totalDocuments / documentsWithTerm) : 0;
    });
  });
}


// Función para calcular el TF-IDF de cada término en una matriz de documentos (Term[][])
export function calculateTFIDF(termMatrix: Term[][]): void {
  termMatrix.forEach(document => {
    document.forEach(term => {
      term.tf_idf = term.tf * term.idf;
    });
  });
}
