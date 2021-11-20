import { formatWithCommas, roundDecimalPlaces } from "./number-utils";

describe('number utils', () => {
    describe('format with commas', () => {
        it('should apply comma separation to numbers greater than 999', () => {
            // arrange
            const formatter = new Intl.NumberFormat('en-US');
            const val = 1000;
            const expected = '1,000';
            // act
            const actual = formatWithCommas(formatter, val);
            // assert
            expect(actual).toBe(expected);
        });
    });

    describe('round decimal places', () => {
        it('should round decimal to 2 places', () => {
            const val = 1.2334;
            const decimalPlaces = 2;
            const expected = 1.23;

            const actual = roundDecimalPlaces(val, decimalPlaces);

            expect(actual).toBe(expected);
        });
    });
});