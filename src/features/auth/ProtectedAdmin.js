import React from 'react';
import { useSelector} from 'react-redux/es/hooks/useSelector';
import { selectLoggedInUser } from './authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedAdmin = (props) => {
    const user = useSelector(selectLoggedInUser);
    if(!user){
        return <Navigate to="/login"></Navigate>;
    }
    if(user && user.role!=='admin'){
      return <Navigate to="/"></Navigate>;
  }
  return props.children;
};

export default ProtectedAdmin;