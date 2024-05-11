import React from 'react';
import { useSelector} from 'react-redux/es/hooks/useSelector';
import { selectLoggedInUser } from './authSlice';
import { Navigate } from 'react-router-dom';

const Protected = (props) => {
    const user = useSelector(selectLoggedInUser);
    if(!user){
        return <Navigate to="/login"></Navigate>;
    }
  return props.children;
};

export default Protected;