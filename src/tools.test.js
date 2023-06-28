import { getInitDiscount, getPriceWithEquallySharedDiscount } from './tools';

describe('---getInitDiscount test---', () => {
  const initDiscountSet = [
    { input: 'fixedMax', output: { amount: 500, type: 'fixedMax' } },
    { input: 'fixedMid', output: { amount: 200, type: 'fixedMid' } },
    { input: 'fixedMin', output: { amount: 100, type: 'fixedMin' } },
    { input: 'relativeMax', output: { amount: 50, type: 'relativeMax' } },
    { input: 'relativeMid', output: { amount: 30, type: 'relativeMid' } },
    { input: 'relativeMin', output: { amount: 15, type: 'relativeMin' } },
  ];

  initDiscountSet.map((el) => {
    it(`should test getInitDiscount function with ${el.input} input and ${el.output} output`, () => {
      expect(getInitDiscount(el.input)).toEqual(el.output);
    });
  });
});

describe('---getPriceWithEquallySharedDiscount test---', () => {
  const priceWithEquallySharedDiscountSet = [
    {
      input: {
        initPrice: 100,
        subtotalPriceWithNoDiscount: 300,
        discount: { amount: 50, type: 'fixedMax' },
      },
      output: 83.33,
    },
    {
      input: {
        initPrice: 100,
        subtotalPriceWithNoDiscount: 300,
        discount: { amount: 100, type: 'fixedMin' },
      },
      output: 66.67,
    },
    {
      input: {
        initPrice: 100,
        subtotalPriceWithNoDiscount: 200,
        discount: { amount: 50, type: 'relativeMax' },
      },
      output: 75,
    },
    {
      input: {
        initPrice: 1000,
        subtotalPriceWithNoDiscount: 2500,
        discount: { amount: 20, type: 'relativeMax' },
      },
      output: 920,
    },
    {
      input: {
        initPrice: 50,
        subtotalPriceWithNoDiscount: 150,
        discount: { amount: 50, type: 'relativeMax' },
      },
      output: 41.67,
    },
  ];

  priceWithEquallySharedDiscountSet.map((el) => {
    it(`should test getPriceWithEquallySharedDiscount function with ${el.input} input and ${el.output} output`, () => {
      expect(
        getPriceWithEquallySharedDiscount(
          el.input.initPrice,
          el.input.subtotalPriceWithNoDiscount,
          el.input.discount
        )
      ).toEqual(el.output);
    });
  });
});
