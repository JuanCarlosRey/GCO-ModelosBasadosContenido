export interface Term {
    index: number,
    term: string,
    occurrences: number,
    tf: number,
    idf: number,
    tf_idf: number
}