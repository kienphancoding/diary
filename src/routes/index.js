import Home from "../pages/Home";
import Static from "../pages/Static";
import Galery from "../pages/Galery";
import Chapter from "../pages/Chapter";
import Memory from "../pages/Memory";
import Momment from "../pages/Momment";
import Character from "../pages/Character";
import NotFound from "../pages/NotFound";

let routes = [
  { path: "/", component: Home },
  { path: "/static", component: Static },
  { path: "/galery", component: Galery },
  { path: "/chapter", component: Chapter },
  { path: "/memory", component: Memory },
  { path: "/character", component: Character },
  { path: "/momment", component: Momment },
  { path: "*", component: NotFound },
];

let diary;

if (
  !!JSON.parse(localStorage.getItem("diary")) &&
  JSON.parse(localStorage.getItem("diary")) !== []
) {
  diary = JSON.parse(localStorage.getItem("diary"));
} else {
  diary = [{ month: new Date().getMonth() + 1, year: new Date().getFullYear() }];
}

const chapter = JSON.parse(localStorage.getItem("chapter")) ?? [
  { title: "", content: "" },
];

const characters = JSON.parse(localStorage.getItem("characters")) ?? [
  { title: "", content: "" },
];
const headerItems = () => {
  let headerArray = [
    {
      month: diary[0].month,
      year: diary[0].year,
    },
  ];
  for (let i = 1; i < diary.length; i++) {
    if (diary[i].month !== headerArray[headerArray.length - 1].month) {
      headerArray = [
        ...headerArray,
        {
          month: diary[i].month,
          year: diary[i].year,
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

let tempChapter = chapter.map((x, index) => {
  return {
    path: `chapter${index + 1}`,
    component: Chapter,
  };
});

let tempCharacters = characters.map((x, index) => {
  return {
    path: `characters${index + 1}`,
    component: Character,
  };
});

routes = [...routes, ...tempRoutes, ...tempChapter, ...tempCharacters];

// console.log(headerItems);

// console.log(newRoutes);

export { routes };
