import { Term } from "./term";

/////////// TODO:

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
