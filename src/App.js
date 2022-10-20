import './App.css';
import { useState } from 'react';
import { Button, Input } from 'antd';
import { driverEncryption, decryption } from './blowfish/algorithm';
function App() {
  const [PT, setPT] = useState("");
  const [CT, setCT] = useState("");
  const [hash, setHash] = useState("");

  return (
    <div className="App">
      {/* <Input className='HashInput' placeholder='Enter Key' value={hash} onChange={e => { setHash(e.target.value) }} /> */}
      
      <div className='InputGroup'>
        <div className='InputSubGroup'>
          {/* <Input.TextArea className='Input' placeholder='Enter Plain-Text' rows={15} value={PT} onChange={e => { setPT(e.target.value) }} /> */}

          <Input className='Input' type='number' placeholder='Enter Plain-Text' rows={15} value={PT} onChange={e => { setPT(e.target.value) }} />

          <Button type="danger" ghost className='Encrypt' onClick={() => setPT(driverEncryption(PT))}>Encrypt</Button>
        </div>

        <div className='InputSubGroup'>
          {/* <Input.TextArea className='Input' placeholder='Enter Cipher-Text' rows={15} value={CT} onChange={e => { setCT(e.target.value) }} /> */}

          <Input className='Input' type='nuumber' placeholder='Enter Cipher-Text' rows={15} value={CT} onChange={e => { setCT(e.target.value) }} />


          <Button type="secondary" ghost className='Decrypt' onClick={() => setCT(decryption(CT))}>Decrypt</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
