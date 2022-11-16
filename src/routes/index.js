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

const diary = JSON.parse(localStorage.getItem("diary")) ?? [
  { month: new Date().getMonth() + 1, year: new Date().getFullYear },
];

const chapter = JSON.parse(localStorage.getItem("chapter")) ?? [
  { title:"",content:"" },
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

let tempChapter = chapter.map((x,index)=>{
  return{
    path:`chapter${index+1}`,
    component:Chapter
  }
})

routes = [...routes, ...tempRoutes,...tempChapter];

// console.log(headerItems);

// console.log(newRoutes);

export { routes };
