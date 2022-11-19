import clsx from "clsx";
import style from "./Static.module.scss";
import { moods } from "../../layout/components/Create";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Static = () => {
  const content = JSON.parse(localStorage.getItem("diary")) ?? [];

  let staticMoods = moods.map(() => {
    let array = [];
    array = [...array, 0];
    return array[0];
  });

  content.map((x) => {
    return moods.map((y, i) => {
      if (y === x.mood) {
        return staticMoods[i]++;
      }
    });
  });

  const data = moods.map((x, index) => {
    return {
      name: x,
      count: staticMoods[index],
    };
  });

  return (
    <div className={clsx(style.wrapper)}>
      <h1 style={{ marginBottom: "50px" }}>Count</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#000" background={{ fill: "#eee" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Static;
