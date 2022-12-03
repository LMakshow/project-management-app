import parse from 'html-react-parser';

export const addNewLine = (string: string) => {
  if (!string) {
    return;
  }
  return parse(string.replaceAll(/\n/g, '<br>'));
};

