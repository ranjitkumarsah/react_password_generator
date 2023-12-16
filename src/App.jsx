import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [range, setRange] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [splCharAllowed, setSplCharAllowed] = useState(false)

  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (splCharAllowed) str += "!#$%&'()*+,-./=@_`~{}[]"

    for (let i = 0; i < range; i++) {
      let char = Math.floor(Math.random() * str.length)

      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [range, numberAllowed, splCharAllowed, setPassword])

  useEffect(() => { passGenerator() }, [range, numberAllowed, splCharAllowed])

  const passRef = useRef(null)
  const copyToClip = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]);

  return (
    <>
      <div className="container-fluid bg-dark vh-100">
        <div className="row justify-content-center ">
          <div className="col-sm-8 mt-5">
            <div className="card py-5 px-5">
              <div className="row">
                <h3 className="text-center mb-3">Password Generator</h3>

              </div>
              <div className="row ">
                <div className="col-10 ">
                  <input
                    type="text"
                    className="form-control"
                    value={password}
                    readOnly
                    placeholder='Password'
                    ref={passRef}
                  />
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-success"
                    onClick={copyToClip}
                  >Copy</button>
                </div>
              </div>
              <div className="row mt-3 ">
                <div className="col-sm-4 col-md-3">
                  <label htmlFor="range">Range({range})</label><br />
                  <input
                    type="range"
                    name="range"
                    className=''
                    min={1}
                    max={50}
                    onChange={((e) => { setRange(e.target.value) })}
                    value={range}
                  />
                </div>
                <div className="col-sm-4 col-md-2 mt-3">
                  <input type="checkbox" name="number" id="number" className='me-2' onChange={() => setNumberAllowed((prev) => !prev)} />
                  <label htmlFor="number">Number</label>
                </div>
                <div className="col-sm-4 mt-3">
                  <input type="checkbox" name="splchar" id="splchar" className='me-2' onChange={() => setSplCharAllowed((prev) => !prev)} />
                  <label htmlFor="splchar">Special Characters</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
