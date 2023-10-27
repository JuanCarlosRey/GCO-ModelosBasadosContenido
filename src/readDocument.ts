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
