import React from 'react';
import { useState } from 'react';
import "./Calculator.css";

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState('0');
    const [PendingOperation, setPendingOperation] = useState(null);
    const [pedingValue, setpedingValue] = useState(null);
    const [completeOperation, setCompleteOperation] = useState('');

    const keypadNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operations = ['+', '-', '*', '/'];

    const handleClick = (val) => {
        setCurrentValue(prevValue => {
            if (prevValue === '0') {
                return val;
            } else if (completeOperation === "") {
                return "";
            }
            else {
                return prevValue + val;
            }

        });
        setCompleteOperation((prevOperation) => prevOperation + val);
    };

    const handleOperation = (operation) => {

        if (currentValue) {
            setCompleteOperation(currentValue + ' ' + operation)
            setpedingValue(currentValue)
        } else {
            setCompleteOperation(pedingValue + " " + operation)
            setpedingValue(pedingValue)
        }
        setPendingOperation(operation)
        setCurrentValue('')
    }

    const handleClear = () => {
        setCurrentValue('0');
        setpedingValue(null);
        setPendingOperation(null);
        setCompleteOperation("");
    }

    const handleCalculate = () => {
        if (!PendingOperation || !pedingValue || !currentValue) {
            return;
        }


        const num1 = parseFloat(pedingValue)
        const num2 = parseFloat(currentValue)

        let result

        switch (PendingOperation) {
            case '+':
                result = num1 + num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '/':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    setCurrentValue("Error")
                    setCompleteOperation("Error")
                    setPendingOperation(null)
                    setpedingValue(null)
                }
                break;

            default:
                break;
        }

        setCompleteOperation(
            pedingValue +
            ' ' +
            PendingOperation +
            ' ' +
            currentValue +
            " = " +
            result);
            setCurrentValue(result.toString());
            setPendingOperation(null);
            setpedingValue(null);
            setCompleteOperation("")
    }

    return <div className="calculator">
        <div className="complete-operation">{completeOperation}</div>
        <div className="display">{currentValue}</div>
        <div className="buttons">
            <button className='ac' onClick={handleClear}>AC</button>
            {keypadNumbers.map((num) => (
                <button key={num}
                    className='num'
                    onClick={() => handleClick(num)}>
                    {num}
                </button>
            ))}
            <div className="calc">

                {operations.map((operation) => (
                    <button key={operation}
                        className='operation'
                        onMouseOver={handleCalculate}
                        onClick={() => handleOperation(operation)}>
                        {operation}
                    </button>
                ))}
            </div>
            <button className='igual' onClick={handleCalculate}>=</button>
        </div>
    </div>
};

export default Calculator;