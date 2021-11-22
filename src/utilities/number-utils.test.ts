import { formatWithCommas, roundDecimalPlaces, toFixedUnlessZero } from "./number-utils";

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

        it('should not apply comma separation to numbers less than 1000', () => {
            const formatter = new Intl.NumberFormat('en-US');
            const val = 999;
            const expected = '999';

            const actual = formatWithCommas(formatter, val);

            expect(actual).toBe(expected);
        })
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

    describe('to fixed unless zero', () => {
        it('should return a value with 2 digit precision', () => {
            const val = 1.236;
            const fractionDigits = 2;

            const expected = '1.24';

            const actual = toFixedUnlessZero(val, fractionDigits);

            expect(actual).toBe(expected);
        });

        it('should return a value with 4 digit precision', () => {
            const val = 1.32548;
            const fractionDigits = 4;
            const expected = '1.3255';

            const actual = toFixedUnlessZero(val, fractionDigits);

            expect(actual).toBe(expected);
        });

        it('should return a 0.00 string if passed 0', () => {
            const val = 0;
            const fractionDigits = 2;

            const expected = '0';

            const actual = toFixedUnlessZero(val, fractionDigits);

            expect(actual).toBe(expected);
        });
    });
});
