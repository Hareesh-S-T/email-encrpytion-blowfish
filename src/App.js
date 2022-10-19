import './App.css';
import { useState } from 'react';
import { Button, Input } from 'antd';

function App() {
  const [PT, setPT] = useState("");

  return (
    <div className="App">
      <div className='InputGroup'>
        <Input.TextArea className='Input' placeholder='Enter Plain-Text' rows={15} value={PT} onChange={e => { setPT(e.target.value) }} />
        <Button type="danger" ghost className='Encrypt'>Encrypt</Button>
      </div>

      {/* <p1>{PT}</p1> */}

      <div className='InputGroup'>
        <Input.TextArea className='Input' placeholder='Enter Cipher-Text' rows={15} />
        <Button type="secondary" ghost className='Decrypt'>Decrypt</Button>
      </div>
    </div>

  );
}

export default App;
