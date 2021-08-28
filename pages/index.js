import { useEffect } from 'react';
import io from 'socket.io-client';

export default function Home() {
  // useEffect(() => {
  //   io(process.env.NEXT_PUBLIC_API_URL);
  // }, []);
  return (
    <>
      <p className="text-red-400">testing</p>
    </>
  );
}
