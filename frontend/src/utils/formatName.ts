const handleConvertInTitleWord = (word: string) => {
  const charactries = word.split('');

  return charactries.reduce((acumulator, char, index) => {
    if (index === 0) {
      return acumulator + char.toUpperCase();
    }
    return acumulator + char;
  }, '');
};

export default function formatName(
  firstName: string,
  lastName: string,
): string {
  return `${handleConvertInTitleWord(firstName)} ${handleConvertInTitleWord(
    lastName,
  )}`;
}