# Sistemas de recomendación. Modelos basados en el contenido
## Instalación
Debe clonar el siguiente repositorio:
```bash
git clone git@github.com:JuanCarlosRey/GCO-ModelosBasadosContenido.git
```
En el caso de que necesite instalar algunas dependencias, puede hacerlo con lso siguientes comandos:
```bash
npm install
npm install typescript
```
## Ejecución
Para ejecutar el proyecto debe ejecutar el siguiente comando:
```bash
npm test
```
## Descripción
En este proyecto se ha implementado el código necesario para realizar un sistema de recomendación basado en el contenido. Este programa busca obtener la similitud entre diferentes documentos a través de la repetición del número de palabras que aparecen en cada uno de ellos. 
Para ello, se han realizado los siguientes pasos:
1. Se ha creado un archivo `readDocuments.ts` que se encarga de leer los documentos que se encuentran en la carpeta `/examples/documents`. Para ello, se ha utilizado la librería *fs* de *node.js*. Este documento se almacena como una matriz de objetos, donde cada fila representa un documento.
2. Dentro de ese mismo archivo se llaman a dos funciones, `removeStop.Words` y `replaceWords`. Ambas funciones se encargan de eliminar las palabras vacías y de sustituir las palabras por sus lexemas, respectivamente. En este momento ya obtenemos una matriz normalizada de documentos a la que podemos evaluar correctamente. 
3. Ahora se realizarán los correspondientes cálculos a mostrar en la tabla para cada documento:
   - Dentro del archivo `functions.ts` se ha creado las tres funciones correspondientes al cálculo del *TF*(`calculateTF`), *IDF*(`calculateIDF`) y *TF-IDF*(`calculateTFIDF`). Además se cuentan el número de repeticiones de cada palabra en cada documento.
   - Una vez obtenidos los valores de *TF*, *IDF* y *TF-IDF* se almacenan en una interfaz *Term*, que se encuentra en el archivo `term.d.ts`. Dicha interfaz almacena:
     - *index*: el índice de la palabra en el documento.
     - *term*: la palabra en sí.
     - *occurrences*: el número de repeticiones de la palabra en el documento.
      - *tf*: el valor de *TF*.
      - *idf*: el valor de *IDF*.
      - *tf_idf*: el valor de *TF-IDF*.
4. En el archivo `printDocumentTable.ts` se ha creado una función que se encarga de imprimir la tabla de los documentos. Para ello, se ha utilizado la función `Table` de *console-table-printer* y *picocolors* para darle color a la tabla. 
5. En `cosineSimilarity.ts` se ha creado una función que se encarga de calcular la similitud entre los documentos. Para ello, se ha creado la función `cosineSimilarity`. Esta función recibe como parámetro el fichero entero y devuelve un número que representa la similitud entre cada uno de los documentos que lo compone. Esta función se encarga de mostrar una tabla con los resultados de la similitud entre los documentos.
6. Por último, en el archivo `index.ts` se encarga de llamar a todas las funciones creadas, para así mostrar las tablas de cada uno de los documentos y la tabla de similitud entre ellos.
## Ejemplo de ejecución
A continuación se muestra un ejemplo de ejecución del programa:
```bash
$ npm test
```
![Ejemplo de ejecución](/imagenes/Ejemplo1.png)
En este ejemplo se muestra la ejecución utilizando el archivo `documents-03.txt`. Se muestran las tablas de los documentos 1 y 2.
![Ejemplo de ejecución](/imagenes/Ejemplo2.png)
