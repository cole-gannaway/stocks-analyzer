import { ITransaction } from "../model/ITransaction";
import { convertCSVRowIntoTransactionRow, convertTransactionRowIntoCSVRows } from "./csv-utils";

describe('csv utils', () => {
    describe('convert transaction row into csv rows', () => {
        it('should convert a transaction row into a csv row', () => {
            // arrange
            const
                d1 = new Date('1/1/2020'),
                d2 = new Date('1/2/2020'),
                d3 = new Date('1/3/2020');

            const dataRows: ITransaction[] = [
                { date: d1, symbol: 'yth', amount: 3, price: 2.24 },
                { date: d2, symbol: 'hyt', amount: 2, price: 2.42 },
                { date: d3, symbol: 'thy', amount: 1, price: 4.22 }
            ];
            const expected = [
                ['symbol','date','amount','price'],
                ['yth',d1.toString(),'3','2.24'],
                ['hyt',d2.toString(),'2','2.42'],
                ['thy',d3.toString(),'1','4.22']
            ];
            // act
            const actual = convertTransactionRowIntoCSVRows(dataRows);
            // assert
            expect(actual).toStrictEqual(expected);
        });
    });

    describe('convert csv row back into transactions', () => {
        it('should convert a csv row into a transaction row', () => {
            const
                d1 = new Date('1/1/2020'),
                d2 = new Date('1/2/2020'),
                d3 = new Date('1/3/2020');

            const csvRow: string[][] = [
                ['symbol','date','amount','price'],
                ['yth',d1.toString(),'3','2.24'],
                ['hyt',d2.toString(),'2','2.42'],
                ['thy',d3.toString(),'1','4.22']
            ];

            const expected = [
                { date: d1, symbol: 'yth', amount: 3, price: 2.24 },
                { date: d2, symbol: 'hyt', amount: 2, price: 2.42 },
                { date: d3, symbol: 'thy', amount: 1, price: 4.22 }
            ];

            const actual = convertCSVRowIntoTransactionRow(csvRow);

            expect(actual).toStrictEqual(expected);
        });
    });
});
