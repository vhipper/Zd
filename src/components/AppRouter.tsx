import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route => {
                    return <Route key={route.path} path={route.path} element={<route.element/>} />
                })}
                <Route path={'/login'} element={<Navigate replace to="/" />}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route => {
                    return <Route key={route.path} path={route.path} element={<route.element/>}/>
                })}
                <Route path={'/'} element={<Navigate replace to="/login" />}/>
            </Routes>
    );
};

export default AppRouter;