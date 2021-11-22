import { addToSumMap } from "./transaction-utils";

describe('add to sum map', () => {
    it('should add an amount under a symbol to an existing object if it exists', () => {
        const sumMap = new Map<string, number>();
        const symbol = 'TST';

        addToSumMap(sumMap, symbol, 20);
        addToSumMap(sumMap, symbol, 10);

        const expectedMap = new Map<string, number>();
        expectedMap.set('TST', 30);

        expect(sumMap).toEqual(expectedMap);
    });
});