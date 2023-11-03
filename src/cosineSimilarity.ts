import { Term } from "./term";

// Función para calcular la similitud del coseno entre cada par de documentos en una matriz de términos (Term[][])
export function cosineSimilarity(termMatrix: Term[][]): number[][] {
    const numDocuments = termMatrix.length;
    const similarityMatrix: number[][] = [];
  
    for (let i = 0; i < numDocuments; i++) {
      const rowSimilarities: number[] = [];
  
      for (let j = 0; j < numDocuments; j++) {
        if (i < j) {
          // Calcular el producto punto entre los dos documentos
          let dotProduct = 0;
          const documentA = termMatrix[i];
          const documentB = termMatrix[j];

          for (const termA of documentA) {
            for (const termB of documentB) {
              if (termA.term === termB.term) {
                dotProduct += termA.tf_idf * termB.tf_idf;
              }
            }
          }
  
          // Calcular las magnitudes de los documentos
          let magnitudeA = 0;
          let magnitudeB = 0;
  
          for (const term of documentA) {
            magnitudeA += term.tf_idf ** 2;
          }
  
          for (const term of documentB) {
            magnitudeB += term.tf_idf ** 2;
          }
  
          magnitudeA = Math.sqrt(magnitudeA);
          magnitudeB = Math.sqrt(magnitudeB);
  
          // Calcular la similitud del coseno
          const similarity = dotProduct / (magnitudeA * magnitudeB);
          rowSimilarities.push(similarity);
        }
      }
  
      similarityMatrix.push(rowSimilarities);
    }
  
    return similarityMatrix;
  }
  