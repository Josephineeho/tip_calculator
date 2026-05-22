
import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("");
  const [people, setPeople] = useState("");

  const [billError, setBillError] = useState("");
  const [tipError, setTipError] = useState("");
  const [peopleError, setPeopleError] = useState("");

  const [total, setTotal] = useState(0)
  const [amtPerPerson, setAmtPerPerson] = useState(0)

  const isDigit = (val) => /^\d+$/.test(val);

  function resetForm() {
    setBill("");
    setPeople("");
    setTip("");
    setBillError("");
    setPeopleError("");
    setTipError("");
    setTotal("");
    setAmtPerPerson("")

  }

  function handleCalculations() {
    if (bill <= 0 || bill == "" || !isDigit(bill)) {
      setBillError("Bill must be a valid number greater than 0");
      setPeopleError("");
      setTipError("");

      setTotal("");
      setAmtPerPerson("")
    } else
      if (people <= 0 || people === "" || !isDigit(people)) {
        setPeopleError("Number of people must be a valid number greater than 0");
        setTipError("");
        setBillError("");

        setTotal("");
        setAmtPerPerson("")
      } else if (tip <= 0 || tip === "" || !isDigit(tip)) {
        setTipError("Tip % must be a valid number greater than 0")
        setPeopleError("");
        setBillError("");

        setTotal("");
        setAmtPerPerson("")
      } else {
        setBillError("");
        setPeopleError("");
        setTipError("");
        const tip_amt = Number(Number(tip) * Number(bill)) / 100;
        setTotal(Number(bill) + tip_amt);
        setAmtPerPerson(((Number(bill) + tip_amt) / Number(people)));
      }
  }

  useEffect(() => {
    function calculate() {
      handleCalculations();
    }

    calculate();
  }, [bill, tip, people])





  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center p-5'>
      <div className="w-full xs:w-3/4 sm:w-1/2 content flex flex-col gap-4  p-6 shadow-2xl h-fit rounded-lg">
        <h1 className='text-center font-bold text-xl text-violet-700'>TIP CALCULATOR/BILL SPLITTER</h1>
        <div className='flex flex-col'>
          <label className='font-bold text-lg'>Bill:</label><br />
          <input className='text-sm xs:text-lg sm:text-2xl border rounded p-3 text-2xl' type="number" value={bill} placeholder='Enter Bill Amount...' onChange={(e) => { setBill(e.target.value); }} />
          {
            billError ? <p className='text-red-500 font-bold'>{billError}</p> : ""
          }
        </div>
        <div className='flex flex-col'>
          <label className='font-bold text-lg'>Number of people:</label>
          <input className='text-sm xs:text-lg sm:text-2xl border rounded p-3 text-2xl' type="number" value={people} placeholder='Enter number of people' onChange={(e) => setPeople(e.target.value)} />
          {
            peopleError && <p className='text-red-500 font-bold'>{peopleError}</p>
          }
        </div>
        <div className='flex flex-col'>
          <label className='font-bold text-lg'>Tip Percentage:</label>
          <input className='text-sm xs:text-lg sm:text-2xl border rounded p-3 text-2xl' type="number" value={tip} placeholder='Enter tip' onChange={(e) => setTip(e.target.value)} />
          {
            tipError && <p className='text-red-500 font-bold'>{tipError}</p>
          }</div>
        <div className="buttons flex justify-between gap-2">
          <button className='p-3 text-white font-bold bg-violet-700 hover:bg-violet-500 cursor-pointer rounded bordr-0 ' onClick={() => setTip(10)}>10%</button>
          <button className='p-3 text-white font-bold bg-violet-700 hover:bg-violet-500 cursor-pointer rounded bordr-0 ' onClick={() => setTip(15)}>15%</button>
          <button className='p-3 text-white font-bold bg-violet-700 hover:bg-violet-500 cursor-pointer rounded bordr-0 ' onClick={() => setTip(20)}>20%</button>
          <button className='p-3 text-white font-bold bg-violet-700 hover:bg-violet-500 cursor-pointer rounded bordr-0 ' onClick={() => setTip(0)}>Custom %</button>
        </div>

         <button className='bg-amber-200 p-3 font-bold rounded' onClick={() => resetForm()}>Reset Form</button>

        <div className="result">
          <h2 className='font-bold sm:text-2xl text-sm  mb-6'>TOTAL BILL + TIP = <span>{total}</span></h2>
          <h2 className='font-bold sm:text-2xl text-sm mb-6'>AMOUNT PER PERSON = <span>{amtPerPerson}</span></h2>
        </div>
      </div>
    </div>
  )
}

export default App
