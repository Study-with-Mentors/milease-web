// import { useState } from "react"

// const HomePage = () => {
//     const [onOff, setOnOff] = useState(true)
//     const { stage, shouldMount } = useTransition(onOff, 300) // (state, timeout)
//     return <div>
//         {shouldMount && (
//             <p style={{
//                 transition: '.3s',
//                 opacity: stage === 'enter' ? 1 : 0
//             }}>
//                 I will fade
//             </p>
//         )}
//         <button onClick={() => setOnOff(!onOff)}>toggle</button>
//     </div >
// }

// export default HomePage;