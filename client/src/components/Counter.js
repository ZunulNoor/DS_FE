import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(1);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div>
      <h1>Counter</h1>

      <p>This is a simple example of a React component.</p>

      <p aria-live="polite">Current count: <strong>{count}</strong></p>

      <button className="btn btn-primary" onClick={handleIncrement}>Increment</button>
      <button className="btn btn-primary" onClick={handleDecrement}>Decrement</button>
    </div>
  );
  
  }

