import Home from "../pages/Home";
import Static from "../pages/Static";
import Galery from "../pages/Galery";
import Chapter from "../pages/Chapter";

let routes = [
  { path: "/", component: Home },
  { path: "/static", component: Static },
  { path: "/galery", component: Galery },
  { path: "/chapter", component: Chapter },
];

const content = JSON.parse(localStorage.getItem("diary")) ?? [
  { month: new Date().getMonth() + 1, year: new Date().getFullYear },
];

const headerItems = () => {
  let headerArray = [
    {
      month: content[0].month,
      year: content[0].year,
    },
  ];
  for (let i = 1; i < content.length; i++) {
    if (content[i].month !== headerArray[headerArray.length - 1].month) {
      headerArray = [
        ...headerArray,
        {
          month: content[i].month,
          year: content[i].year,
        },
      ];
    }
  }
  return headerArray;
};

let tempRoutes = headerItems().map((x) => {
  return {
    path: `/${x.month}/${x.year}`,
    component: Home,
  };
});

routes = [...routes, ...tempRoutes];

// console.log(headerItems);

// console.log(newRoutes);

export { routes };
