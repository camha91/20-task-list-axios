import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Header from "./components/Home/Header/Header";
import Modal from "./HOC/Modal/Modal";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import HOCModal from "./pages/HOCModal/HOCModal";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import TaskListRcc from "./pages/TaskList/TaskListRcc";
import TaskListRedux from "./pages/TaskList/TaskListRedux";
import TaskListRfc from "./pages/TaskList/TaskListRfc";
import TaskListSaga from "./pages/TaskListSaga/TaskListSaga";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";

function App() {
    return (
        <BrowserRouter>
            <Modal />
            <LoadingComponent />
            <Switch>
                <HomeTemplate exact path="/home" Component={Home} />
                <HomeTemplate exact path="/contact" Component={Contact} />
                <HomeTemplate exact path="/about" Component={About} />
                <HomeTemplate exact path="/login" Component={Login} />
                <HomeTemplate exact path="/detail/:id" Component={Detail} />
                <HomeTemplate exact path="/profile" Component={Profile} />
                <HomeTemplate exact path="/hocModal" Component={HOCModal} />
                <HomeTemplate
                    exact
                    path="/taskListSaga"
                    Component={TaskListSaga}
                />
                <HomeTemplate
                    exact
                    path="/taskListRcc"
                    Component={TaskListRcc}
                />
                <HomeTemplate
                    exact
                    path="/taskListRfc"
                    Component={TaskListRfc}
                />
                <HomeTemplate
                    exact
                    path="/taskListRedux"
                    Component={TaskListRedux}
                />
                <HomeTemplate exact path="/" Component={Home} />
                <HomeTemplate path="*" Component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
