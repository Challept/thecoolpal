import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function PlanStats() {
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
        <div className="stats-container">
            {newUser && <div className="new-user">🎉 New user joined!</div>}
            <h1>🚀 Live Plan Stats</h1>
            <div className="stats-box">
                {Object.keys(stats).map((plan) => (
                    <div key={plan} className="stats-card">
                        <h2>{plan}</h2>
                        <p>{stats[plan]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<PlanStats />, document.getElementById("root"));
