/* eslint-disable import/prefer-default-export */
const colorNumbers = [
  {
    planet: 'Sun',
    dates: [1, 10, 19, 28],
    colors: ['#3A3042', '#DB9D47', '#FF784F', '#FFE19C', '#EDFFD9'],
  },
  {
    planet: 'Moon',
    dates: [2, 11, 20, 29],
    colors: ['#46B1C9', '#84C0C6', '#9FB7B9', '#BCC1BA', '#F2E2D2'],
  },
  {
    planet: 'Jupiter',
    dates: [3, 12, 21, 30],
    colors: ['#9AD2CB', '#D7EBBA', '#FEFFBE', '#EBD494', '#472836'],
  },
  {
    planet: 'Rahu',
    dates: [4, 13, 22, 31],
    colors: ['#84DCC6', '#D6EDFF', '#ACD7EC', '#8B95C9', '#478978'],
  },
  {
    planet: 'Mercury',
    dates: [5, 14, 23],
    colors: ['#BBBE64', '#EAF0CE', '#C0C5C1', '#7D8491', '#443850'],
  },
  {
    planet: 'Venus',
    dates: [6, 15, 24],
    colors: ['#FFA630', '#D7E8BA', '#4DA1A9', '#2E5077', '#611C35'],
  },
  {
    planet: 'Ketu',
    dates: [7, 16, 25],
    colors: ['#FCD0A1', '#B1B695', '#53917E', '#63535B', '#6D1A36'],
  },
  {
    planet: 'Saturn',
    dates: [8, 17, 26],
    colors: ['#141B41', '#306BAC', '#6F9CEB', '#98B9F2', '#918EF4'],
  },
  {
    planet: 'Mars',
    dates: [9, 18, 27],
    colors: ['#5BC0EB', '#FDE74C', '#9BC53D', '#E55934', '#FA7921'],
  },
];

export function getColors(birthDate: number): string[] {
  const colorIndex = colorNumbers.findIndex((colorNumber) => colorNumber.dates.find((date) => date === birthDate));

  if (colorIndex < 0) {
    console.error('failed to get colors for this data');
    return colorNumbers[0].colors;
  }

  return colorNumbers[colorIndex].colors;
}
