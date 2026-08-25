import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
const COLORS = [ "#9c6644", "#7f5539", "#b08968", "#ddb892", "#E6ccb2", "#c9a66b" ];

export default function ExpensePieChart({ data }) {
    return (
        <div className="bg-white rounded-xl shadow p-5 h-[380px]">
            <h2 className="font-semibold mb-4">
                Expense Distribution
            </h2>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="category"
                        outerRadius={120}
                        label>
                        {data.map((item, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}