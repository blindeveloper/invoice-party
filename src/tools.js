import { data } from './data';
import {
  getRoundedNumber,
  getRandomNumInRange,
  getSummedNumbers,
} from './helpers';

/**
 * Building discount object based on provided type
 * @param {string} type - The type of discount.
 * @returns {Object} Returns the formatted object with amount and type.
 */
export const getInitDiscount = (type) => {
  return {
    type,
    amount: data.discounts[type],
  };
};
/**
 * Retrieving of fee amount based on mocked data
 * @param {string} type - The type of fee.
 * @returns {number} Returns fee amount
 */
export const getFee = (type) => data.fee[type];
/**
 * Retrieving of tax rate amount based on mocked data
 * @param {string} type - The type of tax rate.
 * @returns {number} Returns tax rate amount
 */
export const getTaxRate = (type) => data.taxRates[type];
/**
 * Builds and return initial cost item
 * @param {Object} - Object with type, amount, rate, name values
 * @returns {Object} Returns Object billingType, taxRate, price, amount and name
 */
export const getCostInitItem = ({ type, amount, rate, name }) => {
  return {
    billingType: type,
    taxRate: getTaxRate(rate),
    price: data.costItemPrices[type] * amount,
    amount,
    name,
  };
};
/**
 * Generates subtotal tax amount
 * @param {Object[]} costItemsList - number to be rounded
 * @returns {number} subtotal tax amount
 */
const getSubtotalTaxAmount = (costItemsList) => {
  return getRoundedNumber(
    costItemsList.reduce((acc, el) => {
      if (el.taxRate === 0) {
        return acc;
      } else {
        return (acc += el.taxAmount);
      }
    }, 0)
  );
};
/**
 * Calculation of relative and fixed discount equally shared around all item prices
 * @param {number} initPrice - initial price of item
 * @param {Object[]} costItemsList - list of items with prices.
 * @param {Object} discount - object with discount info.
 * @returns {number} Returns price with equally shared discount calculated

 */
export const getPriceWithEquallySharedDiscount = (
  initPrice,
  subtotalPriceWithNoDiscount,
  discount
) => {
  const discountRatio =
    (initPrice / subtotalPriceWithNoDiscount) * discount.amount;

  if (discount.type.includes('fixed')) {
    return getRoundedNumber(initPrice - discountRatio);
  } else {
    return getRoundedNumber(initPrice - initPrice * (discountRatio / 100));
  }
};

/**
 * Builds phase
 * @param {Object}  object with phaseDiscountType, feeType, name,
 * @returns {number} generated phase
 */
export const getPhase = ({
  phaseDiscountType,
  invoiceDiscount,
  feeType,
  name,
}) => {
  const phaseFee = getFee(feeType);
  const getCostItemA = getCostInitItem({
    type: 'hour',
    rate: 'high',
    amount: getRandomNumInRange(),
    name: `Contract #${getRandomNumInRange()}`,
  });
  const getCostItemB = getCostInitItem({
    type: 'unit',
    rate: 'mid',
    amount: getRandomNumInRange(),
    name: `Contract #${getRandomNumInRange()}`,
  });
  const getCostItemC = getCostInitItem({
    type: 'hour',
    rate: 'no',
    amount: getRandomNumInRange(),
    name: `Contract #${getRandomNumInRange()}`,
  });

  const costItemsList = [getCostItemA, getCostItemB, getCostItemC];
  const discount = getInitDiscount(phaseDiscountType);
  const subtotalPriceWithNoDiscount = getSummedNumbers(costItemsList, 'price');

  const costItemsWithPhaseDiscountedPrices = costItemsList.map((el) => {
    el.priceWithPhaseDiscount = getPriceWithEquallySharedDiscount(
      el.price,
      subtotalPriceWithNoDiscount,
      discount
    );
    return el;
  });

  const subtotalPriceWithPhaseDiscount = getSummedNumbers(
    costItemsList,
    'priceWithPhaseDiscount'
  );
  const costItemsWithPhaseAndInvoiceDiscountPrices =
    costItemsWithPhaseDiscountedPrices.map((el) => {
      el.priceWithPhaseAndInvoiceDiscount = getPriceWithEquallySharedDiscount(
        el.priceWithPhaseDiscount,
        subtotalPriceWithPhaseDiscount,
        invoiceDiscount,
        phaseFee
      );
      return el;
    });

  const costItemsWithPhaseDiscountedPricesAndTaxes =
    costItemsWithPhaseAndInvoiceDiscountPrices.map((el) => {
      el.taxAmount = el.priceWithPhaseAndInvoiceDiscount * (el.taxRate / 100);
      return el;
    });

  return {
    name,
    costItems: costItemsWithPhaseDiscountedPrices,
    discount,
    priceWithFeePhaseAndInvoiceDiscount:
      getSummedNumbers(costItemsList, 'priceWithPhaseAndInvoiceDiscount') -
      phaseFee,
    fee: phaseFee,
    subtotalTaxAmount: getSubtotalTaxAmount(
      costItemsWithPhaseDiscountedPricesAndTaxes
    ),
  };
};

/**
 * Generates complete invoice base on initial one
 * @param {Object}  invoice initial invoice
 * @returns {Object} invoice with all data calculated
 */
export const getCompleteInvoice = (invoice) => {
  invoice.totalAddedTaxAmount = getSummedNumbers(
    invoice.phases,
    'subtotalTaxAmount'
  );
  const subtotal = getRoundedNumber(
    getSummedNumbers(invoice.phases, 'priceWithFeePhaseAndInvoiceDiscount') -
      invoice.fee
  );
  invoice.price = {
    subtotal,
    total: getRoundedNumber(subtotal + invoice.totalAddedTaxAmount),
  };

  return invoice;
};
/**
 * Generates invoice base all inputs provided inside of it
 * @returns {Object} invoice ready to be rendered
 */
export const getInvoice = () => {
  const invoiceDiscount = getInitDiscount('no');
  const invoiceFee = getFee('max');

  const getPhaseA = getPhase({
    phaseDiscountType: 'no',
    invoiceDiscount,
    feeType: 'mid',
    name: 'Jun sprint',
  });
  const getPhaseB = getPhase({
    phaseDiscountType: 'fixedMin',
    invoiceDiscount,
    feeType: 'no',
    name: 'July sprint',
  });
  const getPhaseC = getPhase({
    phaseDiscountType: 'relativeMax',
    invoiceDiscount,
    feeType: 'no',
    name: 'August sprint',
  });

  const phaseList = [getPhaseA, getPhaseB, getPhaseC];
  const initInvoice = {
    phases: phaseList,
    discount: invoiceDiscount,
    fee: invoiceFee,
  };

  return getCompleteInvoice(initInvoice);
};
