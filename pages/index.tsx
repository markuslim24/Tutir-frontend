import { useEffect, useState } from 'react';
import { client } from '../util/util';

export default function Home() {
  const [message , setMessage] = useState('');
  useEffect(() => {
    client.get('/user').then(res => {
      setMessage(res.data.payload);
    }).catch(err => {
      console.log(err);
    });
  }, []);
  return (
    <div>
      { message }
    </div>
  );
}
