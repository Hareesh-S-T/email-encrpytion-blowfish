import './App.css';
import { useState } from 'react';
import { Button, Input } from 'antd';

function App() {
  const [PT, setPT] = useState("");
  const [hash, setHash] = useState("");

  return (
    <div className="App">
      {/* <Input className='HashInput' placeholder='Enter Key' value={hash} onChange={e => { setHash(e.target.value) }} /> */}
      <div className='InputGroup'>
        <div className='InputSubGroup'>
          <Input.TextArea className='Input' placeholder='Enter Plain-Text' rows={15} value={PT} onChange={e => { setPT(e.target.value) }} />
          <Button type="danger" ghost className='Encrypt'>Encrypt</Button>
        </div>

        <div className='InputSubGroup'>
          <Input.TextArea className='Input' placeholder='Enter Cipher-Text' rows={15} />
          <Button type="secondary" ghost className='Decrypt'>Decrypt</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
