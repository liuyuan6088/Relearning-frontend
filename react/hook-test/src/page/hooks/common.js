import { useState } from 'react';

export default function Example(params = 0) {

   const [num, setNum] = useState(params);

  return [num, setNum]
}
