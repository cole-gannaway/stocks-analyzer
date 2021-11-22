import { compareDates, getDateinDDFormat, getMonthInMMFormat } from './date-utils';

describe('date utils', () => {
    describe('get date in DD format', () => {
        it('should convert a date to DD format when date is < 10', () => {
            // arrange
            const expected = '09';
            // act
            const actual = getDateinDDFormat(9);
            // assert
            expect(actual).toBe(expected);
        });

        it('should convert a date to DD format when date is >= 10', () => {
            // arrange
            const expected = '10';
            // act
            const actual = getDateinDDFormat(10);
            //a assert
            expect(actual).toBe(expected);
        });
    });

    describe('get month in MM format', () => {
        it('should convert a month to MM format when month is < 10', () => {
            const testDate = new Date('9/1/2021');
            // arrange
            const expected = '09';
            // act
            const actual = getMonthInMMFormat(testDate.getMonth());
            // assert
            expect(actual).toEqual(expected);
        });

        it('should convert a month to MM format when month is >= 10', () => {
            const testDate = new Date('10/1/2021');
            const expected = '10';
            const actual = getMonthInMMFormat(testDate.getMonth());
            expect(actual).toBe(expected);
        });
    });

    describe('compare dates', () => {
        it('should return -1 when first parameter is before second', () => {
            const dA = new Date('1/1/2020');
            const dB = new Date('1/1/2021');

            const result = compareDates(dA, dB);

            expect(result).toBe(-1);
        });

        it('should return 0 when the two parameters are the same', () => {
            const d = new Date('1/1/2020');

            const result = compareDates(d, d);

            expect(result).toBe(0);
        });

        it('should be 1 when first parameter is after second', () => {
            const dA = new Date('1/1/2020');
            const dB = new Date('1/1/2021');

            const result = compareDates(dB, dA);

            expect(result).toBe(1);
        });
    });
});
