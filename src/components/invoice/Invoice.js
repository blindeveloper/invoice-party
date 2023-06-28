import Phase from '../phase/Phase';
import { StyledInvoice, StyledWrapper } from './Invoice.styled';
import { StyledValue } from '../Global.styled';
const Invoice = ({ invoice }) => {
  console.log('invoice: ', invoice);
  return (
    <StyledWrapper>
      <h2>Invoice 0118</h2>
      <hr />
      <StyledInvoice>
        {invoice.phases.map((phase, index) => (
          <Phase key={index} phase={phase} />
        ))}
      </StyledInvoice>
      <div>
        <hr />
        <p>
          Subtotal invoice price:{' '}
          <StyledValue>{invoice.price.subtotal} €</StyledValue>
        </p>
        <p>
          Total invoice added tax:{' '}
          <StyledValue>{invoice.totalAddedTaxAmount} €</StyledValue>
        </p>
        <p>
          Total invoice price:{' '}
          <StyledValue>{invoice.price.total} €</StyledValue>
        </p>
      </div>
    </StyledWrapper>
  );
};

export default Invoice;
