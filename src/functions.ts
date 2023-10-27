type MyDocument = string[];

/////////// TODO:

// Función para calcular TF (Término Frecuencia) de un término en un documento
export function calculateTF(term: string, document: MyDocument): number {
  const termFrequency = document.filter(word => word === term).length;
  return termFrequency / document.length;
}
/*
// Función para calcular IDF (Frecuencia de Documento Inversa) de un término en una matriz de documentos
function calculateIDF(term: string, documents: Document[]): number {
  const documentWithTermCount = documents.filter(document => document.includes(term)).length;
  return Math.log(documents.length / (1 + documentWithTermCount));
}

// Función para calcular TF-IDF de un término en un documento
function calculateTFIDF(term: string, document: MyDocument, documents: MyDocument[]): number {
  const tf = calculateTF(term, document);
  const idf = calculateIDF(term, documents);
  return tf * idf;
}

// Función para mostrar una tabla con Índice del término, Término, TF, IDF y TF-IDF para cada término en un documento
function displayTermTable(document: MyDocument, documents: MyDocument[]): void {
  console.log('Índice del término\tTérmino\tTF\tIDF\tTF-IDF');
  document.forEach((term, index) => {
    const tf = calculateTF(term, document);
    const idf = calculateIDF(term, documents);
    const tfidf = tf * idf;
    console.log(`${index + 1}\t${term}\t${tf.toFixed(2)}\t${idf.toFixed(2)}\t${tfidf.toFixed(2)}`);
  });
}
*/