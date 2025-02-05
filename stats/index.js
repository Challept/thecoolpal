import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function PlanStats() {
    const [stats, setStats] = useState({});
    const [totalUsers, setTotalUsers] = useState(0);
    const [newUser, setNewUser] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            const response = await fetch("https://api.webstay.se/get-plan-stats");
            const data = await response.json();
            
            const newTotal = Object.values(data).reduce((a, b) => a + b, 0);
            if (newTotal > totalUsers) {
                setNewUser(true);
                setTimeout(() => setNewUser(false), 3000);
            }
            
            setStats(data);
            setTotalUsers(newTotal);
        };
        
        fetchStats();
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, [totalUsers]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative overflow-hidden">
            {newUser && <Confetti />}
            <div className="text-6xl font-extrabold mb-6 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
                🚀 Live Plan Stats
            </div>
            <div className="flex flex-wrap justify-center gap-12 p-6">
                {Object.keys(stats).map((plan) => (
                    <div key={plan} className="relative p-8 bg-opacity-50 bg-gray-900 rounded-3xl shadow-2xl w-80 h-40 flex flex-col items-center justify-center transform transition duration-300 hover:scale-110 hover:shadow-neon">
                        <div className="text-gray-300 text-xl uppercase tracking-wide">{plan}</div>
                        <div className="text-7xl font-extrabold text-blue-400 animate-flip">{stats[plan]}</div>
                    </div>
                ))}
            </div>
            {newUser && (
                <div className="absolute top-16 text-3xl font-bold text-green-400 animate-bounce">
                    🎉 New user joined!
                </div>
            )}
        </div>
    );
}
