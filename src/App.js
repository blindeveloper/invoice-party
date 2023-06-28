import { getInvoice } from './tools';
import { useEffect, useState } from 'react';
import Invoice from './components/invoice/Invoice';

function App() {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    setInvoice(getInvoice());
  }, []);

  return <div className="App">{invoice && <Invoice invoice={invoice} />}</div>;
}

export default App;
