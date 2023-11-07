import { Term } from "./term";
import { Table } from "console-table-printer";
import * as pc from "picocolors"

export function printDocumentTable(documents: Term[][]) {
    let i = 0;
    documents.forEach((innerArray: Term[]) => {
        i++;

        const p = new Table({
          title: pc.italic(pc.gray(`Document ${i}`)),
          columns: [
            { name: 'index', alignment: 'left', color: 'blue', title: pc.italic(pc.blue("index")) }, // with alignment and color
            { name: 'term', alignment: 'left', color: 'green', title: pc.italic(pc.green("term")) },
            { name: 'occurrences', color: 'red', title: pc.italic(pc.red("occurrences")) }, // with Title as separate Text
          ],
        });

        innerArray.forEach((term: Term) => {    
          p.addRow(
            {  index: term.index, term: term.term, occurrences: term.occurrences, tf: term.tf.toFixed(3), idf: term.idf.toFixed(3), tf_idf: term.tf_idf.toFixed(3) }
          );
        });

        p.printTable()
    });
}

interface RowValues {
  [key: string]: string;
}

export function printDocumentCosineSimilarity(cosines: number[][]) {

  if (cosines.length >= 14) { return printIndividualDocumentCosineSimilarity(cosines, 1)}
  const c = new Table({
    title: pc.italic(pc.gray(`Cosine Similarity`)),
  });
  
  cosines.forEach((fila: number[], i: number) => {
    if (i < cosines.length - 1) {
      const rowValues: RowValues = {};
      rowValues[`Documents`] = pc.bold(pc.blue(`Document ${i + 1}`));
      for (let k = 0; k <= (i); k++) {
        const nullDocumentKey = pc.bold(pc.blue(`Document ${k + 1}`));
        rowValues[nullDocumentKey] = "-";
      }

      fila.forEach((cosine: number, j: number) => {
        const documentKey = pc.bold(pc.blue(`Document ${j + 2 + i}`));
        rowValues[documentKey] = cosine.toFixed(6);
      });


      c.addRow(rowValues);
    }
  });
  c.printTable();
}

export function printIndividualDocumentCosineSimilarity(cosines: number[][], tableIndex: number) {
  const cosinesCopy = cosines
  cosines = cosines.slice(tableIndex - 1);
  const c = new Table({
    title: pc.italic(pc.gray(`Cosine Similarity ${tableIndex}`)),
  });

  c.addColumn("Documents")
  c.addColumn("Cosines")
  let documentIndex = tableIndex
  cosines.forEach((fila: number[], i: number) => {
    if (i < cosines.length - 1) {
     

      fila.forEach((cosine: number) => {
        if (documentIndex < cosinesCopy.length) {
          c.addRow( { Documents: pc.bold(pc.blue(`Document ${++documentIndex}`)), Cosines: cosine.toFixed(6)})
        }
      });


    }
  });
  c.printTable();

  if (tableIndex < cosinesCopy.length - 1) { printIndividualDocumentCosineSimilarity(cosinesCopy, ++tableIndex)}
}
