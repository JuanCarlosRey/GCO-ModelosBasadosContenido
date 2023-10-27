import * as fs from 'fs';

export function readDocument(filePath: string): string[][] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const rows = fileContent.split('\n'); // Dividir el contenido en filas

    const formattedContent: string[][] = rows.map(row =>
      row
        .replace(/[\n\r,.]/g, ' ')
        .split(' ')
        .filter(word => word.trim() !== '')
        .map(word => word.toLowerCase())
    );

    return formattedContent;
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return [];
  }
}

/*
const filePath = './examples/documents/documents-01.txt';
const result = readDocument(filePath);

console.log('Número de filas:', result.length); // Muestra el número de filas
result.forEach((row, index) => {
  console.log(`Fila ${index + 1}:`, row);
});
*/
