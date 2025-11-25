import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function WinTypesDonut({ winTypesData, color }) {


  const COLORS = [color, "#f59e0b", "#6366f1"]; 

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={winTypesData}
          dataKey="value"
          nameKey="name"
          innerRadius= "40%"
          outerRadius="60%"
          paddingAngle={3}
          label
        >
          {winTypesData.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" align="left" verticalAlign="left" />
      </PieChart>
    </ResponsiveContainer>
  );
}
