import React from 'react';
import { Routes, Route, BrowserRouter  } from "react-router-dom";
import Login from '../pages/Login';
import Home from '../pages/Home';
import SideBar from '../components/SideBar';
import Funcionarios from '../pages/Cadastros/Funcionarios/Funcionarios';
import Pessoas from '../pages/Cadastros/Pessoas/Pessoas';
import Usuarios from '../pages/Cadastros/Usuarios/Usuarios';

// import { isAuthenticated } from '../auth/Auth';

//   const PrivateRoute = ({ component: Component, ...rest }: any) => (
//     <Route
//       {...rest}
//       render={(props: any) => (
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//             <Redirect to={{ pathname: '/', state: { from: props.location } }} />   //! componente <Redirect /> dá erro na importação
//         )
//       )}
//     />
//   );
  
function AppRoutes() {
    const TituloHome = 'Home';
    const TituloFuncionario = 'Funcionários';
    const TituloPessoas = 'Pessoas';
    const TituloUsuarios = 'Usuários';

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/Home' element={<SideBar children={<Home />} titulo={TituloHome} />} />
                    <Route path='/Funcionarios' element={<SideBar children={<Funcionarios />} titulo={TituloFuncionario} />} />
                    <Route path='/Pessoas' element={<SideBar children={<Pessoas />} titulo={TituloPessoas} />} />
                    <Route path='/Usuarios' element={<SideBar children={<Usuarios />} titulo={TituloUsuarios} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRoutes;