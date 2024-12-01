import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { Attachment } from '@consta/uikit/Attachment';
import { Avatar } from '@consta/uikit/Avatar';
import { Button } from '@consta/uikit/Button';
import { IconBackward } from '@consta/icons/IconBackward';
import { Card } from '@consta/uikit/Card';
import MainPage from '../../pages/main-page/MainPage';
import ServicePage from '../../pages/service-page/ServicePage';
import ServiceDetailPage from '../../pages/servie-detail-page/ServiceDetailPage';
import { Responses404 } from '@consta/uikit/Responses404';
import MainLayout from '../../layouts/main-layout/MainLayout';
import { AppRoute } from '../../../const';
import AuthPage from '../../pages/auth-page/AuthPage';


const App = function() {
  return (
    <Theme preset={presetGpnDefault}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.main} element={<MainLayout />}>
            <Route index element={<MainPage />}/>
            <Route path={AppRoute.service} element={<ServicePage />}/>
            <Route path={AppRoute.auth} element={<AuthPage />}/>
            <Route path='/service/:id' element={<ServiceDetailPage />}/>
          </Route>
          <Route path='*' element={<Responses404 />}/>
        </Routes>
      </BrowserRouter>
    </Theme>
  );
}

export default App
