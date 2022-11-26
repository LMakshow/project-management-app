import parse from 'html-react-parser';

export const addNewLine = (string: string) => parse(string.replaceAll(/\n/g, '<br>'));