import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

export default function IncomeExpenseBarChart({ income, expense, range="monthly" }) {
    const rangeLabel = range.charAt(0).toUpperCase() + range.slice(1);
    const data = [
        {
            name: `This ${rangeLabel}`,
            Income: income,
            Expense: expense,
        }
    ];
    return (
        <div className="bg-white rounded-xl shadow p-5 h-[380px]">
            <h2 className="font-semibold mb-4">
                Income vs Expense
            </h2>
            <ResponsiveContainer
                width="100%"
                height="90%">
                <BarChart data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar
                        dataKey="Income"
                        fill="#e4d5bc"/>
                    <Bar
                        dataKey="Expense"
                        fill="#a68665"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}